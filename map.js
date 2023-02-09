let map = {
    myMap: '',
    createMap: function(coordinates){
        this.myMap = L.map('map', {
        center: [coordinates[0], coordinates[1]],
        zoom: 14,
        })
        
        const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            minZoom: '14',
        }).addTo(this.myMap)

        // Create and add a geolocation marker:
        const marker = L.marker(coordinates, {icon: user.pin()})
        marker.addTo(this.myMap).bindPopup('<p1><b>You\'re Here</b></p1>').openPopup()

    },
    setCoords: function(coords){
        console.log(coords)
        this.myMap.center = [coords[0], coords[1]]
    }
}

