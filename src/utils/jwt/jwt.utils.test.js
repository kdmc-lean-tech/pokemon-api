const { generateToken, verifyToken } = require('./jwt.utils');

test(`It should generate an token string`, () => {
  const payload = {
    _id: '606681dc0f0e1730b0fbb010',
    name: 'kevin',
    age: 26
  }
  const token = generateToken(payload);
  expect(typeof token).toBe('string');
});

test(`You should decode the token and get the payload.`, async () => {
  const payload = {
    _id: '606681dc0f0e1730b0fbb010',
    name: 'kevin',
    age: 26
  }
  const token = generateToken(payload);
  const result = await verifyToken(token);
  expect(result.payload).toEqual({
    _id: '606681dc0f0e1730b0fbb010',
    name: 'kevin',
    age: 26
  });
});
