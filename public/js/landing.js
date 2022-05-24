"use strict";
var images = ["/img/hero1.jpg", "/img/hero2.jpg", "/img/hero3.jpg", "/img/hero4.jpg"];
var i = 0;
var interval = 3500;

/**
 * Creates a sliding image gallery that automatically updates every specified interval.
 */
function slider() {
    document.getElementById("image").src = images[i];

    if (i < images.length - 1) {
        i++;
    } else {
        i = 0;
    }

    setTimeout("slider()", interval)
}

window.onload = slider;

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
Function that displays a motivational message to users based on how much they've donated previously.
*/
function motivation() {
    ajaxGET("/get-total-purchases", (data) => {
        let parsedData = JSON.parse(data);
        let msg;
        let total = parseInt(parsedData.total);
        if (total == 0) {
            msg = `Thank you for your help`;
        } else if (total > 0 && total < 60) {
            msg = `You have touched the lives of over 5 people`;
        } else if (total > 60) {
            msg = `You have touched the lives of over 10 people`;
        } else if (total > 120) {
            msg = `You have touched the lives of over 15 people`;
        } else if (total > 250) {
            msg = `You have touched the lives of over 25 people`
        }
        document.querySelector("#motivation").innerHTML = msg;
    })

}
motivation();

var counter = 0;

/**
 * Easter egg function that drops a care package down every 3 clicks on the landing page's main image.
 */
function easterEgg() {

    counter++;
    var selector = document.getElementById("easter-egg");

    if (counter == 3) {
        selector.style.zIndex = "1";
        selector.style.display = "block"
        selector.style.transform = "translateY(0)";
        selector.style.animationName = "easterEgg";
        selector.style.animationDuration = "4s";
        selector.style.animationFillMode = "forwards";
    }

    if (counter > 3) {
        selector.style.zIndex = "0";
        selector.style.display = "none";
        counter = 1;
    }

}

// Function to redirect to "How it Works" page.
function learnMore() {
    window.location.href = "/howItWorks";
}

// Function to redirect to "Map" page.
function getStarted() {
    window.location.href = "/map";
}