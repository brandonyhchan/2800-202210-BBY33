'use strict';
const express = require("express");
var session = require("express-session");
const mysql = require("mysql2");
const app = express();
const fs = require("fs");
const bcrypt = require("bcrypt");
const multer = require("multer");
const {
    JSDOM
} = require('jsdom');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/userImg/")
    },
    filename: function (req, file, callback) {
        callback(null, "profilePic-" + file.originalname.split('/').pop().trim());
    }
});
const upload = multer({
    storage: storage
});

var isAdmin = false;
var userName;
var userEmail;



//path mapping 
app.use("/js", express.static("./public/js"));
app.use("/css", express.static("./public/css"));
app.use("/img", express.static("./public/img"));
app.use("/userImg", express.static("./public/userImg"));
app.use("/fonts", express.static("./public/fonts"));
app.use("/html", express.static("./app/html"));
app.use("/media", express.static("./public/media"));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(session({
    secret: "eclipse is the worse IDE",
    name: "stanleySessionID",
    resave: false,

    saveUninitialized: true
}));


// redirects user after successful login
app.get("/", function (req, res) {
    if (req.session.loggedIn) {
        if (isAdmin === false) {
            res.redirect("/landing");
        } else {
            res.redirect("/admin");
        }

    } else {
        let doc = fs.readFileSync("./app/html/login.html", "utf8");
        res.send(doc);
    }
});

app.get("/admin", async (req, res) => {
    if (req.session.loggedIn && isAdmin === true) {
        let profile = fs.readFileSync("./app/html/admin.html", "utf-8");
        let profileDOM = new JSDOM(profile);

        res.send(profileDOM.serialize());
    } else {
        res.redirect("/");
    }
});

app.get("/landing", async (req, res) => {
    if (req.session.loggedIn && isAdmin === false) {
        let profile = fs.readFileSync("./app/html/landing.html", "utf-8");
        let profileDOM = new JSDOM(profile);

        res.send(profileDOM.serialize());
    } else {
        res.redirect("/");
    }
});


app.get("/nav", (req, res) => {
    if (req.session.loggedIn) {
        let profile = fs.readFileSync("./app/html/nav.html", "utf-8");
        let profileDOM = new JSDOM(profile);

        res.send(profileDOM.serialize());
    } else {
        res.redirect("/");
    }
})

app.get("/footer", (req, res) => {
    if (req.session.loggedIn) {
        let profile = fs.readFileSync("./app/html/footer.html", "utf-8");
        let profileDOM = new JSDOM(profile);

        res.send(profileDOM.serialize());
    } else {
        res.redirect("/");
    }
})


app.post("/login", async function (req, res) {
    if (req.session.loggedIn && isAdmin == true) {
        res.redirect("/admin");
    } else if (req.session.loggedIn && isAdmin == false) {
        res.redirect("/landing");
    } else {
        res.setHeader("Content-Type", "application/json");

        userName = req.body.user_name;
        let pwd = req.body.password;
        const mysql = require("mysql2/promise");
        const connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "COMP2800"
        });

        connection.connect(function (err) {
            if (err) throw err;
        });
        const [rows] = await connection.execute(
            "SELECT * FROM BBY_33_user WHERE BBY_33_user.user_name = ? AND BBY_33_user.user_removed = ?", [userName, 'n'],
        );
        if (rows.length > 0) {
            let hashedPassword = rows[0].password
            let comparison = await bcrypt.compare(req.body.password, hashedPassword);
            if (comparison) {
                if (rows[0].admin_user === 'y') {
                    isAdmin = true;
                }
                req.session.loggedIn = true;
                req.session.user_name = userName;
                req.session.password = pwd;
                req.session.name = rows[0].first_name;
                res.send({
                    status: "success",
                    msg: "Logged in."
                });
            } else {
                res.send({
                    status: "fail",
                    msg: "Invalid Username or Password."
                });
            }
        } else {
            res.send({
                status: "fail",
                msg: "Invalid Username or Password."
            });
        }
    }

});

app.get("/get-users", function (req, res) {
    if (req.session.loggedIn) {
        const connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "COMP2800"
        });
        connection.connect();
        connection.query(
            "SELECT bby_33_user.email_address, bby_33_user.first_name, bby_33_user.last_name, bby_33_user.admin_user  FROM bby_33_user WHERE user_removed = ?", ['n'],
            function (error, results) {
                if (error) {
                    console.log(error);
                }
                res.send({
                    status: "success",
                    rows: results
                });
            }
        );
    } else {
        res.redirect("/");
    }
});

