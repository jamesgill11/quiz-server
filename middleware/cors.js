module.exports = function () {
  return function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");

    // res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    // res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  };
};
