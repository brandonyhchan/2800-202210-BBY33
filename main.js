const express = require("express");
var session = require("express-session");
const mysql = require("mysql2");
const app = express();
const fs = require("fs");
const {
    JSDOM
} = require('jsdom');

//path mapping 
app.use("/js", express.static("./public/js"));
app.use("/css", express.static("./public/css"));
app.use("/img", express.static("./public/imgs"));
app.use("/fonts", express.static("./public/fonts"));
app.use("/html", express.static("./app/html"));
app.use("/media", express.static("./public/media"));

app.get("/", (req, res) => {
    let doc = fs.readFileSync("./app/html/users.html", "utf-8");
    res.send(doc);
});

//starts the server
let port = 8000;
app.listen(port, function () {
    console.log("Server started on " + port + "!");
});