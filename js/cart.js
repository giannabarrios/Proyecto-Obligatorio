let infoCartObject = {};
const userID = "25801";
let subtotal = undefined;
let envios = document.getElementsByName("porcentaje");
let formasDePago = document.getElementsByName("formaPago");
let feedbackBtnSeleccionar = document.getElementById("feedbackSeleccionar");
let btnFinalizar = document.getElementById("btnFinalizar");

function showCartProducts(infoCartObject){
    let linea = "";                    //inforCartObjects.articles es el arreglo actualizado que contiene todos los productos comprados que compró el usuario.
    for (let i = 0; i < infoCartObject.articles.length; i++) {  //hago este for teniendo en cuenta que puede haber arreglos que tengan más de un artículo.
        let articuloComprado = infoCartObject.articles[i];
        
        linea += `
        <tr>
        <th><img src="${articuloComprado.image}" style="width: 60px;"></th>
        <td>${articuloComprado.name}</td>
        <td>${articuloComprado.currency} <span class="precio">${articuloComprado.unitCost}</span></td>
        <td><input name="cantidad" class="form-control w-25" type="number" min="1" value="${articuloComprado.count}" required></td>
        <td><strong><span class="moneda">${articuloComprado.currency}</span> <span class="subtotal">${articuloComprado.unitCost*articuloComprado.count}</span></strong></td>
        <td><i class="fas fa-trash-alt fa-lg fa-border eliminar" style="color: red; padding: 20% 20%; border-radius: 15% 15%; border-color: red;"></i></td>
        </tr>
        `

    document.getElementById("tabla").innerHTML = linea;
    };
}    

 function mostrarCostos(){         //Función que calcula y muestra el subtot de cada producto cargado en el carrito,
    let precios = document.getElementsByClassName("precio");       //también el subtot general, el costo de envío y el total,
    let cantidades = document.getElementsByName("cantidad");         //estos últimos tres siempre en USD, independientemente de    
    let subtotales = document.getElementsByClassName("subtotal");      //la moneda de cada producto.
    let subtotal = 0;
    let total = 0;

    let monedas = document.getElementsByClassName("moneda");  //chequea si el precio del producto está en UYU, lo pasa a USD para el cálculo de los costos totales.
    console.log(monedas);
    
    for (let i=0; i< monedas.length; i++){                                      
        let moneda = monedas[i];
        if (moneda.innerHTML == "UYU"){    
            subtotales[i].innerHTML = parseFloat(precios[i].innerHTML) * parseFloat(cantidades[i].value);
            subtotal += parseFloat((precios[i].innerHTML)/40) * parseFloat(cantidades[i].value);
        } else{
            subtotales[i].innerHTML = parseFloat(precios[i].innerHTML) * parseFloat(cantidades[i].value);
            subtotal += parseFloat(precios[i].innerHTML) * parseFloat(cantidades[i].value);  //suma de los subtot de cada prod
        }
    }

    let costoEnvio = 0;
    for (let j=0; j< envios.length; j++){     //cálculo del costo de envío según la opción elegida(input checked)
        if (envios[j].checked){
            costoEnvio = subtotal * parseFloat(envios[j].value);
            
        }
    }
    total = parseFloat((subtotal).toFixed(0)) + parseFloat((costoEnvio).toFixed(0));

    
    document.getElementById("subtotGeneral").innerHTML = subtotal;
    document.getElementById("costoEnvio").innerHTML = costoEnvio.toFixed(0);
    document.getElementById("total").innerHTML = total;
}

function multiplicar(i){    //Función devuelve subtotal de c/prod, para la cantidad actual que se esté comprando de ese prod
    let articulo = infoCartObject.articles[i];
    let precio = parseInt(articulo.unitCost);
    let cant = parseInt(document.getElementsByName("cantidad")[i].value);
    let subtotal = cant*precio;

    document.getElementsByClassName("subtotal")[i].innerHTML = subtotal;         
}

let nroTarj = document.getElementById("nroTarj");
let codTarj = document.getElementById("codTarj");
let vencTarj = document.getElementById("vencTarj");
let nroCta = document.getElementById("nroCta");
let opcCredito = document.getElementById("opcCredito");
let opcTransferencia = document.getElementById("opcTransferencia");

function opcionesDePago(){        //Habilita o desahibilita campos según forma de pago elegida
    if (opcCredito.checked){
        nroTarj.disabled = false;
        codTarj.disabled = false;
        vencTarj.disabled = false;
        nroTarj.required = true;   //si se elige Tarj de crédito, estos tres campos pasan a ser required.
        codTarj.required = true;
        vencTarj.required = true;
        nroCta.disabled = true;
        document.getElementById("opcSeleccionada").innerHTML = "Tarjeta de crédito";
    } else if(opcTransferencia) {
        nroTarj.disabled = true;
        codTarj.disabled = true;
        vencTarj.disabled = true;
        nroCta.disabled = false;
        nroCta.required = true;   //si se elige Transf Bancaria, este camp pasa a ser required.
        document.getElementById("opcSeleccionada").innerHTML = "Transferencia bancaria";
    }
}

