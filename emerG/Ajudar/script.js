const body = document.querySelector('body')
var post_drop 
var dropFull 
var content_post_drop = document.getElementsByClassName('content_post_drop')
var post_report 
var post_love 
var post_add
var logoPost
var republic
var chatOng
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
const forms_addPost_fileName = document.getElementById('forms_addPost_fileName')
const forms_addPost_description = document.getElementById('forms_addPost_description')
const addPost_form = document.getElementById('forms_addPost_form')
const main_section = document.getElementById('main_section')
const ongId = sessionStorage.getItem('_id')
const notLoginContent = document.getElementById('notLoginContent')
var userId
var post_arroba
const chatFooter_description = document.getElementById('chatFooter_description')
const chatFooter_button = document.getElementById('chatFooter_button')
const messages = document.getElementById('messages')
const chatBody = document.getElementById('chatBody')

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

if(sessionStorage.getItem('cnpj')) {
    userId = sessionStorage.getItem('cnpj')
    btnAddPost.style.setProperty('display', 'block')
}
else if(sessionStorage.getItem('cpf')) {
    userId = sessionStorage.getItem('cpf')
    btnAddPost.style.setProperty('display', 'none')
}
else {
    userId = '#12345'
}

const closeChatContent = document.getElementById('closeChatContent')
const chatContent = document.getElementById('chatContent')
const content_loading = document.getElementById('content_loading')

var allInformations

// Esta variável serve pra poder armazenar a imagem do novo post
var formImage
// Esta variável serve pra poder armazenar o arquivo do novo post
var formFile = new FormData()
var counter_follow = 0
var counter_liked = 0
var counter_add = 0
var all_post_buttons = [[], [], [], [], []]
var post_report_option
var all_forms_options = []
var contentDataInfo = []
var dataInfo = {}
var urlDelete = 'https://api-emer-g.vercel.app/deleteInfo'
var contentBase64 = []
var base64 = {
    post_image: '',
    post_file: '',
    post_fileName: '',
    post_description: '',
    post_id_ong: '',
    post_email: '',
    post_logo: '',
    post_ong_name: ''
}
var reportData = {
    report_id_post: '',
    report_id_ong: '',
    report_theme: '',
    report_description: ''
}
var allPostsLength = 0
var carregarImagem
var thisFile = ''
var idOfThatChat = ''
// var thatDate = new Date()


forms_addPost_image.src = ''


// functions **************************************

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
            reportData.report_theme = 'Violência explícita'
        }
        else if(item.id == 2)
        {
            reportData.report_theme = 'Assédio moral ou bullying'
        }
        else if(item.id == 3)
        {
            reportData.report_theme = 'Conteúdo sexual'
        }
        else if(item.id == 4)
        {
            reportData.report_theme = 'Desinformação'    
        }
        else if(item.id == 5)
        {
            reportData.report_theme = 'Outro'       
        }

        console.log(reportData.report_theme)
    })
})

