//add pin locations selector first with default set as text

let pinLocations = document.getElementById("pin-location-dropdown")
let pinDefault = document.createElement("option")
pinDefault.text = "Select Pin Location"

pinLocations.add(pinDefault)

for (let i = 1; i < 50; i++){
    let option = document.createElement("option")
    option.text = i
    option.value = i

    pinLocations.add(option)
}

//courses dropdown pulls from database to populate itself

let courses = document.getElementById("courses-dropdown")

