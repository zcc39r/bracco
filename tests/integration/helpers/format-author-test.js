import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('format-author', 'helper:format-author', {
  integration: true
});

test('it renders one author', function(assert) {
  this.set('authors', {
    "type": "Person",
    "id": "https://orcid.org/0000-0002-2822-4968",
    "name": "Mitesh Patel",
    "given-name": "Mitesh",
    "family-name": "Patel"
  });

  this.render(hbs`{{format-author authors}}`);

  assert.equal(this.$().text().trim(), '<a href="https://orcid.org/0000-0002-2822-4968">Mitesh Patel</a>');
});

test('it renders three authors', function(assert) {
  this.set('authors', [
    {
      "type": "Person",
      "name": "Empbh R. Goh",
      "given-name": "Empbh R.",
      "family-name": "Goh"
    }, {
      "type": "Person",
      "name": "M. Barrgow",
      "given-name": "M.",
      "family-name": "Barrgow"
    }, {
      "type": "Person",
      "name": "M. Barrgoe",
      "given-name": "M.",
      "family-name": "Barrgoe"
    }
  ]);

  this.render(hbs`{{format-author authors}}`);

  assert.equal(this.$().text().trim(), 'Empbh R. Goh, M. Barrgow & M. Barrgoe');
});
