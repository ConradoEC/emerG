const exit_btn = document.getElementById('exit_btn')
const input_forms = document.getElementsByClassName('input_forms')
const urlParams = new URLSearchParams(window.location.search)
const label_input = document.getElementsByClassName("label_input")
const signupMap = document.getElementById("signupMap")
const nextButtons = document.querySelectorAll('.next-btn');
const backButtons = document.querySelectorAll('.back-btn');
const formsEndereco = document.querySelector('#formsEndereco')
const formsCep = document.getElementById('formsCep')
const signupImg = document.getElementById('signupImg')
const input_signupImg = document.getElementById('input_signupImg')
const select_signup = document.getElementById('select_signup')
var nicho_signup = document.getElementById('nicho_signup')
const select_signup_class = document.getElementsByClassName("select_signup")
var imagemUser

var exampleMap = {lat: 0, lng: 0}

let currentStep = 0;
var newAccountBusiness = {
    cnpj: '',
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    endereco: '',
    cep: '',
    cidade: '',
    foto: '',
    descricao: '',
    checado: false,
    nicho: '',
    avaliacao: 0,
    lat: 0,
    lng: 0,
}

var newAccountPersonal = {
    cpf: '',
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    endereco: '',
    cep: '',
    cidade: '',
    foto: '',
    descricao: ''
}

var contentNewAccount = []


function updateProgress() {
    
    const bubbles = document.querySelectorAll('.signup-container:nth-child(' + (currentStep + 1) + ') .progress-bubble');
    
    document.querySelectorAll('.progress-bubble').forEach(bubble => {
        bubble.classList.remove('active');
    });

    if (bubbles[currentStep]) {
        bubbles[currentStep].classList.add('active');
    }
}

function initialize() {
    if(urlParams.get("type") == 'business'){
        label_input[0].innerText = "CNPJ"
        label_input[1].innerText = "Nome da instituição"
        label_input[2].innerText = "E-mail da instituição"
        select_signup_class[0].style.display = 'block'
        select_signup_class[1].style.display = 'block'

        $.ajax({
            url: 'https://api-emer-g.vercel.app/nichos', 
            method: 'GET',
            contentType: 'application/json'
        })
        .then((response) => {
            console.log(response)
            
            response.nichos.forEach((item) => {
                select_signup.innerHTML += `<option value="${item.nicho}">${item.nicho}</option>`
            })
        })
        .catch((error) => {
            console.log(error)
        })
        select_signup.innerHTML += '<option value="Outro">Outro</option>'
    }
}

// function sessionStorage(content) {
//     console.log(content.cnpj)
//     if(urlParams.get("type") == 'business') {
//         sessionStorage.setItem('cnpj', `${content.cnpj}`)
//         sessionStorage.setItem('nome', `${content.nome}`)
//         sessionStorage.setItem('email', `${content.email}`)
//         sessionStorage.setItem('telefone', `${content.telefone}`)
//         sessionStorage.setItem('endereco', `${content.endereco}`)
//     }
//     else if(urlParams.get("type") == 'personal') {
//         sessionStorage.setItem('cpf', `${content.cpf}`)
//         sessionStorage.setItem('nome', `${content.nome}`)
//         sessionStorage.setItem('email', `${content.email}`)
//     }
// }

