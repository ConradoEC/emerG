const body = document.querySelector('body')
var post_drop 
var dropFull 
var content_post_drop = document.getElementsByClassName('content_post_drop')
var post_report 
var post_love 
var post_add 
const post_content_body_img = document.getElementsByClassName('post_content_body_img')
var post_content_body 
var post_content 
const content_forms_report = document.getElementById('content_forms_report')
const forms_report_description = document.getElementById('forms_report_description')
const forms_report_checkbox = document.getElementsByClassName('forms_report_checkbox')
const forms_report_close = document.getElementById('forms_report_close')
const btnAddPost = document.getElementById('btnAddPost')
const content_forms_addPost = document.getElementById('content_forms_addPost')
const forms_addPost_close = document.getElementById('forms_addPost_close')
const forms_addPost_image = document.getElementById('forms_addPost_image')
const forms_addPost_fileImage = document.getElementById('forms_addPost_fileImage')
const forms_addPost_file = document.getElementById('forms_addPost_file')
const forms_addPost_description = document.getElementById('forms_addPost_description')
const main_section = document.getElementById('main_section')
const ongId = '11111sadnjnJDNFJSSDJVB'
const userId = '#12345'

var allInformations

var counter_follow = 0
var counter_liked = 0
var counter_add = 0
var all_post_buttons = [[], [], [], []]
var post_report_option
var all_forms_options = []
var contentDataInfo = []
var dataInfo
var urlDelete = 'https://api-emer-g.vercel.app/deleteInfo'
var contentBase64 = []
var base64 = {
    post_image: '',
    post_description: '',
    post_id_ong: ''
}
var reportData = {
    report_id_post: '',
    report_id_ong: '',
    report_theme: '',
    report_description: ''
}

forms_addPost_image.src = ''

window.addEventListener('scroll', function() {

    const botao = document.getElementById('btnAddPost');
    const footer = document.querySelector('footer');
    const footerRect = footer.getBoundingClientRect();
    const offset = 50;
  
    if (footerRect.top <= window.innerHeight - offset) {
      botao.style.bottom = `${window.innerHeight - footerRect.top + offset}px`;
    } else {
      botao.style.bottom = '50px';
    }
  });

for(i = 0; i < forms_report_checkbox.length; i++)
{
    all_forms_options.push(forms_report_checkbox[i])
}

all_forms_options.forEach((item) => 
{
    item.addEventListener('click', (e) => 
    {
        all_forms_options.forEach((item) => 
        {
            item.checked = false
        })

        item.checked = true
        
        if(item.id == 1)
        {
            reportData.report_theme = 'Violência explícita;'
        }
        else if(item.id == 2)
        {
            reportData.report_theme = 'Assédio moral ou bullying;'
        }
        else if(item.id == 3)
        {
            reportData.report_theme = 'Conteúdo sexual;'
        }
        else if(item.id == 4)
        {
            reportData.report_theme = 'Desinformação;'    
        }
        else if(item.id == 5)
        {
            reportData.report_theme = 'Outro.'       
        }

        console.log(reportData.report_theme)
    })
})

