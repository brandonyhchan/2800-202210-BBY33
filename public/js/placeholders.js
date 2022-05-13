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
            if (window.innerWidth > 720) {
                document.querySelector(".subtotal").innerHTML = string;
                document.querySelector(".display-cart").style.opacity = 0.75;
                updatePrice(rows);
            } else {
                document.querySelector(".subtotal2").innerHTML = string;
                document.querySelector(".display-cart2").style.opacity = 0.75;
                updatePrice(rows);
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


    function updatePrice(rows) {
        let total = 0;
        for (let i = 0; i < rows.length; i++) {
            total += parseInt(rows[i].price);
        }
        if (window.innerWidth > 720) {
            document.querySelector("#total1").innerHTML = `<table><tr><td>Total</td><td>$${total}.00</td></tr></table>`;
        } else {
            document.querySelector("#total2").innerHTML = `<table><tr><td>Total</td><td>$${total}.00</td></tr></table>`;
        }
    }

    ajaxGET("/nav", function (data) {
        let navbar = document.querySelector("#navbarPlaceholder");
        navbar.innerHTML = data;
        document.querySelector("#profile").addEventListener("click", () => {
            getProfile();
        });
        document.querySelector("#landing").addEventListener("click", () => {
            getLanding();
        });

        document.querySelector("#map").addEventListener("click", ()=>{
            getMap();
        })
        let carts = document.querySelectorAll(".cart-holder");
        for (let i = 0; i < carts.length; i++) {
            carts[i].addEventListener("click", getCart);
        }
        
    });

    if (window.innerWidth > 390) {
        document.querySelector(".display-cart2").style.display = 'none';
        document.querySelector(".subtotal2").style.display = 'none';
        
    }

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

        document.querySelector("#profile-icon").addEventListener("click", () =>{
            getProfile();
        })

        document.querySelector("#map-icon").addEventListener("click", () =>{
            getMap();
        })

        document.querySelector("#whoWeAre").addEventListener("click", () =>{
            getWhoWeAre();
        })

        document.querySelector("#faq").addEventListener("click", ()=>{
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

    async function getWhoWeAre(){
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

    async function getFAQ(){
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