module.exports = function () {
  return function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    // res.header(
    //   "Access-Control-Allow-Methods",
    //   "PUT, GET, POST, DELETE, OPTIONS"
    // );
    // res.header(
    //   "Access-Control-Allow-Headers",
    //   "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    // );
    next();
  };
};
