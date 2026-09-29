const serverless = require('serverless-http');
const app = require('../../api');

const wrapped = serverless(app);

exports.handler = async (event, context) => {
  const prefix = '/.netlify/functions/api';
  const originalPath = event.path || '/';
  const normalizedPath = originalPath.startsWith(prefix)
    ? originalPath.slice(prefix.length) || '/'
    : originalPath;

  const nextEvent = {
    ...event,
    path: normalizedPath.startsWith('/api/') || normalizedPath === '/api'
      ? normalizedPath
      : `/api${normalizedPath === '/' ? '' : normalizedPath}`,
  };

  return wrapped(nextEvent, context);
};
