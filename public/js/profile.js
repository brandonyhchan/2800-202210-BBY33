"use strict";

/**
Async function that uses fetch get request to redirect to "first name" of the user. 
*/
async function getFirstName() {
    try {
        let resOBJ = await fetch("/first-name", {
            method: "GET",
        });
        if (resOBJ.status === 200) {
            let data = await resOBJ.json();
            document.querySelector("#first-name").innerHTML = data.rows[0].first_name;
        }
    } catch (error) {
    }
}
getFirstName();

/**
Async function that uses fetch get request to redirect to "last name" of the user. 
*/
async function getLastName() {
    try {
        let resOBJ = await fetch("/last-name", {
            method: "GET",
        });
        if (resOBJ.status === 200) {
            let data = await resOBJ.json();
            document.querySelector("#last-name").innerHTML = data.rows[0].last_name;
        }
    } catch (error) {
    }
}
getLastName();

/**
Async function that uses fetch get request to redirect to "user name" of the user. 
*/
async function getName() {
    try {
        let resOBJ = await fetch("/user-name", {
            method: "GET",
        });
        if (resOBJ.status === 200) {
            let data = await resOBJ.json();
            document.querySelector("#user-name").innerHTML = data.name;
        }
    } catch (error) {
    }
}
getName();
document.querySelector("#user-name").addEventListener("click", editName);

/**
Async function that uses fetch get request to redirect to "email" of the user. 
*/
async function getEmail() {
    try {
        let resOBJ = await fetch("/email", {
            method: "GET",
        });
        if (resOBJ.status === 200) {
            let data = await resOBJ.json();
            document.querySelector("#email").innerHTML = data.rows[0].email_address;
        }
    } catch (error) {
    }
}
document.querySelector("#email").addEventListener("click", editEmail);
getEmail();

// Jquery snippet from https://jqueryui.com/dialog/#modal-confirmation for the Jquery UI
/**
 * Function to edit the username of the logged in user.
 * @param {element} e - current element
 */
function editName(e) {
    let currentName = e.target.innerHTML;
    let parent = e.target.parentNode;
    let input = document.createElement("input");
    let statusDiv = document.querySelector("#status");
    input.setAttribute("id", "changeFname");
    input.value = currentName;
    input.addEventListener("keyup", function (e) {
        let newInput = null;
        if (e.which == 13) {
            newInput = input.value;
            let newName = document.createElement("span");
            newName.setAttribute('id', 'user-name');
            newName.addEventListener("click", editName);
            newName.innerHTML = newInput;
            parent.innerHTML = "";
            parent.appendChild(newName);
            let sentName = {
                name: newName.innerHTML
            };
            $(function () {
                $("#dialog-confirm").dialog({
                    resizable: false,
                    height: "auto",
                    width: 300,
                    modal: true,
                    buttons: {
                        "Update account": function () {
                            const xhr = new XMLHttpRequest();
                            xhr.onload = function () {
                                if (this.readyState == XMLHttpRequest.DONE) {
                                    if (xhr.status === 200) {
                                        statusDiv.innerHTML = "Username updated.";
                                        getName();
                                        getEmail();
                                    }
                                }
                            }
                            xhr.open("POST", "/update-user-name");
                            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                            xhr.send("name=" + sentName.name);
                            $(this).dialog("close");
                        },
                        Cancel: function () {
                            $(this).dialog("close");
                        }
                    }
                });
            });
        }
    });
    parent.innerHTML = "";
    parent.appendChild(input);
}

// Jquery snippet from https://jqueryui.com/dialog/#modal-confirmation for the Jquery UI
/**
 * Function to edit the email of the logged in user.
 * @param {element} e - current element
 */
