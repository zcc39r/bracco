import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  canWrite: Ember.computed('currentUser.role', function() {
    switch(this.get('currentUser.role')) {
      case 'provider_admin':
      case 'client_admin':
        return true;
      default:
        return false;
    }
  }),
  canRead: Ember.computed('currentUser.role', function() {
    switch(this.get('currentUser.role')) {
      case 'provider_admin':
      case 'client_admin':
        return true;
      default:
        return false;
    }
  })
});