function postButtons()
{
    for(i = 0; i < post_drop.length; i++)
    {
        all_post_buttons[0].push(post_drop[i])
        all_post_buttons[1].push(post_report[i])
        all_post_buttons[2].push(post_love[i])
        all_post_buttons[3].push(post_add[i])
    }

    all_post_buttons[0].forEach((item) => {
        item.addEventListener('click', () =>
        {
            var checkEquality = false
            const indexOfItem = all_post_buttons[0].indexOf(item)
            var spliceItem = false

            if(dropFull[indexOfItem].style.bottom == '-170%' || dropFull[indexOfItem].style.bottom == '')
            {
                dropFull[indexOfItem].style.setProperty('bottom', '0%')
                post_drop[indexOfItem].style.setProperty('--dropFull_moving', 'dropFull_moving')
                content_post_drop[indexOfItem].style.setProperty('--content_dropFull_moving', 'content_dropFull_moving')
    
                if(urlDelete.includes(`${post_content[indexOfItem].id}_following_`))
                {
                    urlDelete = urlDelete.replace(`${post_content[indexOfItem].id}_following_`, '')
                    checkEquality = true
                }
    
                if(checkEquality == false)
                {
                    var dataInfo = {
                        typeInfo: 'following',
                        id_post: `${post_content[indexOfItem].id}`,
                        idUsuario: `${userId}`,
                        actived: true,
                    }
                    contentDataInfo.push(dataInfo)
                }
            }
            else
            {
                dropFull[indexOfItem].style.setProperty('bottom', '-170%')
                content_post_drop[indexOfItem].style.setProperty('--content_dropFull_moving', '')
                post_drop[indexOfItem].style.setProperty('--dropFull_moving', '')
                contentDataInfo.find((element, position) => 
                {   
                    if(spliceItem == false)
                    {
                        if(element.typeInfo == `following` && element.id_post == `${post_content[indexOfItem].id}`)
                        {
                            contentDataInfo.splice(contentDataInfo.indexOf(element), 1)
                            checkEquality = true
                            spliceItem = true
                        }
                    }
                })
    
                if(checkEquality == false)
                {
                    urlDelete = urlDelete + `${post_content[indexOfItem].id}_following_`
                }
            }
    
            console.log('urlDelete: ' + urlDelete)
        })
    })

    all_post_buttons[1].forEach((item) => 
    {
        item.addEventListener('click', () => 
        {
            indexOfItem = all_post_buttons[1].indexOf(item)

            post_report[indexOfItem].style.setProperty('--post_report_rotate', 'post_report_rotate')

            post_report[indexOfItem].addEventListener('animationend', () =>
            {
                post_report[indexOfItem].style.setProperty('--post_report_rotate', '')
            })

            post_report[indexOfItem].style.setProperty('--post_report_background', '#7bbbf9')
            post_report[indexOfItem].style.setProperty('--post_report_color', 'white')
            content_forms_report.style.setProperty('display', 'flex')
            body.style.setProperty('overflow', 'hidden')

            reportData.report_id_ong = `${post_content_body[indexOfItem].id}`
            reportData.report_id_post = `${post_content[indexOfItem].id}`
        })
    })

    all_post_buttons[2].forEach((item) => 
    {
        
        item.addEventListener('click', () => 
        {
            if(window.getComputedStyle(item).animationDuration == '0s')
            {
                var checkEquality = false
                const indexOfItem = all_post_buttons[2].indexOf(item)
                var spliceItem = false
    
                if(post_love[indexOfItem].style.color == 'black' || post_love[indexOfItem].style.color == '')
                {
                    post_love[indexOfItem].style.setProperty('--post_love_click', 'post_love_click')
                    post_love[indexOfItem].style.setProperty('color', 'red')
    
                    if(urlDelete.includes(`${post_content[indexOfItem].id}_liked_`))
                    {
                        urlDelete = urlDelete.replace(`${post_content[indexOfItem].id}_liked_`, '')
                        checkEquality = true
                    }
    
                    if(checkEquality == false)
                    {
                        var dataInfo = {
                            typeInfo: 'liked',
                            id_post: `${post_content[indexOfItem].id}`,
                            idUsuario: `${userId}`,
                            actived: true,
                        }
                        contentDataInfo.push(dataInfo)
                    }

                    console.log(contentDataInfo)
                }
                else
                {
                    post_love[indexOfItem].style.setProperty('color', 'black')
    
                    contentDataInfo.find((element, position) => 
                    {   
                        if(spliceItem == false)
                        {
                            if(element.typeInfo == `liked` && element.id_post == `${post_content[indexOfItem].id}`)
                            {
                                contentDataInfo.splice(contentDataInfo.indexOf(element), 1)
                                checkEquality = true
                                spliceItem = true
                            }
                        }
                    })
    
                    if(checkEquality == false)
                    {
                        urlDelete = urlDelete + `${post_content[indexOfItem].id}_liked_`
                    }

                    console.log(urlDelete)
                }
    
                post_love[indexOfItem].addEventListener('animationend', () =>
                {
                    post_love[indexOfItem].style.setProperty('--post_love_click', '')
                })

                console.log(JSON.stringify(contentDataInfo))
            }
        })
    })

    all_post_buttons[3].forEach((item) => 
    {
        item.addEventListener('click', () => 
        {
            if(window.getComputedStyle(item, '::before').animationDuration == '0s')
            {
                // console.log(window.getComputedStyle(item, '::before').animationDuration)
                var checkEquality = false
                const indexOfItem = all_post_buttons[3].indexOf(item)
                var spliceItem = false

                // console.log(window.getComputedStyle(post_add[indexOfItem], '::before').color)
    
                if(window.getComputedStyle(post_add[indexOfItem], '::before').color == 'rgb(0, 0, 0)' || window.getComputedStyle(post_add[indexOfItem], '::before').color == '')
                {
                    post_add[indexOfItem].style.setProperty('--post_add_click', 'post_add_click')
                    post_add[indexOfItem].addEventListener('animationend', () => 
                    {
                        post_add[indexOfItem].classList.add('bi-patch-plus-fill')
                        post_add[indexOfItem].classList.remove('bi-patch-plus')
                        post_add[indexOfItem].style.setProperty('--post_add_color', '#4480bc')
                        post_add[indexOfItem].style.setProperty('--post_add_click', '')
                    })
    
                    if(urlDelete.includes(`${post_content[indexOfItem].id}_saved_`))
                    {
                        urlDelete = urlDelete.replace(`${post_content[indexOfItem].id}_saved_`, '')
                        checkEquality = true
                    }
    
                    if(checkEquality == false)
                    {
                        var dataInfo = {
                            typeInfo: 'saved',
                            id_post: `${post_content[indexOfItem].id}`,
                            idUsuario: `${userId}`,
                            actived: true,
                        }
                        contentDataInfo.push(dataInfo)
                    }
                }
                else
                {
                    contentDataInfo.find((element, position) => 
                    {   
                        if(spliceItem == false)
                        {
                            if(element.typeInfo == `saved` && element.id_post == `${post_content[indexOfItem].id}`)
                            {
                                contentDataInfo.splice(contentDataInfo.indexOf(element), 1)
                                checkEquality = true
                                spliceItem = true
                            }
                        }
                    })
    
                    if(checkEquality == false)
                    {
                        urlDelete = urlDelete + `${post_content[indexOfItem].id}_saved_`
                    }
    
                    post_add[indexOfItem].classList.remove('bi-patch-plus-fill')
                    post_add[indexOfItem].classList.add('bi-patch-plus')
                    post_add[indexOfItem].style.setProperty('--post_add_color', 'black')
                }
            }
        })
    })
}

