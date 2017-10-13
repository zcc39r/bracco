import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  new: false,
  provider: null,
  prefix: null,
  prefixes: [],

  searchPrefix(query) {
    this.set('prefixes', this.get('store').query('prefix', { query: query, state: 'unassigned', sort: 'name', 'page[size]': 10 }));
  },

  didReceiveAttrs() {
    this._super(...arguments);

    this.set('provider', this.get('model.provider'));

    this.searchPrefix(null);
  },

  actions: {
    new() {
    },
    submit() {
      var providerPrefix = this.get('store').createRecord('providerPrefix', { provider: this.get('provider'), prefix: this.get('prefix') });
      providerPrefix.save();
      this.get('router').transitionTo('providers.show.prefixes', this.get('provider'));
    },
    searchPrefix(query) {
      this.searchPrefix(query);
    },
    selectPrefix(prefix) {
      this.set('prefix', prefix);
    },
    cancel() {
      this.get('router').transitionTo('providers.show.prefixes', this.get('provider'));
    }
  }
});