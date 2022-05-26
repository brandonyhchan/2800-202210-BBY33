"use strict";
var orderView = sessionStorage.getItem("order");

/*
This function makes a get request to the server and takes 2 inputs.
@param {string} url - the path on the server side that is requested.
@param {callback} callback - some function that is executed after posting.
*/
function ajaxGET(url, callback, data) {
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

/*
Function that uses get request to server to display all packages in all orders.
Displays the results as a table.
*/
function getPackage() {
    var order = orderView;
    var queryString;
    queryString = "orderId=" + order;
    ajaxGET("/display-order", function(data) {
        if (data) {
            let dataParsed = JSON.parse(data);
            if (dataParsed.status == "fail") {
                console.log("fail");
            } else {
                let total = 0;
                let order_ID = 0;
                let str = `        <tr>
                    <th class="firstName_header"><span>Package</span></th>
                    <th class="lastName_header"><span>Quantity</span></th>
                    <th class="email_header"><span>Destination</span></th>
                    <th class="email_header"><span>Price</span></th>
                    </tr>`;
                for (let i = 0; i < dataParsed.rows.length; i++) {
                    let row = dataParsed.rows[i];
                    str += ("<tr>" +
                        "<td class='packagedId'><span class='pId'>" + row.package_name +
                        "</span></td><td class='quantity'><span class='quant'>" + row.product_quantity +
                        "</span></td><td class='quantity'><span class='quant'>" + row.cart_destination +
                        "</span></td><td class='price'><span class='priceP'>" +
                        "$" + row.price + ".00" +
                        `</span>` +
                        "</td></tr>");
                }
                document.getElementById("orderTable").innerHTML = str;
                for (let i = 0; i < dataParsed.rows.length; i++) {
                    total += (parseInt(dataParsed.rows[i].price) * parseInt(dataParsed.rows[i].product_quantity));
                    order_ID = dataParsed.rows[i].order_id;
                }
                document.getElementById("total").innerHTML = "Total:    " + "$" + total + ".00";
                document.getElementById("order-number").innerHTML = order_ID;
            }
        }
    }, queryString);
};

getPackage();

// Adds event listener for getOrders() to html element with id="goBack".
document.querySelector("#goBack").addEventListener("click", () => {
    getOrders();
})

/*
Function that uses fetch get request to redirect to "Get Orders" page.
*/
async function getOrders() {
    try {
        let response = await fetch("/getOrders", {
            method: 'GET'
        })
        if (response.status === 200) {
            window.location.replace("/getOrders");
        }
    } catch (err) {

    }
}