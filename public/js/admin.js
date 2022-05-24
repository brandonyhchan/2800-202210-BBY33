'use strict';

function getUsers() {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let data = JSON.parse(this.responseText);
                if (data.status == "success") {
                    let str = `        <tr>
                    <th class="firstName_header"><span>First Name</span></th>
                    <th class="lastName_header"><span>Last Name</span></th>
                    <th class="email_header"><span>Email</span></th>
                    <th class="admin_header"><span>Admin</span></th>
                    <th class="admin_header"><span>Change Password</span></th>
                    <th class="manage_header"><span>Manage</span></th>
                    </tr>`;
                    for (let i = 0; i < data.rows.length; i++) {
                        let row = data.rows[i];
                        str += ("<tr>" +
                            "<td class='firstName'><span class='first'>" + row.first_name +
                            "</span></td><td class='lastName'><span class='last'>" + row.last_name +
                            "</span></td><td class='email'><span class='email-address'>" + row.email_address +
                            "</span></td><td class='admin'><span class='isAdmin'>" + row.admin_user +
                            "</span></td><td class='change-pass'><input type='password' placeholder='New Password' class='newPass'>" +
                            `</span><td class='manage'><button id='${row.USER_ID}' class='remove'>Delete</button>` +
                            "</td></tr>");
                    }
                    document.getElementById("userTable").innerHTML = str;

                    let firstNames = document.querySelectorAll(".first");
                    let lastNames = document.querySelectorAll(".last");
                    let emails = document.querySelectorAll(".email-address");
                    let admins = document.querySelectorAll(".isAdmin");
                    let passwords = document.querySelectorAll(".newPass");

                    for (let j = 0; j < firstNames.length; j++) {
                        firstNames[j].addEventListener("click", editInfo);
                    }
                    for (let j = 0; j < lastNames.length; j++) {
                        lastNames[j].addEventListener("click", editInfo);
                    }
                    for (let j = 0; j < emails.length; j++) {
                        emails[j].addEventListener("click", editInfo);
                    }
                    for (let j = 0; j < admins.length; j++) {
                        admins[j].addEventListener("click", editInfo);
                    }
                    for (let j = 0; j < passwords.length; j++) {
                        passwords[j].addEventListener("click", editInfo);
                    }
                }
            }
        }
    }
    xhr.open("GET", "/get-users");
    xhr.send();
}
getUsers();

function ajaxGET(url, callback, data) {
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

function deleteUser() {
    let userId;
    let queryString;
    const onClick = (event) => {
        if (event.target.className === "remove") {
            $(function () {
                $("#dialog-confirm").dialog({
                    resizable: false,
                    height: "auto",
                    width: 300,
                    modal: true,
                    buttons: {
                        "Update account": function () {
                            userId = event.target.id;
                            queryString = "userID=" + userId;
                            ajaxGET("/delete-users", function (data) {
                                if (data) {
                                    let dataParsed = JSON.parse(data);
                                    if (dataParsed.status == "fail") {
                                        console.log("fail");
                                    } else {
                                        event.target.classList.add('undelete');
                                        event.target.classList.remove('remove');
                                        event.target.innerHTML = "Undelete";
                                    }
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
        }
    };
    window.addEventListener('click', onClick);


};

function undeleteUser() {
    let userId;
    let queryString;
    const onClick = (event) => {
        if (event.target.className === "undelete") {
            $(function () {
                $("#dialog-confirm").dialog({
                    resizable: false,
                    height: "auto",
                    width: 300,
                    modal: true,
                    buttons: {
                        "Update account": function () {
                            userId = event.target.id;
                            queryString = "userID=" + userId;
                            ajaxGET("/undelete-users", function (data) {

                                if (data) {
                                    let dataParsed = JSON.parse(data);
                                    if (dataParsed.status == "fail") {
                                        console.log("fail");
                                    } else {
                                        event.target.classList.add('remove');
                                        event.target.classList.remove('undelete');
                                        event.target.innerHTML = "Delete";
                                    }
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
        }
    };
    window.addEventListener('click', onClick);

};

deleteUser();
undeleteUser();


function editInfo(event) {
    var row = event.target.parentNode.innerText;
    var parentNode = event.target.parentNode;
    var eventClass = event.target.className;
    updateInfo(row, parentNode, eventClass);
}

function updateInfo(e, p, newClass) {
    var currentValue = e;
    var parent = p;
    let input = document.createElement("input");
    let emailID = parent.parentNode.querySelector(".email").innerText
    input.value = currentValue;
    input.addEventListener("keyup", function (e) {
        let newInput = null;
        if (e.which == 13) {
            newInput = input.value;
            let newValue = document.createElement("span");
            newValue.setAttribute("class", newClass);
            newValue.addEventListener("click", editInfo);
            newValue.innerHTML = newInput;
            parent.innerHTML = "";
            parent.appendChild(newValue);
            var sent = {
                value: newValue.innerHTML,
                email: emailID
            };

            $(function () {
                $("#update-confirm").dialog({
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
                                        getUsers();
                                    }
                                }
                            }
                            if (newClass == 'email-address') {
                                xhr.open("POST", "/admin-update-email");
                                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                                xhr.send("email_address=" + sent.value + "&email=" + sent.email);
                            } else if (newClass == 'first') {
                                xhr.open("POST", "/admin-update-firstName");
                                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                                xhr.send("firstName=" + sent.value + "&email=" + sent.email);
                            } else if (newClass == 'last') {
                                xhr.open("POST", "/admin-update-lastName");
                                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                                xhr.send("lastName=" + sent.value + "&email=" + sent.email);
                            } else if (newClass == 'isAdmin') {
                                xhr.open("POST", "/admin-update-admin");
                                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                                xhr.send("admin=" + sent.value + "&email=" + sent.email);
                            } else if (newClass == 'newPass') {
                                xhr.open("POST", "/admin-update-password");
                                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                                xhr.send("newPass=" + sent.value + "&email=" + sent.email);
                            }
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
 * Expands the admin dashboard menu onclick in a mobile viewport.
 */
function expandDropdown() {
    var expandables = document.getElementById("dropdown-items");
    if (expandables.style.height === "0px") {
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
 * Ensures that the admin dashboard items are always visible when resizing from mobile to desktop viewports.
 */
function reDisplay() {

    if (window.innerWidth > 720) {
        var expandables = document.getElementById("dropdown-items");
        expandables.style.opacity = "1";
        expandables.style.height = "auto";
        expandables.style.display = "grid";

    }
}
window.addEventListener('resize', reDisplay);