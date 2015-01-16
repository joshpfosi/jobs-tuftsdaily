import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('daily-member', 'DailyMember', {
  // Specify the other units that are required for this test.
  needs: ['model:job']
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(!!model);
});
