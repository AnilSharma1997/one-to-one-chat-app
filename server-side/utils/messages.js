const moment = require('moment');

function formatMessage(username, targetname, text) {
  return {
    username,
    targetname,
    text,
    time: moment().format('h:mm a')
  };
}

module.exports = formatMessage;