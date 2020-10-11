

let values = window.location.href.split("?")[1].split("&")
let courseId = values[0].split("=")[1]
let hole = values[1].split("=")[1]
let teeName = values[2].split("=")[1]
let pinLocation = values[3].split("=")[1]
let roundId = values[4].split("=")[1]

let course = document.getElementById("course-name")
let title = document.getElementById("title")
let info = document.getElementById("info")
let shot = document.getElementById("shot")
let strokes = document.getElementById("strokes")

let par

let shotCount = 1

let finish = document.getElementById("finish")
let visFinish = document.getElementById("visible-finish")

visFinish.addEventListener("click", function(){
    //this is where we will submit hole_scores


    let score = strokes.value - par 

    let submitHoleScore = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            key: `${key}`,
            score: `${score}`,
            holeId: `${holeId}`,
            pinLocation: `${pinLocation}`
        })
    }

    fetch("https://golfingapi.herokuapp.com/createholescore", submitHoleScore)
        .then(function(response){
            return response.json()
        })
        .then(function(object){
            if (object.done){
                //submit after successful entry
                finish.click()
            }
        })
        .catch(function(error){
            console.log(error)
            alert("error")
        })
})

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
        par = object.hole.par
        course.innerText = object.course.name
        title.innerText = `Hole #${object.hole.number}`
        info.innerText = `Par ${object.hole.par} | ${object.tee.distance} yds`
        if (object.last){
            visFinish.innerText = "Finish Your Round"
            finish.innerText = "Finish Your Round"
            finish.setAttribute("href", "./round.html")
        } else {
            visFinish.innerText = "Finish Hole"
            finish.innerText = "Finish Hole"
            finish.setAttribute("href", `./play.html?course=${courseId}&hole=${parseInt(hole) + 1}&tee=${teeName}&pinlocation=${pinLocation}`)
        }
    })
    .catch(function(error){
        console.log(error)
        alert("error")
    })


//shoot button stuff

let shoot = document.getElementById("shoot")
shoot.addEventListener("click", function(){
    //set interval to check coords
    let club = document.getElementById("club").value
    if (club != ""){
        shoot.innerText = "please wait..."
        let interval = setInterval(currentCoords, 1000)
        function currentCoords(){
            navigator.geolocation.getCurrentPosition(function(location) {
        
                if (location.coords.accuracy < 10){
                    //clear the interval on success
                    let lat = location.coords.latitude
                    let long = location.coords.longitude
                    clearInterval(interval)

                    console.log("logged")
    
                    let submitShot = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify({
                            key: `${key}`,
                            holeId: `${hole}`,
                            roundId: `${roundId}`,
                            shotNumber: `${shotCount}`,
                            clubSelection: `${club}`,
                            latitude: `${lat}`,
                            longitude: `${long}`
                        })
                    }
            
                    fetch("https://golfingapi.herokuapp.com/createshot", submitShot)
                        .then(function(response){
                            return response.json()
                        })
                        .then(function(object){
                            if (object.done){
                                //change necessary values after successful shot
                                shotCount++
                                shot.innerText = `Shot ${shotCount}`
                                strokes.value = parseInt(strokes.value) + 1
                                shoot.innerText = "Log Shot"
                            }
                        })
                        .catch(function(error){
                            console.log(error)
                            alert("error")
                        })

                }
                
        
            },function(error){alert(error)}, {enableHighAccuracy: true})}
    } 
    
})







    