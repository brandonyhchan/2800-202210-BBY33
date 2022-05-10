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
                            `<td class='manage' valign='middle'><button id='${row.USER_ID}' class='remove'>Delete</button><button class='view'>View</button>` +
                            "</td></tr>");
                    }
                    document.getElementById("userTable").innerHTML = str;
                }
            }
        }
    }
    xhr.open("GET", "/get-users");
    xhr.send();
}
getUsers();


// Jquery snippet from https://jqueryui.com/dialog/#modal-confirmation for the Jquery UI
// function update(e) {
//     var parent = e.target.parentNode;
//     var sentEmail = {
//         email: parent.parentNode.querySelector(".email").innerHTML
//     };
//     $(function () {
//         $("#dialog-confirm").dialog({
//             resizable: false,
//             height: "auto",
//             width: 300,
//             modal: true,
//             buttons: {
//                 "Delete account": function () {
//                     const xhr = new XMLHttpRequest();
//                     xhr.onload = function () {
//                         if (this.readyState == XMLHttpRequest.DONE) {
//                             if (xhr.status === 200) {
//                                 getUsers();
//                             }
//                         }
//                     }
//                     xhr.open("POST", "/user-update");
//                     xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
//                     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//                     xhr.send("email=" + sentEmail.email);
//                     $(this).dialog("close");
//                 },
//                 Cancel: function () {
//                     $(this).dialog("close");
//                 }
//             }
//         });
//     });
// }

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
            console.log(event.target.id);
            userId = event.target.id;
            console.log(userId);
            queryString = "userID=" + userId;
            console.log(queryString);
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
        }
    };
    window.addEventListener('click', onClick);


};

function undeleteUser() {
    let userId;
    let queryString;
    const onClick = (event) => {
        if (event.target.className === "undelete") {
            console.log(event.target.id);
            userId = event.target.id;
            console.log(userId);
            queryString = "userID=" + userId;
            console.log(queryString);
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
        }
    };
    window.addEventListener('click', onClick);

};

deleteUser();
undeleteUser();