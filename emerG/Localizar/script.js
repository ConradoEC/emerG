const body = document.querySelector('body')
const normalMap = document.getElementById('map')
const mapWater = document.getElementById('mapWater')
const miniMap = document.getElementById('miniMap')
const searchBar = document.getElementById('searchBar')
const filter_icon = document.getElementById('choose_searchBarFilter_filter')
const switch_change_map = document.getElementById('switch_change_map')
const switch_content = document.getElementById('switch_content')
const choose_searchBarFilter_content = document.getElementById('choose_searchBarFilter_content')
const section2 = document.getElementById('section2')
const contentOptions_options = document.getElementById('contentOptions_options')
const formsButtonSearch = document.getElementById('formsButtonSearch')
const formsButtonReset = document.getElementById('formsButtonReset')
const inputNiche = document.getElementById('inputNiche')
const inputRegion = document.getElementById('inputRegion')
const inputQuality = document.getElementById('quality')
const inputQuantivity = document.getElementById('quantivity')
const contentStars = document.getElementById('contentStars')
const contentStars_stars = document.getElementsByClassName('contentStars_star')
const section_background_2 = document.getElementById('section_background_2')
const choose_buttonAddMarker = document.getElementById('choose_buttonAddMarker')
const formsAddMarker_btnClose = document.getElementById('formsAddMarker_btnClose')
const formsAddMarker_input = document.getElementsByClassName('formsAddMarker_input')
const formsAddMarker_labelFloodLevel = document.getElementById('formsAddMarker_labelFloodLevel')
const formsAddMarker_inputAddress = document.getElementById('formsAddMarker_inputAddress')
const nameAuthorization_inputNo = document.getElementById('nameAuthorization_inputNo')
const nameAuthorization_inputYes = document.getElementById('nameAuthorization_inputYes')
const formsAddMarker_ReloadMiniMap = document.getElementById('formsAddMarker_ReloadMiniMap')
const formsAddMarker_CreateMiniMap = document.getElementById('formsAddMarker_CreateMiniMap')
var newMarkerData = {
    address: '',
    name: '',
    floodLevel: 0,
    lat: 0,
    lng: 0
}
// Essa variável contêm o arquivo json que possui todas as ongs
var generalOngs
var generalMarkers

let filterPlaces = []
let locali_map
let water_map
let mini_map
var switchCounter = 1
const mapPlacesSetting = []
let locali_markers = []
let water_markers = []
let infoWindow
let locali_infoWindows = []
let water_infoWindows = []
let markersEvent = []
var testandoVar = []
let flightPlanCoordinates
var stars
var someNiche = inputNiche.value
var someRegion = inputRegion.value
var someStars = stars
var locali_mainlyStringId_before = -1
var water_mainlyStringId_before = -1
var quantivityMarkers = 0
// var generalOngs
var isMapWater = false
var isMiniMap = false
var miniMap_floodLevel = 0 
var lastFormsAddMarker_address
var lastFormsAddMarker_name
var lastFormsAddMarker_floodLevel
let autocomplete
var miniMapAddress
var miniMapName = []
var miniMapLocation
var informationsNewmarker = []
var geocoder

// functions **************************************

fetch('https://api-emer-g.vercel.app/ongs')
.then(res=>res.json())
.then((json) =>
{
    generalOngs = json
    const ul = document.getElementById('contentOptions_options');
    json.forEach((item) =>
    {
        const div = document.createElement('div')
        div.setAttribute('data-background', 'backgrounds')
        div.classList.add('contentOptions_options_option')
        div.setAttribute('id', `${item._id}`)

        div.innerHTML = `
        <img class="contentOptions_options_img" src="${item.ong_logo}" alt="">
        <p class="contentOptions_options_name">${item.ong_name}</p>
        `;
        // console.log(li.innerHTML)
        ul.appendChild(div);        // li.getElementsByClassName('section_medicine_ul_li_div')[0].getElementsByTagName('span')[0].setAttribute('class', 'data-font')
    })

    text = document.querySelectorAll('.data-font')
})

fetch('https://api-emer-g.vercel.app/markersFlood')
.then(res=>res.json())
.then((json) => 
{
    generalMarkers = json
})

