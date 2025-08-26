// src/utils/response.js
export function sendSuccess(res, message, result, code = 200) {
  return res.status(code).json({
    code,
    isSuccessful: true,
    message: message,
    result,
    error: null,
  });
}

export function sendError(res, message, errorObject = null, code = 500) {
  return res.status(code).json({
    code,
    isSuccessful: false,
    message,
    result: null,
    error: errorObject,
  });
}