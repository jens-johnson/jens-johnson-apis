import { ApiError } from '@/common/error';

function parseRequest(event) {
  return event.body
    ? Promise.resolve(JSON.parse(event.body))
    : Promise.reject(new ApiError('Unable to parse request body', 400));
}

function onResponse(body) {
  return Promise.resolve({
    statusCode: 200,
    body: JSON.stringify({
      requestBody: body,
      message: 'Successfully parsed request',
      timestamp: new Date().toISOString()
    })
  });
}

function onError(error, callback) {
  return error instanceof ApiError
    ? callback(null, {
      statusCode: error.statusCode,
      message: error.message,
      timestamp: new Date().toISOString()
    })
    : callback(Error(error));
}

module.exports.handler = (event, context, callback) => {
  return Promise.resolve(event)
    .then(parseRequest)
    .then(onResponse)
    .then(response => callback(null, response))
    .catch(error => onError(error, callback));
};
