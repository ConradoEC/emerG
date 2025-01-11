const body = document.querySelector('body')
const perfilEmail = document.getElementById('perfilEmail')
const perfilName = document.getElementById('perfilName')
const perfilAddress = document.getElementById('perfilAddress')
const perfilPhone = document.getElementById('perfilPhone')
const perfilId = document.getElementById('perfilId')
const perfil_informations_image = document.getElementById('perfil_informations_image')
const headerBtnLogin = document.getElementById('headerBtnLogin') 
var modal_volunteerForms_requestInput = document.getElementsByClassName('modal_volunteerForms_requestInput')
const modal_volunteerForms_contentRequests = document.getElementById('modal_volunteerForms_contentRequests')
const modal_volunteerForms_close = document.getElementById('modal_volunteerForms_close')
// const modal_volunteer = document.getElementById('modal_volunteer')
const modal_volunteerForms_description = document.getElementById('modal_volunteerForms_description')
const modal_volunteerForms_functionInput = document.getElementById('modal_volunteerForms_functionInput')
const createVolunteers = document.getElementById('createVolunteers')
var categoryName = document.getElementsByClassName('categoryName')
var categoryNameActived = document.getElementsByClassName('categoryNameActived')
const inputCategory = document.getElementById('inputCategory')
const inputQuantivity_range = document.getElementById('inputQuantivity_range')
const inputQuantivity_span = document.getElementById('inputQuantivity_span')
const modal_achievement = document.getElementById('modal_achievement')
const noAchievement = document.getElementById('noAchievement')
const someAchievement = document.getElementById('someAchievement')
const achievementDescription = document.getElementById('achievementDescription')
const switchPeriodButton_week = document.getElementById('switchPeriodButton_week')
const switchPeriodButton_month = document.getElementById('switchPeriodButton_month')
const chartInformationsText = document.getElementsByClassName('chartInformationsText')
const inputAddDonate = document.getElementById('inputAddDonate')
const btnAddDonate = document.getElementById('btnAddDonate')
const donateTbody = document.getElementById('donateTbody')
const main_sectionBody = document.getElementById('main_sectionBody')
const main_sectionHeaderIcon = document.getElementsByClassName('main_sectionHeaderIcon')
const main_sectionHeader = document.getElementById('main_sectionHeader')
const main_sectionHeader_content = document.getElementsByClassName('main_sectionHeader_content')
const shownHidden = document.getElementsByClassName('shownHidden')
const aside_informations_post_drop = document.getElementsByClassName('aside_informations_post_drop')
const content_stars_bi = document.getElementsByClassName('content_stars_bi')
const donateMoneyCoin = document.getElementById('donateMoneyCoin')
const content_pixKey = document.getElementById('content_pixKey')
const pix = document.getElementById('pix')
const contentPayment = document.getElementById('contentPayment')
// const cardCredit = document.getElementById('cardCredit')
// const cardDebit = document.getElementById('cardDebit')
// const inputInformations_card = document.getElementsByClassName('inputInformations_card')
// const asideDonateModal_back = document.getElementById('asideDonateModal_back')
const contentLikeFollow_span = document.getElementsByClassName('contentLikeFollow_span')
const content_volunteers = document.getElementById('content_volunteers')
var box_volunteer = document.getElementsByClassName('box_volunteer')
var eraserVolunteer = document.getElementsByClassName('eraserVolunteer')
const contentLike_icon =  document.getElementById('contentLike_icon')
const contentFollow_btn = document.getElementById('contentFollow_btn')
var modal_volunteerForms_requestInput = document.getElementsByClassName('modal_volunteerForms_requestInput')
const modalView_volunteer = document.getElementById('modalView_volunteer')
const modalView_contentH1 = document.getElementById('modalView_contentH1')
const modalView_Description = document.getElementById('modalView_Description')
const modalView_contentRequests = document.getElementById('modalView_contentRequests')
const inputQuantivity = document.getElementById('inputQuantivity')
const followingStatistics = document.getElementById('followingStatistics')
const followerStatistics = document.getElementById('followerStatistics')


var inputsLength = 1
var idAccount = new URLSearchParams(window.location.search)
var likeOrNot = 0
var followOrNot = 0
var allDeleteVolunteers = []
var deletVolunteerCounter = true
var thisMeta = {
    idOng: sessionStorage.getItem('_id'),
    nomeItem: '',
    quant: 0,
    quantDoa: 0,
}


for(i = 0; i < main_sectionHeaderIcon.length; i++) {
    var shownHiddenCounter = 0
    main_sectionHeader_content[i].setAttribute('id', `${i}`)
    main_sectionHeader_content[i].addEventListener('click', function() {
        main_sectionHeaderIcon[shownHiddenCounter].classList.remove('main_sectionHeaderIcon_actived')
        main_sectionHeaderIcon[this.id].classList.add('main_sectionHeaderIcon_actived')
        main_sectionBody.style.setProperty('margin-left', `-${(this.id) * 100}%`)
        shownHidden[shownHiddenCounter].style.setProperty('height', '20vh')
        shownHidden[shownHiddenCounter].style.setProperty('overflow', 'hidden')
        shownHidden[this.id].style.setProperty('height', 'auto')
        shownHidden[shownHiddenCounter].style.setProperty('overflow', 'none')
        shownHiddenCounter = this.id
    })
}

