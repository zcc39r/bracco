import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, RouteMixin, {
  perPage: 25,
  home: '/',

  model(params) {
    params.paramMapping = { page: "page[number]",
                            perPage: "page[size]",
                            total_pages: "total-pages" };

    // params = Ember.merge(params, { adapterOptions: { include: ['member'] }});
    return this.findPaged('client', params);
  },

  afterModel(model, transition) {
    if (!this.can('read index')) {
      let home = (this.get('currentUser')) ? this.get('currentUser').get('home') : '/';
      return this.transitionTo(home);
    }
  },

  actions: {
    queryParamsDidChange: function() {
      this.refresh();
    }
  }
});
