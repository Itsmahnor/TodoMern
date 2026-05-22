const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");
const express = require('express');
const app = express();
const cors = require("cors");
require('./Conn/conn');
const path = require("path");
const auth = require('./Router/auth');
const List = require('./Router/list');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// API routes
app.use("/api/viv", auth);
app.use("/api/list", List);

// Serve static files from the dist folder
app.use(express.static(path.resolve(__dirname, "Frontend", "dist")));

// Catch-all handler for client-side routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
});


app.listen(8001, () => {
  console.log('Server is running on port 8001');
});