function createModalsVolunteers(content) {
    if(content.length != undefined) {
        content.forEach(item => {
            const div = document.createElement('div')
            div.classList.add('box_volunteer')

            div.innerHTML = `
            <div class="volunteer" onclick="openModalViewVoluntee()">
                <i class="bi bi-eraser eraserVolunteer" id="${item.idVolunteer}"></i>
                <h1 class="volunteerTitle">${item.function}</h1>
                <ul class="contentVolunteerRequire">
                </ul>
                <p class="volunteerDescription">${item.description}</p>
            </div>`
        
            content_volunteers.appendChild(div)

            const contentVolunteerRequire = document.getElementsByClassName('contentVolunteerRequire')
            const todosRequests = item.requests.split('**')

            for(i = 0; i < (todosRequests.length - 1); i++) {
                const li = document.createElement('li')
                li.classList.add('volunteerRequire')
                li.innerText = todosRequests[i]
                contentVolunteerRequire[contentVolunteerRequire.length - 1].appendChild(li)
            }
        })
    }
    else {
        const div = document.createElement('div')
        div.classList.add('box_volunteer')
        
        div.innerHTML = `
        <div class="volunteer" onclick="openModalViewVoluntee()">
            <i class="bi bi-eraser eraserVolunteer" id="${content.idVolunteer}"></i>
            <h1 class="volunteerTitle">${content.function}</h1>
            <ul class="contentVolunteerRequire">
            </ul>
            <p class="volunteerDescription">${content.description}</p>
        </div>`
        
        content_volunteers.appendChild(div)

        const contentVolunteerRequire = document.getElementsByClassName('contentVolunteerRequire')
        const todosRequests = content.requests.split('**')

        for(i = 0; i < (todosRequests.length - 1); i++) {
            console.log(todosRequests[i])
            const li = document.createElement('li')
            li.classList.add('volunteerRequire')
            li.innerText = todosRequests[i]
            contentVolunteerRequire[contentVolunteerRequire.length - 1].appendChild(li)
        }
    }

    if(idAccount.get('jjp') != sessionStorage.getItem('_id') && idAccount.get('jjp') != '' && idAccount.get('jjp') != null) {
        for(i = 0; i < eraserVolunteer.length; i++) {
            eraserVolunteer[i].style.setProperty('display', 'none')
        }
    }

    box_volunteer = document.getElementsByClassName('box_volunteer')
    eraserVolunteer = document.getElementsByClassName('eraserVolunteer')
    deleteVolunteers()
}

function callVolunteers(info) {
    const idUserContent = {
        idUser: `${info}`
    }

    $.ajax({
        url: 'https://api-emer-g.vercel.app/volunteers',
        method: 'POST',
        data: JSON.stringify(idUserContent),
        contentType: 'application/json'
    })
    .then((response) => {
        if(response != [] && response != '') {
            createModalsVolunteers(response)
        }
    })
    .catch((error) => {
        console.log(error)
    })
}

function deleteVolunteers() {
    allDeleteVolunteers = []
    console.log(allDeleteVolunteers)
    for(i = 0; i < eraserVolunteer.length; i++) {
        allDeleteVolunteers.push(eraserVolunteer[i])
    }

    allDeleteVolunteers.forEach((item) => {
        item.addEventListener('click', function async() {
            if(deletVolunteerCounter == true) {
                deletVolunteerCounter = false
                $.ajax({
                    url: `https://api-emer-g.vercel.app/deleteVolunteer${item.id}`,
                    method: 'DELETE'
                })
                .then((response) => {
                    console.log(response)
                    deletVolunteerCounter = true
                    box_volunteer[allDeleteVolunteers.indexOf(item) + 1].style.setProperty('display', 'none')
                })
                .catch((error) => {
                    console.log(error)
                })
            }
        })
    })
}

function inputsClick() {
    modal_volunteerForms_requestInput = document.getElementsByClassName('modal_volunteerForms_requestInput')

    if(modal_volunteerForms_requestInput[modal_volunteerForms_requestInput.length - 1].value != '' && modal_volunteerForms_requestInput.length < 3) {
        const input = document.createElement('input')
        input.setAttribute('type', 'text')
        input.setAttribute('oninput', 'inputsClick()')
        input.classList.add('modal_volunteerForms_requestInput')
        modal_volunteerForms_contentRequests.appendChild(input)
    }
}

