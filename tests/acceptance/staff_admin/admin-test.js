import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from 'bracco/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | staff_admin | admin', {
  beforeEach: function () {
    this.application.register('service:mock-user', Ember.Service.extend({
      uid: 'admin',
      name: 'Admin',
      role_id: 'staff_admin'
    }));
    this.application.inject('adapter', 'currentUser', 'service:mock-user');
    this.application.inject('ability', 'currentUser', 'service:mock-user');
    this.application.inject('route', 'currentUser', 'service:mock-user');
    this.application.inject('component', 'currentUser', 'service:mock-user');
    this.application.inject('helper', 'currentUser', 'service:mock-user');
  }
});

test('visiting homepage', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('h2.work').text(), 'DataCite');
  });
});

// the following pages require authentication. Redirects to homepage otherwise
test('visiting settings', function(assert) {
  visit('/settings');

  andThen(function() {
    assert.equal(currentURL(), '/settings');
    assert.equal(find('h2.work').text(), 'DataCite');
  });
});

test('visiting providers', function(assert) {
  visit('/providers');

  andThen(function() {
    assert.equal(currentURL(), '/providers');
    assert.equal(find('h2.work').text(), 'DataCite');
  });
});

test('visiting clients', function(assert) {
  visit('/clients');

  andThen(function() {
    assert.equal(currentURL(), '/clients');
    assert.equal(find('h2.work').text(), 'DataCite');
  });
});

test('visiting prefixes', function(assert) {
  visit('/prefixes');

  andThen(function() {
    assert.equal(currentURL(), '/prefixes');
    assert.equal(find('h2.work').text(), 'DataCite');
  });
});

test('visiting prefix 10.5072', function(assert) {
  visit('/prefixes/10.5072');

  andThen(function() {
    assert.equal(currentURL(), '/prefixes/10.5072');
    assert.equal(find('div.alert-warning').text().trim(), 'The page was not found.');
  });
});

test('visiting dois', function(assert) {
  visit('/dois');

  andThen(function() {
    assert.equal(currentURL(), '/dois');
    assert.equal(find('h2.work').text(), 'DataCite');
  });
});

// test('visiting specific doi', function(assert) {
//   visit('/dois/10.1594%2Fwdcc%2Fclm_c20_3_d3');
//
//   andThen(function() {
//     assert.equal(currentURL(), '/dois/10.1594%2Fwdcc%2Fclm_c20_3_d3');
//     assert.equal(find('h2.work').text(), '10.1594/wdcc/clm_c20_3_d3');
//   });
// });
