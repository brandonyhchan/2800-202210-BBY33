'use strict';

var buttons;
var packagesDisplayed = false;

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
                    let str = ""
                    for (let i = 0; i < dataParsed.rows.length; i++) {
                        let row = dataParsed.rows[i];
                        str += (`<button class='close-package'>Close</button><div class='card'>
                            <div id='title'>${row.package_name} 
                            </div><div class='pImage'><img width='100' height='100' src="${row.package_image}">
                            </div><div class='price'> $${row.package_price} 
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
                <td>${rows[i].price}</td>
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
            document.querySelector(".display-cart2").style.opacity = 0.75;
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
                    } else {
                        console.log("success")
                    }
                }
            }, queryString);
            updateQuantity(event);
            getCart();
        }
    };
    window.addEventListener('click', onClick);
}

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

function displayPackage() {
    var packageId;
    let onClick = (event) => {
        if (event.target.className == "packagesDisplay") {
            packageId = event.target.id;
            sessionStorage.setItem("package", packageId);
            showPackage();
        }
    };
    window.addEventListener('click', onClick);
}


async function showPackage() {
    try {
        let response = await fetch("/packageInfo", {
            method: 'GET'
        })
        if (response.status === 200) {
            window.location.replace("/packageInfo");
        }
    } catch (err) {

    }
}

displayPackage();

addPackage();

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
                    } else {
                        console.log("success")
                    }
                }
            }, queryString);
            getCart();
        }
    };
    window.addEventListener('click', onClick);
}

remove();