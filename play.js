let values = window.location.href.split("?")[1].split("&")
let courseId = values[0].split("=")[1]
let hole = values[1].split("=")[1]
let teeName = values[2].split("=")[1]
let pinLocation = values[3].split("=")[1]

let course = document.getElementById("course-name")
let title = document.getElementById("title")
let info = document.getElementById("info")

let finish = document.getElementById("finish")

let configurationObject = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
}
fetch(`https://golfingapi.herokuapp.com/getinfo/${courseId}/${hole}/${teeName}`, configurationObject)
    .then(function(response){
        return response.json()
    })
    .then(function(object){
        console.log(object)
        course.innerText = object.course.name
        title.innerText = `Hole #${object.hole.number}`
        info.innerText = `Par ${object.hole.par} | ${object.tee.distance} yds`
        if (object.last){
            finish.innerText = "Finish Your Round"
            finish.setAttribute("href", "./round.html")
        } else {
            finish.innerText = "Finish Hole"
            finish.setAttribute("href", `./play.html?course=${courseId}&hole=${parseInt(hole) + 1}&tee=${teeName}&pinlocation=${pinLocation}`)
        }
    })
    .catch(function(error){
        console.log(error)
        alert("error")
    })