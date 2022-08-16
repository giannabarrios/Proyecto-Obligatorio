function login (){

    let correo = document.getElementById('email').value;
    let contra = document.getElementById('contra').value;

    if (correo==="" && contra===""){
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
        sessionStorage.setItem('email', correo);
        sessionStorage.setItem('contra', contra);
        location.href='index.html';
    }

}

document.addEventListener('DOMContentLoaded',()=>{

    document.getElementById('inicio').addEventListener('click',()=>{
        login();
    })
})