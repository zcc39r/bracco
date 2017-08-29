import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  canDelete: Ember.computed('currentUser', function() {
    switch(this.get('currentUser.role')) {
      case 'staff_admin':
        return true;
      default:
        return false;
    }
  }),
  canWrite: Ember.computed('currentUser', 'model', function() {
    switch(this.get('currentUser.role')) {
      case 'staff_admin':
        return this.get('currentUser').get('member_id') === this.get('model.member_id');
      case 'member_admin':
        return true;
      case 'data_center_admin':
        return this.get('currentUser').get('data_center_id') === this.get('model.id');
      default:
        return false;
    }
  }),
  canRead: Ember.computed('currentUser', 'model', function() {
    switch(this.get('currentUser.role')) {
      case 'staff_admin':
        return true;
      case 'member_admin':
        return this.get('currentUser').get('member_id') === this.get('model.member.id');
      case 'data_center_admin':
        return this.get('currentUser').get('data_center_id') === this.get('model.id');
      default:
        return false;
    }
  })
});
