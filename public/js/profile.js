'use strict';
async function getName() {
    try {
        let responseObj = await fetch("/user-name", {
            method: 'GET',
        });
        if (responseObj.status === 200) {
            let data = await responseObj.json();
            document.querySelector("#user-name").innerHTML = data.name;
        } else {
            console.log(responseObj.status);
            console.log(responseObj.statusText);
        }
    } catch (error) {
        console.log(error);
    }
}
getName();
document.querySelector("#user-name").addEventListener("click", editName);

async function getEmail() {
    try {
        let responseObj = await fetch("/email", {
            method: 'GET',
        });
        if (responseObj.status === 200) {
            let data = await responseObj.json();
            console.log("rows " + data.rows[0]);
            document.querySelector("#email").innerHTML = data.rows[0].email_address;
        } else {
            console.log(responseObj.status);
            console.log(responseObj.statusText);
        }
    } catch (error) {
        console.log(error);
    }
}
document.querySelector("#email").addEventListener("click", editEmail);
getEmail();

function editName(e) {

    let spanText = e.target.innerHTML;
    let parent = e.target.parentNode;
    let input = document.createElement("input");
    input.value = spanText;
    input.addEventListener("keyup", function (e) {
        let v = null;
        if (e.which == 13) {
            v = input.value;
            let newSpan = document.createElement("span");
            newSpan.setAttribute('id', 'user-name');
            newSpan.addEventListener("click", editName);
            newSpan.innerHTML = v;
            parent.innerHTML = "";
            parent.appendChild(newSpan);
            let dataToSend = {
                name: newSpan.innerHTML
            };
            console.log(dataToSend.name);

            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.readyState == XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        document.querySelector("#nameMsg").innerHTML = "Record updated.";
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

    let spanText = e.target.innerHTML;
    let parent = e.target.parentNode;
    let input = document.createElement("input");
    input.value = spanText;
    input.addEventListener("keyup", function (e) {
        let v = null;
        if (e.which == 13) {
            v = input.value;
            let newSpan = document.createElement("span");
            newSpan.setAttribute('id', 'email');
            newSpan.addEventListener("click", editEmail);
            newSpan.innerHTML = v;
            parent.innerHTML = "";
            parent.appendChild(newSpan);
            let dataToSend = {
                email: newSpan.innerHTML
            };
            console.log("email send " + dataToSend.email);

            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.readyState == XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        document.querySelector("#emailMsg").innerHTML = "Record updated.";
                        getName();
                        getEmail();
                    } else {
                        console.log(this.status);
                    }
                } else {
                    console.log("ERROR", this.status);
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
        function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
    ).join('&');
    console.log("params in ajaxPOST", params);

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
            console.log(dataParsed);
            if (dataParsed.status == "fail") {
                document.getElementById("errorMsg").innerHTML = dataParsed.msg;
            } else {
                document.getElementById("errorMsg").innerHTML = dataParsed.msg;
            }
        }
    }, queryString);
});
