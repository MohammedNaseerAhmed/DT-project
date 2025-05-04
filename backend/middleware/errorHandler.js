const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  const status = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(status).json({ msg: err.message });
};

module.exports = errorHandler; 