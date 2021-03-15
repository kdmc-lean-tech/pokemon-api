
const validateImageExtension = (mimetype) => {
  return /.*(jpeg|png|jpg).*$/i.test(mimetype);
};

module.exports = {
  validateImageExtension
}