nextButtons.forEach((button, index) => {
    if(button.id == '') {
        button.setAttribute("id", `${index}`)
        console.log('lsa')
    }

    button.addEventListener('click', async(event) => {
        var keepGoing = true
        var btnId = parseInt(event.target.id)

        console.log(btnId)

        switch(btnId){
            case 0: 
                console.log('primeiro botão')
                if(urlParams.get("type") == 'personal' && input_forms[0].value.length == 14) {
                    keepGoing = true
                } else if(urlParams.get("type") == 'business' && input_forms[0].value.length == 18) {
                    keepGoing = true
                }
                else {
                    alert("Está faltando digitos")
                    keepGoing = false
                }
                break
            case 1: 
                console.log('segundo botão')
                console.log(input_forms[4].value.length)
                if(input_forms[1].value.length > 0 && input_forms[2].value.length > 0 && input_forms[3].value.length == 19 && input_forms[4].value.length > 0) {
                    console.log(input_forms[4].value + ' -- ' + input_forms[5].value)
                    if(input_forms[4].value == input_forms[5].value) {
                        keepGoing = true
                    }
                    else {
                        alert("As senhas não estão correspondendo")
                        keepGoing = false
                    }
                }
                else {
                    alert("Está faltando digitos")
                    keepGoing = false
                }
                break
            case 2: 
                if(input_forms[6].value.length > 0 && exampleMap.lat != 0 && input_forms[7].value.length == 9) {
                    keepGoing = true
                }
                else {
                    alert("Está faltando digitos")
                    keepGoing = false
                }
                break
            case 3: 
                if(input_signupImg.files[0] != undefined) {

                    var formFile = new FormData()
                    formFile.append('files', imagemUser)

                    if(urlParams.get("type") == 'personal') {

                        newAccountPersonal.cpf = input_forms[0].value
                        newAccountPersonal.nome = input_forms[1].value
                        newAccountPersonal.email = input_forms[2].value
                        newAccountPersonal.telefone = input_forms[3].value
                        newAccountPersonal.senha = input_forms[4].value
                        newAccountPersonal.endereco = input_forms[6].value
                        newAccountPersonal.cep = input_forms[7].value
                        newAccountPersonal.cidade = input_forms[8].value
                        newAccountPersonal.foto = 'https://api-emer-g.vercel.app/downloadArchieve/'
                        newAccountPersonal.descricao = input_forms[9].value

                        contentNewAccount.push(newAccountPersonal)

                        console.log(contentNewAccount)

                        $.ajax({
                            url: 'https://api-emer-g.vercel.app/newUser',
                            method: 'POST',
                            data: JSON.stringify(contentNewAccount),
                            contentType: 'application/json'
                        })
                        .then((response) => {
                            // sessionStorage(newAccountPersonal)

                            newAccountPersonal = {
                                cpf: '',
                                nome: '',
                                email: '',
                                senha: '',
                                cep: '',
                                rua: '',
                                bairro: '',
                                numero: '',
                                foto: '',
                                descricao: ''
                            }
                            newAccountBusiness = {
                                cnpj: '',
                                nome: '',
                                email: '',
                                senha: '',
                                cep: '',
                                rua: '',
                                bairro: '',
                                numero: '',
                                foto: '',
                                descricao: ''
                            }
    
                            console.log(response)
    
                            $.ajax({
                                url: 'https://api-emer-g.vercel.app/uploadFile',
                                method: 'POST',
                                data: formFile,
                                processData: false,
                                contentType: false
                            })
                            .then((response) => {
                                console.log(response)
                                imagemUser = ''
                                window.location.href = "../LoginCadastro/";
                            })
                            .catch((error) => {
                                console.log(error)
                                imagemUser = ''
                            })
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                    }
                    else if(urlParams.get("type") == 'business') {
                        console.log(select_signup.value)
                        if(select_signup.value != '') {

                            newAccountBusiness.cnpj = input_forms[0].value
                            newAccountBusiness.nome = input_forms[1].value
                            newAccountBusiness.email = input_forms[2].value
                            newAccountBusiness.telefone = input_forms[3].value
                            newAccountBusiness.senha = input_forms[4].value
                            newAccountBusiness.endereco = input_forms[6].value
                            newAccountBusiness.cep = input_forms[7].value
                            newAccountBusiness.cidade = input_forms[8].value
                            newAccountBusiness.foto = ''
                            newAccountBusiness.descricao = input_forms[9].value
                            newAccountBusiness.lat = exampleMap.lat,
                            newAccountBusiness.lng = exampleMap.lng

                            if(nicho_signup.style.display == 'block' && nicho_signup.value != '') {
                                newAccountBusiness.nicho = `${nicho_signup.value}*new`
                                contentNewAccount.push(newAccountBusiness)
                                console.log(contentNewAccount)
                                $.ajax({
                                    url: 'https://api-emer-g.vercel.app/createOngs',
                                    method: 'POST',
                                    data: JSON.stringify(contentNewAccount),
                                    contentType: 'application/json'
                                })
                                .then((response) => {
                                    console.log(newAccountBusiness)
                                    // sessionStorage(newAccountBusiness)

                                    newAccountPersonal = {
                                        cpf: '',
                                        nome: '',
                                        email: '',
                                        senha: '',
                                        cep: '',
                                        rua: '',
                                        bairro: '',
                                        numero: '',
                                        foto: '',
                                        descricao: ''
                                    }
                                    newAccountBusiness = {
                                        cnpj: '',
                                        nome: '',
                                        email: '',
                                        senha: '',
                                        cep: '',
                                        rua: '',
                                        bairro: '',
                                        numero: '',
                                        foto: '',
                                        descricao: ''
                                    }
            
                                    console.log(response)
            
                                    $.ajax({
                                        url: 'https://api-emer-g.vercel.app/uploadFile',
                                        method: 'POST',
                                        data: formFile,
                                        processData: false,
                                        contentType: false
                                    })
                                    .then((response) => {
                                        console.log(response)
                                        imagemUser = ''
                                        window.location.href = "../LoginCadastro/";
                                    })
                                    .catch((error) => {
                                        console.log(error)
                                        imagemUser = ''
                                    })
                                })
                                .catch((error) => {
                                    console.log(error)
                                })
                            }
                            else if(nicho_signup.style.display == 'none') {
                                newAccountBusiness.nicho = `${select_signup.value}*old`
                                contentNewAccount.push(newAccountBusiness)
                                console.log(contentNewAccount)
                                $.ajax({
                                    url: 'https://api-emer-g.vercel.app/createOngs',
                                    method: 'POST',
                                    data: JSON.stringify(contentNewAccount),
                                    contentType: 'application/json'
                                })
                                .then((response) => {
                                    // sessionStorage(newAccountBusiness)

                                    newAccountPersonal = {
                                        cpf: '',
                                        nome: '',
                                        email: '',
                                        senha: '',
                                        cep: '',
                                        rua: '',
                                        bairro: '',
                                        numero: '',
                                        foto: '',
                                        descricao: ''
                                    }
                                    newAccountBusiness = {
                                        cnpj: '',
                                        nome: '',
                                        email: '',
                                        senha: '',
                                        cep: '',
                                        rua: '',
                                        bairro: '',
                                        numero: '',
                                        foto: '',
                                        descricao: ''
                                    }
            
                                    console.log(response)
            
                                    $.ajax({
                                        url: 'https://api-emer-g.vercel.app/uploadFile',
                                        method: 'POST',
                                        data: formFile,
                                        processData: false,
                                        contentType: false
                                    })
                                    .then((response) => {
                                        console.log(response)
                                        imagemUser = ''
                                        window.location.href = "../LoginCadastro/";
                                    })
                                    .catch((error) => {
                                        console.log(error)
                                        imagemUser = ''
                                    })
                                })
                                .catch((error) => {
                                    console.log(error)
                                })
                            }
                            else {
                                alert("Nenhum nicho selecionado.")
                                keepGoing = false
                            }
                        }
                        else {
                            alert("Nenhum nicho selecionado.")
                            keepGoing = false
                        }
                    }
                }
                else {
                    alert("Nenhuma imagem selecionada.")
                    keepGoing = false
                }
                break
            default: 
                alert("Algo deu errado. Veja se preencheu todos os campos corretamente.")
                keepGoing = false
                break
        }

        if(keepGoing == true) {
            currentStep++;
            updateVisibility();
            updateProgress();
            if(document.querySelectorAll('.signup-container')[2].style.display == 'flex') {
                initAutocomplete()
            }
        }
    });
});

backButtons.forEach(button => {
    button.addEventListener('click', () => {
     
        currentStep--;
        updateVisibility();
        updateProgress();
    });
});

function updateVisibility() {
    const signupContainers = document.querySelectorAll('.signup-container');
    signupContainers.forEach((container, index) => {
        container.style.display = index === currentStep ? 'flex' : 'none';
    });
}

exit_btn.addEventListener('click', function()
{
    window.location.href = '../LoginCadastro/'
})

async function initAutocomplete()
{
    autocomplete = await new google.maps.places.Autocomplete(
        formsEndereco,
        {
            types: ['address'],
            componentRestrictions: {'country': ['BR']},
            fields: ['place_id', 'address_components', 'geometry', 'formatted_address'],
            bounds: {east: -44.161383, west: -53.087639, north: -19.960703, south: -25.312421},
            strictBounds: true
        })

        autocomplete.addListener('place_changed', async function()
        {
            var place = await autocomplete.getPlace()
    
            console.log(place)

            if(place.geometry)
            {
                exampleMap = JSON.stringify(place.geometry.location)
                exampleMap = JSON.parse(exampleMap)
                console.log(place.address_components[3].long_name)

                input_forms[8].value = await place.address_components[3].long_name

                if(place.address_components.length >= 7) {
                    formsCep.value = place.address_components[6].long_name
                    formsCep.disabled = true

                } else if(place.address_components.length == 6) {
                    formsCep.value = place.address_components[5].long_name
                    input_forms[8].value = await place.address_components[2].long_name
                    formsCep.disabled = true
                
                } else {
                    formsCep.value = ''
                    input_forms[8].value = place.address_components[2].long_name
                    formsCep.disabled = false
                    formsCep.addEventListener('keypress', function(event) {
                        const cepLength = formsCep.value.length 
                        const keyCode = (event.keyCode ? event.keyCode : event.wich)
                        
                        if(keyCode > 47 && keyCode < 58) {
                            if(cepLength == 5) {
                                formsCep.value = `${formsCep.value}-`
                            }
                        }
                        else {
                            event.preventDefault()
                            alert("Apenas números são permitidos. Os caracteres especiais são preenchidos automaticamente.")
                        }
                    })
                }
                
                initMap()
            }
        }) 
}

input_forms[0].addEventListener('keypress', function(event)
{
    // Inicialmente foi utilizado o evento de "input", porém quando você digita o 3° caractere ele já adiciona o ".", ocasionando no erro onde você não consegue apagar esse ponto. Para resolver isso, foi utilizado o  "keypress" que só adiciona o "." quando você adiciona o 4° caractere, porque ele já verificou que o length é igual a 3.

    // Esse "keycode" vai receber um id. Esse id seria o id da tecla que foi apertada incluindo também um id para o mouse. O que sera feito é bloquear todos os ids que representam as letras e os caracteres especiais. Vale ressaltar que os keycodes dos números estão entre 47 e 58
    // Entre os "()" é uma verificação --> Se tiver um keycode (o "se" é representado por "?") então devolva o keycode, caso não tenha (representado por ":") devolva o w.wich
    const keyCode = (event.keyCode ? event.keyCode : event.wich)

    if(keyCode > 47 && keyCode < 58) {
        if(urlParams.get("type") == 'personal') {
    
            input_forms[0].maxlength = 14
    
            if(input_forms[0].value.length == 3){
    
                input_forms[0].value = input_forms[0].value + '.'
    
            } else if(input_forms[0].value.length == 7) {
    
                input_forms[0].value = `${input_forms[0].value}.`
    
            } else if(input_forms[0].value.length == 11) {
                
                input_forms[0].value = `${input_forms[0].value}-`
    
            } else if(input_forms[0].value.length == 14) {
    
                input_forms[0].value = input_forms[0].value
    
            }
    
        }
        else if(urlParams.get("type") == 'business') {
    
            input_forms[0].maxLength = 18
    
            if(input_forms[0].value.length == 2){
    
                input_forms[0].value = input_forms[0].value + '.'
    
            } else if(input_forms[0].value.length == 6) {
    
                input_forms[0].value = `${input_forms[0].value}.`
    
            } else if(input_forms[0].value.length == 10) {
                
                input_forms[0].value = `${input_forms[0].value}/`
    
            } else if(input_forms[0].value.length == 15) {
    
                input_forms[0].value = `${input_forms[0].value}-`
    
            }
        }
    }
    else {
        // Esse método faz com que a ação que o evento leu seja iguinorada. Nesse caso, não vai ser digitado nenhuma letra ou caractere
        event.preventDefault()
        alert("Apenas números são permitidos. Os caracteres especiais são preenchidos automaticamente.")
    }

})

input_forms[3].addEventListener('keypress', function(event) {
    const phoneLength = input_forms[3].value.length
    const keyCode = (event.keyCode ? event.keyCode : event.wich)

    if(keyCode > 47 && keyCode < 58) {
        if(phoneLength < 6) {
            input_forms[3].value = `+55 (`
        }
        else if(phoneLength == 7) {
            input_forms[3].value = `${input_forms[3].value}) `
        }
        else if(phoneLength == 8) {
            input_forms[3].value = `${input_forms[3].value} `
        }
        else if(phoneLength == 14) {
            input_forms[3].value = `${input_forms[3].value}-`
        }
    }
    else 
    {
        event.preventDefault()
        alert("Apenas números são permitidos. Os caracteres especiais são preenchidos automaticamente.")
    }
})

async function initMap() {
    locali_map = await new google.maps.Map(
        signupMap,
        {
            zoom: 13, 
            center: {lat: exampleMap.lat, lng: exampleMap.lng}
        }
    )

    marker = new google.maps.Marker({
        map: locali_map,
        position: {lat: exampleMap.lat, lng: exampleMap.lng},
        title: "Sua localidade"
    })
}

input_signupImg.addEventListener('input', function(){
    imagemUser = input_signupImg.files[0]

    var lerArquivo = new FileReader()
    lerArquivo.readAsDataURL(imagemUser)
    lerArquivo.onload = function(imagemUser64){
        console.log(imagemUser64.target.result)
        signupImg.style.setProperty('--backgroundSingUp', `url(${imagemUser64.target.result})`)
    }
})

select_signup.addEventListener("input", function() {
    if(select_signup.value == 'Outro') {
        select_signup_class[2].style.display = 'block'
        select_signup_class[3].style.display = 'block'
    }
    else {
        select_signup_class[2].style.display = 'none'
        select_signup_class[3].style.display = 'none'
        nicho_signup.value = ''
    }
})

initialize()
updateProgress();
updateVisibility();