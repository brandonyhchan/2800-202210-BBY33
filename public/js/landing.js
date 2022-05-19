'use strict';
var images = ['/img/hero1.jpg', '/img/hero2.jpg', '/img/hero3.jpg', '/img/hero4.jpg'];
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

async function motivation() {
    try {
        await fetch("/get-total-purchases", {
            method: 'GET'
        })
        if (data) {
            let parsedData = JSON.parse(data);
            let msg;
            // if (parseInt(parsedData.total) == 0) {
            //     msg = `Thank you for your help`;
            // } else if (parseInt(parsedData.total) > 0 && parseInt(parsedData.total) < 60) {
            //     msg = `You have touched the lives of over 5 people`;
            // }
            document.querySelector("#motivation").innerHTML = `Thank you for your help`;
        }
    } catch (err) {

    }
}
motivation();