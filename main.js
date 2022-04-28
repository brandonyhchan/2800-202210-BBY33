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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    let doc = fs.readFileSync("./app/html/login.html", "utf-8");
    res.send(doc);
});


app.get("/users", (req, res) => {
    let doc = fs.readFileSync("./app/html/users.html", "utf-8");
    res.send(doc);
});


app.use(session({
    secret: "eclipse is the worse IDE",
    name: "stanleySessionID",
    resave: false,

    saveUninitialized: true
}));


// redirects user after successful login
app.get("/", function(req, res) {

    if (req.session.loggedIn) {
        res.redirect("/users");
    } else {

        let doc = fs.readFileSync("./app/html/login.html", "utf8");


        res.send(doc);
    }
});




app.post("/login", function(req, res) {
    res.setHeader("Content-Type", "application/json");

    let usr = req.body.user_name;
    let pwd = req.body.password;
    let myResults = [];



    const mysql = require("mysql2");
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "assignment6"
    });

    connection.connect(function(err) {
        if (err) throw err;
        console.log('Database is connected successfully !');
    });

    connection.execute(
        "SELECT * FROM a01266659_user WHERE a01266659_user.user_name = ? AND a01266659_user.password = ?", [usr, pwd],
        function(error, results, fields) {
            myResults = results;
            console.log("results:", myResults);



            if (req.body.user_name == myResults[0].user_name && req.body.password == myResults[0].password) {

                req.session.loggedIn = true;
                req.session.user_name = myResults[0].user_name;
                req.session.password = myResults[0].password;
                req.session.name = myResults[0].first_name;
                req.session.save(function(err) {

                });

                res.send({ status: "success", msg: "Logged in." });
            } else {

                res.send({ status: "fail", msg: "User account not found." });

            }


            if (error) {
                console.log(error);
            }


            connection.end();
        }
    )




    console.log("What was sent", req.body.user_name, req.body.password);






});


//starts the server
let port = 8000;
app.listen(port, function() {
    console.log("Server started on " + port + "!");
});