app.get("/logout", function (req, res) {

    if (req.session) {
        req.session.destroy(function (error) {
            if (error) {
                res.status(400).send("Unable to log out")
            } else {
                isAdmin = false;
                let doc = fs.readFileSync("./app/html/login.html", "utf8");
                res.send(doc);
            }
        });
    }
});

app.post("/user-update", function (req, res) {
    if (req.session.loggedIn) {
        let adminUsers = [];
        const connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "COMP2800"
        });

        connection.connect();
        connection.execute(
            "SELECT * FROM bby_33_user WHERE admin_user = ? AND user_removed = ?", ['y', 'n'],
            function (error, results) {
                adminUsers = results;
                let send = {
                    status: "fail",
                    msg: "Record not updated."
                };
                connection.query("UPDATE bby_33_user SET user_removed = ? WHERE email_address = ? AND admin_user = ?", ['y', req.body.email, 'n'], (err) => {
                    send.status = "success";
                    send.msg = "Record updated"
                });
                if (adminUsers.length > 1) {
                    connection.query("UPDATE bby_33_user SET user_removed = ? WHERE email_address = ? AND admin_user = ?", ['y', req.body.email, 'y'], (err) => {
                        send.status = "success";
                        send.msg = "Record updated"
                    });
                } else {
                    send.status = "fail";
                }
                res.send(send);
                connection.end();
            }
        );
    } else {
        res.redirect("/");
    }


});

app.post("/register", function (req, res) {
    res.setHeader("Content-Type", "application/json");

    let usr = req.body.user_name;
    let pwd = req.body.password;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.userEmail;
    let confirmPassword = req.body.passwordConfirm;
    var existingUsers;
    let alreadyExists = false;
    let salt = 5;
    let hashedPassword = "";

    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "COMP2800"
    });

    connection.connect(function (err) {
        if (err) {
            console.log("failed to connect");
        }
    });
    connection.execute(
        "SELECT * FROM BBY_33_user WHERE user_removed = 'n'",
        function (error, results, fields) {
            existingUsers = results;
            let send = {
                status: " ",
                msg: " "
            }
            if (usr == "" || pwd == "" || firstName == "" || lastName == "" || email == "" || confirmPassword == "") {
                send.status = "fail";
                send.msg = "Please fill out all fields";
            } else {
                if (pwd == confirmPassword) {
                    let i = 0;
                    while (!alreadyExists && i < existingUsers.length) {
                        if (existingUsers[i].user_name === usr || existingUsers[i].email_address === email) {
                            alreadyExists = true;
                            send.status = "fail";
                            send.msg = "Username or email already exists";
                        } else {
                            alreadyExists = false;
                        }
                        i++;
                    }
                    if (alreadyExists == false) {
                        bcrypt.hash(pwd, salt, function (err, hash) {
                            hashedPassword = hash;
                            connection.execute(
                                "INSERT INTO BBY_33_user(user_name, first_name, last_name, email_address, admin_user, user_removed, password, user_image) VALUES(?, ?, ?, ?, 'n', 'n', ?, 'stock-profile.png')", [usr, firstName, lastName, email, hashedPassword]
                            );
                        });
                        send.status = "success";
                        send.msg = "Registered Successfully";
                    }
                } else {
                    send.status = "fail";
                    send.msg = "Passwords do not match";
                }
            }
            res.send(send);

        }
    )
});

app.get("/createAccount", function (req, res) {
    let profile = fs.readFileSync("./app/html/createAccount.html", "utf8");
    let profileDOM = new JSDOM(profile);


    res.send(profileDOM.serialize());
});
app.get("/profile", function (req, res) {

    if (req.session.loggedIn) {
        let profile = fs.readFileSync("./app/html/profile.html", "utf8");
        let profileDOM = new JSDOM(profile);

        res.send(profileDOM.serialize());
    } else {
        res.redirect("/");
    }
});

app.get("/user-name", (req, res) => {
    if (req.session.loggedIn) {
        res.send({
            status: "success",
            name: userName
        });
    } else {
        res.redirect("/");
    }
})

app.get("/email", (req, res) => {
    if (req.session.loggedIn) {
        const connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "COMP2800"
        });
        let stat;
        connection.connect();
        connection.query(
            `SELECT email_address FROM bby_33_user WHERE user_name = ?`, [userName], (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    stat = "success";
                    res.send({
                        status: stat,
                        rows: result
                    });
                }
            }

        )
    } else {
        res.redirect("/");
    }
})

