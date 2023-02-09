window.onload = async () => {
    const coords = await user.getCoords()
    map.createMap(coords)
}