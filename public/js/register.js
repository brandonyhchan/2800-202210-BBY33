'use strict';
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

    let first_name = document.getElementById("first_name");
    let last_name = document.getElementById("last_name");
    let user_name = document.getElementById("username");
    let password = document.getElementById("password");
    let email = document.getElementById("email");
    let password2 = document.getElementById("confirm_password");
    let queryString = "user_name=" + user_name.value + "&password=" + password.value + "&firstName=" + first_name.value + "&lastName=" + last_name.value + "&userEmail=" + email.value + "&passwordConfirm=" + password2.value;
    ajaxPOST("/register", function (data) {

        if (data) {
            let dataParsed = JSON.parse(data);
            if (dataParsed.status == "fail") {
                document.getElementById("errorMsg").innerHTML = dataParsed.msg;
            } else {
                window.location.replace("/");
            }
        }
    }, queryString);
});

async function getLogin() {
    try {
        let response = await fetch("/", {
            method: 'GET'
        })
        if (response.status === 200) {
            window.location.replace("/");
        }
    } catch (err) {

    }
}

document.getElementById("redirect").addEventListener("click", getLogin);