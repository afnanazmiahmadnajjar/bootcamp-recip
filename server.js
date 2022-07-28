const express = require("express");
const path = require("path");
const api = require("./server/routes/Externalapi.js");

const app = express();
//middleware
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "node_modules")));
app.use("/", api);

const port = 3000;
app.listen(port, () => console.log("Listening on port:", port));
