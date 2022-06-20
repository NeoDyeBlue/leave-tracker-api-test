/**
 * Sends an error response in json format
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {string} errorMessage
 * @param {number} code - HTTP response status code
 * @param {Object} error - error object
 */

function errorResponse(
  req,
  res,
  errorMessage = "Something went wrong",
  code = 500,
  error = {}
) {
  res.status(code).json({
    code,
    errorMessage,
    error,
    data: null,
    success: false,
  });
}

/**
 * Sends a success response in json format
 * @param {Object} req
 * @param {Object} res
 * @param {Object} data
 * @param {number} code
 */

function successResponse(req, res, data, code = 200) {
  res.send({
    code,
    data,
    success: true,
  });
}

module.exports = { errorResponse, successResponse };
