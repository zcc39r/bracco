import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('format-metadata', 'helper:format-metadata', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{format-metadata inputValue}}`);

  assert.equal(this.$().text().trim(), 'Work published 1234');
});
