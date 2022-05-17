'use strict';

function getUsers() {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let data = JSON.parse(this.responseText);
                if (data.status == "success") {
                    let str = `        <tr>
                    <th class="firstName_header"><span>Package</span></th>
                    <th class="lastName_header"><span>Quantity</span></th>
                    <th class="email_header"><span>Price</span></th>
                    </tr>`;
                    for (let i = 0; i < data.rows.length; i++) {
                        let row = data.rows[i];
                        str += ("<tr>" +
                            "<td class='packagedId'><span class='pId'>" + row.package_name +
                            "</span></td><td class='quantity'><span class='quant'>" + row.product_quantity +
                            "</span></td><td class='price'><span class='priceP'>" + row.price+
                            `</span>` +
                            "</td></tr>");
                    }
                    document.getElementById("orderTable").innerHTML = str;
                }
            }
        }
    }
    xhr.open("GET", "/get-orders");
    xhr.send();
}
getUsers();