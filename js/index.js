document.addEventListener("DOMContentLoaded", function(){
    let correo = localStorage.getItem("email");
    let contrasena = localStorage.getItem("contra");

    if (correo == null || contrasena == null) {
        alert("¡Debes loggearte!");
        location.href='login.html';
    } else {
        document.getElementById("email-ingresado").innerHTML = correo;
    }
    document.getElementById("cierro").addEventListener("click", function() {
        alert("Cierro sesión");
        localStorage.removeItem("email");
        localStorage.removeItem("contra");
        location.href='login.html';
    })
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});