async function sendReport()
{
    console.log(reportData.report_theme)

    if(reportData.report_theme != '' && forms_report_description.value != '')
    {
        reportData.report_description = await `${forms_report_description.value}`

        $.ajax(
        {
            url: 'https://api-emer-g.vercel.app/createReport',
            method: 'POST',
            data: JSON.stringify(reportData),
            contentType: 'application/json'
        })
        .then((response) =>
        {
            console.log(response)
            all_forms_options.forEach((item) => 
            {
                item.checked = false
            })
            forms_report_description.value = ''
            
            content_forms_report.style.setProperty('display', 'none')
            body.style.setProperty('overflow', 'auto')

            reportData = {
                report_id_post: '',
                report_id_ong: '',
                report_theme: '',
                report_description: ''
            }
        })
        .catch((error) =>
        {
            console.log(error)
        })
    }
}

function resetPostForms()
{
    content_forms_addPost.style.setProperty('display', 'none')
    body.style.setProperty('overflow', 'auto')
    forms_addPost_description.value = ''
    forms_addPost_fileImage.value = ''
    forms_addPost_image.src = ''
    contentBase64 = []
    base64 = {
        post_image: '',
        post_description: ''
    }
}

async function sendPost()
{
    if(forms_addPost_description.value != '' && forms_addPost_fileImage.value != '')
    {
        console.log('enviado com sucesso')

        base64.post_description = forms_addPost_description.value
        base64.post_id_ong = ongId

        contentBase64.push(base64)

        $.ajax({
            url: `https://api-emer-g.vercel.app/createPost`,
            method: 'POST',
            data: JSON.stringify(contentBase64),
            contentType: 'application/json'
        })
        .then((response) => {
            console.log(response)
            resetPostForms()
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

async function getInformations(content)
{
    await content.forEach(item => 
    {
        const divContentPost = document.createElement('div')
        divContentPost.setAttribute('id', `${item._id}`)
        divContentPost.setAttribute('class', `post_content`)

        divContentPost.innerHTML = `
            <div class="post_content_header">
                <i id="post_perfil" class="bi bi-person-circle"></i>
                <i id="post_arroba" class="">${item.post_ong_email}</i>
                <i id="post_circle" class="bi"></i>
                <span class="littleSpace"></span>
                <div id="content_post_drop" class="content_post_drop">
                    <img id="post_drop" class="post_drop" src="https://i.im.ge/2024/07/16/VCPrnc.realDrop-removebg-preview.png" alt="">
                    <div id="dropFull" class="dropFull"></div>
                </div>
                <i id="post_report" class="bi bi-flag post_report"></i>
            </div>
            <div id="${item.post_id_ong}" class="post_content_body">
                <img src="${item.post_image}" alt="" class="post_content_body_img">
            </div>
            <div class="post_content_footer">
                <i id="post_love" class="bi bi bi-heart post_love"></i>
                <i id="post_add" class="bi bi-patch-plus post_add"></i>
                <div id="btnSla1" class="footerButton">Republicar</div>
                <span class="littleSpace"></span>
                <div id="btnSla2" class="footerButton">Chat com a Ong</div>
            </div>`

        const divisorLine = document.createElement('hr')
        divisorLine.setAttribute('class', 'dividePost')

        main_section.appendChild(divContentPost)
        main_section.appendChild(divisorLine)
    })

    post_drop = document.getElementsByClassName('post_drop')
    dropFull = document.getElementsByClassName('dropFull')
    content_post_drop = document.getElementsByClassName('content_post_drop')
    post_report = document.getElementsByClassName('post_report')
    post_love = document.getElementsByClassName('post_love')
    post_add = document.getElementsByClassName('post_add')
    post_content_body = document.getElementsByClassName('post_content_body')
    post_content = document.getElementsByClassName('post_content')

    postButtons()

    content.forEach(item => 
    {
        var thisPostId = item._id
        const itemIndex = content.indexOf(item)

        allInformations.forEach(item => 
        {
            if(item.id_post == thisPostId)
            {
                switch (item.typeInfo)
                {
                    case 'following':
                        dropFull[itemIndex].style.setProperty('bottom', '0%')
                        break
                    case 'liked':
                        post_love[itemIndex].style.setProperty('color', 'red')
                        break
                    case 'saved':
                        post_add[itemIndex].classList.add('bi-patch-plus-fill')
                        post_add[itemIndex].classList.remove('bi-patch-plus')
                        post_add[itemIndex].style.setProperty('--post_add_color', '#4480bc')
                        break
                    default:
                }
            }
        })
    })
}

async function initializeEverything()
{
    const contentUserId = []
    const thisUserId = {
        user_id: `${userId}`
    }

    contentUserId.push(thisUserId)

    await $.ajax({
        url: 'https://api-emer-g.vercel.app/informations',
        method: 'POST',
        data: JSON.stringify(contentUserId),
        contentType: 'application/json'
    })
    .then((response) => 
    {
        allInformations = response
        console.log(allInformations)
    })
    .catch((error) => 
    {
        console.log(error)
    })

    await $.ajax({
        url: 'https://api-emer-g.vercel.app/posts',
        method: 'GET'
    })
    .then((response) => 
    {
        getInformations(response)
    })
    .catch((error) => 
    {
        console.log(error)
    })
}

// controllers **************************************

// ------------------------------------------------
//  POSTS
// ------------------------------------------------

initializeEverything()


forms_report_close.addEventListener('click', () =>
{
    all_forms_options.forEach((item) => 
    {
        item.checked = false
    })
    forms_report_description.value = ''

    content_forms_report.style.setProperty('display', 'none')
    body.style.setProperty('overflow', 'auto')
    post_report[indexOfItem].style.setProperty('--post_report_rotate', 'post_report_rotate')
    post_report[indexOfItem].style.setProperty('--post_report_background', 'transparent')
    post_report[indexOfItem].style.setProperty('--post_report_color', 'black')
    console.log(window.getComputedStyle(post_report[indexOfItem], '::before').backgroundColor)
})

btnAddPost.addEventListener('click', () => 
{
    content_forms_addPost.style.setProperty('display', 'flex')
    body.style.setProperty('overflow', 'hidden')
})

forms_addPost_fileImage.addEventListener('input', async () => 
{
    console.log('olaola')
    var carregarImagem = await forms_addPost_fileImage.files[0]
    var formData = new FormData()
    formData.append('source', carregarImagem)

    
    var lerArquivo = new FileReader()
    lerArquivo.readAsDataURL(carregarImagem)
    lerArquivo.onload = function(arquivoCarregado){
        forms_addPost_image.src = arquivoCarregado.target.result

        // console.log(base64)
        // contentBase64.push(base64)
        // console.log(contentBase64.length)
        base64.post_image = arquivoCarregado.target.result
    }
})

forms_addPost_close.addEventListener('click', () => 
{
    resetPostForms()
})

window.addEventListener('beforeunload', () => 
{
    if(contentDataInfo.length != 0)
    {
        $.ajax(
        {
            url: `https://api-emer-g.vercel.app/keepInformations`,
            method: 'POST',
            data: JSON.stringify(contentDataInfo),
            contentType: 'application/json'
        })
        .then((response) => 
        {
            console.log(response)
        })
        .catch((error) => 
        {
            console.log(error)
        })
    }
    
    if(urlDelete != 'https://api-emer-g.vercel.app/deleteInfo')
    {
        $.ajax(
        {
            url: urlDelete,
            method: 'DELETE',
        })
        .then((response) => 
        {
            console.log(response)
        })
        .catch((error) => 
        {
            console.log(error)
        })
    }
}) 

// imge_rOuT_b0a16f7369b5443d1c7e90631209e6e66c9ad88f36731c875db37aa562b48535e44b16349212424d5be631afe1ff76d7b886b870210ec3e74ca757bafce9c2f1