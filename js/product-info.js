let productInfoObject = {};

function showProductInfo(product){
    let htmlContentToAppend = "";
    let productinfo = product;
    
        htmlContentToAppend += `
        <div>
            <div class="mb-4 mt-4">
            <h4>${productinfo.name}</h4>
            </div>
            <hr>
            <div>
                <strong>Precio</strong>
                <p>${productinfo.currency} ${productinfo.cost}</p>
                <strong>Descripción</strong>
                <p>${productinfo.description}</p>
                <strong>Categoría</strong>
                <p>${productinfo.category}</p>
                <strong>Cantidad de vendidos</strong>
                <p>${productinfo.soldCount}</p>
                <p><strong>Imágenes ilustrativas</strong></p>
                
            </div>
        </div>
        `
        document.getElementById("product-info-container").innerHTML = htmlContentToAppend; 
        
        let imagenes = "";
        for (let i = 0; i < product.images.length; i++){
            let productImages = product.images[i];
            imagenes += `
                    <div class="col">
                        <img src=${productImages}  class="img-thumbnail">
                    </div>
            `
            document.getElementById("imagenes-container").innerHTML = imagenes;
        };    
};    


let productReviewsArray = [];   

function puntuacion(puntos){
    var estrellas='';
    for(let i = 1; i <= 5; i ++) {
       if (i<=puntos){
        estrellas += '<i class="fas fa-star" style="color: orange;"></i>'; //ícono estrella llena de color naranja.
       } else{
        estrellas += '<i class="far fa-star"></i>';//ícono contorno estrella
       }
    }
    
    return estrellas;
}    

function showProductReviews(array){        //función que muestra los comentarios del producto, tiene como parámetro de entrada un arreglo.
    let comentarios = "";

    comentarios = `<div class="container"><h5>Comentarios</h5></div>`
    for(let i = 0; i < array.length; i++){
    let productreview = array[i];
        estrellas = puntuacion(productreview.score);
        comentarios += `
        
        <div class="container list-group-item list-group-item-action">
            <div class="row">
            <div class="col">
            <strong>${productreview.user}</strong> - ${productreview.dateTime} - ${estrellas}
            <p>${productreview.description}</p>
            </div>
            </div>
        </div>
        `

        document.getElementById("product-reviews-container").innerHTML = comentarios;
    }
}


let prodID = localStorage.getItem("prodID");  //toma el id del prod que se guardó en el localStorage, una vez que el usuario seleccionó un producto.

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL + prodID + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productInfoObject = resultObj.data;
            showProductInfo(productInfoObject);
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL + prodID + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productReviewsArray = resultObj.data; 
            showProductReviews(productReviewsArray);
        }
    });

});