app.get("/first-name", (req, res) => {
    if (req.session.loggedIn) {
        const connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "COMP2800"
        });
        let stat;
        connection.connect();
        connection.query(
            `SELECT first_name FROM bby_33_user WHERE user_name = ?`, [userName], (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    stat = "success";
                    res.send({
                        status: stat,
                        rows: result
                    });
                }
            }

        )
    } else {
        res.redirect("/");
    }
})

app.get("/last-name", (req, res) => {
    if (req.session.loggedIn) {
        const connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "COMP2800"
        });
        let stat;
        connection.connect();
        connection.query(
            `SELECT last_name FROM bby_33_user WHERE user_name = ?`, [userName], (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    stat = "success";
                    res.send({
                        status: stat,
                        rows: result
                    });
                }
            }

        )
    } else {
        res.redirect("/");
    }
})

app.post("/update-user-name", (req, res) => {
    if (req.session.loggedIn) {
        const connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "COMP2800"
        });
        let send = {
            status: "fail",
            msg: "Record not updated."
        };
        connection.connect();
        connection.execute(
            `UPDATE bby_33_user SET user_name = ? WHERE user_name = ?`, [req.body.name, userName], (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    send.status = "success";
                    send.msg = "Record Updated";
                }
            }
        );
        userName = req.body.name;
        res.send(send);

    } else {
        res.redirect("/");
    }
})

app.post("/update-email", (req, res) => {
    if (req.session.loggedIn) {
        const connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "COMP2800"
        });
        let send = {
            status: "fail",
            msg: "Record not updated."
        };
        connection.connect();
        connection.execute(
            `UPDATE bby_33_user SET email_address = ? WHERE user_name = ?`, [req.body.email, userName], (err) => {
                if (err) {
                    console.log(err);
                } else {
                    send.status = "success";
                    send.msg = "Record Updated";
                }
            }
        );
        res.send(send);

    } else {
        res.redirect("/");
    }
})

app.post("/update-password", async (req, res) => {
    if (req.session.loggedIn) {
        const mysql = require("mysql2/promise");
        let existingPassword;
        let salt = 5;
        let hashedPassword = "";
        const connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "COMP2800"
        });
        let send = {
            status: "",
            msg: ""
        };
        connection.connect();
        const [rows] = await connection.execute(
            "SELECT * FROM BBY_33_user WHERE BBY_33_user.user_name = ?", [userName],
        );
        existingPassword = rows[0].password
        let comparison = await bcrypt.compare(req.body.currentPass, existingPassword);
        if (comparison) {
            existingPassword = req.body.newPass;
            bcrypt.hash(existingPassword, salt, function (err, hash) {
                hashedPassword = hash;
                connection.execute(
                    "UPDATE bby_33_user SET password = ? WHERE user_name = ?", [hashedPassword, userName]
                );
            });
            send.status = "success";
            send.msg = "Password Updated";
        } else {
            send.status = "fail";
            send.msg = "Current Password is Incorrect";
        }
        res.send(send);
    } else {
        res.redirect("/");
    }
})

app.post('/upload-user-images', upload.array("files", 1), function (req, res) {
    if (req.session.loggedIn) {
        const connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "COMP2800"
        });
        let send = {
            status: "fail",
            msg: "Record not updated."
        };
        connection.connect();
        connection.execute(
            `UPDATE bby_33_user SET user_image = ? WHERE user_name = ?`, [req.files[0].filename, userName], (err) => {
                if (err) {
                    console.log(err);
                } else {
                    send.status = "success";
                    send.msg = "Record Updated";
                }
            }
        );

    } else {
        res.redirect("/");
    }

});

app.get('/get-user-images', upload.array("files", 1), function (req, res) {
    if (req.session.loggedIn) {
        const connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "COMP2800"
        });
        connection.connect();
        let send = {
            status: "fail",
            path: " "
        };
        connection.query(
            `SELECT user_image FROM bby_33_user WHERE user_name = ?`, [userName], (err, result) => {
                if (err) {
                    res.send({
                        status: "fail"
                    });
                } else {
                    res.send({
                        status: "success",
                        path: "/userImg/" + result[0].user_image
                    });
                }
            }

        )
    } else {
        res.redirect("/");
    }

});

//starts the server
let port = 8000;
app.listen(port, function () {
    console.log("Server started on " + port + "!");
});