'use strict';
var show;
ready(() => {
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
            function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
        ).join('&');

        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                callback(this.responseText);
            }
        }
        xhr.open("POST", url);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(params);
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
                    `<tr><td>${rows[i].package_id}</td>
                    <td>${rows[i].price}</td>
                    <td><input class="cart-quantity-input" id='${rows[i].package_id}' type="number" value='${rows[i].product_quantity}'></td>
                    <td><button class='btn btn-danger' id='${rows[i].package_id}' type='button'>REMOVE</button></td></tr>`
                )
            }
            if (window.innerWidth > 720) {
                document.querySelector(".subtotal").innerHTML = string;
                document.querySelector(".display-cart").style.opacity = 0.75;
                updatePrice();
            } else {
                document.querySelector(".subtotal2").innerHTML = string;
                document.querySelector(".display-cart2").style.opacity = 0.75;
                updatePrice();
            }
            let removeBtns = document.querySelectorAll(".btn");
            for (let j = 0; j < removeBtns.length; j++) {
                removeBtns[j].addEventListener('click', deleteItem);
            }

            let quantities = document.querySelectorAll(".cart-quantity-input");
            for (let j = 0; j < quantities.length; j++) {
                quantities[j].addEventListener('change', updateQuantity);
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
        }, queryString);
        getCart();
    }

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

    ajaxGET("/nav", function (data) {
        let navbar = document.querySelector("#navbarPlaceholder");
        navbar.innerHTML = data;
        document.querySelector("#profile").addEventListener("click", () => {
            getProfile();
        });
        document.querySelector("#mobile-logo").addEventListener("click", () => {
            getLanding();
        });

        document.querySelector("#landing").addEventListener("click", () => {
            getLanding();
        });

        document.querySelector("#map").addEventListener("click", () => {
            getMap();
        })
        let carts = document.querySelectorAll(".cart-holder");
        for (let i = 0; i < carts.length; i++) {
            carts[i].addEventListener("click", getCart);
        }
    });

    var path = window.location.pathname;
    if (path.startsWith("/admin")) {
        ajaxGET("/admin-sideBar", function (data) {

            let navbar = document.querySelector("#control-panel-placeholder");
            navbar.innerHTML = data;
            document.querySelector("#manage-users-button").addEventListener("click", () => {
                getManageUsers();
            })

            document.querySelector("#delete-users-button").addEventListener("click", () => {
                getAddUsers();
            })

        });

    }

    ajaxGET("/footer", function (data) {
        let footer = document.querySelector("#footerPlaceholder");
        footer.innerHTML = data;

        document.querySelector("#profile-icon").addEventListener("click", () => {
            getProfile();
        })

        document.querySelector("#map-icon").addEventListener("click", () => {
            getMap();
        })

        document.querySelector("#whoWeAre").addEventListener("click", () => {
            getWhoWeAre();
        })

        document.querySelector("#faq").addEventListener("click", () => {
            getFAQ();
        })
    });

    async function getProfile() {
        try {
            let response = await fetch("/profile", {
                method: 'GET'
            })
            if (response.status === 200) {
                window.location.replace("/profile");
            }
        } catch (err) {

        }
    }

    async function getMap() {
        try {
            let response = await fetch("/map", {
                method: 'GET'
            })
            if (response.status === 200) {
                window.location.replace("/map");
            }
        } catch (err) {

        }
    }


    async function getLanding() {
        try {
            let response = await fetch("/landing", {
                method: 'GET'
            })
            if (response.status === 200) {
                window.location.replace("/landing");
            }
        } catch (err) {

        }
    }

    async function getAddUsers() {
        try {
            let response = await fetch("/admin-add-users", {
                method: 'GET'
            })
            if (response.status === 200) {
                window.location.replace("/admin-add-users");
            }
        } catch (err) {

        }
    }

    async function getManageUsers() {
        try {
            let response = await fetch("/admin", {
                method: 'GET'
            })
            if (response.status === 200) {
                window.location.replace("/admin");
            }
        } catch (err) {

        }
    }

    async function getWhoWeAre() {
        try {
            let response = await fetch("/whoWeAre", {
                method: 'GET'
            })
            if (response.status === 200) {
                window.location.replace("/whoWeAre");
            }
        } catch (err) {

        }
    }

    async function getFAQ() {
        try {
            let response = await fetch("/FAQ", {
                method: 'GET'
            })
            if (response.status === 200) {
                window.location.replace("/FAQ");
            }
        } catch (err) {

        }
    }
})

function ready(callback) {
    if (document.readyState != "loading") {
        callback();
    } else {
        document.addEventListener("DOMContentLoaded", callback);
    }
}