function validaciones(){
    let premium = document.getElementById("prem");   
    let express = document.getElementById("exp");
    let standar = document.getElementById("stan");
    let validityState = true;

    if(!premium.checked && !express.checked && !standar.checked) {      //Validación de Forma de envío
        validityState = false;                 
    } 
    let cantidades = document.getElementsByName("cantidad");    //Validación ingreso de cantidad de cada prod
    for(let i=0; i< cantidades.length; i++){  
        if(!(cantidades[i]).checkValidity()){      //checkValidity chequea que se cumplan los atributos
            i =  cantidades.length; 
            validityState = false;
             
        }    
    }
    if(!(document.getElementById("calle")).checkValidity()) {    //Validaciones de los datos (calle, nro y esquina) de dirección
        (document.getElementById("calle")).classList.add("is-invalid");
        validityState = false; 
    } else {
        (document.getElementById("calle")).classList.remove("is-invalid");
        (document.getElementById("calle")).classList.add("is-valid");
    }
    if(!(document.getElementById("nro")).checkValidity()) {
        (document.getElementById("nro")).classList.add("is-invalid");
        validityState = false; 
    } else {
        (document.getElementById("nro")).classList.remove("is-invalid");
        (document.getElementById("nro")).classList.add("is-valid");
    }
    if(!(document.getElementById("esq")).checkValidity()) {
        (document.getElementById("esq")).classList.add("is-invalid");
        validityState = false; 
    } else {
        (document.getElementById("esq")).classList.remove("is-invalid");
        (document.getElementById("esq")).classList.add("is-valid");
    }

    for (let y=0; y< formasDePago.length; y++){             //Validación de Forma de Pago
        if (!(formasDePago[y]).checkValidity()){               
            y = formasDePago.length;
            validityState = false; 
            feedbackBtnSeleccionar.style.display = "block";
        } else {
            feedbackBtnSeleccionar.style.display = "none";
        }
    }
    if(opcCredito.checked){                //Validaciones de los campos según la forma de pago elegida
        if (!nroTarj.checkValidity() || !codTarj.checkValidity() || !vencTarj.checkValidity()){
            validityState = false; 
            feedbackBtnSeleccionar.style.display = "block";}
        else {
            feedbackBtnSeleccionar.style.display = "none";
        }
    };    
    if(opcTransferencia.checked){
        if (!nroCta.checkValidity()){
            validityState = false; 
            feedbackBtnSeleccionar.style.display = "block";}
        else {
            feedbackBtnSeleccionar.style.display = "none";
        }
    };
    return validityState;
}

//¡Desafiate 6! Eliminar producto del carrito 

function eliminar(pos){                       //Al actualizar aparece otra vez el producto!!!!
    let carrito = JSON.parse(localStorage.getItem("carritoLocalSto"));
    if(carrito !== null){
        carrito.splice(pos, 1);
        localStorage.setItem("carritoLocalSto", JSON.stringify(carrito));
        infoCartObject = {user: 25801, articles: carrito};
    } else {
        infoCartObject.articles.splice(pos, 1);
    }
    showCartProducts(infoCartObject);
    mostrarCostos();

}



document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL + userID + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            let carrito = JSON.parse(localStorage.getItem("carritoLocalSto"));
            console.log(carrito);
            if(carrito !== null){     //Si ya hay un carrito en el localStorage, entonces se define el objeto como ese carrito, y es el que se mostrará
                infoCartObject = {user: 25801, articles: carrito};
                console.log(infoCartObject);
            }
            else {
                infoCartObject = resultObj.data; //Si no hay un carrito en localSto, entonces se muestra el prod precargado solamente.
                console.log(infoCartObject);
            }     
            
            showCartProducts(infoCartObject);
            mostrarCostos();
            for (let i = 0; i < infoCartObject.articles.length; i++) {
                document.getElementsByName("cantidad")[i].addEventListener("change",function(){
                    
                    infoCartObject.articles[i].count = parseInt(document.getElementsByName("cantidad")[i].value);
                    if(carrito !== null){ 
                        carrito = infoCartObject.articles;
                        localStorage.setItem("carritoLocalSto", JSON.stringify(carrito));
                    }
                    mostrarCostos();
                });
            };
            for (let j = 0; j < envios.length; j++){
                envios[j].addEventListener("click",function(){
                    mostrarCostos();
                });
            };
            let arregloEliminar = document.getElementsByClassName("eliminar"); 
            for(let k = 0; k < arregloEliminar.length; k++){        //¡Desafiate 6! si se hace click en el ícono eliminar
                arregloEliminar[k].addEventListener("click",function(){    //de algún prod, se ejecuta la func eliminar
                    eliminar(k);                                           //para la posición de ese prod.     
                });
            };
                                
        }
    });
    for (let y = 0; y < formasDePago.length; y++){
        formasDePago[y].addEventListener("change",function(){
            opcionesDePago();
        })
    };  
    btnFinalizar.addEventListener("click", function(e){
        if (!validaciones()){
            e.preventDefault(); 
        } else {
            document.getElementById("alert-success").classList.add("show");   //se muestra el msj de que se compró correctamente
            window.setTimeout(function () {                       //con el método setTimeout le establezco un tiempo determinado a la alerta.
                document.getElementById("alert-success").classList.add("d-none");   //desaparece el msj de éxito
                location.reload();   //recarga la página, campos quedan vacíos.
            }, 6000);  
            
        }   
        ["change", "input"].forEach(evento => {document.body.addEventListener(evento, validaciones)}); //dentro del evento click del btn finalizar,
    });                                                                      //si se da algunos de estos eventos se ejecuta nuevamente la func validaciones.           
});