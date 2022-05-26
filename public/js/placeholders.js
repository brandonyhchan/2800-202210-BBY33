"use strict";
var show;
ready(() => {
    /**
    This function makes a get request to the server and takes 2 inputs.
    @param {string} url - the path on the server side that is requested.
    @param {callback} callback - some function that is executed after posting.
    */
    function ajaxGET(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
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
            function(k) { return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]) }
        ).join("&");

        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                callback(this.responseText);
            }
        }
        xhr.open("POST", url);
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(params);
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
                    `<tr><td>${rows[i].package_id}</td>
                    <td>$${rows[i].price}.00</td>
                    <td><input class="cart-quantity-input" id='${rows[i].package_id}' type="number" value='${rows[i].product_quantity}'></td>
                    <td><button class='btn btn-danger' id='${rows[i].package_id}' type='button'>REMOVE</button></td></tr>`
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


        })

        if (window.innerWidth > 720) {
            document.querySelector("#close").addEventListener("click", function(e) {
                document.querySelector(".display-cart").style.opacity = 0;
                isClosed();
            });
        } else {
            document.querySelector("#close-m").addEventListener("click", function(e) {
                document.querySelector(".display-cart2").style.opacity = 0;
                isClosed();
            });
        }
        document.querySelector("#desk-status").innerText = "";
                document.querySelector("#mobile-status").innerText = "";
    }

    /**
     * Function to hide unused cart (desktop or mobile) depending on what resolution is used.
     */
    function isClosed() {
        let cart1 = document.querySelector(".display-cart");
        let cart2 = document.querySelector(".display-cart2");
        if (cart1.style.opacity == 0) {
            cart1.style.zIndex = -1;
        }
        if (cart2.style.opacity == 0) {
            cart2.style.zIndex = -1;
        }
    }
    var path = window.location.pathname;

    if (path.startsWith("/admin") || path.startsWith("/getOrders") || path.startsWith("/orderInfo") || path.startsWith("/success") ||
        path.startsWith("/charity") || path.startsWith("/*") || path.startsWith("/packageInfo")) {
        window.removeEventListener("load", isClosed);
    } else {
        window.addEventListener("load", isClosed);
    }

    /**
     * Function uses post request to update the quantity of a selected item in shopping cart.
     * @param {event} event - is the target element to update.
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
        ajaxPOST("/update-quantity", function(data) {
            if (data) {
                let dataParsed = JSON.parse(data);
                if (dataParsed.status == "fail") {
                    console.log("fail");
                }
            }
        }, queryString);
        getCart();

    }

    /**
     * Function that deletes a specific item from the shopping cart.
     * Uses post request to update database.
     * @param {event} event - specific item to remove.
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
     * Function to update the total price of the shopping cart.
     * Uses a get request to get item prices from database.
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

    var removeAlls = document.querySelectorAll(".remove");
    for (let i = 0; i < removeAlls.length; i++) {
        removeAlls[i].addEventListener("click", remove);
    }

    /**
     * Function that removes all items from the shopping cart.
     * Uses post request to update the database.
     * @param {event} event - clear all button
     */
    function remove(event) {
        var buttonId;
        var queryString;
        buttonId = event.target.id;
        queryString = "buttonID=" + buttonId;
        ajaxPOST("/removeAll", function(data) {
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
     * Gets the navbar and inserts it into placeholder using get request.
     */
    ajaxGET("/nav", function(data) {
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
        document.querySelector("#orders").addEventListener("click", () => {
            getOrders();
        })
        let carts = document.querySelectorAll(".cart-holder");
        for (let i = 0; i < carts.length; i++) {
            carts[i].addEventListener("click", getCart);
        }

        if (path.startsWith("/admin") || path.startsWith("/getOrders") || path.startsWith("/orderInfo") || path.startsWith("/charity") ||
            path.startsWith("/*") || path.startsWith("/packageInfo")) {
            document.querySelector("#mobile-nav3").style.visibility = "hidden";
            document.querySelector(".cart-holder").style.visibility = "hidden";
            document.getElementById("mobile-nav2").style.margin = "auto";
        }
    })

    // Only show the admin control panel on admin page.
    if (path.startsWith("/admin")) {
        ajaxGET("/admin-sideBar", function(data) {

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

    /**
     * Get the footer and insert in to placeholder using get request.
     */
    ajaxGET("/footer", function(data) {
        let footer = document.querySelector("#footerPlaceholder");
        footer.innerHTML = data;

        document.querySelector("#profile-icon").addEventListener("click", () => {
            getProfile();
        })

        document.querySelector("#map-icon").addEventListener("click", () => {
            getMap();
        })

        document.querySelector("#help-icon").addEventListener("click", () => {
            getSupport();
        })

        document.querySelector("#whoWeAre").addEventListener("click", () => {
            getWhoWeAre();
        })

        document.querySelector("#faq").addEventListener("click", () => {
            getFAQ();
        })

        document.querySelector("#joinOurTeam").addEventListener("click", () => {
            getJoinOurTeam();
        })

        document.querySelector("#howItWorks").addEventListener("click", () => {
            getHowItWorks();
        })

        document.querySelector("#partnerships").addEventListener("click", () => {
            getPartnerships();
        })

        document.querySelector("#support").addEventListener("click", () => {
            getSupport();
        })
    });

    /**
    Async function that uses fetch get request to redirect to "Profile" page. 
    */
    async function getProfile() {
        try {
            let response = await fetch("/profile", {
                method: "GET"
            })
            if (response.status === 200) {
                window.location.replace("/profile");
            }
        } catch (err) {

        }
    }

    /**
    Async function that uses fetch get request to redirect to "Map" page. 
    */
    async function getMap() {
        try {
            let response = await fetch("/map", {
                method: "GET"
            })
            if (response.status === 200) {
                window.location.replace("/map");
            }
        } catch (err) {

        }
    }

    /**
    Async function that uses fetch get request to redirect to "Orders" page. 
    */
    async function getOrders() {
        try {
            let response = await fetch("/getOrders", {
                method: "GET"
            })
            if (response.status === 200) {
                window.location.replace("/getOrders");
            }
        } catch (err) {

        }
    }

    /**
    Async function that uses fetch get request to redirect to "Landing" page. 
    */
    async function getLanding() {
        try {
            let response = await fetch("/landing", {
                method: "GET"
            })
            if (response.status === 200) {
                window.location.replace("/landing");
            }
        } catch (err) {

        }
    }

    /**
    Async function that uses fetch get request to redirect to "Add users" page. 
    */
    async function getAddUsers() {
        try {
            let response = await fetch("/admin-add-users", {
                method: "GET"
            })
            if (response.status === 200) {
                window.location.replace("/admin-add-users");
            }
        } catch (err) {

        }
    }

    /**
    Async function that uses fetch get request to redirect to "Admin Dashboard" page. 
    */
    async function getManageUsers() {
        try {
            let response = await fetch("/admin", {
                method: "GET"
            })
            if (response.status === 200) {
                window.location.replace("/admin");
            }
        } catch (err) {

        }
    }

    /**
    Async function that uses fetch get request to redirect to "Who We Are" page. 
    */
    async function getWhoWeAre() {
        try {
            let response = await fetch("/whoWeAre", {
                method: "GET"
            })
            if (response.status === 200) {
                window.location.replace("/whoWeAre");
            }
        } catch (err) {

        }
    }

    /**
    Async function that uses fetch get request to redirect to "Join Our Team" page. 
    */
    async function getJoinOurTeam() {
        try {
            let response = await fetch("/joinOurTeam", {
                method: "GET"
            })
            if (response.status === 200) {
                window.location.replace("/joinOurTeam");
            }
        } catch (err) {

        }
    }

    /**
    Async function that uses fetch get request to redirect to "Support" page. 
    */
    async function getSupport() {
        try {
            let response = await fetch("/Support", {
                method: "GET"
            })
            if (response.status === 200) {
                window.location.replace("/Support");
            }
        } catch (err) {

        }
    }

    /**
    Async function that uses fetch get request to redirect to "FAQ" page. 
    */
    async function getFAQ() {
        try {
            let response = await fetch("/FAQ", {
                method: "GET"
            })
            if (response.status === 200) {
                window.location.replace("/FAQ");
            }
        } catch (err) {

        }
    }

    /**
     * adds event listener to the purchase button that redirects to stripe payment page.
     */
    document.querySelectorAll(".purchase").forEach(function(currentElement) {
        currentElement.addEventListener("click", () => {
            if ((document.querySelector(".subtotal2").innerText) === 'Package\tPrice\tQuantity' 
            || document.querySelector(".subtotal").innerText === 'Package\tPrice\tQuantity') {
                document.querySelector("#desk-status").innerText = "Cannot Checkout Empty Cart";
                document.querySelector("#mobile-status").innerText = "Cannot Checkout Empty Cart";
            } else {
                ajaxGET("/get-cart", (data) => {
                    var items = [];
                    if (data) {
                        let dataParsed = JSON.parse(data);
                        if (dataParsed.status == "fail") {
                            console.log("fail");
                        }
                        for (let i = 0; i < dataParsed.rows.length; i++) {
                            items.push({ id: dataParsed.rows[i].package_id, quantity: dataParsed.rows[i].product_quantity });
                        }
                        fetch("/create-checkout-session", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    items
                                }),
                            })
                            .then(res => {
                                if (res.ok) return res.json()
                                return res.json().then(json => Promise.reject(json))
                            })
                            .then(({ url }) => {
                                window.location = url
                            })
                            .catch(e => {
                                console.error(e.error)
                            })
                    }
                })
            }
        })
    })

    /**
    Async function that uses fetch get request to redirect to "How it works" page. 
    */
    async function getHowItWorks() {
        try {
            let response = await fetch("/howItWorks", {
                method: "GET"
            })
            if (response.status === 200) {
                window.location.replace("/howItWorks");
            }
        } catch (err) {

        }
    }

    /**
    Async function that uses fetch get request to redirect to "Partnerships" page. 
    */
    async function getPartnerships() {
        try {
            let response = await fetch("/partnerships", {
                method: "GET"
            })
            if (response.status === 200) {
                window.location.replace("/partnerships");
            }
        } catch (err) {

        }
    }


})

/** 
Ready function called when page is loaded
*/
function ready(callback) {
    if (document.readyState != "loading") {
        callback();
    } else {
        document.addEventListener("DOMContentLoaded", callback);
    }
}