function openModalViewVoluntee() {
    switch(event.target.classList[0]) {
        case 'bi':
            break 
        case 'volunteerRequire':
            modalView_contentH1.innerText = event.target.parentNode.parentNode.getElementsByClassName('volunteerTitle')[0].innerText
            modalView_Description.innerText = event.target.parentNode.parentNode.getElementsByClassName('volunteerDescription')[0].innerText
            modalView_contentRequests.innerHTML = event.target.parentNode.parentNode.getElementsByClassName('contentVolunteerRequire')[0].innerHTML
            modalView_volunteer.style.setProperty('display', 'flex')
            break
        case 'volunteer':
            modalView_contentH1.innerText = event.target.getElementsByClassName('volunteerTitle')[0].innerText
            modalView_Description.innerText = event.target.getElementsByClassName('volunteerDescription')[0].innerText
            modalView_contentRequests.innerHTML = event.target.getElementsByClassName('contentVolunteerRequire')[0].innerHTML
            modalView_volunteer.style.setProperty('display', 'flex')
            break
        default:
            modalView_contentH1.innerText = event.target.parentNode.getElementsByClassName('volunteerTitle')[0].innerText
            modalView_Description.innerText = event.target.parentNode.getElementsByClassName('volunteerDescription')[0].innerText
            modalView_contentRequests.innerHTML = event.target.parentNode.getElementsByClassName('contentVolunteerRequire')[0].innerHTML
            modalView_volunteer.style.setProperty('display', 'flex') 
    }   
}

function clickStar() {
    for(i = 0; i < content_stars_bi.length; i++) {
        content_stars_bi[i].classList.remove('content_stars_biFull')
    }

    for(i = 0; i < (event.target.id); i++){
        content_stars_bi[i].classList.add('content_stars_biFull')
    }

    const infoStar = {
        type: 'star',
        idUser: sessionStorage.getItem('_id'),
        nameUser: sessionStorage.getItem('nome'),
        recentQuant: event.target.id,
        idOng: idAccount.get('jjp')
    }

    $.ajax({
        url: 'https://api-emer-g.vercel.app/likeOrFollow',
        method: 'POST',
        data: JSON.stringify(infoStar),
        contentType: 'application/json'
    })
    .then((response) => {
        console.log(response)
    })
    .catch((error) => {
        console.log(error)
    })
}

