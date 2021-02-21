const { PORT = 9090 } = process.env;
const app = require("./index");
app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
