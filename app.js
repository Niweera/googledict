const express = require("express");
const path = require("path");
var favicon = require("serve-favicon");

const v1Main = require("./routes/v1/main");
const v2Main = require("./routes/v2/main");
const wh = require("./routes/wh/main");

const app = express();
app.use(favicon(path.join(__dirname, "./favicon.png")));

// Use Routes
app.use("/wh", wh);
app.use("/v2", v2Main);
app.use("/", v1Main); //this route must be at the end

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});
