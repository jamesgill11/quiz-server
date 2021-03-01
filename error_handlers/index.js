exports.customErrorHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

// exports.PSQLErrorHandler = (err, req, res, next) => {
//   if (err.code) {
//     const psqlErrors = {
//       23503: { status: 404, msg: "404 Error: question not found" },
//       "22P02": { status: 400, msg: "400 - Bad Request" },
//       "42P01": { status: 404, msg: "Relation does not exist" },
//       42702: { status: 404, msg: "Answer Is Ambiguous" },
//       42703: { status: 400, msg: "Does Not Exist" },
//       23502: { status: 404, msg: "404 Error: Not Found" },
//     };

//     res.status(psqlErrors[err.code]).send({ msg: psqlErrors[err.code] });
//   } else next(err);

exports.handlePSQLErrors = (err, req, res, next) => {
  const psqlCodes = ["22P02", "42703"];
  if (psqlCodes.includes(err.code))
    res.status(400).send({ msg: "Bad Request!" } || { msg: err.msg });
  else if (err.code === "23503") {
    res.status(404).send({ msg: "invalid response" });
  } else if (err.code === "42703") {
    res.status(400).send({ msg: "invalid input" });
  } else next(err);
};

exports.handle405Errors = (req, res, next) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};

exports.handleServerErrors = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
};
