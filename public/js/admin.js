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
                    </tr>`;
          for (let i = 0; i < data.rows.length; i++) {
            let row = data.rows[i];
            str += ("<tr>"
              + "</td><td class='firstName'>" + row.first_name
              + "</td><td class='lastName'>" + row.last_name
              + "</td><td class='email'>"
              + row.email_address + "</td>"
              + "<td><button class='remove'>Delete</button>"
              + "<td><button class='view'>View</button>" + "</tr>");
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

function update(e) {
  let parent = e.target.parentNode;
  let dataToSend = {
    email: parent.parentNode.querySelector(".email").innerHTML
  };

  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (this.readyState == XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        //   document.getElementById("status").innerHTML = "Record updated.";
        getUsers();

      } else {
        console.log(this.status);
      }
    } else {
      console.log("ERROR", this.status);
    }
  }
  xhr.open("POST", "/user-update");
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send("email=" + dataToSend.email);

}





