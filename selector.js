let pinLocations = document.getElementById("pin-location-dropdown")
let pinDefault = document.createElement("option")
pinDefault.text = "Select Pin Location"

for (let i = 1; i < 50; i++){
    let option = document.createElement("option")
    option.text = i
    option.value = i

    pinLocations.add(option)
}

let courses = document.getElementById("courses-dropdown")