function postButtons()
{
    all_post_buttons = [[], [], [], [], []]

    for(i = 0; i < post_drop.length; i++)
    {
        all_post_buttons[0].push(post_drop[i])
        all_post_buttons[1].push(post_report[i])
        all_post_buttons[2].push(post_love[i])
        all_post_buttons[3].push(post_add[i])
        all_post_buttons[4].push(chatOng[i])
    }
    
    all_post_buttons[0].forEach((item) => {
        var checkEquality = false
        var idSetTimeOut = 1

        function isClickRight(indexOfItem)
        {
            idSetTimeOut = setTimeout(async() => 
            {
                checkEquality = true

                console.log(indexOfItem)

                dataInfo = {
                    typeInfo: 'following',
                    id_post: `${post_content[indexOfItem].id}`,
                    idUsuario: `${sessionStorage.getItem('_id')}`,
                    actived: true,
                }
        
                await $.ajax(
                {
                    url: `https://api-emer-g.vercel.app/keepInformations`,
                    method: 'POST',
                    data: JSON.stringify(dataInfo),
                    contentType: 'application/json'
                })
                .then((response) => 
                {
                    dataInfo = {}
                    console.log(response)
                })
                .catch((error) => 
                {
                    console.log(error)
                })

                console.log(checkEquality)
            }, 4000)
        }

        item.addEventListener('click', () =>
        {
            const indexOfItem = all_post_buttons[0].indexOf(item)
            var spliceItem = false

            if(dropFull[indexOfItem].style.bottom == '-170%' || dropFull[indexOfItem].style.bottom == '')
            {
                dropFull[indexOfItem].style.setProperty('bottom', '0%')
                post_drop[indexOfItem].style.setProperty('--dropFull_moving', 'dropFull_moving')
                content_post_drop[indexOfItem].style.setProperty('--content_dropFull_moving', 'content_dropFull_moving')

                checkEquality = false

                isClickRight(indexOfItem)
            }
            else
            {
                dropFull[indexOfItem].style.setProperty('bottom', '-170%')
                content_post_drop[indexOfItem].style.setProperty('--content_dropFull_moving', '')
                post_drop[indexOfItem].style.setProperty('--dropFull_moving', '')
    
                console.log(checkEquality)

                if(idSetTimeOut == 1)
                {
                    checkEquality = true
                }

                if(checkEquality == true)
                {
                    urlDelete = urlDelete + `${post_content[indexOfItem].id}_following_${sessionStorage.getItem('_id')}`
                    $.ajax(
                    {
                        url: urlDelete,
                        method: 'DELETE',
                    })
                    .then((response) => 
                    {
                        urlDelete = 'https://api-emer-g.vercel.app/deleteInfo'
                        console.log(response)
                    })
                    .catch((error) => 
                    {
                        console.log(error)
                    })
                }
                else
                {
                    clearTimeout(idSetTimeOut)
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
        var checkEquality = false
        var idSetTimeOut = 1

        function isClickRight(indexOfItem)
        {
            idSetTimeOut = setTimeout(async() => 
            {
                checkEquality = true

                dataInfo = {
                    typeInfo: 'liked',
                    id_post: `${post_content[indexOfItem].id}`,
                    idUsuario: `${userId}`,
                    actived: true,
                }

                $.ajax(
                {
                    url: `https://api-emer-g.vercel.app/keepInformations`,
                    method: 'POST',
                    data: JSON.stringify(dataInfo),
                    contentType: 'application/json'
                })
                .then((response) => 
                {
                    dataInfo = {}
                    console.log(response)
                })
                .catch((error) => 
                {
                    console.log(error)
                })

                console.log(checkEquality)
            }, 4000)
        }
        
        item.addEventListener('click', () => 
        {
            if(window.getComputedStyle(item).animationDuration == '0s')
            {
                const indexOfItem = all_post_buttons[2].indexOf(item)
                var spliceItem = false
    
                if(post_love[indexOfItem].style.color == 'black' || post_love[indexOfItem].style.color == '')
                {
                    post_love[indexOfItem].style.setProperty('--post_love_click', 'post_love_click')
                    post_love[indexOfItem].style.setProperty('color', 'red')

                    checkEquality = false

                    isClickRight(indexOfItem)

                    console.log('guardei as informações')
                }
                else
                {
                    post_love[indexOfItem].style.setProperty('color', 'black')

                    if(idSetTimeOut == 1)
                    {
                        checkEquality = true
                    }
        
                    if(checkEquality == true)
                    {
                        urlDelete = urlDelete + `${post_content[indexOfItem].id}_liked_`
                        console.log(urlDelete)
                        $.ajax(
                        {
                            url: urlDelete,
                            method: 'DELETE',
                        })
                        .then((response) => 
                        {
                            urlDelete = 'https://api-emer-g.vercel.app/deleteInfo'
                            console.log(response)
                        })
                        .catch((error) => 
                        {
                            console.log(error)
                        })
                    }
                    else
                    {
                        clearTimeout(idSetTimeOut)
                    }

                    console.log('deletei as informações')
                }
    
                post_love[indexOfItem].addEventListener('animationend', () =>
                {
                    post_love[indexOfItem].style.setProperty('--post_love_click', '')
                })
            }
        })
    })

    all_post_buttons[3].forEach((item) => 
    {
        var checkEquality = false
        var idSetTimeOut = 1

        function isClickRight(indexOfItem)
        {
            idSetTimeOut = setTimeout(async() => 
            {
                checkEquality = true

                dataInfo = {
                    typeInfo: 'saved',
                    id_post: `${post_content[indexOfItem].id}`,
                    idUsuario: `${userId}`,
                    actived: true,
                }

                $.ajax(
                {
                    url: `https://api-emer-g.vercel.app/keepInformations`,
                    method: 'POST',
                    data: JSON.stringify(dataInfo),
                    contentType: 'application/json'
                })
                .then((response) => 
                {
                    dataInfo = {}
                    console.log(response)
                })
                .catch((error) => 
                {
                    console.log(error)
                })

                console.log(checkEquality)
            }, 4000)
        }

        item.addEventListener('click', () => 
        {
            if(window.getComputedStyle(item, '::before').animationDuration == '0s')
            {
                const indexOfItem = all_post_buttons[3].indexOf(item)
                var spliceItem = false
    
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
                    
                    checkEquality = false

                    isClickRight(indexOfItem)
                }
                else
                {
                    if(idSetTimeOut == 1)
                    {
                        checkEquality = true
                    }
            
                    if(checkEquality == true)
                    {
                        urlDelete = urlDelete + `${post_content[indexOfItem].id}_saved_`
                        console.log(urlDelete)
                        $.ajax(
                        {
                            url: urlDelete,
                            method: 'DELETE',
                        })
                        .then((response) => 
                        {
                            urlDelete = 'https://api-emer-g.vercel.app/deleteInfo'
                            console.log(response)
                        })
                        .catch((error) => 
                        {
                            console.log(error)
                        })
                    }
                    else
                    {
                        clearTimeout(idSetTimeOut)
                    }

                    post_add[indexOfItem].classList.remove('bi-patch-plus-fill')
                    post_add[indexOfItem].classList.add('bi-patch-plus')
                    post_add[indexOfItem].style.setProperty('--post_add_color', 'black')
                }
            }
        })
    })

    all_post_buttons[4].forEach((item) => 
    {
        const indexOfItem = all_post_buttons[4].indexOf(item)

        chatOng[indexOfItem].addEventListener('click', async(e) => 
        {
            if(idOfThatChat != e.target.id) {
                messages.innerHTML = ''
    
                thatChatId = {
                    remetente: sessionStorage.getItem('_id'),
                    destinatario: e.target.id
                }
    
                await $.ajax({
                    url: 'https://api-emer-g.vercel.app/thisChat',
                    method: 'POST',
                    data: JSON.stringify(thatChatId),
                    contentType: 'application/json'
                })
                .then((response) => {
                    console.log(response)
                    console.log( response[0].mensagens[0][0])
                    if(response != [] && response != '') {
                        response[0].mensagens.forEach(item => {
                            console.log(item)
                            if(item[0].remetente == sessionStorage.getItem('_id')) {
                                newMessage(item[0].mensagem, 'ContentmessageMy')
                            }
                            else {
                                newMessage(item[0].mensagem, '')
                            }
                        })
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
    
                idOfThatChat = e.target.id
            }
            
            document.getElementById('chatHeader_arroba').innerText = post_arroba[indexOfItem].innerText
            chatContent.style.setProperty('bottom', '0')
        })
    })
}

async function sendReport()
{
    console.log(reportData.report_theme)

    if(reportData.report_theme != '' && forms_report_description.value != '')
    {
        content_forms_report.style.setProperty('display', 'none')
        content_loading.style.setProperty('display', 'flex')
        body.style.setProperty('overflow', 'hidden')
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
            content_loading.style.setProperty('display', 'none')
            body.style.setProperty('overflow', 'auto')
            console.log(response)
            all_forms_options.forEach((item) => 
            {
                item.checked = false
            })
            forms_report_description.value = ''
            
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
    forms_addPost_file.value = ''
    forms_addPost_fileName.innerText = ''
    contentBase64 = []
    base64 = {
        post_image: '',
        post_file: '',
        post_fileName: '',
        post_description: '',
        post_id_ong: '',
        post_email: '',
        post_logo: '',
        post_ong_name: ''
    }

    carregarImagem = ''
    thisFile = ''
}

async function sendPost()
{
    if(forms_addPost_description.value != '' && forms_addPost_fileImage.value != '')
    {
        const formFile = new FormData()
        content_loading.style.setProperty('display', 'flex')
        body.style.setProperty('overflow', 'hidden')
        console.log('enviado com sucesso')

        forms_addPost_description.value = forms_addPost_description.value.replace(/\n/g, "<br>")
        
        base64.post_description = forms_addPost_description.value
        base64.post_id_ong = ongId
        base64.post_email = sessionStorage.getItem('email')
        base64.post_logo = sessionStorage.getItem('foto')
        base64.post_ong_name = sessionStorage.getItem('nome')

        contentBase64.push(base64)

        formFile.append('files', carregarImagem)

        if(thisFile != '') {
            console.log("Pq essa droga ta indo")
            formFile.append('files', thisFile)
        }

        console.log(thisFile)

        $.ajax({
            // url: `https://api-emer-g.vercel.app/createPost`,
            url: `https://api-emer-g.vercel.app/createPost`,
            method: 'POST',
            data: JSON.stringify(contentBase64),
            contentType: 'application/json'
        })
        .then((response) => {
            console.log(formFile)

            $.ajax({
                // url: 'https://api-emer-g.vercel.app/uploadFile',
                url: 'https://api-emer-g.vercel.app/uploadFile',
                method: 'POST',
                data: formFile,
                processData: false,
                contentType: false
            })
            .then((response) => {
                console.log(response)
                content_loading.style.setProperty('display', 'none')
                body.style.setProperty('overflow', 'auto')
                console.log(response)
                allPostsLength++
                initializeEverything()
            })
            .catch((error) => {
                console.log(error)
            })
        })
        .catch((error) => {
            console.log(error)
        })

        resetPostForms()
    }
}

async function getInformations(content)
{
    content_loading.style.setProperty('display', 'none')
    body.style.setProperty('overflow', 'auto')

    if(allPostsLength == 0)
    {
        var contersla = 1
        await content.forEach(item => 
        {
            
            const divContentPost = document.createElement('div')
            divContentPost.setAttribute('id', `${item._id}`)
            divContentPost.setAttribute('class', `post_content`)
    
            console.log(item)

            // <i id="post_perfil" class="bi bi-person-circle"></i>

            divContentPost.innerHTML = `
                <div class="post_content_header">
                    <div class="post_content_header_info">
                        <a href="../Perfil/?jjp=${item.post_id_ong}"><img class="logoPost"></a>
                        <i id="post_arroba" class="post_arroba">${item.post_ong_email}</i>
                        <span class="littleSpace"></span>
                        <div id="content_post_drop" class="content_post_drop">
                            <img id="post_drop" class="post_drop" src="https://i.ibb.co/KF80Db1/real-Drop-removebg-preview.png" alt="">
                            <div id="dropFull" class="dropFull"></div>
                        </div>
                    </div>

                    <i id="post_report" class="bi bi-flag post_report"></i>
                </div>

                <div id="${item._id}" class="post_content_body">
                </div>

                <p class="post_content_description" id="${item._id}_${item.post_ong_name}_${contersla}"></p>
                <a id="aLink_${item._id}" href="${item.post_documents}" target="_blank">${item.post_documentsName}</a>
                
                <div class="post_content_footer">
                    <div class="post_content_footer_buttons">
                        <i id="post_love" class="bi bi bi-heart post_love"></i>
                        <i id="post_add" class="bi bi-patch-plus post_add"></i>
                    </div>

                    <div class="post_content_footer_chat">
                        <div id="${item.post_id_ong}" class="footerButton chatOng">Chat com a Ong</div>
                    </div>
                </div>`
    
            const divisorLine = document.createElement('hr')
            divisorLine.setAttribute('class', 'dividePost')
    
            main_section.appendChild(divContentPost)
            main_section.appendChild(divisorLine)

            divContentPost.getElementsByClassName('post_content_body')[0].style.setProperty('--backgroundImage', `url(${item.post_image})`)
            
            if(item.post_description == '') {
                document.getElementById(`${item._id}_${item.post_ong_name}_${contersla}`).style.display = 'none'
            }
            else {
                document.getElementById(`${item._id}_${item.post_ong_name}_${contersla}`).innerHTML = item.post_description
            }

            console.log(item.post_documentsName)

            if(item.post_documentsName == undefined) {
                document.getElementById(`aLink_${item._id}`).style.display = 'none' 
            }
            else {
                document.getElementById(`aLink_${item._id}`).style.width = 'fit-content'
            }

            document.getElementsByClassName('logoPost')[content.indexOf(item)].style.setProperty('--backgroundPost_logo', `url(${item.post_ong_logo})`)

            contersla++
        })

        post_drop = document.getElementsByClassName('post_drop')
        dropFull = document.getElementsByClassName('dropFull')
        content_post_drop = document.getElementsByClassName('content_post_drop')
        logoPost = document.getElementsByClassName('logoPost')
        post_report = document.getElementsByClassName('post_report')
        post_love = document.getElementsByClassName('post_love')
        post_add = document.getElementsByClassName('post_add')
        post_content_body = document.getElementsByClassName('post_content_body')
        post_content = document.getElementsByClassName('post_content')
        chatOng = document.getElementsByClassName('chatOng')
        post_arroba = document.getElementsByClassName('post_arroba')

        postButtons()

        console.log(allInformations)

        content.forEach(item => 
        {
            var thisPostId = item._id
            const itemIndex = content.indexOf(item)

            console.log('vamo que vamo')

            if(allInformations.length != 0)
            {
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
            }
        })
    }
    else
    {
        const divContentPost = document.createElement('div')
        divContentPost.setAttribute('id', `${content[allPostsLength - 1]._id}`)
        divContentPost.setAttribute('class', `post_content`)
    
        console.log(`1° Id do content: ${content[allPostsLength - 1]._id}`)

        divContentPost.innerHTML = `
            <div class="post_content_header">
                <div class="post_content_header_info">
                    <a href="../Perfil/?jjp=${content[allPostsLength - 1].post_id_ong}"><img class="logoPost"></a>
                    <i id="post_arroba" class="post_arroba">${content[allPostsLength - 1].post_ong_email}</i>
                    <span class="littleSpace"></span>
                    <div id="content_post_drop" class="content_post_drop">
                        <img id="post_drop" class="post_drop" src="https://i.ibb.co/KF80Db1/real-Drop-removebg-preview.png" alt="">
                        <div id="dropFull" class="dropFull"></div>
                    </div>
                </div>

                <i id="post_report" class="bi bi-flag post_report"></i>
            </div>

            <div id="${content[allPostsLength - 1]._id}" class="post_content_body">
            </div>

            <p class="post_content_description" id="${content[allPostsLength - 1]._id}_${content[allPostsLength - 1].post_ong_name}"></p>
            <a id="aLink_${content[allPostsLength - 1]._id}" href="${content[allPostsLength - 1].post_documents}" target="_blank">${content[allPostsLength - 1].post_documentsName}</a>
            
            <div class="post_content_footer">
                <div class="post_content_footer_buttons">
                    <i id="post_love" class="bi bi bi-heart post_love"></i>
                    <i id="post_add" class="bi bi-patch-plus post_add"></i>
                </div>

                <div class="post_content_footer_chat">
                    <div id="chatOng" class="footerButton chatOng">Chat com a Ong</div>
                </div>
            </div>`
            
        const divisorLine = document.createElement('hr')
        divisorLine.setAttribute('class', 'dividePost')

        main_section.appendChild(divContentPost)
        main_section.appendChild(divisorLine)

        console.log(`2° Id do content: ${content[allPostsLength - 1]._id}`)
        if(content[allPostsLength - 1].post_documentsName == '') {

            console.log(document.getElementById(`aLink_${content[allPostsLength - 1]._id}`))
            document.getElementById(`aLink_${content[allPostsLength - 1]._id}`).style.display = 'none' 
        }
        else {
            document.getElementById(`aLink_${content[allPostsLength - 1]._id}`).style.width = 'fit-content'
        }
        
        divContentPost.getElementsByClassName('post_content_body')[0].style.setProperty('--backgroundImage', `url(${content[allPostsLength - 1].post_image})`)
        document.getElementsByClassName('logoPost')[allPostsLength - 1].style.setProperty('--backgroundPost_logo', `url(${content[allPostsLength - 1].post_ong_logo})`)
        
        if(content[allPostsLength - 1].post_description == '') {
            document.getElementById(`${content[allPostsLength - 1]._id}_${content[allPostsLength - 1].post_ong_name}`).style.display = 'none'
        }
        else {
            document.getElementById(`${content[allPostsLength - 1]._id}_${content[allPostsLength - 1].post_ong_name}`).innerHTML = content[allPostsLength - 1].post_description
        }

        post_drop = document.getElementsByClassName('post_drop')
        dropFull = document.getElementsByClassName('dropFull')
        content_post_drop = document.getElementsByClassName('content_post_drop')
        post_report = document.getElementsByClassName('post_report')
        post_love = document.getElementsByClassName('post_love')
        post_add = document.getElementsByClassName('post_add')
        post_content_body = document.getElementsByClassName('post_content_body')
        post_content = document.getElementsByClassName('post_content')
        chatOng = document.getElementsByClassName('chatOng')
        logoPost = document.getElementsByClassName('logoPost')
        post_arroba = document.getElementsByClassName('post_arroba')

        console.log(post_content)

        postButtons()

        var thisPostId = content[allPostsLength - 1]._id
        
        if(allInformations.length != 0)
        {
            allInformations.forEach(item => 
            {
                if(item.id_post == thisPostId)
                {
                    switch (item.typeInfo)
                    {
                        case 'following':
                            dropFull[allPostsLength - 1].style.setProperty('bottom', '0%')
                            break
                        case 'liked':
                            post_love[allPostsLength - 1].style.setProperty('color', 'red')
                            break
                        case 'saved':
                            post_add[allPostsLength - 1].classList.add('bi-patch-plus-fill')
                            post_add[allPostsLength - 1].classList.remove('bi-patch-plus')
                            post_add[allPostsLength - 1].style.setProperty('--post_add_color', '#4480bc')
                            break
                        default:
                    }
                }
            })
        }
    }
}

async function initializeEverything()
{
    body.style.setProperty('overflow', 'hidden')
    if(sessionStorage.getItem('cnpj') || sessionStorage.getItem('cpf')) {
        document.getElementById('aside_post_perfil').style.setProperty('--backgroundImagePerfil', `url(${sessionStorage.getItem('foto')})`)
        document.getElementById('perfil_arroba').innerText = `${sessionStorage.getItem('email')}`
        if(sessionStorage.getItem('cnpj')) {
            document.getElementById('btnPerfilType').innerText = 'Organização'
        }
        else if(sessionStorage.getItem('cpf')) {
            document.getElementById('btnPerfilType').innerText = 'Cidadão'
        }
        // const contentUserId = []
        const thisUserId = {
            user_id: `${sessionStorage.getItem('_id')}`
        }
        
        await $.ajax({
            url: 'https://api-emer-g.vercel.app/informations',
            method: 'POST',
            data: JSON.stringify(thisUserId),
            contentType: 'application/json'
        })
        .then((response) => 
        {
            allInformations = response
            console.log(allInformations)
            console.log(thisUserId)
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
            body.style.setProperty('overflow', 'auto')
            if(allPostsLength == 0)
            {
                allPostsLength = response.length
                console.log(allPostsLength)
            }
        })
        .catch((error) => 
        {
            console.log(error)
        })
    }
    else {
        content_loading.style.setProperty('display', 'none')
        body.style.setProperty('overflow', 'auto')
        notLoginContent.style.setProperty('display', 'block')
    }
}

function newMessage(message, thisClass) {
    const div = document.createElement('div')
    const p = document.createElement('p')
    div.classList.add('Contentmessage')
    div.classList.add(thisClass)
    p.classList.add('message')
    div.appendChild(p)
    p.innerText = message
    messages.appendChild(div)
    console.log(messages.scrollHeight)
    chatBody.scrollTop = chatBody.scrollHeight
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
    carregarImagem = await forms_addPost_fileImage.files[0]
    
    base64.post_image = `https://api-emer-g.vercel.app/downloadArchieve/`

    var lerArquivo = new FileReader()
    lerArquivo.readAsDataURL(carregarImagem)
    lerArquivo.onload = function(arquivoCarregado)
    {
        forms_addPost_image.src = arquivoCarregado.target.result
    }
})

forms_addPost_close.addEventListener('click', () => 
{
    resetPostForms()
})

closeChatContent.addEventListener('click', () => 
{
    chatContent.style.setProperty('bottom', '-60%')
})

forms_addPost_file.addEventListener('change', async function()
{
    thisFile = await forms_addPost_file.files[0]

    base64.post_file = `https://api-emer-g.vercel.app/downloadArchieve/`
    base64.post_fileName = thisFile.name

    for (let [key, value] of formFile.entries()) {
        console.log(key, value);
    }
    console.log(thisFile)
    forms_addPost_fileName.innerText = thisFile.name
})

chatFooter_button.addEventListener('click', async function() {
    if(chatFooter_description.value != '') {
        newMessage(chatFooter_description.value, 'ContentmessageMy')

        contentChat = {
            remetente: `${sessionStorage.getItem('_id')}`,
            destinatario: `${idOfThatChat}`,
            mensagens: [{
                remetente: `${sessionStorage.getItem('_id')}`,
                horario: `${Date.now()}`,
                mensagem: chatFooter_description.value
            }]
        }

        console.log(contentChat)

        await $.ajax({
            url: 'https://api-emer-g.vercel.app/newChat',
            method: 'POST',
            data: JSON.stringify(contentChat),
            contentType: 'application/json'
        })
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })

        chatFooter_description.value = ''
    }
})

function sempre(){
    // console.log('sempre')
}

// setInterval(sempre, 1000)
