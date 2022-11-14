const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
//let usuarios = [];

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}


document.addEventListener("DOMContentLoaded", function(){
  
  /*for (let i = 0; i < usuarios.length; i++){
    usuarios[i].email = '';
    usuarios[i].name1 = '';
    usuarios[i].name2= '';
    usuarios[i].lastname1 = '';
    usuarios[i].lastname2 = '';
    usuarios[i].tel = '';
  }*/

  //let usuariosGuardados = []
  //console.log(usuariosGuardados);

  let correo = localStorage.getItem("email");
  let contrasena = localStorage.getItem("contra");

  if (correo == null || contrasena == null) {
      alert("¡Debes loggearte!");
      location.href='login.html';
  } else {
      document.getElementById("email-ingresado").innerHTML = correo;
      /*if (!usuarios.includes(correo)){
        usuarios.push(correo);
        localStorage.setItem('listausuarios', usuarios);
      }*/
  }
  document.getElementById("carrito").addEventListener("click", function(){
    location.href='cart.html';
  });
  document.getElementById("perfil").addEventListener("click", function(){
    location.href='my-profile.html';
  });
  document.getElementById("cierro").addEventListener("click", function() {
      alert("Cierro sesión");
      localStorage.removeItem("email");
      localStorage.removeItem("contra");
      location.href='login.html';
  });
});  



//js de bootstrap: <script src="js/bootstrap.bundle.min.js"></script>