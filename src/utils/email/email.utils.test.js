const { sendTo } = require('./email.utils');

test(`It should return the entered emails as an array in a sring separated by commas.`,
  () => {
    const emails = ['test_1@test.com', 'test_2@test.com', 'test_3@test.com'];
    const result = sendTo(emails);
    expect(result).toEqual('test_1@test.com, test_2@test.com, test_3@test.com');
});

test(`It should return an email entered as a sring with the email only.`, () => {
  const emails = ['test_1@test.com'];
  const result = sendTo(emails);
  expect(result).toEqual('test_1@test.com');
});
