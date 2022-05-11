var package = sessionStorage.getItem("package");
console.log(package);

function ajaxGET(url, callback, data) {
    let params = typeof data == 'string' ? data : Object.keys(data).map(
        function (k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
        }
    ).join('&');
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
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
    ajaxGET("/display-package", function (data) {
        if (data) {
            let dataParsed = JSON.parse(data);
            if (dataParsed.status == "fail") {
                console.log("fail");
            } else {
                let str = ""
                for (let i = 0; i < dataParsed.rows.length; i++) {
                    let row = dataParsed.rows[i];
                    str += (`<div class='card'> 
                            <div id='title'>${row.package_name} 
                            </div><div class='pImage'><img width='100' height='100' src="${row.package_image}">
                            </div><div class='price'> $${row.package_price} 
                            </div><div class='description'>${row.description_of_package}
                            </div>`);
                }
                document.getElementById("pList").innerHTML = str
            }
        }
    }, queryString);
};

getPackage();