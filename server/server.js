var express = require('express');
var app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(require("./routes/tag"));
app.use(require("./routes/todo"));

const dbo = require("./MongooseConn");
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;
