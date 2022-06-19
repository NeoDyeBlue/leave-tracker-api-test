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

function successResponse(req, res, data, code = 200) {
  res.send({
    code,
    data,
    success: true,
  });
}

module.exports = { errorResponse, successResponse };
