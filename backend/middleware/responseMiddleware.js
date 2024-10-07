const sendResponse = require('../helpers/response');

const responseMiddleware = (req, res, next) => {
  res.sendResponse = (statusCode, data = {}, message = '', errors = []) => {
    return sendResponse(res, statusCode, data, message, errors);
  };
  next();
};
  
module.exports = responseMiddleware;