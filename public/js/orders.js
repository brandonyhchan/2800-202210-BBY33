"use strict";

/*
Function getUsers() uses get request to server to display all orders made by logged in user.
Displays the orders as a table with a button to view the contents of the order selected.
*/
function getUsers() {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let data = JSON.parse(this.responseText);
                if (data.status == "success") {
                    let str = `        <tr>
                    <th class="firstName_header"><span>Order Number</span></th>
                    <th class="firstName_header"><span>Order Date</span></th>
                    <th class="firstName_header"><span>View Order</span></th>
                    </tr>`;
                    for (let i = 0; i < data.rows.length; i++) {
                        let row = data.rows[i];
                        let date = data.rows[i].order_date;
                        str += ("<tr>" +
                            "<td class='packagedId'>" + row.ORDER_ID +
                            "</td>" + "<td class='packagedId'>" + date.slice(0, 10) + "</td>" 
                            + "<td>" + `<button class="orderDisplay" type="submit" id="${row.ORDER_ID}">View</button>` + "</td>" +
                            "</tr>");
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

// Add event listener for redirecting to the "Order Info" page.
function displayPackage() {
    var orderId;
    let onClick = (event) => {
        if (event.target.className == "orderDisplay") {
            orderId = event.target.id;
            sessionStorage.setItem("order", orderId);
            showOrder();
        }
    };
    window.addEventListener("click", onClick);
}

// Uses fetch get request to redirect to "Order Info" page.
async function showOrder() {
    try {
        let response = await fetch("/orderInfo", {
            method: "GET"
        })
        if (response.status === 200) {
            window.location.replace("/orderInfo");
        }
    } catch (err) {

    }
}

displayPackage()