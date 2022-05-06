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