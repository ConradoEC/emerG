var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");
var hiddens = document.getElementsByClassName("hidden")
var showing = document.getElementsByClassName("showing")
const btnCadastro = document.getElementById("btnCadastro")
const btnEntrar = document.getElementById('btnEntrar')

var body = document.querySelector("body");


btnSignin.addEventListener("click", function () {
   body.className = "sign-in-js"; 
});

btnSignup.addEventListener("click", function () {
    body.className = "sign-up-js";
})

btnCadastro.addEventListener('click', function(){
    for(i = 0; i < hiddens.length; i++){
        hiddens[i].style.display = 'flex'
    }
    
    for(i = 0; i < showing.length; i++){
        showing[i].style.display = 'none'
    }
})

btnEntrar.addEventListener('click', function() {
    document.getElementById('notLoginAlert').style.display = 'none'

    var login = {
        email: `${emailUser.value}`,
        senha: `${senhaUser.value}`
    }
    login = JSON.stringify(login)
    login = JSON.parse(login)

    $.ajax({
        url: 'https://api-emer-g.vercel.app/login',
        method: 'POST',
        data: JSON.stringify(login),
        contentType: 'application/json'
    })
    .then((response) => {
        console.log(response)
        sessionStorage.clear()

        if(response[0].ong_cnpj) {
            sessionStorage.setItem('cnpj', `${response[0].ong_cnpj}`)
            sessionStorage.setItem('nome', `${response[0].ong_name}`)
            sessionStorage.setItem('email', `${response[0].ong_email}`)
            sessionStorage.setItem('telefone', `${response[0].ong_phone}`)
            sessionStorage.setItem('endereco', `${response[0].ong_address}`)
            sessionStorage.setItem('foto', `${response[0].ong_logo}`)
            sessionStorage.setItem('_id', `${response[0]._id}`)
            window.location.href = `../Perfil/?jjp=${response[0]._id}`
        }
        else if(response[0].cpf) {
            sessionStorage.setItem('cpf', `${response[0].cpf}`)
            sessionStorage.setItem('nome', `${response[0].nome}`)
            sessionStorage.setItem('email', `${response[0].email}`)
            sessionStorage.setItem('telefone', `${response[0].telefone}`)
            sessionStorage.setItem('endereco', `${response[0].endereco}`)
            sessionStorage.setItem('foto', `${response[0].foto}`)
            sessionStorage.setItem('_id', `${response[0]._id}`)
            window.location.href = `../Perfil/?jjp=${response[0]._id}`
        }
        else {
            document.getElementById('notLoginAlert').style.display = 'block'
        }
    })
    .catch((error) => {
        console.log(error)
    })
})