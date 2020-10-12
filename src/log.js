// Logger mapping pino to stack driver format.
// See https://cloud.google.com/run/docs/logging.


// Map pino levels to GCP, https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#LogSeverity
function severity(label) {
  switch (label) {
    case 'trace': return 'DEBUG';
    case 'debug': return 'DEBUG';
    case 'info': return 'INFO';
    case 'warn': return 'WARNING';
    case 'error': return 'ERROR';
    case 'fatal': return 'CRITICAL';
    default: return 'DEFAULT';
  }
}

function level(label, number) {
  return { severity: severity(label)}
}

const logger = require('pino')(
  {
    formatters: {
      level
    },
    base: null,
    messageKey: 'message',
    timestamp: false,
    level: process.env.LOG_LEVEL ? process.env.LOG_LEVEL.toLowerCase() : 'info'
  }
)

const _getCallerFile = () => {
  const originalFunc = Error.prepareStackTrace;

  let callerfile;
  try {
    const err = new Error();
    let currentfile;

    Error.prepareStackTrace = (err, stack) => stack;

    currentfile = err.stack.shift().getFileName();

    while (err.stack.length) {
      callerfile = err.stack.shift().getFileName();
      if (currentfile !== callerfile) {
        break;
      }
    }
  } catch (e) { }

  Error.prepareStackTrace = originalFunc;
  return callerfile.replace(/^.*[\\\/]/, '').replace(/\.js/, '');
}


module.exports = {
  logger,
  createChildLogger: () => {
    const childLogger = logger.child({ file: _getCallerFile() });
    return childLogger;
  }
}
