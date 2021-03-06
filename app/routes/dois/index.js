import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, RouteMixin, {
  perPage: 25,

  model(params) {
    params.paramMapping = { page: "page[number]",
                            perPage: "page[size]",
                            total_pages: "total-pages" };

    let dois = this.findPaged('doi', params);
    return dois;
    // let self = this;
    // return this.findPaged('doi', params).then(function(dois) {
    //   return dois;
    // }).catch(function(reason){
    //   Ember.Logger.assert(false, reason);
    //   self.get('flashMessages').warning('DOI Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.');
    //   return self.transitionTo('/');
    // });
  },

  afterModel() {
    if (!this.can('read index')) {
      return this.transitionTo('index');
    }
  },

  actions: {
    queryParamsDidChange() {
      this.refresh();
    }
  }
});
