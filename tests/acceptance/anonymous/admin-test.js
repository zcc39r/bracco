import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from 'bracco/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | anonymous | admin', {
  beforeEach: function () {
    this.application.register('service:mock-user', Ember.Service.extend({}));
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
    assert.equal(find('div.motto h1').text(), 'DataCite DOI Fabrica');
  });
});

// the following pages require authentication. Redirects to homepage otherwise
test('visiting settings', function(assert) {
  visit('/settings');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('div.motto h1').text(), 'DataCite DOI Fabrica');
  });
});

test('visiting providers', function(assert) {
  visit('/providers');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('div.motto h1').text(), 'DataCite DOI Fabrica');
  });
});

test('visiting clients', function(assert) {
  visit('/clients');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('div.motto h1').text(), 'DataCite DOI Fabrica');
  });
});

test('visiting prefixes', function(assert) {
  visit('/prefixes');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('div.motto h1').text(), 'DataCite DOI Fabrica');
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
    assert.equal(currentURL(), '/');
    assert.equal(find('div.motto h1').text(), 'DataCite DOI Fabrica');
  });
});

test('visiting specific doi', function(assert) {
  visit('/dois/10.5520%2Fsagecite-1');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('div.motto h1').text(), 'DataCite DOI Fabrica');
  });
});