function tagOngs(value)
{
    if(filterPlaces.length == 0)
    {
        const div_ong = document.createElement('div')
            div_ong.classList.add('ong')

            const div_ong_logo = document.createElement('div')
            div_ong_logo.classList.add('ong_logo')
            div_ong_logo.innerHTML = `<img src="${value.ong_logo}" alt="" class="ong_logo_img">`

            const div_ong_informations = document.createElement('div')
            div_ong_informations.classList.add('ong_informations')
            div_ong_informations.innerHTML = 
            `
            <h3 class="ong_informations_title">${value.ong_name}</h3>
                <div class="space1">
                    <div class="space2">
                        <div class="ong_informations_local_content">
                                <span class="material-symbols-outlined" id="ong_informations_local_icon">location_on</span>
                                <p class="ong_informations_local_text"><a href="linkqualquer?${value.ong_name}${value._id}">${value.ong_address}</a></p>
                        </div>

                        <div class="ong_informations_phone_content">
                                <span class="material-symbols-outlined" id="ong_informations_phone_icon">call</span>
                                <p class="ong_informations_phone_text">${value.ong_phone}</p>
                        </div>

                        <div class="ong_informations_id_content">
                                <span class="material-symbols-outlined" id="ong_informations_id_icon">apartment</span>
                                <p class="ong_informations_id_text">${value.ong_cnpj}</p>
                        </div>
                    </div>
                </div>
            `

            const div_ong_perfil = document.createElement('div')
            div_ong_perfil.classList.add('ong_perfil')
            div_ong_perfil.innerHTML = 
            `
            <div class="ong_perfil_logo">
                <img src="${value.ong_logo}" alt="Logo da organização ${value.ong_name}" class="ong_perfil_logo_img">
            </div>
            <p class="ong_perfil_arroba">${value.ong_email}</p>
            <button class="ong_perfil_link" id="${value.ong_name}${value._id}">Perfil emerG</button>
            `
            
            div_ong.appendChild(div_ong_logo)
            div_ong.appendChild(div_ong_informations)
            div_ong.appendChild(div_ong_perfil)
            section2.appendChild(div_ong)
    }
    else
    {
        generalOngs.forEach(item => 
        {
            if(item._id == value)
            {
                const div_ong = document.createElement('div')
                div_ong.classList.add('ong')
        
                const div_ong_logo = document.createElement('div')
                div_ong_logo.classList.add('ong_logo')
                div_ong_logo.innerHTML = `<img src="${item.ong_logo}" alt="" class="ong_logo_img">`
        
                const div_ong_informations = document.createElement('div')
                div_ong_informations.classList.add('ong_informations')
                div_ong_informations.innerHTML = 
                `
                <h3 class="ong_informations_title">${item.ong_name}</h3>
                    <div class="space1">
                        <div class="space2">
                            <div class="ong_informations_local_content">
                                    <span class="material-symbols-outlined" id="ong_informations_local_icon">location_on</span>
                                    <p class="ong_informations_local_text"><a href="linkqualquer?${item.ong_name}${item._id}">${item.ong_address}</a></p>
                            </div>
        
                            <div class="ong_informations_phone_content">
                                    <span class="material-symbols-outlined" id="ong_informations_phone_icon">call</span>
                                    <p class="ong_informations_phone_text">${item.ong_phone}</p>
                            </div>
        
                            <div class="ong_informations_id_content">
                                    <span class="material-symbols-outlined" id="ong_informations_id_icon">apartment</span>
                                    <p class="ong_informations_id_text">${item.ong_cnpj}</p>
                            </div>
                        </div>
                    </div>
                `
        
                const div_ong_perfil = document.createElement('div')
                div_ong_perfil.classList.add('ong_perfil')
                div_ong_perfil.innerHTML = 
                `
                <div class="ong_perfil_logo">
                    <img src="${item.ong_logo}" alt="Logo da organização ${item.ong_name}" class="ong_perfil_logo_img">
                </div>
                <p class="ong_perfil_arroba">${item.ong_email}</p>
                <button class="ong_perfil_link" id="${item.ong_name}${item._id}">Acessar perfil</button>
                `
                
                div_ong.appendChild(div_ong_logo)
                div_ong.appendChild(div_ong_informations)
                div_ong.appendChild(div_ong_perfil)
                section2.appendChild(div_ong)
            }
        })
    }
}

async function createMarkersMap()
{
    someNiche = inputNiche.value
    someRegion = inputRegion.value
    someStars = stars

    generalOngs.forEach((item) => 
    {
        var someItemNiche = item.ong_niche
        var someItemRegion = item.ong_city
        var someItemStars = item.ong_stars
    
        if(inputNiche.value == '')
        {
            someNiche = typeof inputNiche.value
            someItemNiche = typeof item.ong_niche
        }
    
        if(inputRegion.value == '')
        {
            someRegion = typeof inputRegion.value
            someItemRegion = typeof item.ong_city
        }
    
        if(stars == undefined || stars == 0)
        {
            stars = 0
            someStars = typeof stars
            someItemStars = typeof item.ong_stars
        }
    

        if(someItemNiche == someNiche && someItemRegion == someRegion && someItemStars == someStars)
        {
            const iconFromOng = item.ong_icon
            if(iconFromOng != '')
            {
                iconFromOng = `https://developers.google.com/maps/documentation/javascript/examples/full/images/${item.ong_icon}`
            }

            filterPlaces.push(item._id)

            quantivityMarkers = quantivityMarkers + 1
                        
            mapPlacesSetting[`newName${item._id}`] = 
            {
                position: {lat: item.ong_lat, lng: item.ong_lng},
                map: map, 
                title: `${quantivityMarkers}. ${item.ong_name}`,
                email: item.ong_email,
                address: item.ong_address,
                logo: item.ong_logo,
                id: item._id,
                icon: iconFromOng,
                item: item.ong_description,
                ariaLabel: "sans-serif",
                InicialPosition: {lat: -23.527471502557056, lng: -46.85516892549204},
                targetPosition: {lat: item.ong_lat, lng: item.ong_lng},
            }
        }
    })

    // console.log(filterPlaces)

    initMap()
}

