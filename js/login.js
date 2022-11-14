function login (){

    let correo = document.getElementById('email').value;    //Crea estas dos variables para guardar los datos de email y contraseña ingresados.
    let contra = document.getElementById('contra').value;

    if (correo==="" && contra===""){            //Hacer un form y validaciones quedan más sencillas. Inputs con class form-control
        document.getElementById('email').classList.add('error');                
        document.getElementById('error-email').innerHTML = "Ingresa tu e-mail";
        document.getElementById('contra').classList.add('error');
        document.getElementById('error-contra').innerHTML = "Ingresa tu contraseña";
    } else if (correo===""){
        document.getElementById('email').classList.add('error');
        document.getElementById('error-email').innerHTML = "Ingresa tu e-mail";
    } else if (contra===""){
        document.getElementById('contra').classList.add('error');
        document.getElementById('error-contra').innerHTML = "Ingresa tu contraseña";
    } else {
        localStorage.setItem('email', correo);
        localStorage.setItem('contra', contra);
        location.href='index.html';
    }

}

document.addEventListener('DOMContentLoaded',()=>{

    document.getElementById('inicio').addEventListener('click',()=>{   //Hacer un form y usar el evento submit!!!
        login();
    })
})

/*function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  }*/