const express = require("express");
const mongoose = require("mongoose");
const { mongoURI } = require("./key");
const app = express();
app.get("/", (req, res) => {
  res.send("hello world");
})
mongoose.connect(mongoURI);

mongoose.connection.on("connected", () => {
  console.log("connection is on...all good");
});
mongoose.connection.on("error", (err) => {
  console.log("error is occured in mongodb",err);
});
require("./modals/users");
require("./modals/task");

app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/task"));



app.listen(5000, () => {
  console.log("server is running  on 5000",);
});
