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