function inputs()
{
    if(window.getComputedStyle(formsAddMarker_CreateMiniMap,'::before').display == 'block')
    {
        switch (true)
        {
            case formsAddMarker_input[2].value == 1: 
                formsAddMarker_labelFloodLevel.style.setProperty('background-color', 'green')
                formsAddMarker_labelFloodLevel.innerText = 'Baixa'
                miniMap_floodLevel = 1    
                break
            case formsAddMarker_input[2].value == 2: 
                formsAddMarker_labelFloodLevel.style.setProperty('background-color', 'yellow')        
                formsAddMarker_labelFloodLevel.innerText = 'Moderada'
                miniMap_floodLevel = 2
                break
            case formsAddMarker_input[2].value == 3: 
                formsAddMarker_labelFloodLevel.style.setProperty('background-color', 'red')    
                formsAddMarker_labelFloodLevel.innerText = 'Alta'
                miniMap_floodLevel = 3
                break
            default:
                formsAddMarker_labelFloodLevel.style.setProperty('background-color', 'transparent')    
                formsAddMarker_labelFloodLevel.innerText = 'Indique o nível de perigo:'
                miniMap_floodLevel = 0
        } 

        if(formsAddMarker_input[0].value != '' && formsAddMarker_input[1].value != '' && miniMap_floodLevel != 0)
        {
            isMiniMap = true
            formsAddMarker_CreateMiniMap.style.setProperty('--MiniMapDisplay1', 'none')
            formsAddMarker_ReloadMiniMap.style.setProperty('--MiniMapDisplay2', 'block')

            newMarkerData.address = formsAddMarker_input[0].value
            newMarkerData.name = formsAddMarker_input[1].value
            newMarkerData.floodLevel = formsAddMarker_input[2].value
            newMarkerData.lat = miniMapLocation.lat
            newMarkerData.lng = miniMapLocation.lng

            informationsNewmarker['informationsNewmarker'] =
            {
                address: miniMapAddress,
                name: `${miniMapName[0]} - ${miniMapName[1]}`,
                floodLevel: miniMap_floodLevel,
                lat: miniMapLocation.lat,
                lng: miniMapLocation.lng 
            }

            lastFormsAddMarker_address = miniMapAddress
            lastFormsAddMarker_name = `${miniMapName[0]} - ${miniMapName[1]}`
            lastFormsAddMarker_floodLevel = miniMap_floodLevel

            initMap()
        }
    }
}

async function initAutocomplete()
{
    autocomplete = await new google.maps.places.Autocomplete(
        formsAddMarker_inputAddress,
        {
            types: ['address'],
            componentRestrictions: {'country': ['BR']},
            fields: ['place_id', 'address_components', 'geometry', 'formatted_address'],
            bounds: {east: -44.161383, west: -53.087639, north: -19.960703, south: -25.312421},
            strictBounds: true
        })
        
    // highest -19.960703, -47.470544
    // lowest -25.312421, -48.099610
    // more to left (west) -22.657729, -53.087639
    // more to right (east) -22.678262, -44.161383

    autocomplete.addListener('place_changed', async function()
    {
        var place = await autocomplete.getPlace()

        if(place.geometry)
        {
            miniMapAddress = place.formatted_address

            miniMapName.push(place.address_components[0].long_name)
            miniMapName.push(place.address_components[2].long_name) 

            miniMapLocation = JSON.stringify(place.geometry.location)
            miniMapLocation = JSON.parse(miniMapLocation)

            formsAddMarker_input[1].value = place.address_components[2].long_name

            // geocoder = await new google.maps.Geocoder()
            // await geocoder.geocode({address: place.formatted_address, bounds: {east: -44.161383, west: -53.087639, north: -19.960703, south: -25.312421}})
            // .then((result) => 
            // {
            //     miniMapLocation = JSON.stringify(result.results[0].geometry.location)
            //     miniMapLocation = JSON.parse(miniMapLocation)
            //     console.log("Endereço encontrado")
            // })
            // .catch((e) => 
            // {
            //     console.log("Não possivel encontrar a localização por causa do erro: " + e)
            // })
        }
    })    
}

// controllers **************************************

// ------------------------------------------------
// FORMS SEARCH ONGS
// ------------------------------------------------

filter_icon.addEventListener('click', () => 
{
    stars = 0
    section_background.style.setProperty('display', 'flex')
    body.style.setProperty('overflow-y', 'hidden')
})

filterForms_closeButton.addEventListener('click', function()
{
    section_background.style.setProperty('display', 'none')
    body.style.setProperty('overflow-y', 'auto')
    stars = 0

    for(i = 0; i < 5; i++)
    {
        contentStars_stars[i].classList.remove('ativo')
        contentStars_stars[i].classList.remove('sla')
    }
})