function editEmail(e) {
    let currentEmail = e.target.innerHTML;
    let parent = e.target.parentNode;
    let input = document.createElement("input");
    let statusDiv = document.querySelector("#status");
    input.setAttribute("id", "changeEmail");
    input.value = currentEmail;
    input.addEventListener("keyup", function (e) {
        let newInput = null;
        if (e.which == 13) {
            newInput = input.value;
            let newEmail = document.createElement("span");
            newEmail.setAttribute('id', 'email');
            newEmail.addEventListener("click", editEmail);
            newEmail.innerHTML = newInput;
            parent.innerHTML = "";
            parent.appendChild(newEmail);
            var sentEmail = {
                email: newEmail.innerHTML
            };

            $(function () {
                $("#dialog-confirm").dialog({
                    resizable: false,
                    height: "auto",
                    width: 300,
                    modal: true,
                    buttons: {
                        "Update account": function () {
                            const xhr = new XMLHttpRequest();
                            xhr.onload = function () {
                                if (this.readyState == XMLHttpRequest.DONE) {
                                    if (xhr.status === 200) {
                                        statusDiv.innerHTML = "Email updated.";
                                        getName();
                                        getEmail();
                                    }
                                }
                            }
                            xhr.open("POST", "/update-email");
                            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                            xhr.send("email=" + sentEmail.email);
                            $(this).dialog("close");
                        },
                        Cancel: function () {
                            $(this).dialog("close");
                        }
                    }
                });
            });
        }
    });
    parent.innerHTML = "";
    parent.appendChild(input);
}

/**
This function makes a post request to the server and takes 3 input.
@param {string} url - the path on the server side that is requested.
@param {callback} callback - some function that is executed after posting.
@param {string} data - data sent to the server side.
*/
function ajaxPOST(url, callback, data) {
    let params = typeof data == "string" ? data : Object.keys(data).map(
        function (k) {
            return encodeURIComponent(k) + "=" + encodeURIComponent(data[k])
        }
    ).join("&");

    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            callback(this.responseText);

        } else {
            console.log(this.status);
        }
    }
    xhr.open("POST", url);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(params);
}

/**
    This function makes a get request to the server and takes 2 inputs.
    @param {string} url - the path on the server side that is requested.
    @param {callback} callback - some function that is executed after posting.
*/
function ajaxGET(url, callback) {

    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            callback(this.responseText);
        } else {
            console.log(this.status);
        }
    }
    xhr.open("GET", url);
    xhr.send();
}

/**
 * Adds event Listener anonymous function for changing the password of the current user.
 */
document.querySelector("#submit").addEventListener("click", function (e) {
    e.preventDefault();
    let currentPassword = document.getElementById("currentPass");
    let newPassword = document.getElementById("newPass");
    let queryString = "currentPass=" + currentPassword.value + "&newPass=" + newPassword.value;
    $(function () {
        $("#dialog-confirm").dialog({
            resizable: false,
            height: "auto",
            width: 300,
            modal: true,
            buttons: {
                "Update account": function () {
                    ajaxPOST("/update-password", function (data) {
                        if (data) {
                            let dataParsed = JSON.parse(data);
                            document.getElementById("status").innerHTML = dataParsed.msg;
                        }
                    }, queryString);
                    $(this).dialog("close");
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            }
        });
    });
});

const uploadImage = document.getElementById("upload-image");
uploadImage.addEventListener("submit", uploadImages);

/**
Function used to upload profile picture.
Uses fetch post request to update database.
*/
function uploadImages(e) {
    e.preventDefault();

    const profileLoad = document.querySelector('#upload');
    const imageData = new FormData();

    for (let i = 0; i < profileLoad.files.length; i++) {
        imageData.append("files", profileLoad.files[i]);
    }

    const options = {
        method: "POST",
        body: imageData,
    };

    fetch("/upload-user-images", options).then(function (res) {
        console.log(res);
    }).catch(function (err) {
        ("Error:", err)
    });
}

/**
Async function that uses fetch get request to display profile picture. 
*/
async function displayImage() {
    try {
        let responseObj = await fetch("/get-user-images", {
            method: "GET",
        });
        if (responseObj.status === 200) {
            let data = await responseObj.json();
            document.querySelector("#profileImage").setAttribute("src", data.path);
        }
    } catch (error) {
    }
}

document.querySelector(".showImage").addEventListener("click", getImage);
function getImage() {
    var dataParsed = "";
    () => {
        ajaxGET("/get-user-images", function (data) {

            if (data) {
                dataParsed = JSON.parse(data);
                if (dataParsed.status == "fail") {
                    console.log("fail");
                } else {
                    document.querySelector("#profileImage").setAttribute("src", dataParsed.path);
                }
            }
        });
    };
    displayImage();
    displayImage();
    displayImage();
};

getImage();

displayImage();

document.querySelector("#getOrders").addEventListener("click", () => {
    getOrders();
})

/**
Async function that uses fetch get request to redirect to "Orders" page. 
*/
async function getOrders() {
    try {
        let response = await fetch("/getOrders", {
            method: "GET"
        })
        if (response.status === 200) {
            window.location.replace("/getOrders");
        }
    } catch (err) {

    }
}