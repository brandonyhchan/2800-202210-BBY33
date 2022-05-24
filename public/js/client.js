"use strict";

/*
This function makes a post request to the server and takes 3 input.
@param {string} url - the path on the server side that is requested.
@param {callback} callback - some function that is executed after posting.
@param {string} data - data sent to the server side.
*/
function ajaxPOST(url, callback, data) {
    let params = typeof data == "string" ? data : Object.keys(data).map(
        function (k) { return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]) }
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

/*
Anonymous function added to html element for logging in as a registered user.
Uses a post request to update the database and redirect to landing page.
*/
document.querySelector("#submit").addEventListener("click", function (e) {
    e.preventDefault();
    let user_name = document.getElementById("user_name");
    let password = document.getElementById("password");
    let queryString = "user_name=" + user_name.value +
        "&password=" + password.value;
    ajaxPOST("/login", function (data) {

        if (data) {
            let dataParsed = JSON.parse(data);
            if (dataParsed.status == "fail") {
                document.getElementById("errorMsg").innerHTML = dataParsed.msg;
            } else {
                window.location.replace("/landing");
            }
        }
    }, queryString);
});

/*
Async function that redirects to our register user page using fetch get request.
*/
async function getCreateAccount() {
    try {
        let response = await fetch("/createAccount", {
            method: "GET"
        })
        if (response.status === 200) {
            window.location.replace("/createAccount");
        }
    } catch (err) {

    }
}

// Adds the redirect to html buttton with id="create" on our login page.
document.getElementById("create").addEventListener("click", getCreateAccount);


