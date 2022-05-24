"use strict";
ready(() => {
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
    Get request for the footer that is loaded to every page.
    @param {string} "/footer2" - path that is requested to the server.
    @param {callback} - function executed that displays data retrieved by get request.
    */
    ajaxGET("/footer2", function (data) {
        let footer = document.querySelector("#footerPlaceholder");
        footer.innerHTML = data;

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
    Async function that uses fetch get request to redirect to "Join our Team page" page. 
    */
    async function getJoinOurTeam() {
        try {
            let response = await fetch("/joinOurTeam", {
                method: "GET"
            })
            if (response.status === 200) {
                window.location.replace("/joinOurTeam");
            }
        } catch (err) { }
    }

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