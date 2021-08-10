const success = (res, status, result, info) => {
  const objectResponse = {
    errorMsg: null,
    result,
    info,
  };
  res.status(status).json(objectResponse);
};

const error = (res, status, errorMsg) => {
  let objectResponse = {
    errorMsg,
    data: null,
  };
  if (errorMsg === 404 || status === 404) {
    objectResponse = {
      errorMsg,
      HTTPResponse: "Error 404 Not Found",
    };
    status = 404;
  }
  if (status === 400) {
    objectResponse = {
      errorMsg,
      HTTPResponse: "400 Bad Request",
    };
  }
  res.status(status).json(objectResponse);
};
module.exports = {
  success,
  error,
};