formsButtonSearch.addEventListener('click', async function()
{
    const showFilters = await document.getElementsByClassName('showFilter')
    var showFilter_length = await showFilters.length

    console.log(showFilters)
    console.log(showFilter_length)

    if(showFilters[0] != undefined)
    {
        for(i = 0; i < showFilter_length; i++)
        {
            console.log(showFilter_length)
            document.getElementById('choose_searchBarFilter').removeChild(document.getElementById('choose_searchBarFilter').getElementsByClassName('showFilter')[0])
            console.log('apagou')
        }
    }
    
    quantivityMarkers = 0
    locali_mainlyStringId_before = -1
    locali_infoWindows = []
    locali_markers = []

    await createMarkersMap()

    section_background.style.setProperty('display', 'none')
    body.style.setProperty('overflow-y', 'auto')

    for(i = 0; i < 5; i++)
    {
        contentStars_stars[i].classList.remove('ativo')
        contentStars_stars[i].classList.remove('sla')
    }

    if(someNiche == inputNiche.value)
    {
        const showFilter = document.createElement('div')
        const showFilter_icon = document.createElement('span')
        const showFilter_text = document.createElement('p')

        showFilter.classList.add('showFilter')
        showFilter.setAttribute('id', 'showFilter_niche')
        showFilter_icon.classList.add('material-symbols-outlined')
        showFilter_icon.setAttribute('id', 'showFilter_icon')
        showFilter_icon.innerText = 'close'
        showFilter_text.innerText = someNiche

        showFilter.appendChild(showFilter_icon)
        showFilter.appendChild(showFilter_text)
        document.getElementById('choose_searchBarFilter').appendChild(showFilter)
    }

    if(someRegion == inputRegion.value)
    {
        const showFilter = document.createElement('div')
        const showFilter_icon = document.createElement('span')
        const showFilter_text = document.createElement('p')

        showFilter.classList.add('showFilter')
        showFilter.setAttribute('id', 'showFilter_region')
        showFilter_icon.classList.add('material-symbols-outlined')
        showFilter_icon.setAttribute('id', 'showFilter_icon')
        showFilter_icon.innerText = 'close'
        showFilter_text.innerText = someRegion

        showFilter.appendChild(showFilter_icon)
        showFilter.appendChild(showFilter_text)
        document.getElementById('choose_searchBarFilter').appendChild(showFilter)                   
    }

    if(someStars == stars)
    {
        const showFilter = document.createElement('div')
        const showFilter_icon = document.createElement('span')
        const showFilter_text = document.createElement('p')

        showFilter.classList.add('showFilter')
        showFilter.setAttribute('id', 'showFilter_stars')
        showFilter_icon.classList.add('material-symbols-outlined')
        showFilter_icon.setAttribute('id', 'showFilter_icon')
        showFilter_icon.innerText = 'close'
        if(stars > 1)
        {
            showFilter_text.innerText = `${stars} estrelas`
        }
        else
        {
            showFilter_text.innerText = `${stars} estrela`
        }

        showFilter.appendChild(showFilter_icon)
        showFilter.appendChild(showFilter_text)
        document.getElementById('choose_searchBarFilter').appendChild(showFilter)
    }

    showFilter_length = await showFilters.length

    for(i = 0; i < showFilter_length; i++)
    {
        document.getElementsByClassName('showFilter')[i].addEventListener('click', function(event)
        {
            quantivityMarkers = 0
            locali_mainlyStringId_before = -1
            locali_infoWindows = []
            locali_markers = []

            console.log(event.target.id)

            if(event.target.id == 'showFilter_icon')
            {
                console.log(event.target.parentNode.id)

                switch(event.target.parentNode.id)
                {
                    case 'showFilter_niche':
                        inputNiche.value = ''
                        createMarkersMap()
                        document.getElementById('choose_searchBarFilter').removeChild(document.getElementById('showFilter_niche'))
                        break
                    case 'showFilter_region':
                        inputRegion.value = ''
                        createMarkersMap()
                        document.getElementById('choose_searchBarFilter').removeChild(document.getElementById('showFilter_region'))
                        break
                    case 'showFilter_stars': 
                        stars = 0
                        createMarkersMap()
                        document.getElementById('choose_searchBarFilter').removeChild(document.getElementById('showFilter_stars'))
                        break
                    default:
                }

                console.log(inputRegion.value)
            }
        })
    }
})

contentStars.addEventListener('click', function(event)
{
    if(!event.target.classList.contains('ativo'))
    {
        for(i = 0; i < 5; i++)
        {
            contentStars_stars[i].classList.remove('ativo')
            contentStars_stars[i].classList.remove('sla')
        }

        event.target.classList.add('ativo')

        for(i = 0; i < event.target.id; i++)
        {
            contentStars_stars[i].classList.add('sla')
            contentStars_stars[i].classList.add('sla')
        }
    }

    stars = Number.parseInt(event.target.id)
})

// ------------------------------------------------
// SEARCHBAR
// ------------------------------------------------

// searchBar.addEventListener('click', () => 
// {
//     filter_icon.style.setProperty('border', '2px solid black')
//     searchBar.style.setProperty('border', '2px solid black')
// })

// window.addEventListener('click', (event) => 
// {
//     if(event.target.tagName == 'HEADER')
//     {
//         filter_icon.style.setProperty('border', '3px solid #0d74e5')
//         searchBar.style.setProperty('border', '3px solid #0d74e5')
//         document.getElementById('choose_searchBarFilter_contentOptions').style.setProperty('display', 'none')
//         choose_searchBarFilter_content.style.setProperty('background-color', 'transparent')
//     }
// })

