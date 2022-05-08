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

// document.querySelector("#UA").addEventListener("click", function (e) {
//     e.preventDefault();

//     let countryId = "1";
//     let countryName = "Ukraine";
//     let queryString = "countryID=" + countryId.value + "&countryName=" + countryName.value;
//     ajaxPOST("/get-packages", function (data) {

//         if (data) {
//             let dataParsed = JSON.parse(data);
//             if (dataParsed.status == "fail") {
//                 console.log("fail");
//             } else {
//                 console.log(success);
//             }
//         }
//     }, queryString);
// });

function getPackages() {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let data = JSON.parse(this.responseText);
                console.log(data);
                if (data.status == "success") {
                    let str = `        <tr>
                    <th class="firstName_header"><span>Package name</span></th>
                    <th class="lastName_header"><span>package price</span></th>
                    <th class="email_header"><span>Description</span></th>
                    </tr>`;
                    for (let i = 0; i < data.rows.length; i++) {
                        let row = data.rows[i];
                        str += ("<tr>" +
                        "<td class='firstName'>" + row.package_name +
                        "</td><td class='lastName'>" + row.package_price +
                        "</td><td class='email'>" + row.description_of_package +
                        "</td></tr>");
                    }
                    document.getElementById("cart").innerHTML = str;
                    console.log(str);
                }
            }
        }
    }
    xhr.open("GET", "/get-packages");
    xhr.send();
}
document.querySelector("#UA").addEventListener("click", getPackages);
