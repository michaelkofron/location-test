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

let courses = document.getElementById("course-dropdown")

let coursesDefault = document.createElement("option")
coursesDefault.text = "Select Your Course"
courses.add(coursesDefault)

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
            let option = document.createElement("option")
            option.text = course.name
            option.value = course.id
            courses.add(option)
        })
    })
    .catch(function(error){
        console.log(error)
        alert("error")
    })

courses.addEventListener("input", function(e){
    let value = e.target.value
    let tees = document.getElementById("tee-dropdown")
    tees.length = 0
    let teesDefault = document.createElement("option")
    teesDefault.text = "Select Tees"
    tees.add(teesDefault)
    
    let configurationObject = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }
    fetch(`https://golfingapi.herokuapp.com/getspecific/${value}`, configurationObject)
        .then(function(response){
            return response.json()
        })
        .then(function(object){
            let array = []
            object.tees.forEach(function(tee){
                
                    let option = document.createElement("option")
                    option.text = tee.name
                    option.value = tee.name
                    tees.add(option)
                
            })
        })
        .catch(function(error){
            console.log(error)
            alert("error")
        })

})