function filtrar()
{
    document.getElementById('choose_searchBarFilter_contentOptions').style.setProperty('display', 'flex')
    choose_searchBarFilter_content.style.setProperty('background-color', 'transparent')
    searchBar.style.setProperty('background-color', 'white')

    var medicine_search,
        filter,
        li,
        a,
        i,
        span,
        textValue,
        count = 0

    // medicine_search = document.getElementById('medicine_search')

    const ul = document.getElementById('contentOptions_options')
    ul.style.setProperty('opacity', '1')

    filter = searchBar.value.toUpperCase();

    li = ul.getElementsByClassName('contentOptions_options_option');

    for(i = 0; i < li.length; i++)
    {
        ongName = li[i].getElementsByTagName('p')[0]

        textValue = ongName.innerText

        if(textValue.toLocaleUpperCase().indexOf(filter) > -1)
        {
            li[i].style.setProperty('display', 'flex')
            // console.log(li[i])
            count++
            // console.log('foi aceito')
        }
        else
        {
            li[i].style.setProperty('display', 'none')
            count--
            // count =0;
            // console.log('não foi aceito')
        }

        // span = li[i].querySelector('.medicine_span')

        if(ongName)
        {
            ongName.innerHTML = textValue.replace(new RegExp(filter, 'gi'), (match) => {
                return "<strong>" + match + "</strong>"
            })
        }
        else
        {
            li[i].style.setProperty('display', 'none')
        }

        if(count > 5)
        {
            li[i].style.setProperty('display', 'none')
        }
    }

    ul.style.setProperty('display', 'flex')

    // if(count < -5) //  ÉRA "0" O VALOR DE COMPARAÇÃO
    // {
    //     ul.style.setProperty('display', 'none')
    // }
    // else
    // {
    //     ul.style.setProperty('display', 'flex')
    // }


    ul.addEventListener('click', (event) =>
    {
        console.log('slalsa')
        change(event.target)
    })
}

contentOptions_options.addEventListener('click', function(event)
{
    console.log('ola')
    // contentOptions_options.style.setProperty('display', 'flex')
    switch(event.target.id)
    {
        case 'contentOptions_options':
            break
        default:
            console.log(event.target)
            if(event.target.tagName == 'DIV')
            {
                ids = event.target.id
                // console.log(event.target.id)
            }
            else if(event.target.tagName == 'IMG' || 'P')
            {
                event.target.id = event.target.parentNode.id
                ids = event.target.id
                // console.log(event.target.id)
            }

            generalOngs.forEach(item => 
            {
                if(item._id == ids)
                {
                    initMap(item)
                }
            })

            document.getElementById('choose_searchBarFilter_contentOptions').style.setProperty('display', 'none')
            choose_searchBarFilter_content.style.setProperty('background-color', 'transparent')
            searchBar.style.setProperty('background-color', '#a0d3ff')
            searchBar.value = ''
    }
})

// ------------------------------------------------
// MAP
// ------------------------------------------------

switch_content.addEventListener('click', () => 
{
    if(switchCounter == 1)
    {
        switch_circle.style.setProperty('right', '20%')
        switch_circle.style.setProperty('background-color', '#328cec')
        
        mapWater.style.setProperty('top', '23px')
        mapWater.style.setProperty('visibility', 'visible')
        mapWater.style.setProperty('opacity', '1')
        
        normalMap.style.setProperty('top', '-20%')
        normalMap.style.setProperty('visibility', 'hidden')
        normalMap.style.setProperty('opacity', '0')

        isMapWater = true
        
        document.getElementById('choose_searchBarFilter').style.setProperty('display', 'none')
        choose_buttonAddMarker.style.setProperty('display', 'block')

        if(!mapWater.getElementsByTagName('div')[0])
        {
            initMap()
        }
        
        isMapWater = false
        switchCounter = 0
    }
    else
    {
        switch_circle.style.setProperty('right', '80%')
        switch_circle.style.setProperty('background-color', '#a0d3ff')
        
        mapWater.style.setProperty('top', '-20%')
        mapWater.style.setProperty('visibility', 'hidden')
        mapWater.style.setProperty('opacity', '0')
        
        normalMap.style.setProperty('top', '23px')
        normalMap.style.setProperty('visibility', 'visible')
        normalMap.style.setProperty('opacity', '1')
        
        choose_buttonAddMarker.style.setProperty('display', 'none')
        document.getElementById('choose_searchBarFilter').style.setProperty('display', 'flex')

        switchCounter = 1
        isMapWater = false
    }
})

// ------------------------------------------------
// FORMS ADD MARKER
// ------------------------------------------------

choose_buttonAddMarker.addEventListener('click', function()
{
    section_background_2.style.setProperty('display', 'flex')
    body.style.setProperty('overflow-y', 'hidden')
    initAutocomplete()
})

formsAddMarker_btnClose.addEventListener('click', function()
{
    section_background_2.style.setProperty('display', 'none')
    body.style.setProperty('overflow-y', 'auto')

    newMarkerData = {
        address: '',
        name: '',
        floodLevel: 0,
        lat: 0,
        lng: 0
    }

    informationsNewmarker['informationsNewmarker'] =
    {
        address: '',
        name: '',
        floodLevel: 0,
        lat: 0,
        lng: 0
    }

    nameAuthorization_inputNo.checked = false
    nameAuthorization_inputYes.checked = false
    formsAddMarker_input[0].value = ''
    formsAddMarker_input[1].value = ''
    formsAddMarker_input[2].value = 0

    formsAddMarker_labelFloodLevel.style.setProperty('background-color', 'transparent')    
    formsAddMarker_labelFloodLevel.innerText = 'Indique o nível de perigo:'
    miniMap_floodLevel = 0

    formsAddMarker_CreateMiniMap.style.setProperty('--MiniMapDisplay1', 'block')
    formsAddMarker_ReloadMiniMap.style.setProperty('--MiniMapDisplay2', 'none')

    isMiniMap = false

    initMap()
})

