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
                    <td>${rows[i].product_quantity}</td></tr>`
                )
            }
            document.querySelector("#subtotal").innerHTML = string;
            document.getElementById("display-cart").style.opacity = 0.75;
        })
        document.querySelector("#close").addEventListener("click", function (e) {
            document.getElementById("display-cart").style.opacity = 0;
        });

    }

    ajaxGET("/nav", function (data) {
        let navbar = document.querySelector("#navbarPlaceholder");
        navbar.innerHTML = data;
        document.querySelector("#profile").addEventListener("click", () => {
            getProfile();
        })
        document.querySelector("#landing").addEventListener("click", () => {
            getLanding();
        })
        document.querySelector("#cart-icon").addEventListener("click", getCart);
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

})

function ready(callback) {
    if (document.readyState != "loading") {
        callback();
    } else {
        document.addEventListener("DOMContentLoaded", callback);
    }
}