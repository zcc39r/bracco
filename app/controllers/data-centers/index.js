import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['query', 'year', 'member-id', 'page', 'perPage'],
  query: null,
  year: null,
  'member-id': null
});