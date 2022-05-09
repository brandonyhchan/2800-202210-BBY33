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
                    <th class="manage_header"><span>Manage</span></th>
                    </tr>`;
                    for (let i = 0; i < data.rows.length; i++) {
                        let row = data.rows[i];
                        str += ("<tr>" +
                            "<td class='firstName'>" + row.first_name +
                            "</td><td class='lastName'>" + row.last_name +
                            "</td><td class='email'>" + row.email_address +
                            "</td><td class='admin'>" + row.admin_user +
                            "<td class='manage' valign='middle'><button class='remove'>Delete</button><button class='view'>View</button>" +
                            "</td></tr>");
                    }
                    document.getElementById("userTable").innerHTML = str;

                    let records = document.querySelectorAll(".remove");
                    for (let j = 0; j < records.length; j++) {
                        records[j].addEventListener("click", update);
                    }
                }
            }
        }
    }
    xhr.open("GET", "/get-users");
    xhr.send();
}
getUsers();


// Jquery snippet from https://jqueryui.com/dialog/#modal-confirmation for the Jquery UI
function update(e) {
    var parent = e.target.parentNode;
    var sentEmail = {
        email: parent.parentNode.querySelector(".email").innerHTML
    };
    $(function () {
        $("#dialog-confirm").dialog({
            resizable: false,
            height: "auto",
            width: 300,
            modal: true,
            buttons: {
                "Delete account": function () {
                    const xhr = new XMLHttpRequest();
                    xhr.onload = function () {
                        if (this.readyState == XMLHttpRequest.DONE) {
                            if (xhr.status === 200) {
                                getUsers();
                            }
                        } 
                    }
                    xhr.open("POST", "/user-update");
                    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
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

