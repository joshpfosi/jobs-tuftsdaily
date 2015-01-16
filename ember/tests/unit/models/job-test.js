import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('job', 'Job', {
  // Specify the other units that are required for this test.
  needs: ['model:daily-member']
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(!!model);
});
