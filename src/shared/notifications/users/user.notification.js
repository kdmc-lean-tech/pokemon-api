const { BehaviorSubject } = require('rxjs');

const updateProfileNotification = new BehaviorSubject(null);

module.exports = {
  updateProfileNotification
}
