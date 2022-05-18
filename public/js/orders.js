'use strict';

function getUsers() {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let data = JSON.parse(this.responseText);
                if (data.status == "success") {
                    let str = `<table><tr>
                    <th class="firstName_header"><span>Package</span></th>
                    <th class="lastName_header"><span>Quantity</span></th>
                    <th class="email_header"><span>Price</span></th>
                    </tr>`;
                    for (let i = 0; i < data.rows.length; i++) {
                        let row = data.rows[i];
                        str += ("<tr>" +
                            "<td class='packagedId'>" + row.package_name +
                            "</td><td class='quantity'>" + row.product_quantity +
                            "</td><td class='price'>" + row.price +
                            "</td></tr>");
                    }
                    str += "</table>"
                    document.getElementById("orderTable").innerHTML = str;
                }
            }
        }
    }
    xhr.open("GET", "/get-orders");
    xhr.send();
}
getUsers();