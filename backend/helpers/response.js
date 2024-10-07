const sendResponse = (res, statusCode, data = {}, message = '', errors = []) => {
    const response = {
      status: statusCode >= 200 && statusCode < 300 ? 'success' : 'error',
      code: statusCode,
      message: message || (statusCode === 200 ? 'Request successful' : 'Request failed'),
      data: data,
      errors: errors,
    };
    
    return res.status(statusCode).json(response);
  };
  
  module.exports = sendResponse;