window.onload = async() => {
    inputQuantivity_span.style.setProperty('bottom', `${(10000 / 100) - 23}%`)
    if(idAccount.get('jjp') == sessionStorage.getItem('_id') || idAccount.get('jjp') == '' || idAccount.get('jjp') == null) {
        document.getElementById('headerBtnLogin').style.display = 'block'
        document.getElementById('userImage').style.display = 'none'
        document.getElementById('aside_perfil').style.setProperty('display', 'none')
        document.getElementById('aside_informations').style.setProperty('display', 'none')
        if(sessionStorage.getItem('cpf')) {
            perfilId.innerText = sessionStorage.getItem('cpf')
            // document.getElementsByClassName('li_perfil')[4].style.setProperty('display', 'none')
            main_sectionHeader.style.setProperty('display', 'none')
        }
        else if(sessionStorage.getItem('cnpj')) {
            perfilId.innerText = sessionStorage.getItem('cnpj')
            document.getElementById('aside_informations_donate').style.setProperty('display', 'flex')

            callVolunteers(sessionStorage.getItem('_id'))

            $.ajax({
                url: 'https://api-emer-g.vercel.app/allCategoriesDonate',
                method: 'GET'
            })
            .then((response) => {
                if(response != [] || response != '') {
                    response.forEach(item => {
                        const categorySpan = document.createElement('span')
                        categorySpan.classList.add('categoryName')
                        categorySpan.innerText = item.nameCategory
                        document.getElementsByClassName('categoryExamples')[0].appendChild(categorySpan)
                    })
    
                    categoryName = document.getElementsByClassName('categoryName')
                
                    for(i = 0; i < categoryName.length; i++) {
                        if(categoryName[i].classList[1] == 'categoryNameActived') {
                            categoryName[i].classList.remove('categoryNameActived')
                        }
                    
                        categoryName[i].addEventListener('click', function(e) {
                            for(i = 0; i < categoryName.length; i++) {
                                categoryNameActived = document.getElementsByClassName('categoryNameActived')
                                if(categoryNameActived.length != 0) {
                                    console.log(categoryNameActived.length)
                                    categoryNameActived[i].classList.remove('categoryNameActived')
                                }
                            }
                    
                            inputCategory.value = e.target.innerText
                            thisMeta.nomeItem = `${e.target.innerText}__old`
                            this.classList.add('categoryNameActived')
                        })
                    }
                }
            })
            .catch((error) => {
                console.log(error)
            })

            const myMeta = {
                idOng: sessionStorage.getItem('_id')
            }

            $.ajax({
                url: 'https://api-emer-g.vercel.app/myMeta',
                method: 'POST',
                data: JSON.stringify(myMeta),
                contentType: 'application/json'
            })
            .then((response) => {
                console.log(response)
                if(response != [] && response != '') {
                    console.log(response[0])
                    console.log(document.getElementsByClassName('content_achievementProgress')[2])
                    noAchievement.style.setProperty('display', 'none')
                    someAchievement.style.setProperty('display', 'flex')
                    document.getElementsByClassName('achievementText')[1].innerText = response[0].nomeItem
                    document.getElementsByClassName('achievementProgressText')[1].innerText = `${response[0].quantDoa} unidades de ${response[0].quant}`

                    document.getElementsByClassName('content_achievementProgress')[2].addEventListener('mouseover', function() {
                        document.getElementsByClassName('achievementProgress')[1].style.setProperty('width', `${(response[0].quantDoa * 100) / response[0].quant}%`)
                    })
                }
            })
            .catch((error) => {
                console.log(error)
            })

            const allMyLikesFollowersStars = {
                idOng: sessionStorage.getItem('_id')
            }
    
            $.ajax({
                url: 'https://api-emer-g.vercel.app/allMyLikesFollowersStars',
                method: 'POST',
                data: JSON.stringify(allMyLikesFollowersStars),
                contentType: 'application/json'
            })
            .then((response) => {
                if(response != [[], []] || response != '') {
                    var totalStar = 0
                    var divideStar = 0
                    var totalLike = 0
                    response[0].forEach(item => {
                        switch (item.type) {
                            case 'star': 
                                divideStar = divideStar + 1
                                totalStar = totalStar + item.recentQuant
                                break
                            case 'follower':
                                const thisSpan = document.createElement('span')
                                thisSpan.classList.add('follower')
                                thisSpan.innerText = item.nameUser
                                followerStatistics.appendChild(thisSpan)
                                break
                            case 'like':
                                totalLike = totalLike + 1 
                                break
                            default:
                        }
                    })

                    response[1].forEach(item => {
                        if(item.type == 'follower') {
                            const thisSpan = document.createElement('span')
                            thisSpan.classList.add('following')
                            thisSpan.innerText = item.nameOng
                            followingStatistics.appendChild(thisSpan)
                        }
                    })

                    if(totalStar == 0) {
                        document.getElementById('content_feedbackInformations').innerHTML = `<span><b>Em média:</b> 0  estrelas</span>`
                    }
                    else {
                         document.getElementById('content_feedbackInformations').innerHTML = `<span><b>Em média:</b> ${(totalStar / divideStar).toFixed(0)} estrelas</span>`
                    }
                    document.getElementById('content_follower_span').innerText = `Seguidores (${document.getElementsByClassName('follower').length})`
                    document.getElementById('content_followingStatistics_span').innerText = `Seguindo (${document.getElementsByClassName('following').length})`
                    document.getElementById('content_totalLikes').innerHTML = `<h1>Curtidas</h1><p><b>Curtidas totais:</b> ${totalLike}</p>`
                }
                else {
                    document.getElementById('content_follower_span').innerText = `Ocorreu um erro`
                    document.getElementById('content_followingStatistics_span').innerText = `Ocorreu um erro`
                    document.getElementById('content_feedbackInformations').innerHTML = `<span><b>Ocorreu um erro</b></span>`
                    document.getElementById('content_totalLikes').innerHTML = `<h1>Ocorreu um erro</h1>`                
                }
            })
            .catch((error) => {
                console.log(error)
            })
        }

        perfilEmail.innerText = sessionStorage.getItem('email')
        perfilName.innerText = sessionStorage.getItem('nome')
        perfilAddress.innerText = sessionStorage.getItem('endereco')
        perfilPhone.innerText = sessionStorage.getItem('telefone')
        perfil_informations_image.src = sessionStorage.getItem('foto')

    }
    else {
        const idUserContent = {
            idUser: `${idAccount.get('jjp')}`
        }

        await $.ajax({
            url: 'https://api-emer-g.vercel.app/login',
            method: 'POST',
            data: JSON.stringify(idUserContent),
            contentType: 'application/json'
        })
        .then((response) => {
            console.log(response)
            perfilEmail.innerText = response.ong_email
            perfilName.innerText = response.ong_name
            perfilAddress.innerText = response.ong_address
            perfilPhone.innerText = response.ong_phone
            perfilId.innerText = response.ong_cnpj
            perfil_informations_image.src = response.ong_logo
            document.getElementsByClassName('contentLikeFollow_span')[0].innerText = `Curtidas totais: ${response.ong_likes + 1}`
            document.getElementsByClassName('contentLikeFollow_span')[1].innerText = `Seguidores totais: ${response.ong_followers + 1}`
        })
        .catch((error) => {
            console.log(error)
        })

        callVolunteers(idAccount.get('jjp'))

        $.ajax({
            url: 'https://api-emer-g.vercel.app/myLikeFollower',
            method: 'POST',
            data: JSON.stringify({idUser: sessionStorage.getItem('_id'), idOng: idAccount.get('jjp')}),
            contentType: 'application/json'
        })
        .then((response) => {
            console.log(response)

            response.forEach(item => {
                if(item.type == 'like') {
                    contentLikeFollow_span[0].classList.add('contentLikeFollow_animation')
                    document.getElementById('contentLike_div').style.width = `${window.getComputedStyle(contentLikeFollow_span[0]).width}`
                    document.getElementById('contentLike_div').style.height = `${window.getComputedStyle(contentLikeFollow_span[0]).height}`
                    contentLike_icon.style.color = 'red'
                    contentLike_icon.style.cursor = 'auto'
                    likeOrNot = 1
                    contentLikeFollow_span[0].innerText = `Curtidas totais: ${contentLikeFollow_span[0].innerText.split(' ')[2] - 1}`
                }
                else if(item.type == 'follower'){
                    contentLikeFollow_span[1].classList.add('contentLikeFollow_animation')
                    document.getElementById('contentFollow_div').style.width = `${window.getComputedStyle(contentLikeFollow_span[1]).width}`
                    document.getElementById('contentFollow_div').style.height = `${window.getComputedStyle(contentLikeFollow_span[1]).height}`
                    contentFollow_btn.style.color = 'white'
                    contentFollow_btn.style.backgroundColor = '#266ea9'
                    contentFollow_btn.innerText = 'Seguindo'
                    contentFollow_btn.style.cursor = 'auto'
                    followOrNot = 1
                    contentLikeFollow_span[1].innerText = `Curtidas totais: ${contentLikeFollow_span[1].innerText.split(' ')[2] - 1}`
                }
                else if(item.type == 'star'){
                    for(i = 0; i < item.recentQuant; i++) {
                        content_stars_bi[i].classList.add('content_stars_biFull')
                    }
                }
            })

            // if(response.length == 2) {
            //         contentLikeFollow_span[0].classList.add('contentLikeFollow_animation')
            //         document.getElementById('contentLike_div').style.width = `${window.getComputedStyle(contentLikeFollow_span[0]).width}`
            //         document.getElementById('contentLike_div').style.height = `${window.getComputedStyle(contentLikeFollow_span[0]).height}`
            //         contentLike_icon.style.color = 'red'
            //         contentLike_icon.style.cursor = 'auto'

            //         contentLikeFollow_span[1].classList.add('contentLikeFollow_animation')
            //         document.getElementById('contentFollow_div').style.width = `${window.getComputedStyle(contentLikeFollow_span[1]).width}`
            //         document.getElementById('contentFollow_div').style.height = `${window.getComputedStyle(contentLikeFollow_span[1]).height}`
            //         contentFollow_btn.style.color = 'white'
            //         contentFollow_btn.style.backgroundColor = '#266ea9'
            //         contentFollow_btn.innerText = 'Seguindo'
            //         contentFollow_btn.style.cursor = 'auto'
            //         followOrNot = 1
            //         likeOrNot = 1

            //         console.log(contentLikeFollow_span[0].innerText.split(' ')[2])
            //         contentLikeFollow_span[0].innerText = `Curtidas totais: ${contentLikeFollow_span[0].innerText.split(' ')[2] - 1}`
            //         contentLikeFollow_span[1].innerText = `Curtidas totais: ${contentLikeFollow_span[1].innerText.split(' ')[2] - 1}`
            // }
            // else if(response.length == 1) {
            //     if(response[0].type == 'like') {
            //         contentLikeFollow_span[0].classList.add('contentLikeFollow_animation')
            //         document.getElementById('contentLike_div').style.width = `${window.getComputedStyle(contentLikeFollow_span[0]).width}`
            //         document.getElementById('contentLike_div').style.height = `${window.getComputedStyle(contentLikeFollow_span[0]).height}`
            //         contentLike_icon.style.color = 'red'
            //         contentLike_icon.style.cursor = 'auto'
            //         likeOrNot = 1
            //         contentLikeFollow_span[0].innerText = `Curtidas totais: ${contentLikeFollow_span[0].innerText.split(' ')[2] - 1}`
            //     }
            //     else if(response[0].type == 'follower') {
            //         contentLikeFollow_span[1].classList.add('contentLikeFollow_animation')
            //         document.getElementById('contentFollow_div').style.width = `${window.getComputedStyle(contentLikeFollow_span[1]).width}`
            //         document.getElementById('contentFollow_div').style.height = `${window.getComputedStyle(contentLikeFollow_span[1]).height}`
            //         contentFollow_btn.style.color = 'white'
            //         contentFollow_btn.style.backgroundColor = '#266ea9'
            //         contentFollow_btn.innerText = 'Seguindo'
            //         contentFollow_btn.style.cursor = 'auto'
            //         followOrNot = 1
            //         contentLikeFollow_span[1].innerText = `Curtidas totais: ${contentLikeFollow_span[1].innerText.split(' ')[2] - 1}`
            //     }
            // }
        })
        .catch((error) => {
            console.log(error)
        })

        const myMeta = {
            idOng: idAccount.get('jjp')
        }

        $.ajax({
            url: 'https://api-emer-g.vercel.app/myMeta',
            method: 'POST',
            data: JSON.stringify(myMeta),
            contentType: 'application/json'
        })
        .then((response) => {
            if(response != [] && response != '') {
                console.log(response)
                console.log(response[0])
                console.log(document.getElementsByClassName('content_achievementProgress')[2])
                noAchievement.style.setProperty('display', 'none')
                document.getElementById('someAchievementVisitor').style.setProperty('display', 'flex')
                document.getElementsByClassName('achievementText')[0].innerText = response[0].nomeItem
                document.getElementsByClassName('achievementProgressText')[0].innerText = `${response[0].quantDoa} unidades de ${response[0].quant}`

                document.getElementsByClassName('content_achievementProgress')[0].addEventListener('mouseover', function() {
                    document.getElementsByClassName('achievementProgress')[0].style.setProperty('width', `${(response[0].quantDoa * 100) / response[0].quant}%`)
                })
            }
            else {
                document.getElementsByClassName('content_achievement')[0].style.display = 'none'
            }
        })
        .catch((error) => {
            console.log(error)
        })

        document.getElementById('headerBtnLogin').style.display = 'none'
        document.getElementById('userImage').style.display = 'block'
        if(sessionStorage.getItem('cpf')) {
            document.getElementById('btnPerfilType').innerText = 'Cidadão'
        }
        else if(sessionStorage.getItem('cnpj')) {
            document.getElementById('btnPerfilType').innerText = 'Organização'
        }

        document.getElementById('post_arroba').innerText = sessionStorage.getItem('email')
        document.getElementById('aside_post_perfil_img').src = sessionStorage.getItem('foto')
        document.getElementById('perfil_contentVisitor').style.setProperty('display', 'block')
        for(i = 0; i < (aside_informations_post_drop.length - 1); i++) {
            aside_informations_post_drop[i].style.setProperty('display', 'flex')
        }
        main_sectionHeader_content[2].style.setProperty('display', 'none')
        main_sectionHeader_content[3].style.setProperty('display', 'none')
        createVolunteers.style.setProperty('display', 'none')
    }
}