btnAddNewMarker.addEventListener('click', function()
{
    // console.log('ja era')
    // console.log(newMarkerData.lat)
    // console.log(btnAddNewMarker.style.backgroundColor)
    if(btnAddNewMarker.style.backgroundColor == 'rgb(13, 116, 229)' && newMarkerData.lat != 0)
    {
        $.ajax({
            url: 'https://api-emer-g.vercel.app/createMarker',
            method: 'POST',
            data: JSON.stringify(newMarkerData),
            contentType: 'application/json'
        })
        .then((response) => 
        {
            console.log(response)

            section_background_2.style.setProperty('display', 'none')
            body.style.setProperty('overflow-y', 'auto')

            newMarkerData = {
                address: '',
                name: '',
                floodLevel: 0,
                lat: 0,
                lng: 0
            }

            informationsNewmarker['informationsNewmarker'] =
            {
                address: '',
                name: '',
                floodLevel: 0,
                lat: 0,
                lng: 0
            }

            nameAuthorization_inputNo.checked = false
            nameAuthorization_inputYes.checked = false
            formsAddMarker_input[0].value = ''
            formsAddMarker_input[1].value = ''
            formsAddMarker_input[2].value = 0

            formsAddMarker_labelFloodLevel.style.setProperty('background-color', 'transparent')    
            formsAddMarker_labelFloodLevel.innerText = 'Indique o nível de perigo:'
            miniMap_floodLevel = 0

            formsAddMarker_CreateMiniMap.style.setProperty('--MiniMapDisplay1', 'block')
            formsAddMarker_ReloadMiniMap.style.setProperty('--MiniMapDisplay2', 'none')

            isMiniMap = false

            initMap()
        })
        .catch((error) => 
            {
                console.log(error)
        })
    }
})

nameAuthorization_inputNo.addEventListener('change', function()
{
    if(nameAuthorization_inputNo.checked == true)
    {
        nameAuthorization_inputYes.checked = false
        btnAddNewMarker.style.setProperty('background-color', '#57a4f2')
        btnAddNewMarker.style.setProperty('cursor', 'default')
    }
})

nameAuthorization_inputYes.addEventListener('change', function()
{
    if(nameAuthorization_inputYes.checked == true)
    { 
        nameAuthorization_inputNo.checked = false
        btnAddNewMarker.style.setProperty('background-color', '#0d74e5')
        btnAddNewMarker.style.setProperty('cursor', 'pointer')
    }
})

formsAddMarker_ReloadMiniMap.addEventListener('click', async function()
{
    informationsNewmarker['informationsNewmarker'] =
    {
        address: miniMapAddress,
        name: `${miniMapName[0]} - ${miniMapName[1]}`,
        floodLevel: miniMap_floodLevel,
        lat: miniMapLocation.lat,
        lng: miniMapLocation.lng 
    }

    switch (true)
    {
        case formsAddMarker_input[2].value == 1: 
            formsAddMarker_labelFloodLevel.style.setProperty('background-color', 'green')
            formsAddMarker_labelFloodLevel.innerText = 'Baixo'
            miniMap_floodLevel = await 1    
            break
        case formsAddMarker_input[2].value == 2: 
            formsAddMarker_labelFloodLevel.style.setProperty('background-color', 'yellow')        
            formsAddMarker_labelFloodLevel.innerText = 'Moderado'
            miniMap_floodLevel = await 2
            break
        case formsAddMarker_input[2].value == 3: 
            formsAddMarker_labelFloodLevel.style.setProperty('background-color', 'red')    
            formsAddMarker_labelFloodLevel.innerText = 'Alto'
            miniMap_floodLevel = await 3
            break
        default:
            formsAddMarker_labelFloodLevel.style.setProperty('background-color', 'transparent')    
            formsAddMarker_labelFloodLevel.innerText = 'Nível de perigo'
            miniMap_floodLevel = await 0
    }

    console.log("último endereço: " + lastFormsAddMarker_address)
    console.log(miniMapAddress)
    console.log("último nome: " + lastFormsAddMarker_name)
    console.log(`${miniMapName[0]} - ${miniMapName[1]}`)
    console.log("último nível: " + lastFormsAddMarker_floodLevel)
    console.log(miniMap_floodLevel)

    if(miniMapAddress != lastFormsAddMarker_address || `${miniMapName[0]} - ${miniMapName[1]}` != lastFormsAddMarker_name || miniMap_floodLevel != lastFormsAddMarker_floodLevel)
    {
        isMiniMap = true
        initMap()
    }

    lastFormsAddMarker_address = miniMapAddress
    lastFormsAddMarker_name = `${miniMapName[0]} - ${miniMapName[1]}`
    lastFormsAddMarker_floodLevel = miniMap_floodLevel
})

