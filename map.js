let map = {
    myMap: '',
    createMap: function(coordinates){
        this.myMap = L.map('map', {
        center: [coordinates[0], coordinates[1]],
        zoom: 15,
        })
    
        const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            minZoom: '12',
        }).addTo(this.myMap)

        const mbSatellite = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/512/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWJsdWVtbGVpdiIsImEiOiJjbGR3Y2JsbG0wNXdtM3BwN2kycmY5MXp2In0.Rkifjm7VC8JoZLNFzmWwjA', {
            attribution: `&copy; <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>`,
            minZoom: '12',
        }).addTo(this.myMap)

        const mbOutdoors = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/tiles/512/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWJsdWVtbGVpdiIsImEiOiJjbGR3Y2JsbG0wNXdtM3BwN2kycmY5MXp2In0.Rkifjm7VC8JoZLNFzmWwjA', {
            attribution: `&copy; <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>`,
            minZoom: '12',
        }).addTo(this.myMap)

        // Create and add a geolocation marker:
        const marker = L.marker(coordinates, {icon: user.pin()})
        marker.addTo(this.myMap).bindPopup('<h3><b>You\'re Here</b></h3>').openPopup()

        const baseMaps = {
            "Street Map": osm,
            "Satellite": mbSatellite,
            "Outdoors": mbOutdoors
        };

        const layerControl = L.control.layers(baseMaps).addTo(this.myMap);
    },

    setCoords: function(coords){
        this.myMap.center = [coords[0], coords[1]]
    },

    locationPin: L.icon({
        iconUrl: './assets/orange-pin.png',
        iconSize: [38, 38],
        iconAnchor: [19, 38],
        popupAnchor: [0, -38],
    }),

    pins: '',

    places: async function(place){
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'fsq39OyVdkJ1LhlYqy1ncE5a2z+UT041N4rdhfn03w9bEEA='
            }
          };
          
        let response = await fetch('https://api.foursquare.com/v3/places/search?query=' + place + '&ll=42.97%2C-78.84&radius=8046&sort=DISTANCE&limit=5', options)
        let locations = await response.json()
        
        let spots = []
        locations.results.forEach(element => {
            const coords = element.geocodes.main
            const location = L.marker([coords.latitude, coords.longitude],{icon: this.locationPin}).bindPopup(`<h3>${element.name}</h3><br>${element.location.formatted_address}`)
            spots.push(location)
        });
        this.pins = L.layerGroup(spots).addTo(this.myMap)
    },

    removePins: function(){
        this.pins.removeFrom(this.myMap)
    }

}

