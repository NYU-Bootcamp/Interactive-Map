let user = {
    // A variable which contains an array of coordinates for each man
    maps: [],
    // A function which adds new map coordinates to the array above and adds to the selection list
    addMap: function(){
        this.maps.push(map.coordinates)
        selectorAddMaps()
    },
    // A function which gets the current coordinates of the user
    getCoords: async function(){
        let pos = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
        })
        return [pos.coords.latitude, pos.coords.longitude]
    },
    // A function that returns the user pin
    pin: function(){
        pin = L.icon({
            iconUrl: './assets/blue-pin.png',
            iconSize: [38, 38],
            iconAnchor: [19, 38],
            popupAnchor: [0, -38],
        });
        return pin
    },
    // A variable which holds the current place selection
    selection: '',
    // A function which gets the user's selection and creates new pins when changed
    getSelection: function(){
        const selectors = document.getElementsByClassName('place')
        for(let i=0; i < selectors.length; i++){
            selectors[i].addEventListener("click", () =>{
                if(map.pins){
                    map.removePins()
                }
                this.selection = selectors[i].value
                map.places(selectors[i].value)
            })
        }
    } 
}

// Runs the getSelection function once to create the event listeners
user.getSelection()
