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

    ajaxGET("/footer2", function(data) {
        let footer = document.querySelector("#footerPlaceholder");
        footer.innerHTML = data;

        document.querySelector("#whoWeAre").addEventListener("click", () =>{
            getWhoWeAre();
        })

        document.querySelector("#faq").addEventListener("click", () =>{
            getFAQ();
        })

        document.querySelector("#joinOurTeam").addEventListener("click", () =>{
            getJoinOurTeam();
        })
    });

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

    async function getJoinOurTeam(){
        try {
            let response = await fetch("/joinOurTeam", {
                method: 'GET'
            })
            if (response.status === 200) {
                window.location.replace("/joinOurTeam");
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