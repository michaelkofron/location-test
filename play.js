let values = window.location.href.split("?")[1].split("&")
let courseId = values[0].split("=")[1]
let hole = values[1].split("=")[1]
let teeName = values[2].split("=")[1]
let pinLocation = values[3].split("=")[1]

let course = document.getElementById("course-name")
let title = document.getElementById("title")
let info = document.getElementById("info")

let par

let shot = 1

let finish = document.getElementById("finish")
let visFinish = document.getElementById("visible-finish")

visFinish.addEventListener("click", function(){

    finish.click()
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











    let interval = setInterval(currentCoords, 1000)


    function currentCoords(){
        navigator.geolocation.getCurrentPosition(function(location) {
    
            if (location.coords.accuracy < 10000){
                let latitude = location.coords.latitude
                let longitude = location.coords.longitude
                clearInterval(interval)
                infoArea.innerHTML = `<p>Lat: ${currentShot.latitude}, Long: ${currentShot.longitude}</p><input id='club' type='text' placeholder='club selection'><button id='submit-shot'>submit shot</button>`
                document.getElementById('submit-shot').addEventListener("click", function(){
                    currentShot.clubSelection = document.getElementById("club").value
                    if (currentShot.clubSelection != ""){
                        //submit shot to db here

                        let submitShot = {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Accept": "application/json"
                            },
                            body: JSON.stringify({
                                key: `${key}`,
                                holeId: `${currentHoleId}`,
                                roundId: `${round.id}`,
                                shotNumber: `${round.currentShot}`,
                                clubSelection: `${currentShot.clubSelection}`,
                                latitude: `${currentShot.latitude}`,
                                longitude: `${currentShot.longitude}`
                            })
                        }
                
                        fetch("https://golfingapi.herokuapp.com/createshot", submitShot)
                            .then(function(response){
                                return response.json()
                            })
                            .then(function(object){
                                if (object.done){
                                    infoArea.innerHTML = ""
                                }
                            })
                            .catch(function(error){
                                console.log(error)
                                alert("error")
                            })
                    }
                })
                callback()
            } else {
                console.log("not accurate enough")
                infoArea.innerHTML = `<p>not accurate enough, trying again${dotCount}</p>`
                dotCount += "."
                console.log(location.coords.accuracy)
            }
            
    
        },function(error){alert(error)}, {enableHighAccuracy: true});