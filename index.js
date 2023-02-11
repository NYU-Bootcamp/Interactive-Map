window.onload = async () => {
    const coords = await user.getCoords()
    map.createMap(coords)
}

function selectorAddMaps(){
    let selector = document.getElementById('maps')
    
    for(let i =0; i < user.maps.length; i++){
        let option = document.createElement('option')
        option.innerText = 'Map #' + [i+1]
        selector.append(option)
    }
}