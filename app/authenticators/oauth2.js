import OAuth2PasswordGrantAuthenticator from 'ember-simple-auth/authenticators/oauth2-password-grant';
import ENV from 'bracco/config/environment';

export default OAuth2PasswordGrantAuthenticator.extend({
  serverTokenEndpoint: ENV.APP_URL + '/token'
});
