
const sendTo = (emails) => {
  let to = '';
  emails.forEach(email => {
    to += `${ email }, `;
  });
  return to.substring(0, to.length - 1);
}

module.exports = {
  sendTo
}
