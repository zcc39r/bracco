import { moduleFor, test } from 'ember-qunit';

moduleFor('route:providers/show/dois', 'Unit | Route | providers/show/dois', {
  needs: ['service:google-analytics', 'service:can']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