headerBtnLogin.addEventListener('click', function(){
    sessionStorage.clear()
    window.location.href = '../LoginCadastro/index.html'
})

console.log("Esse é o length: " + modal_volunteerForms_requestInput.length)

modal_volunteerForms_close.addEventListener('click', function() {
    body.style.setProperty('overflow', 'auto')
    document.getElementById('modal_volunteer').style.setProperty('display','none')
    modal_volunteerForms_requestInput[0].value = ''
    modal_volunteerForms_description.value = ''
    modal_volunteerForms_functionInput.value = ''
    modal_volunteerForms_contentRequests.innerHTML = '<input type="text" class="modal_volunteerForms_requestInput" oninput="inputsClick()">'
})

createVolunteers.addEventListener('click', function() {
    body.style.setProperty('overflow', 'hidden')
    document.getElementById('modal_volunteer').style.setProperty('display', 'block')
})

document.getElementById('achievementAdd').addEventListener('click', function() {

})

inputCategory.addEventListener('input', function() {
    for(i = 0; i < categoryName.length; i++) {
        if(categoryName[i].classList[1] == 'categoryNameActived') {
            categoryName[i].classList.remove('categoryNameActived')
        }
    }
})

inputQuantivity_range.addEventListener('input', function() {
    if(inputQuantivity_span.style.bottom.split('%')[0] <= 0) {
        inputQuantivity_span.style.bottom = '0%'
    }
    else if(inputQuantivity_span.style.bottom.split('%')[0] >= 91) {
        inputQuantivity_span.style.bottom = '91%'
    }
    inputQuantivity_span.innerText = inputQuantivity_range.value
    if(inputQuantivity_span.style.bottom.split('%')[0] < -8.66) {
        inputQuantivity_span.style.bottom = '0%'
    }
})

