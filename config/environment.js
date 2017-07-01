/* eslint-env node */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'lagotto-admin',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV.SITE_TITLE = process.env.SITE_TITLE || "DataCite Event Data";
  ENV.NAVMENU_TITLE = process.env.NAVMENU_TITLE;
  ENV.SEARCH_URL = process.env.SEARCH_URL || "https://search.datacite.org";
  ENV.ORCID_URL = process.env.ORCID_URL || "https://orcid.org";
  ENV.CDN_HOST = process.env.CDN_HOST || "assets.datacite.org";
  ENV.JWT_HOST = process.env.JWT_HOST || "https://profiles.datacite.org";
  ENV.JWT_PUBLIC_KEY = process.env.JWT_PUBLIC_KEY;

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  return ENV;
};
