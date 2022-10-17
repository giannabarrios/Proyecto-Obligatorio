let infoCartObject = {};
const userID = "25801";
let subtotal = undefined;

function showCartProducts(infoCartObject){
    let linea = "";
    for (let i = 0; i < infoCartObject.articles.length; i++) {  //hago este for teniendo en cuenta que puede haber arreglos que tengan más de un artículo.
        let articuloComprado = infoCartObject.articles[i];
        
        linea += `
        <tr>
        <th><img src="${articuloComprado.image}" style="width: 60px;"></th>
        <td>${articuloComprado.name}</td>
        <td>${articuloComprado.currency} ${articuloComprado.unitCost}</td>
        <td><input name="cantidad" class="form-control w-25" type="number" min="1" value="${articuloComprado.count}"></td>
        <td><strong id="subtotal${i}">${articuloComprado.currency} ${articuloComprado.unitCost*articuloComprado.count}</strong></td>
        </tr>
        `

    document.getElementById("tabla").innerHTML = linea;
    }
}

function multiplicar(i){
    let articulo = infoCartObject.articles[i];
    let precio = parseInt(articulo.unitCost);
    let cant = parseInt(document.getElementsByName("cantidad")[i].value);
    let subtotal = articulo.currency + " " + cant*precio;

    document.getElementById("subtotal"+i).innerHTML = subtotal;         
}

/*function comprar(prodInfo){   //Para el Desafiate 5, aún en proceso...
    let lineaNueva = "";
    
        lineaNueva += `
        
        <th><img src="${prodInfo.images[0]}" style="width: 60px;"></th>
        <td>${prodInfo.name}</td>
        <td>${prodInfo.currency} ${prodInfo.cost}</td>
        <td><input name="cantidad" class="form-control w-25" type="number" min="1" value="1"></td>
        <td><strong id="s">${prodInfo.currency} ${prodInfo.cost}</strong></td>
        
        `
        document.getElementById("nuevoProd").innerHTML = lineaNueva;    
}*/



document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL + userID + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            infoCartObject = resultObj.data;
            showCartProducts(infoCartObject);
            for (let i = 0; i < infoCartObject.articles.length; i++) {
                document.getElementsByName("cantidad")[i].addEventListener("change",function(){
                    multiplicar(i);
                });
            };
                                
        }
    });
    /*document.getElementById("btnComprar").addEventListener('click',()=>{   //Para el Desafiate 5, aún en proceso...
        let prodID = localStorage.getItem("prodID");
        getJSONData(PRODUCT_INFO_URL + prodID + EXT_TYPE).then(function(resultObj){
            if (resultObj.status === "ok")
        {
            prodAComprar = resultObj.data;
            comprar(prodAComprar);
            
        }
        });
        
    });*/
});