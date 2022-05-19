'use strict';

function getUsers() {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let data = JSON.parse(this.responseText);
                if (data.status == "success") {
                    let str = `        <tr>
                    <th class="firstName_header"><span>Order Number</span></th>
                    </tr>`;
                    for (let i = 0; i < data.rows.length; i++) {
                        let row = data.rows[i];
                        str += ("<tr>" +
                            "<td class='packagedId'><span class='pId'>" + row.ORDER_ID +
                            `</span>` + `<button class="orderDisplay" type="submit" id="${row.ORDER_ID}">View</button>` +
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

function displayPackage() {
    var orderId;
    let onClick = (event) => {
        if (event.target.className == "orderDisplay") {
            orderId = event.target.id;
            sessionStorage.setItem("order", orderId);
            showOrder();
        }
    };
    window.addEventListener('click', onClick);
}

async function showOrder() {
    try {
        let response = await fetch("/orderInfo", {
            method: 'GET'
        })
        if (response.status === 200) {
            window.location.replace("/orderInfo");
        }
    } catch (err) {

    }
}

displayPackage()