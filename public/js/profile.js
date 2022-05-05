'use strict';
async function getName() {
    try {
        let resOBJ = await fetch("/user-name", {
            method: 'GET',
        });
        if (resOBJ.status === 200) {
            let data = await resOBJ.json();
            document.querySelector("#user-name").innerHTML = data.name;
        } else {
            console.log(resOBJ.status);
            console.log(resOBJ.statusText);
        }
    } catch (error) {
        console.log(error);
    }
}
getName();
document.querySelector("#user-name").addEventListener("click", editName);

async function getEmail() {
    try {
        let resOBJ = await fetch("/email", {
            method: 'GET',
        });
        if (resOBJ.status === 200) {
            let data = await resOBJ.json();
            document.querySelector("#email").innerHTML = data.rows[0].email_address;
        } else {
            console.log(resOBJ.status);
            console.log(resOBJ.statusText);
        }
    } catch (error) {
        console.log(error);
    }
}
document.querySelector("#email").addEventListener("click", editEmail);
getEmail();

function editName(e) {
    let currentName = e.target.innerHTML;
    let parent = e.target.parentNode;
    let input = document.createElement("input");
    let statusDiv = document.querySelector("#status");
    input.setAttribute("id", "new-name");
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
            let dataToSend = {
                name: newName.innerHTML
            };
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.readyState == XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        statusDiv.innerHTML = "Username updated.";
                        getName();
                        getEmail();
                    } else {
                        console.log(this.status);
                    }
                } else {
                    console.log("ERROR", this.status);
                }
            }
            xhr.open("POST", "/update-user-name");
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send("name=" + dataToSend.name);
        }
    });
    parent.innerHTML = "";
    parent.appendChild(input);
}

function editEmail(e) {
    let currentEmail = e.target.innerHTML;
    let parent = e.target.parentNode;
    let input = document.createElement("input");
    let statusDiv = document.querySelector("#status");
    input.setAttribute("id", "new-email");
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
            let dataToSend = {
                email: newEmail.innerHTML
            };
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.readyState == XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        statusDiv.innerHTML = "Email updated.";
                        getName();
                        getEmail();
                    } else {
                        console.log(this.status);
                    }
                } else {
                    console.log("ERROR");
                }
            }
            xhr.open("POST", "/update-email");
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send("email=" + dataToSend.email);
        }
    });
    parent.innerHTML = "";
    parent.appendChild(input);
}

function ajaxPOST(url, callback, data) {
    let params = typeof data == 'string' ? data : Object.keys(data).map(
        function (k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
        }
    ).join('&');

    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            callback(this.responseText);

        } else {
            console.log(this.status);
        }
    }
    xhr.open("POST", url);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
}


document.querySelector("#submit").addEventListener("click", function (e) {
    e.preventDefault();
    let currentPassword = document.getElementById("currentPass");
    let newPassword = document.getElementById("newPass");
    let queryString = "currentPass=" + currentPassword.value + "&newPass=" + newPassword.value;
    ajaxPOST("/update-password", function (data) {

        if (data) {
            let dataParsed = JSON.parse(data);
            document.getElementById("errorMsg").innerHTML = dataParsed.msg;
        }
    }, queryString);
});

const uploadImage = document.getElementById("upload-image");
uploadImage.addEventListener("submit", uploadImages);

function uploadImages(e) {
    e.preventDefault();

    const profileLoad = document.querySelector('#upload');
    const imageData = new FormData();

    for (let i = 0; i < profileLoad.files.length; i++) {
        imageData.append("files", profileLoad.files[i]);
    }

    const options = {
        method: 'POST',
        body: imageData,
    };

    fetch("/upload-user-images", options).then(function (res) {
        console.log(res);
    }).catch(function (err) {
        ("Error:", err)
    });
    getImage();
    getImage();
    getImage();
}



async function getImage() {
    try {
        let responseObj = await fetch("/get-user-images", {
            method: 'GET',
        });
        if (responseObj.status === 200) {
            let data = await responseObj.json();
            document.querySelector("#profileImage").setAttribute("src", data.path);
        } else {
            console.log(responseObj.status);
            console.log(responseObj.statusText);
        }
    } catch (error) {
        console.log(error);
    }
}

getImage();