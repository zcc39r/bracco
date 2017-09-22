import Ember from 'ember';
import Cookie from 'ember-cli-js-cookie';
import NodeJsonWebToken from 'npm:jsonwebtoken';
import ENV from 'bracco/config/environment';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  flashMessages: Ember.inject.service(),

  isAuthenticated: false,
  isPermitted: false,
  isAdmin: false,
  isProvider: false,
  isClient: false,
  uid: null,
  jwt: null,
  name: null,
  email: null,
  role: null,
  role_id: null,
  provider_id: null,
  client_id: null,
  home: null,

  init() {
    this._super(...arguments);

    let self = this;
    let decoded = new Ember.RSVP.Promise(function(resolve, reject) {
      // check for cookie containing jwt
      let jwt = Cookie.get('_datacite_jwt');

      // check for RSA public key
      let cert = ENV.JWT_PUBLIC_KEY ? ENV.JWT_PUBLIC_KEY.replace(/\\n/g, '\n') : null;

      // verify asymmetric token, using RSA with SHA-256 hash algorithm
      NodeJsonWebToken.verify(jwt, cert, { algorithms: ['RS256'] }, function (error, payload) {
        if (payload) {
          // add JWT to returned payload
          payload.jwt = jwt;
          resolve(payload);
        } else {
          reject(error);
        }
      });
    });

    decoded.then(function(result) {
      self.set('isAuthenticated', Ember.isPresent(result));

      if (Ember.isPresent(result)) {
        self.set('jwt', result.jwt);
        self.set('uid', result.uid);

        self.set('name', result.name);
        self.set('email', result.email);

        // check that provider or client exist and are active
        if (['staff_admin', 'staff_user'].includes(result.role_id)) {
          self.set('isAdmin', true);
          self.set('role_id', result.role_id);
          self.set('role', self.get('store').findRecord('role', result.role_id));
          self.set('home', '/');
        } else if (['provider_admin', 'provider_user'].includes(result.role_id) && result.provider_id) {
          self.set('provider_id', result.provider_id);
          self.get('store').findRecord('provider', result.provider_id).then(function(provider) {
            let isProvider = provider.get('isActive');
            self.set('isProvider', isProvider);
            self.set('role_id', (isProvider) ? result.role_id : 'user');
            self.set('role', self.get('store').findRecord('role', self.get('role_id')));
            self.set('home', '/providers/' + result.provider_id);
          });
        } else if (['client_admin', 'client_user'].includes(result.role_id) && result.client_id) {
          self.set('client_id', result.client_id);
          self.get('store').findRecord('client', result.client_id).then(function(client) {
            let isClient = client.get('isActive');
            self.set('isProvider', isClient);
            self.set('role_id', (isClient) ? result.role_id : 'user');
            self.set('role', self.get('store').findRecord('role', self.get('role_id')));
            self.set('home', '/clients/' + result.client_id);
          });
        } else {
          self.set('role_id', 'user');
        }

        // if (result.role_id === "client_admin") {
        //   self.get('flashMessages').info('Welcome ' + result.name + ' to the Client Administration area.');
        // } else if (result.role_id === "provider_admin") {
        //   self.get('flashMessages').info('Welcome ' + result.name + ' to the DOI Registration Provider Administration area.');
        // } else if (result.role_id === "staff_admin") {
        //   self.get('flashMessages').info('Welcome ' + result.name + ' to the DataCite Administration area.');
        // }
      }
    }, function(reason) {
      Ember.Logger.assert(false, reason)
    });
  }
});
