'use strict';
ready(() => {
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

    ajaxGET("/nav", function(data) {
        let navbar = document.querySelector("#navbarPlaceholder");
        navbar.innerHTML = data;
        document.querySelector("#profile").addEventListener("click", () => {
            getProfile();
        })

        document.querySelector("#landing").addEventListener("click", () => {
            getLanding();
        })

        document.querySelector("#map").addEventListener("click", () => {
            getMap();
        })

        document.querySelector("#mobile-logo").addEventListener("click", () =>{
            getLanding();
        })

    });

    var path = window.location.pathname;
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

    ajaxGET("/footer", function(data) {
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