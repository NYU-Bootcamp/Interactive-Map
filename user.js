let user = {
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

    getSelection: function(){
        const selectors = document.getElementsByClassName('place')
        for(let i=0; i < selectors.length; i++){
            selectors[i].addEventListener("click", () =>{
                console.log(selectors[i].value)
            })
        }
    } 
}

user.getSelection()
