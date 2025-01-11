const userImage = document.getElementById('userImage')

if(sessionStorage.getItem('cpf') || sessionStorage.getItem('cnpj')) {
    document.getElementById('headerBtnLogin').style.display = 'none'
    userImage.style.setProperty('display', 'block')
    userImage.style.setProperty('--userImageCss', `url(${sessionStorage.getItem('foto')})`)
}
else {
    document.getElementById('headerBtnLogin').style.display = 'block'
}

userImage.addEventListener('click', function() {
    window.location.href = '../Perfil/'
})