inputQuantivity_range.addEventListener('click', function() {
    inputQuantivity.value = inputQuantivity_range.value
})

document.getElementById('modal_achievementForms_close').addEventListener('click', function() {
    modal_achievement.style.setProperty('display', 'none')
    inputCategory.value = ''
    for(i = 0; i < categoryName.length; i++) {
        if(categoryName[i].classList[1] == 'categoryNameActived') {
            categoryName[i].classList.remove('categoryNameActived')
        }
    }
    inputQuantivity_range.value = 5000
    inputQuantivity.value = ''
})

document.getElementById('achievementAdd').addEventListener('click', function() {
    modal_achievement.style.setProperty('display', 'block')
})

// switchPeriodButton_week.addEventListener('click', function() {
//     this.classList.add('switchPeriodButton_actived')
//     switchPeriodButton_month.classList.remove('switchPeriodButton_actived')


//     for(i = 0; i < document.getElementsByClassName('ul_chartNumber').length; i++) {
//         chartInformationsText[i].innerText = `${i + 1}° Semana`
//         document.getElementsByClassName('ul_chartNumber')[i].innerText = `${60 - (i * 20)} -`
//         document.getElementsByClassName('chartColumn')[i].style.setProperty('height', '60%')
//     }
// })

// switchPeriodButton_month.addEventListener('click', function() {
//     this.classList.add('switchPeriodButton_actived')
//     switchPeriodButton_week.classList.remove('switchPeriodButton_actived')

//     for(i = 0; i < document.getElementsByClassName('ul_chartNumber').length; i++) {
//         chartInformationsText[i].innerText = `${i + 1}° Mês`
//         document.getElementsByClassName('ul_chartNumber')[i].innerText = `${15 - (i * 5)} -`
//         document.getElementsByClassName('chartColumn')[i].style.setProperty('height', '30%')
//     }
// })

// btnAddDonate.addEventListener('click', function() {
//     if(inputAddDonate.value != '') {
//         donateTbody.innerHTML += 
//         `<tr>
//             <td class="elementTable ${'1'}">${inputAddDonate.value}</td>
//             <td class="elementTable ${'1'}"></td>
//         </tr>`
//     }

//     inputAddDonate.value = ''
// })

