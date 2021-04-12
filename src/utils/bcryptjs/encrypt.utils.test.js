const { encryptPassword, comparePassword } = require('./encrypt.utils');

test(`It should generate an encrypted string`, () => {
  const password = 'Test@1945-';
  const hash = encryptPassword(password);
  expect(typeof hash).toBe('string');
});

test(`It should encrypt the password and when compared to it, return true.`, () => {
  const password = 'Test@1945-';
  const hash = encryptPassword(password);
  expect(comparePassword(password, hash)).toBeTruthy();
});

test(`It should encrypt the password and when compared to a different password, return false.`, () => {
  const password = 'Test@1945-';
  const otherPassword = 'Test';
  const hash = encryptPassword(password);
  expect(comparePassword(otherPassword, hash)).toBeFalsy();
});
