let profileEmail = localStorage.getItem("email");   //accedo al email ingresado en el login, que se guardó en localstorage

function saveEmail(email){    //Si el arreglo es null, o sea no existe en localStorage, entonces mostrar el email,
    let usuarios = JSON.parse(localStorage.getItem("usuariosGuardados"));  //si no es null entonces preguntar si está incluído 
    if(usuarios == null){
        document.getElementById("email").value = email;
    } else{
        found = usuarios.find(element => element.email == email);  //Si ese email ya está registrado, guardado en el arreglo de usuarios del localStorage, found devuelve ese objeto, sino devuelve undefined.
        if (found == undefined){  //no está el elemento, no fue registrado anteriormente ese usuario.
       
            document.getElementById("email").value = email;

        } 
        else {   //Ese usuario correspondiente a ese mail ya está registrado
            document.getElementById("email").value = email;
            
            let index = usuarios.findIndex(usuario => usuario.email == `${email}`); //devuelve el índice del objeto dentro del arreglo usuarios, 
                                                                                    //cuyo email es igual al que se ingresó en el login. Es decir ese usuario ya se registró anteriormente.             
            document.getElementById("name").value = usuarios[index].name1;              
            document.getElementById("secname").value = usuarios[index].name2;      //accedo a los datos guardados en el localStorage de ese usuario,
            document.getElementById("lastname").value = usuarios[index].lastname1;     //y muestro esos datos en los campos.
            document.getElementById("seclastname").value = usuarios[index].lastname2;
            document.getElementById("tel").value = usuarios[index].tel;
        }
    }
}

function saveInfo(){   
    let usuarios = JSON.parse(localStorage.getItem("usuariosGuardados"));

    let profileName1 = document.getElementById("name").value;    //valores ingresados en los campos.
    let profileLastname1 = document.getElementById("lastname").value;
    let profileName2 = document.getElementById("secname").value;
    let profileLastname2 = document.getElementById("seclastname").value;
    let profileTel = document.getElementById("tel").value;
    
    if(usuarios == null){  //No hay ningún usuario registrado. Entonces crea un arreglo vacío donde guardara los usuarios y guardará ese arreglo en localStorage.
    usuarios = [];    
    usuarios.push({email: `${profileEmail}`, name1: `${profileName1}`, name2: ``, lastname1: `${profileLastname1}`, lastname2: ``, tel: ``});

    console.log(usuarios);
    
    let lastUser = usuarios[usuarios.length-1];

    if(profileName2 !== undefined){
        lastUser.name2 = `${profileName2}`;    
    }
    if(profileLastname2 !== undefined){
        lastUser.lastname2 = `${profileLastname2}`; 
    }
    if(profileTel !== undefined){
        lastUser.tel= `${profileTel}`; 
    }

    }
    else {
        let found = usuarios.find(element => element.email == profileEmail);
        if (found == undefined){    //no está registrado ese usuario con ese email
            usuarios.push({email: `${profileEmail}`, name1: `${profileName1}`, name2: ``, lastname1: `${profileLastname1}`, lastname2: `""`, tel: `""`})

            console.log(usuarios);
    
        let lastUser = usuarios[usuarios.length-1];

        if(profileName2 !== ""){
            lastUser.name2 = `${profileName2}`;    
        }
        if(profileLastname2 !== ""){
            lastUser.lastname2 = `${profileLastname2}`; 
        }
        if(profileTel !== ""){
            lastUser.tel= `${profileTel}`; 
        }
        } else {     //si el usuario con ese email ya fue registrado anteriormente, y cambia alguno de los datos y vuelve a guardar. 
            let index = usuarios.findIndex(usuario => usuario.email == `${profileEmail}`);   //devuelve el índice del objeto donde se encuentran los datos de este usu
            if (profileName1 !== usuarios[index].name1){   //cada if consulta si el dato que se ingresó en el campo es igual al que ya está guardado
                usuarios[index].name1 = profileName1;       //de lo contrario guarda el dato actualizado.
            }
            if (profileLastname1 !== usuarios[index].lastname1){
                usuarios[index].lastname1 = profileLastname1;
            }
            if ((profileName2 !== undefined) && (profileName2 !== usuarios[index].name2)){
                usuarios[index].name2 = profileName2;
            }
            if ((profileLastname2 !== undefined) && (profileLastname2 !== usuarios[index].lastname2)){
                usuarios[index].lastname2 = profileLastname2;
            }
            if ((profileTel !== undefined) && (profileTel !== usuarios[index].tel)){
                usuarios[index].tel = profileTel;
            }
        }
    }

    localStorage.setItem("usuariosGuardados", JSON.stringify(usuarios));  //Guarda en el localStorage, el arreglo de usuarios actualizado.
}


let profileForm = document.getElementById("profile-info");
let btnGuardar = document.getElementById("guardar");

document.addEventListener("DOMContentLoaded", function(e){
    saveEmail(profileEmail);
    profileForm.addEventListener("submit", function(e){   
        if(!profileForm.checkValidity()){               
            e.preventDefault();
            e.stopPropagation();
            
        } else{
            e.preventDefault();
            e.stopPropagation();
            saveInfo();
        }
        profileForm.classList.add("was-validated");
        
    });
        
})