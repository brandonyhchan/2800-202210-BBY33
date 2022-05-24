"use strict";

/**
This function makes a post request to the server and takes 3 input.
@param {string} url - the path on the server side that is requested.
@param {callback} callback - some function that is executed after posting.
@param {string} data - data sent to the server side.
*/
function ajaxPOST(url, callback, data) {
    let params = typeof data == "string" ? data : Object.keys(data).map(
        function(k) {
            return encodeURIComponent(k) + "=" + encodeURIComponent(data[k])
        }
    ).join("&");

    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
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
Anonymous function added to html element for registering a new user.
Uses a post request to update the database.
*/
document.querySelector("#submit").addEventListener("click", function() {

    let first_name = document.getElementById("first_name");
    let last_name = document.getElementById("last_name");
    let user_name = document.getElementById("username");
    let password = document.getElementById("password");
    let email = document.getElementById("email");
    let password2 = document.getElementById("confirm_password");
    let queryString = "user_name=" + user_name.value + "&password=" +
        password.value + "&firstName=" + first_name.value + "&lastName=" +
        last_name.value + "&userEmail=" + email.value + "&passwordConfirm=" +
        password2.value;
    ajaxPOST("/register", function(data) {

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


/**
 * Expands the admin dashboard menu onclick in a mobile viewport.
 */
function expandDropdown() {
    var expandables = document.getElementById("dropdown-items");
    if (expandables.style.height == "0px") {
        expandables.style.display = "grid";
        expandables.style.height = "100px";
        expandables.style.opacity = "1";

    } else {
        expandables.style.height = "0px";
        expandables.style.opacity = "0";
        expandables.style.display = "none";
    }
}


/**
 * Ensures that the admin dashboard items are
 * always visible when resizing from mobile to desktop viewports.
 */
function reDisplay() {

    if (window.innerWidth > 720) {
        var expandables = document.getElementById("dropdown-items");
        expandables.style.opacity = "1";
        expandables.style.height = "auto";
        expandables.style.display = "grid";

    }
}
window.addEventListener("resize", reDisplay);