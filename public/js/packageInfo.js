var package = sessionStorage.getItem("package");

'use strict';

/**
 * Controls the tabbed image gallery in desktop view.
 * @param image is the image that will replace the current main image.
 */
function changeImageTab(image) {
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



function ajaxGET(url, callback, data) {
    let params = typeof data == 'string' ? data : Object.keys(data).map(
        function(k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
        }
    ).join('&');
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            callback(this.responseText);
        } else {
            console.log(this.status);
        }
    }
    xhr.open("POST", url);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
}

function getPackage() {
    var packageName = package;
    var queryString;
    queryString = "packageName=" + packageName;
    ajaxGET("/display-package", function(data) {
        if (data) {
            let dataParsed = JSON.parse(data);
            if (dataParsed.status == "fail") {
                console.log("fail");
            } else {
                console.log(dataParsed);
                document.getElementById("image").setAttribute("src", dataParsed.rows[0].package_image);
                document.getElementById("package-name").innerHTML = dataParsed.rows[0].package_name;
                document.getElementById("price").innerHTML = dataParsed.rows[0].package_price;
                document.getElementById("description").innerHTML = dataParsed.rows[0].description_of_package;
            }
        }
    }, queryString);
};

getPackage();