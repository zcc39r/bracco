/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    'ember-cli-babel': {
      includePolyfill: true
    },

    sourcemaps: {
      enabled: true,
      extensions: ['js']
    },

    minifyJS:  {
      enabled: false
    },

    // fingerprint: {
    //   enabled: false
    // },
    babel: {
      sourceMaps: 'inline'
    },

    'ember-bootstrap': {
      importBootstrapCSS: false,
      importBootstrapFont: false,
      bootstrapVersion: 3
    },

    'ember-prism': {
      'theme': 'default'
    },

    inlineContent: {
      'site-title' : {
        content: (process.env.SITE_TITLE || "DataCite DOI Fabrica")
      },
      'cdn-url' : {
        content: (process.env.CDN_URL || "https://assets.datacite.org")
      }
    },

    'ember-power-select': {
      theme: 'bootstrap'
    }
  });

  app.import('vendor/bootstrap/js/dropdown.js');
  app.import('vendor/bootstrap/js/tooltip.js');

  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