async function initMap(value)
{
    if(isMapWater == false)
    {
        if(isMiniMap == false)
        {
            locali_map = new google.maps.Map(
                normalMap,
                {
                    zoom: 13, 
                    center: {lat: -23.527471502557056, lng: -46.85516892549204}
                }
            )

            if(filterPlaces.length == 0)
            {
                if(value)
                {
                    generalOngs.forEach(item => 
                    {
                        if(item._id == value)
                        {
                            const iconFromOng = item.ong_icon
                            if(iconFromOng != '')
                            {
                                iconFromOng = `https://developers.google.com/maps/documentation/javascript/examples/full/images/${item.ong_icon}`
                            }

                            marker = new google.maps.Marker({
                                position: {lat: item.ong_lat, lng: item.ong_lng},
                                map: locali_map, 
                                title: item.ong_name,
                                id: item._id,
                                icon: iconFromOng
                            })
                        
                            infoWindow = new google.maps.InfoWindow({
                                content: `<h1 class="sla2">` + `${item.ong_description}` + `</h1>`,
                                ariaLabel: "sans-serif"
                            })
                                
                            flightPlanCoordinates = [
                                {lat: -23.527471502557056, lng: -46.85516892549204},
                                {lat: item.ong_lat, lng: item.ong_lng}
                            ]
                                
                            flightPath = new google.maps.Polyline({
                                path: flightPlanCoordinates,
                                geodesic: true,
                                strokeColor: "#FF0000",
                                strokeOpacity: 1.0,
                                strokeWeight: 2,
                            })
                                
                            flightPath.setMap(locali_map)
                            
                            marker.addListener("click", (event) => {
                                infoWindow.close();
                                infoWindow.open({anchor: marker, map: locali_map});
                            })
                            
                            section2.innerHTML = ''
            
                            tagOngs(item) 
                        }
                    })
                }
            }
            else
            {
                section2.innerHTML = ''

                filterPlaces.forEach((filterPlaces_item) => 
                {                
                    marker = new google.maps.Marker({
                        position: {
                                    lat: mapPlacesSetting[`newName${filterPlaces_item}`].targetPosition.lat,
                                    lng: mapPlacesSetting[`newName${filterPlaces_item}`].targetPosition.lng
                                },
                        map: locali_map,
                        title: mapPlacesSetting[`newName${filterPlaces_item}`].title,
                        icon: mapPlacesSetting[`newName${filterPlaces_item}`].icon,
                        pointerId: mapPlacesSetting[`newName${filterPlaces_item}`].id,
                        gmpClickable: true,
                    })

                    console.log(mapPlacesSetting[`newName${filterPlaces_item}`].icon)

                    locali_markers.push(marker)

                    const tamplateMarker = `
                    <div class="markerContent">
                        <img src="${mapPlacesSetting[`newName${filterPlaces_item}`].logo}" alt="" class="markerContent_img">

                        <div class="markerContent_info">
                            <p class="info_name">${mapPlacesSetting[`newName${filterPlaces_item}`].title}</p>
                            <p class="info_email">${mapPlacesSetting[`newName${filterPlaces_item}`].email}</p>
                            <div class="content_info_address">
                                <p class="info_address">${mapPlacesSetting[`newName${filterPlaces_item}`].address}</p>
                            </div>
                        </div>
                    </div>
                    <div class="markerDescription">
                        <p class="markerDescription_description">${mapPlacesSetting[`newName${filterPlaces_item}`].content}</p>
                    </div>
                    `

                    infoWindow = new google.maps.InfoWindow({
                        content: tamplateMarker,
                        ariaLabel: mapPlacesSetting[`newName${filterPlaces_item}`].ariaLabel
                    })
                        
                    locali_infoWindows.push(infoWindow)

                    flightPlanCoordinates = [
                        mapPlacesSetting[`newName${filterPlaces_item}`].InicialPosition,
                        mapPlacesSetting[`newName${filterPlaces_item}`].targetPosition
                    ]

                    flightPath = new google.maps.Polyline({
                        path: flightPlanCoordinates,
                        geodesic: true,
                        strokeColor: "#FF0000",
                        strokeOpacity: 1.0,
                        strokeWeight: 2,
                    })
                            
                    flightPath.setMap(locali_map)
                    
                    console.log(mapPlacesSetting[`newName${filterPlaces_item}`].id)
                    tagOngs(mapPlacesSetting[`newName${filterPlaces_item}`].id)
                })

                const markers_length = await locali_markers.length

                for(i = 0; i < markers_length; i++)
                {
                    locali_markers[i].addListener("click", (event) => {
                        
                        const mainlyString = event.domEvent.target.parentNode.getAttribute('title')
                        const mainlyStringId = mainlyString.split('. ')[0]

                        // console.log(mainlyString.split('. ')[0])
                        // console.log(locali_infoWindows)
                        // console.log(locali_markers)

                        if(locali_mainlyStringId_before != -1)
                        {
                            locali_infoWindows[locali_mainlyStringId_before].close();
                        }

                        locali_infoWindows[mainlyStringId - 1].open({anchor: locali_markers[mainlyStringId - 1], map: map});

                        locali_mainlyStringId_before = mainlyStringId - 1
                    })
                }
        
                filterPlaces = []
            }
        }
        else
        {
            var flood_level
            var colorIcon

            mini_map = new google.maps.Map(
                miniMap,
                {
                    zoom: 13, 
                    center: {lat: informationsNewmarker['informationsNewmarker'].lat, lng: informationsNewmarker['informationsNewmarker'].lng},
                    mapTypeId: "terrain"
                }
            ) 

            switch (miniMap_floodLevel)
            {
                case 1: 
                    flood_level = 'Baixa'
                    colorIcon = 'https://i.im.ge/2024/06/23/KJZwUp.point-verde.png'
                    break
                case 2: 
                    flood_level = 'Moderada'
                    colorIcon = 'https://i.im.ge/2024/06/23/KJWGF0.point-amarelo.png'
                    break
                case 3: 
                    flood_level = 'Alta'
                    colorIcon = 'https://i.im.ge/2024/06/23/KJZZyJ.point-vermelho.png'
                    break
                default: 
                    flood_level = ''
                    colorIcon = `${colorIcon}`
            }

            marker = await new google.maps.Marker({
                position: {lat: informationsNewmarker['informationsNewmarker'].lat, lng: informationsNewmarker['informationsNewmarker'].lng},
                map: mini_map,
                title: `${informationsNewmarker.name}`,
                icon: colorIcon
            })
            
            isMiniMap = false
        }
    }
    else
    {
        water_map = new google.maps.Map(
            mapWater,
            {
                zoom: 13, 
                center: {lat: -23.527471502557056, lng: -46.85516892549204},
                mapTypeId: "terrain"
            }
        )


        generalMarkers.forEach((item) => 
        {
            console.log(item.floodLevel)
            var flood_level
            var colorIcon

            switch (item.floodLevel)
            {
                case 1: 
                    flood_level = 'Baixa'
                    colorIcon = 'https://i.im.ge/2024/06/23/KJZwUp.point-verde.png'
                    break
                case 2: 
                    flood_level = 'Moderada'
                    colorIcon = 'https://i.im.ge/2024/06/23/KJWGF0.point-amarelo.png'
                    break
                case 3: 
                    flood_level = 'Alta'
                    colorIcon = 'https://i.im.ge/2024/06/23/KJZZyJ.point-vermelho.png'
                    break
                default: 
                    flood_level = ''
                    colorIcon = ''
            }

            marker = new google.maps.Marker({
                position: {lat: parseFloat(item.lat.$numberDecimal), lng: parseFloat(item.lng.$numberDecimal)},
                map: water_map,
                title: `${item.id_flood}. ${item.name}`,
                icon: `${colorIcon}`
                // position: {lat: -23, lng: -22},
                // map: water_map,
                // title: `${item.id_flood}. ${item.name}`,
                // icon: ''
            })

            console.log(item.floodLevel)
            console.log(colorIcon)
            console.log(marker)

            water_markers.push(marker)

            infoWindow = new google.maps.InfoWindow({
                content: `
                Rua e Cidade: ${item.name}<br>
                Endereço: ${item.address}<br>
                Possibilidade de enchente: ${flood_level}
                `,
                ariaLabel: 'slameu',
                position: {lat: parseInt(item.lat), lng: parseInt(item.lng)}
            })

            flood_level = ''
            colorIcon = ''

            water_infoWindows.push(infoWindow)
        })

        const markers_length = await water_markers.length

        for(i = 0; i < markers_length; i++)
        {
            const indeOFMarkerWater = water_markers.indexOf(water_markers[i])

            water_markers[i].addListener("click", (event) => {
                
                console.log(indeOFMarkerWater)

                if(water_mainlyStringId_before != -1)
                {
                    water_infoWindows[indeOFMarkerWater].close();
                }

                water_infoWindows[indeOFMarkerWater].open({anchor: water_markers[indeOFMarkerWater], map: water_map});

                event.domEvent.target.parentNode.classList.remove('markersAnimation')
            })
                
            // water_markers[i].addListener("mouseover", (event) => {
            //     console.log(event.domEvent.target.getAttribute('src'))
            //     event.domEvent.target.setAttribute('src', 'https://i.im.ge/2024/06/20/KzeoMz.point-amarelo-removebg-preview.png')
            //     console.log(event.domEvent.target.parentNode)
            //     event.domEvent.target.parentNode.classList.add('markersAnimation')
            // })

            water_markers[i].addListener('mouseout', (event) =>
            {
                event.domEvent.target.parentNode.classList.remove('markersAnimation')
            })
        }
    }
}

function change(li)
{

    searchBar.style.setProperty('background-color', 'white')

    if(document.getElementById('choose_searchBarFilter').getElementsByClassName('showFilter'))
    {
        tags = document.getElementById('choose_searchBarFilter').getElementsByClassName('showFilter')
        tagsLength = tags.length

        for(i = 0; i < tagsLength; i++)
        {
            document.getElementById('choose_searchBarFilter').removeChild(tags[0])
        }
    }

    initMap(li.getAttribute('id'))
}

// https://maps.googleapis.com/maps/api/elevation/json?locations=-23.52697%2C-46.85071&key=AIzaSyCu1hZJ8YYYbhmnvSi7E-oJksxXAP0yv3k