// donateMoneyCoin.addEventListener('click', function() {
//     content_asideDonateModal.style.setProperty('display', 'block')
//     document.getElementById('asideDonateModal').classList.add('moveAsideDonateModal')
// })

document.getElementById('asideDonateModal_close').addEventListener('click', function() {
    document.getElementById('content_asideDonateModal').style.setProperty('display', 'none')
    // document.getElementById('contentPayment_paymentCards').classList.add('contentPayment_payment_hover')
    // document.getElementById('titleFormsInformations').innerText = 'Crébito'
    content_pixKey.style.setProperty('display', 'none')
    // document.getElementsByClassName('cardsOptions')[2].style.setProperty('display', 'flex')
    // cardCredit.classList.remove('cardsChooseCredit')
    // cardDebit.classList.remove('cardsChooseDebit')
    // document.getElementById('content_cards').style.setProperty('display', 'none')
    contentPayment.style.setProperty('display', 'flex')
})

pix.addEventListener('click', function() {
    contentPayment.style.setProperty('display', 'none')
    content_pixKey.style.setProperty('display', 'flex')
})

contentLike_icon.addEventListener('click', function() {
    if(likeOrNot == 0) {
        contentLikeFollow_span[0].classList.add('contentLikeFollow_animation')
        document.getElementById('contentLike_div').style.width = `${window.getComputedStyle(contentLikeFollow_span[0]).width}`
        document.getElementById('contentLike_div').style.height = `${window.getComputedStyle(contentLikeFollow_span[0]).height}`
        this.style.color = 'red'
        likeOrNot = 1

        const contentLikeData = {
            type: 'like',
            idUser: sessionStorage.getItem('_id'),
            nameUser: sessionStorage.getItem('nome'),
            recentQuant: document.getElementsByClassName('contentLikeFollow_span')[0].innerText.split(' ')[2],
            idOng: idAccount.get('jjp'),
            nameOng: document.getElementById('perfilName').innerText
        }
    
        $.ajax({
            url: 'https://api-emer-g.vercel.app/likeOrFollow',
            method: 'POST',
            data: JSON.stringify(contentLikeData),
            contentType: 'application/json'
        })
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
    }
    // else {
    //     contentLikeFollow_span[0].classList.remove('contentLikeFollow_animation')
    //     document.getElementById('contentLike_div').style.width = `0px`
    //     document.getElementById('contentLike_div').style.height = `0px`
    //     this.style.color = 'black'
    //     likeOrNot = 0
    // }
})

contentFollow_btn.addEventListener('click', function() {
    if(followOrNot == 0) {
        contentLikeFollow_span[1].classList.add('contentLikeFollow_animation')
        document.getElementById('contentFollow_div').style.width = `${window.getComputedStyle(contentLikeFollow_span[1]).width}`
        document.getElementById('contentFollow_div').style.height = `${window.getComputedStyle(contentLikeFollow_span[1]).height}`
        this.style.color = 'white'
        this.style.backgroundColor = '#266ea9'
        this.innerText = 'Seguindo'
        followOrNot = 1

        const contentFollowerData = {
            type: 'follower',
            idUser: sessionStorage.getItem('_id'),
            nameUser: sessionStorage.getItem('nome'),
            recentQuant: document.getElementsByClassName('contentLikeFollow_span')[1].innerText.split(' ')[2],
            idOng: idAccount.get('jjp'),
            nameOng: document.getElementById('perfilName').innerText
        }
    
        $.ajax({
            url: 'https://api-emer-g.vercel.app/likeOrFollow',
            method: 'POST',
            data: JSON.stringify(contentFollowerData),
            contentType: 'application/json'
        })
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
    }
    // else {
    //     contentLikeFollow_span[1].classList.remove('contentLikeFollow_animation')
    //     document.getElementById('contentFollow_div').style.width = `0px`
    //     document.getElementById('contentFollow_div').style.height = `0px`
    //     this.style.color = 'black'
    //     this.style.backgroundColor = 'whitesmoke'
    //     this.innerText = 'Seguindo'
    //     followOrNot = 0
    // }
})

document.getElementById('modal_volunteerForms_button').addEventListener('click', function() {
    const idVolunteerCount = Math.floor(Math.random() * (1000 - 0 + 1)) + 0
    if(modal_volunteerForms_functionInput.value != '' && modal_volunteerForms_requestInput[0].value != '' && modal_volunteerForms_description.value != '') {
        
        var allRequestsInput = ''

        for(i = 0; i < modal_volunteerForms_requestInput.length; i++) {
            if(modal_volunteerForms_requestInput[i].value != '') {
                allRequestsInput += `${modal_volunteerForms_requestInput[i].value}**`
            }
        }

        allRequestsInput += 'nada'
        
        const volunteerContent = {
            function: modal_volunteerForms_functionInput.value,
            requests: allRequestsInput,
            description: modal_volunteerForms_description.value,
            ongId: sessionStorage.getItem('_id'),
            idVolunteer: idVolunteerCount
        }

        $.ajax({
            url: 'https://api-emer-g.vercel.app/newVolunteer',
            method: 'POST',
            data: JSON.stringify(volunteerContent),
            contentType: 'application/json'
        })
        .then((response) => {
            console.log(response)
            body.style.setProperty('overflow', 'auto')
            document.getElementById('modal_volunteer').style.setProperty('display','none')
            modal_volunteerForms_requestInput[0].value = ''
            modal_volunteerForms_description.value = ''
            modal_volunteerForms_functionInput.value = ''
            modal_volunteerForms_contentRequests.innerHTML = '<input type="text" class="modal_volunteerForms_requestInput" oninput="inputsClick()">'

            createModalsVolunteers(volunteerContent)
        })
        .catch((error) => {
            console.log(error)
        })
    }
})

