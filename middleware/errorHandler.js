const errorHandler = (err, req, res, next) =>{
  const statusCode = err.statusCode || 500;

  console.error(err.stack);

  res.status(statusCode).json({
    success:false,
    error:{
      message: err.message || "Internal Server Error",
      status: statusCode
    }
  });
};

module.exports = errorHandler;