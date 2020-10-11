let pinLocations = document.getElementById("pin-location-dropdown")

for (let i = 1; i < 101; i++){
    let option = document.createElement("option")
    option.text = i
    option.value = i

    pinLocations.add(option)
}