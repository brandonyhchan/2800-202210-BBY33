var orderView = sessionStorage.getItem("order");
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
    var order = orderView;
    var queryString;
    queryString = "orderId=" + order;
    ajaxGET("/display-order", function(data) {
        if (data) {
            let dataParsed = JSON.parse(data);
            if (dataParsed.status == "fail") {
                console.log("fail");
            } else {
                let total = 0;
                let str = `        <tr>
                    <th class="firstName_header"><span>Package</span></th>
                    <th class="lastName_header"><span>Quantity</span></th>
                    <th class="email_header"><span>Price</span></th>
                    </tr>`;
                    for (let i = 0; i < dataParsed.rows.length; i++) {
                        let row = dataParsed.rows[i];
                        str += ("<tr>" +
                            "<td class='packagedId'><span class='pId'>" + row.package_name +
                            "</span></td><td class='quantity'><span class='quant'>" + row.product_quantity +
                            "</span></td><td class='price'><span class='priceP'>" + row.price + ".00" +
                            `</span>` +
                            "</td></tr>");
                    }
                    document.getElementById("orderTable").innerHTML = str;
                    for(let i = 0; i < dataParsed.rows.length; i++) {
                        total += (parseInt(dataParsed.rows[i].price) * parseInt(dataParsed.rows[i].product_quantity));
                    }
                    document.getElementById("total").innerHTML = "Total:    " + "$" + total + ".00";
            }
        }
    }, queryString);
};

getPackage();