const ErrorHandler = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  Error.captureStackTrace(error, ErrorHandler);
  return error;
};

module.exports = ErrorHandler;

/* 
we cant use this directly for this we 
make a file error.js in middleware folder
*/
