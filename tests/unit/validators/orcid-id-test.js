import { moduleFor, test } from 'ember-qunit';

moduleFor('validator:orcid-id', 'Unit | Validator | orcid-id', {
  needs: ['validator:messages']
});

test('it works', function(assert) {
  var validator = this.subject();
  assert.ok(validator);
});
