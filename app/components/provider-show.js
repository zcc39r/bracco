import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';
import fetch from 'fetch';
const { service } = Ember.inject;
import ENV from 'bracco/config/environment';

const Validations = buildValidations({
  confirmId: validator('confirmation', {
    on: 'symbol',
    message: 'Provider ID does not match'
  })
});

export default Ember.Component.extend(Validations, {
  currentUser: service(),
  store: service(),

  edit: false,
  change: false,
  delete: false,
  provider: null,
  confirmId: null,

  reset() {
    this.get('provider').set('passwordInput', null);
    this.set('edit', false);
    this.set('change', false);
    this.set('delete', false);
  },
  generate() {
    let self = this;
    let url = ENV.APP_URL + '/random';
    fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + this.get('currentUser').get('jwt')
      }
    }).then(function(response) {
      if (response.ok) {
        response.json().then(function(data) {
          self.get('model').set('passwordInput', data.phrase);
        });
      } else {
        Ember.Logger.assert(false, response)
      }
    }).catch(function(error) {
      Ember.Logger.assert(false, error)
    });
  },

  actions: {
    edit(provider) {
      this.set('provider', provider);
      this.get('provider').set('confirmSymbol', provider.get('symbol'));
      this.set('edit', true);
    },
    change(provider) {
      this.set('provider', provider);
      this.get('provider').set('confirmSymbol', provider.get('symbol'));
      this.get('provider').set('passwordInput', null);
      this.set('change', true);
    },
    generate() {
      this.generate();
    },
    delete(provider) {
      this.set('provider', provider);
      this.get('provider').set('confirmSymbol', null);
      this.set('delete', true);
    },
    setPassword() {
      let self = this;
      this.get('provider').set('keepPassword', false);
      this.get('provider').save().then(function () {
        self.reset();
      }).catch(function(reason){
        Ember.Logger.assert(false, reason);
      });
    },
    submit() {
      let self = this;
      this.get('provider').save().then(function () {
        self.reset();
      }).catch(function(reason){
        Ember.Logger.assert(false, reason);
      });
    },
    destroy(provider) {
      let self = this;
      if (this.get('confirmId') === provider.get('symbol')) {
        provider.destroyRecord().then(function () {
          self.get('router').transitionTo('/providers');
        }).catch(function(reason){
          Ember.Logger.assert(false, reason);
        });
      }
    },
    cancel(provider) {
      let self = this;
      this.get('store').findRecord("provider", provider.id).then(function(provider) {
        self.get('model').set('provider', provider);
        self.reset();
      });
    },
    onSuccess() {
    },
    onError(error) {
      Ember.Logger.assert(false, error)
    }
  }
});
