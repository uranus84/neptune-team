const sum = require('./sum');

test('CONFIRM TEST SUITE WORKING : this test adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});