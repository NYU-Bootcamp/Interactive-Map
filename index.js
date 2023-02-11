window.onload = async () => {
    const coords = await user.getCoords()
    map.coordinates = coords
    map.createMap()
    user.addMap()
}

let body = document.querySelector('body')
let selector = document.getElementById('maps')
let mapButton = document.getElementById('addMap')

mapButton.addEventListener('click', async() => {
    let newMap = document.createElement('div')
    let oldMap = document.getElementById('map')
    oldMap.remove()
    newMap.id = 'map'
    body.append(newMap)
    let coords = await map.searchAddress()
    map.coordinates = [coords.lat, coords.lng]
    map.createMap()
    user.addMap()
    selector.value += 1
}) 

selector.addEventListener('change', () => {
    map.coordinates = user.maps[selector.value]
    let newMap = document.createElement('div')
    let oldMap = document.getElementById('map')
    oldMap.remove()
    newMap.id = 'map'
    body.append(newMap)
    map.createMap()
})

function selectorAddMaps(){
    selector.innerHTML = ''
    for(let i =0; i < user.maps.length; i++){
        let option = document.createElement('option')
        option.innerText = 'Map #' + [i+1]
        option.value = i
        selector.append(option)
    }
}