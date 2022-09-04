let productsArray = [];

//Función que muestra el listado de productos, párametro de entrada el arreglo
function showProductsList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        let product = array[i];
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ product.name + ` - `+ product.currency +` `+ product.cost + `</h4> 
                        <p> `+ product.description +`</p> 
                        </div>
                        <small class="text-muted">` + product.soldCount + ` vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend; 
    }
    if (array.length === 0){          //condición para que cuando el resultado de filtrar sea un arreglo vacío
        htmlContentToAppend = "";     //entonces, se pueda mostrar el listado (vacío) de ese arreglo 
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend; 
    }
}

const porPrecioAsc = "+$";
const porPrecioDesc = "-$";
const porCantVendidos = "-Cant.";
let criterio = undefined;
let min = undefined;
let max = undefined;

//Función que filtra por precio y muestra el listado de los productos filtrados
function filtrar(array){
    let min = document.getElementById('min').value;
    let max = document.getElementById('max').value;

    if (((min != undefined) && (min != "") && (parseInt(min)) >= 0) && 
        ((max != undefined) && (max != "") && (parseInt(max)) >= 0)) {

        min = parseInt(min);
        max = parseInt(max);
        let arrayFiltrado = array.filter(product => product.cost >= min && product.cost <= max);
        showProductsList(arrayFiltrado);
    }
    else {showProductsList(array);} 
}

//Función que ordena el arreglo según un criterio, devuelve el arreglo ordenado
function sortProducts(criterio, array){
    let listaOrdenada = [];
    if (criterio === porPrecioAsc){
        listaOrdenada = array.sort(function(a,b) {
            if (a.cost < b.cost) {return -1;}
            if (a.cost > b.cost) {return 1;}
            return 0;
        })
    } else if (criterio === porPrecioDesc){
        listaOrdenada = array.sort(function(a,b) {
            if (a.cost > b.cost) {return -1;}
            if (a.cost < b.cost) {return 1;}
            return 0;
        })
    } else if (criterio === porCantVendidos){
        listaOrdenada = array.sort(function(a,b) {
            if (a.soldCount > b.soldCount) {return -1;}
            if (a.soldCount < b.soldCount) {return 1;}
            return 0;
        })
    }
    return array;
}

//Función que filtra, ordena el arreglo ya filtrado según criterio y muestra el listado de productos del
//arreglo (filtrado y ordenado)
function filterSortAndShowProducts(criterio, array){
    let min = document.getElementById('min').value;
    let max = document.getElementById('max').value;
    let arrayFiltrado = array;

    if (((min != undefined) && (min != "") && (parseInt(min)) >= 0) && 
        ((max != undefined) && (max != "") && (parseInt(max)) >= 0)) {

        min = parseInt(min);
        max = parseInt(max);
        arrayFiltrado = array.filter(product => product.cost >= min && product.cost <= max);
    }
    ordenada = sortProducts(criterio, arrayFiltrado);
    showProductsList(ordenada);
}

let catID = localStorage.getItem("catID");

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL + catID + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data.products;
            category = resultObj.data.catName;
            document.getElementById("nombre-categoria").innerHTML = category;
            document.getElementById("categoria").innerHTML = category;
            showProductsList(productsArray);
        }
    });
    document.getElementById("descen").addEventListener("click", function(){
        filterSortAndShowProducts(porPrecioDesc, productsArray);
    })
    document.getElementById("ascen").addEventListener("click", function(){
        filterSortAndShowProducts(porPrecioAsc, productsArray);
    })
    document.getElementById("descenRel").addEventListener("click", function(){
        filterSortAndShowProducts(porCantVendidos, productsArray);
    })
    document.getElementById("filtrar").addEventListener("click", function(){
        filtrar(productsArray);
    })
    document.getElementById("limpiar").addEventListener("click", function(){
        document.getElementById("min").value = "";
        document.getElementById("max").value = "";

        showProductsList(productsArray);
    })
});