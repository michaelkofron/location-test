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

let configurationObject = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
}
fetch("https://golfingapi.herokuapp.com/getcourses", configurationObject)
    .then(function(response){
        return response.json()
    })
    .then(function(object){
        object.forEach(function(course){
            console.log(object)
        })
    })
    .catch(function(error){
        console.log(error)
        alert("error")
    })