document.getElementById('modalView_close').addEventListener('click', function() {
    modalView_volunteer.style.setProperty('display', 'none')
})

document.getElementById('sendMeta').addEventListener('click' , function() {
    thisMeta.quant = inputQuantivity.value

    if(thisMeta.nomeItem == '') {
        thisMeta.nomeItem = `${inputCategory.value}__new`
    }
    else if(thisMeta.nomeItem.split('__')[0] != inputCategory.value) {
        thisMeta.nomeItem = `${inputCategory.value}__new`
    }

    $.ajax({
        url: 'https://api-emer-g.vercel.app/newMeta',
        method: 'POST',
        data: JSON.stringify(thisMeta),
        contentType: 'application/json'
    })
    .then((response) => {
        thisMeta = {
            idOng: sessionStorage.getItem('_id'),
            nomeItem: '',
            quant: 0,
            quantDoa: 0,
        }

        modal_achievement.style.setProperty('display', 'none')
        inputCategory.value = ''
        for(i = 0; i < categoryName.length; i++) {
            if(categoryName[i].classList[1] == 'categoryNameActived') {
                categoryName[i].classList.remove('categoryNameActived')
            }
        }
        inputQuantivity_range.value = 5000
        inputQuantivity.value = ''
    })
    .catch((error) => {

    })
})




// const pieChart = document.getElementById('chartFeedback');
// new Chart(pieChart, {
//   type: 'pie',
//   data: {
//     labels: ['Uma estrela', 'Duas estrelas', 'Três estrelas', 'Quatro estrelas', 'Cinco estrelas'],
//     datasets: [{
//       label: 'Quantidade',
//       data: [12, 19, 3, 1, 2],
//       backgroundColor: [
//         'rgb(0, 0, 132)',
//         'rgb(0, 162, 162)',
//         'rgb(255, 0, 0)',
//         'rgb(255, 255, 0)',
//         'rgb(255, 0, 255)'
//       ],
//       borderWidth: 2,
//       hoverOffset: 10,
//       borderjoinstyle: 'round'
//     }]
//   }
// })

// const lineChart = document.getElementById('donateMoneyMonthly')
// new Chart(lineChart, {
//     type: 'line',
//     data: {
//         labels: ['1° Semana', '2° Semana', '3° Semana', '4° Semana'],
//         datasets: [{
//             label: 'Dinheiro arrecadado na semana',
//             data: [65, 59, 80, 56],
//             fill: false,
//             borderColor: 'rgb(75, 192, 192)',
//             tension: 0.2
//         }]
//     }
// })

// const lineChartYearly = document.getElementById('donateMoneyYearly')
// new Chart(lineChartYearly, {
//     type: 'line',
//     data: {
//         labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
//         datasets: [{
//             label: 'Dinheiro arrecadado no mês',
//             data: [100, 2000, 456, 345, 1556, 480, 400, 444, 839, 1256, 373, 123],
//             fill: false,
//             borderColor: 'rgb(75, 192, 192)',
//             tension: 0.2
//         }]
//     }
// })

// const barChartDonate = document.getElementById('donateResourceMonthly')
// new Chart(barChartDonate, {
//     type: 'bar',
//     data: {
//         labels: ['Casacos', 'Alimentos', 'Móveis', 'Remédios'],
//         datasets: [{
//             label: 'Quant. da doação',
//             data: [1, 2, 3, 4],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(255, 159, 64, 0.2)',
//                 'rgba(255, 205, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//             ],
//             borderColor: 'rgb(0, 0, 0)',
//         }]
//     }
// })

document.getElementsByClassName('helpAchievementVisitor')[0].addEventListener('click', function() {
    document.getElementById('helpDonate').style.setProperty('display', 'block')
})

document.getElementById('helpDonateContent_btn').addEventListener('click', function() {
    
    const helpInfo = {
        idDoador: sessionStorage.getItem('_id'),
        idOng: idAccount.get('jjp'),
        quantDoada: document.getElementById('helpDonateContent_input').value
    }

    $.ajax({
        url: 'https://api-emer-g.vercel.app/doador',
        method: 'POST',
        data: JSON.stringify(helpInfo),
        contentType: 'application/json'
    })
    .then((response) => {
        console.log(response)
        document.getElementById('helpDonate').style.setProperty('display', 'none')
        document.getElementById('helpDonateContent_input').value = ''
    })
    .catch((error) => {
        console.log(error)
    })
    
    
})

document.getElementById('helpDonateContent_close').addEventListener('click', function() {
    document.getElementById('helpDonate').style.setProperty('display', 'none')
    document.getElementById('helpDonateContent_input').value = ''
})