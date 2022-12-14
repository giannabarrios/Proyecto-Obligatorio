let productInfoObject = {};

function setProdID(id) {                    
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}

function showProductInfo(product){
    let htmlContentToAppend = "";
    let productinfo = product;
    
        htmlContentToAppend += `                               
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
        `
        document.getElementById("titulo").innerHTML = productinfo.name;
        document.getElementById("product-info-container").innerHTML = htmlContentToAppend; 
    
        //¡Desafiate Entrega 4!
        let arregloImagenes = productinfo.images;
        let imagenes = "";
        let i = 0;
        arregloImagenes.forEach(elemento=> { 
            if (i === 0){                       //le doy la clase active a la primera imagen para que sea visible el carrusel.
                imagenes += `
                <div class="carousel-item active">
                    <img src="${elemento}" class="d-block img-thumbnail">
                </div>
                `
            } else {
                imagenes += `       
                <div class="carousel-item">
                    <img src="${elemento}" class="d-block img-thumbnail">
                </div>
                `
            }
            i++;
            
        }); 
        document.getElementById("carouImagenes").innerHTML = imagenes;
        //Hasta acá el ¡Desafiate Entrega 4!

        let relacionados = "";
        for (let i =0; i< productinfo.relatedProducts.length; i++){
            let relatedProd = productinfo.relatedProducts[i];
            relacionados += `
            <div onclick="setProdID(${relatedProd.id})" class="col-4">
                <div class="col">
                    <div class="card-deck">
                    <div class="card" style="width: 21rem; height: 17rem;">
                        <img class="card-img-top" src=${relatedProd.image}>
                        <div class="card-body" style="padding-left: 10%;">
                            <div><h5 style="color: dark-gray;">${relatedProd.name}</h5></div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>    
            `
            document.getElementById("prod-relacionados").innerHTML = relacionados;
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
 
//¡Desafiate Entrega 3!
function esFecha(){      //función me da la fecha y hora actual
    let hoy = new Date();
    let dia = hoy.getDate();
    if (dia<10){
        dia = "0"+ dia;
    }
    let mes = hoy.getMonth() + 1;
    if (mes<10){
        mes = "0" + mes;
    }
    let anio = hoy.getFullYear();
    let hora = hoy.getHours();
    let minutos = hoy.getMinutes();
    let segundos = hoy.getSeconds();
    return anio + "-" + mes + "-" + dia + " " + hora + ":" + minutos + ":" + segundos;
}

function comentar(){   //función agrega comentario que hago al array de comentarios obtenido del json
    let nuevo ={}
    nuevo.user = "Me";
    nuevo.dateTime = esFecha();  //llama a la función para agregar fecha y hora actual de cuando se hace el comentario
    nuevo.score = document.getElementById('puntaje').value;
    nuevo.description = document.getElementById('comentario').value;
    productReviewsArray.push(nuevo); 
    showProductReviews(productReviewsArray); 
}
//Hasta acá ¡Desafiate Entrega 3!

//¡Desafiate 5!: botón Comprar
function comprar(product){
    let carrito = JSON.parse(localStorage.getItem("carritoLocalSto"));
    if((product.images !== undefined) && (product.images.length !== 0)){  //Tengo en cuenta el caso de que algún producto pueda no tener ninguna imagen adjunta.
        img = product.images[0]; 
    } else{
        img = "";  //o imagen en blanco
    }
    if(carrito == null){   //si no hay ningún carrito cargado en el localStorage, creo uno con el prod precargado + el prod que le di comprar.
        carrito = [{id: 50924, name: "Peugeot 208", count: 1, unitCost: 15200, currency: "USD", image: "img/prod50924_1.jpg"}];
        carrito.push({id: `${product.id}`, name: `${product.name}`, count: 1, unitCost: `${product.cost}`, currency: `${product.currency}`, image: `${img}`});
    } else{    //si ya hay carrito en el localStorage, agrego el prod que le di Comprar.
        let found = carrito.find(element => element.id == `${product.id}`);
        if (found == undefined){   //no se ha cargado aún ese producto en el carrito, entonces se agrega al arreglo carrito
            carrito.push({id: `${product.id}`, name: `${product.name}`, count: 1, unitCost: `${product.cost}`, currency: `${product.currency}`, image: `${img}`});
        }    
        else {  //caso en el que ya se le dio comprar a ese prod por lo menos una vez, aumenta la cant de ese artículo en 1.
            let index = carrito.findIndex(element => element.id == `${product.id}`);

            carrito[index].count = (parseInt(carrito[index].count)) + 1;
        }
    }

    //guardar carrito en localstorage
    localStorage.setItem("carritoLocalSto", JSON.stringify(carrito));
}    

//Hasta acá ¡Desafiate 5!


let prodID = localStorage.getItem("prodID");  //toma el id del prod que se guardó en el localStorage, una vez que el usuario seleccionó un producto.

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL + prodID + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productInfoObject = resultObj.data;
            showProductInfo(productInfoObject);
            document.getElementById('btnComprar').addEventListener('click', ()=>{
                comprar(productInfoObject);
            });
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL + prodID + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productReviewsArray = resultObj.data; 
            showProductReviews(productReviewsArray);
        }
    });
    document.getElementById('comentar').addEventListener('click',()=>{
        comentar();
    });
    
});