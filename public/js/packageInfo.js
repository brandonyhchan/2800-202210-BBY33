'use strict';

/**
 * Controls the tabbed image gallery in desktop view.
 * @param image is the image that will replace the current main image.
 */
function changeImage(image) {
    var switchedImage = document.getElementById("image");
    switchedImage.src = image.src;
}




let slideIndex = 1;
showImage(slideIndex);

function changeImage(n) {
    showImage(slideIndex += n);
}


/**
 * Controls the scrollable image gallery in mobile view.
 * @param n is the index of the image that will be displayed.
 */
function showImage(n) {
    let i;
    let slides = document.getElementsByClassName("slider");


    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex - 1].style.display = "block";


}