const express = require("express");
const cors = require("cors");
const routes = require("./src/routes");
const app = express();
app.set('trust proxy', true);
app.use(express.json());
const { PORT } = require('./src/constant')
require("./src/db").connectDB();

app.use(cors());

app.use(routes);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    status: false,
    statusCode: err.statusCode || 500,
    message: err.message,
  });
});
app.use("/", (req, res) => {
  res.send("Welcome to DROC");
});

app.listen(PORT, () => {
  console.log("Server listening on PORT:", PORT);
});


