let user = {
    maps: [],
    addMap: function(){
        this.maps.push(map.myMap)
        selectorAddMaps()
    },
    getCoords: async function(){
        let pos = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
        })
        return [pos.coords.latitude, pos.coords.longitude]
    },

    pin: function(){
        pin = L.icon({
            iconUrl: './assets/blue-pin.png',
            iconSize: [38, 38],
            iconAnchor: [19, 38],
            popupAnchor: [0, -38],
        });
        return pin
    },

    selection: '',

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

user.getSelection()
