const { validateImageExtension } = require('./upload-images-validators');

test('It should return false if the extension is invalid.', () => {
  const extension = 'gif';
  expect(validateImageExtension(extension)).toBe(false);
});

test('It should return true if the extension is .png.', () => {
  const extension = 'png';
  expect(validateImageExtension(extension)).toBe(true);
});

test('It should return true if the extension is .jpeg.', () => {
  const extension = 'jpeg';
  expect(validateImageExtension(extension)).toBe(true);
});

test('It should return true if the extension is .jpg.', () => {
  const extension = 'jpg';
  expect(validateImageExtension(extension)).toBe(true);
});
