// Performs functions onload:
// - Gets previous maps from local storage & sets user.maps to this array
// - Gets user coordinates
// - Sets the maps coordinates to those
// - Creates a map with those coordinates
// - Adds those coordinates to the user's array so it can be recalled later
window.onload = async () => {
    let maps = JSON.parse(localStorage.getItem("maps"))
    if(maps){
        user.maps = maps
    }
    const coords = await user.getCoords()
    map.coordinates = coords
    map.createMap()
    user.maps[0] = map.coordinates
    selectorAddMaps()
}

// Selects elements that will be used for alternating between maps
let body = document.querySelector('body')
let selector = document.getElementById('maps')
let mapButton = document.getElementById('addMap')

// Creates an eventlistener for the add map button
// On click it uses the value in the text input to search for new coordinates
// Then it destroys the old map element and creates a new on in its place
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

// Creates an eventlistener for the dropdown selector
// Destroys the old map and creates a new on in its place on change
selector.addEventListener('change', () => {
    map.coordinates = user.maps[selector.value]
    let newMap = document.createElement('div')
    let oldMap = document.getElementById('map')
    oldMap.remove()
    newMap.id = 'map'
    body.append(newMap)
    map.createMap()
})

// Creates a dropdown option for each map that's available
function selectorAddMaps(){
    selector.innerHTML = ''
    for(let i =0; i < user.maps.length; i++){
        let option = document.createElement('option')
        option.innerText = 'Map #' + [i+1]
        option.value = i
        selector.append(option)
    }
}