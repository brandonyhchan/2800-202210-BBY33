"use strict";

var buttons;
var packagesDisplayed = false;

/**
    This function makes a get request to the server and takes 2 inputs.
    @param {string} url - the path on the server side that is requested.
    @param {callback} callback - some function that is executed after posting.
*/
function ajaxGET(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            callback(this.responseText);
        } else {
            console.log(this.status);
        }
    }
    xhr.open("GET", url);
    xhr.send();
}

 /**
    This function makes a post request to the server and takes 3 input.
    @param {string} url - the path on the server side that is requested.
    @param {callback} callback - some function that is executed after posting.
    @param {string} data - data sent to the server side.
*/
function ajaxPOST(url, callback, data) {
    let params = typeof data == "string" ? data : Object.keys(data).map(
        function (k) {
            return encodeURIComponent(k) + "=" + encodeURIComponent(data[k])
        }
    ).join("&");
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
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

/**
 * This function gets the list of packages for each country from the db
 * and displays them.
 */
function getPackage() {
    var countryId;
    var queryString;
    let onClick = (event) => {
        countryId = event.target.id;
        countryId = countryId.slice(7);
        queryString = "countryID=" + countryId;
        ajaxPOST("/get-packages", function (data) {
            if (data) {
                let dataParsed = JSON.parse(data);
                if (dataParsed.status == "fail") {
                    console.log("fail");
                } else {
                    let str = "<button class='close-package'>Close</button>"
                    for (let i = 0; i < dataParsed.rows.length; i++) {
                        let row = dataParsed.rows[i];
                        str += (`<div class='card'>
                            <div id='title'>${row.package_name} 
                            </div><div class='pImage'><img width='100' height='100' src="${row.package_image}">
                            </div><div class='price'> $${row.package_price}.00 
                            </div><div class='description'>${row.description_of_package}
                            </div><div><button type='button' class='packages' id='${row.package_id}'>Add</button><button type='button' class='packagesDisplay' id='${row.package_name}'>More info</button></div></div></div></div>`);
                    }
                    document.getElementById("cart").innerHTML = str;
                    document.querySelectorAll(".close-package").forEach(function (currentElement, currentIndex, listObj) {
                        currentElement.addEventListener("click", function (e) {
                            document.getElementById("cart").innerHTML = "";

                        });
                    });
                }
            }
        }, queryString);
    };
    let records = document.querySelectorAll(".countries");
    for (let j = 0; j < records.length; j++) {
        records[j].addEventListener("click", onClick);
    }
}

getPackage();

/**
 * This function dynamically changes the price of the total cart.
 */
function updatePrice() {
    var total = 0;
    ajaxGET("/get-cart", (data) => {
        let dataParsed = JSON.parse(data);
        let rows = dataParsed.rows;
        for (let i = 0; i < rows.length; i++) {
            total += (parseInt(rows[i].product_quantity) * parseInt(rows[i].price));
        }
        if (window.innerWidth > 720) {
            document.querySelector("#total1").innerHTML = `<table><tr><td>Total</td><td>$${total}.00</td></tr></table>`;
        } else {
            document.querySelector("#total2").innerHTML = `<table><tr><td>Total</td><td>$${total}.00</td></tr></table>`;
        }
    })
}

/**
    * Function that uses get request to server to display the contents of user's shopping cart
    * Displays as a table and adds buttons/event listeners for changing quantities and 
    * removing items as well as checkout button.
*/
function getCart() {
    ajaxGET("/get-cart", (data) => {
        let dataParsed = JSON.parse(data);
        var string = `<tr>
        <th class="package_id">Package</th>
        <th class="price">Price</th>
        <th class="quantity">Quantity</th>
        </tr>`;
        let rows = dataParsed.rows;
        for (let i = 0; i < dataParsed.rows.length; i++) {
            string += (
                `<tr><td class='packageIds'>${rows[i].package_id}</td>
                <td>$${rows[i].price}.00</td>
                <td><input class="cart-quantity-input" id='${rows[i].package_id}' type="number" value='${rows[i].product_quantity}'></td>
                <td><button class ='btn btn-danger' id='${rows[i].package_id}' type='button'>REMOVE</button></td></tr>`
            )
        }
        if (window.innerWidth > 720) {
            document.querySelector(".subtotal").innerHTML = string;
            document.querySelector(".display-cart").style.opacity = 0.75;
            document.querySelector(".display-cart").style.zIndex = 1;
            updatePrice();
        } else {
            document.querySelector(".subtotal2").innerHTML = string;
            document.querySelector(".display-cart2").style.opacity = 1;
            document.querySelector(".display-cart2").style.zIndex = 1;
            updatePrice();
        }
        let quantities = document.querySelectorAll(".cart-quantity-input");
        for (let j = 0; j < quantities.length; j++) {
            quantities[j].addEventListener('change', updateQuantity);
        }

        let removeBtns = document.querySelectorAll(".btn-danger");
        for (let j = 0; j < removeBtns.length; j++) {
            removeBtns[j].addEventListener('click', deleteItem);
        }
        document.querySelector("#desk-status").innerText = "";
        document.querySelector("#mobile-status").innerText = "";
    })

    if (window.innerWidth > 720) {
        document.querySelector("#close").addEventListener("click", function (e) {
            document.querySelector(".display-cart").style.opacity = 0;
        });
    } else {
        document.querySelector("#close-m").addEventListener("click", function (e) {
            document.querySelector(".display-cart2").style.opacity = 0;
        });
    }
}

/**
 * This function deletes an item from the cart
 * @param {event} event - determines what item has been selected.
 */
function deleteItem(event) {
    let packID = event.target.id;
    let queryString = "packageID=" + packID;
    ajaxPOST("/delete-item", (data) => {
        if (data) {
            let dataParsed = JSON.parse(data);
            if (dataParsed.status == "fail") {
                console.log("fail");
            }
        }
        getCart();
    }, queryString);
}

/**
 * This function makes a post request to db to add package to user's cart.
 */
function addPackage() {
    var packageId;
    var queryString;
    let onClick = (event) => {
        if (event.target.className == "packages") {
            packageId = event.target.id;
            queryString = "packageID=" + packageId;
            ajaxPOST("/add-packages", function (data) {

                if (data) {
                    let dataParsed = JSON.parse(data);
                    if (dataParsed.status == "fail") {
                        console.log("fail");
                    }
                }
            }, queryString);
            updateQuantity(event);
            getCart();
        }
    };
    window.addEventListener('click', onClick);
}

/**
 * This function dynamically changes the quantity displayed for a changed item
 * and changes the quantity in the db.
 */
function updateQuantity(event) {
    if (isNaN(parseInt(event.target.value)) || parseInt(event.target.value) <= 0) {
        event.target.value = 1
    }
    var packageId;
    var queryString;
    var newQuantity = event.target.value;
    packageId = event.target.id;
    queryString = "packageID=" + packageId + "&quantity=" + newQuantity;
    ajaxPOST("/update-quantity", function (data) {
        if (data) {
            let dataParsed = JSON.parse(data);
            if (dataParsed.status == "fail") {
                console.log("fail");
            }
        }
    }, queryString);
    getCart();
    getCart();

}

/**
 * This function determines what package is being selected for redirecting
 * to more info on that specific package.
 */
function displayPackage() {
    var packageId;
    let onClick = (event) => {
        if (event.target.className == "packagesDisplay") {
            packageId = event.target.id;
            sessionStorage.setItem("package", packageId);
            showPackage();
        }
    };
    window.addEventListener("click", onClick);
}

/**
 * Makes a get request to redirect user to package info page.
 */
async function showPackage() {
    try {
        let response = await fetch("/packageInfo", {
            method: "GET"
        })
        if (response.status === 200) {
            window.location.replace("/packageInfo");
        }
    } catch (err) {

    }
}

displayPackage();

addPackage();

/**
* Function that removes all items from the shopping cart.
* Uses post request to update the database.
* @param {event} event - clear all button
*/
function remove() {
    var buttonId;
    var queryString;
    let onClick = (event) => {
        if (event.target.className == "remove") {
            buttonId = event.target.id;
            queryString = "buttonID=" + buttonId;
            ajaxPOST("/removeAll", function (data) {
                if (data) {
                    let dataParsed = JSON.parse(data);
                    if (dataParsed.status == "fail") {
                        console.log("fail");
                    }
                }
            }, queryString);
            getCart();
        }
    };
    window.addEventListener("click", onClick);
}

remove();

