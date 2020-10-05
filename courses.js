document.getElementById("create-course").addEventListener("click", function(){
    document.getElementById("create-course-box").style.display = "flex"
})

document.getElementById("setup-holes").addEventListener("click", function(){
    let holeCount = parseInt(document.getElementById("course-hole-count").value)

    document.querySelectorAll(".hole-number").forEach((e) => e.remove())
    document.querySelectorAll(".hole-name").forEach((e) => e.remove())
    document.querySelectorAll(".hole-par").forEach((e) => e.remove())
    document.querySelectorAll(".hole-mens-handicap").forEach((e) => e.remove())
    document.querySelectorAll(".hole-womens-handicap").forEach((e) => e.remove())
    document.querySelectorAll('.hole-tee').forEach((e) => e.remove())
    document.querySelectorAll('.hole-tee-count').forEach((e) => e.remove())
    document.querySelectorAll('.tee-count-div').forEach((e) => e.remove())

    let parent = document.getElementById("create-course-box")

    for (let i = 1; i <= holeCount; i++){
        let holeNumberInput = document.createElement("input")
        holeNumberInput.setAttribute("class", "hole-number")
        holeNumberInput.setAttribute("placeholder", "hole number")
        holeNumberInput.value = i

        parent.appendChild(holeNumberInput)

        let holeNameInput = document.createElement("input")
        holeNameInput.setAttribute("class", "hole-name")
        holeNameInput.setAttribute("placeholder", "hole name")

        parent.appendChild(holeNameInput)

        let holeParInput = document.createElement("input")
        holeParInput.setAttribute("class", "hole-par")
        holeParInput.setAttribute("placeholder", "hole par")

        parent.appendChild(holeParInput)

        let mensHandicapInput = document.createElement("input")
        mensHandicapInput.setAttribute("class", "hole-mens-handicap")
        mensHandicapInput.setAttribute("placeholder", "men's handicap")

        parent.appendChild(mensHandicapInput)

        let womensHandicapInput = document.createElement("input")
        womensHandicapInput.setAttribute("class", "hole-womens-handicap")
        womensHandicapInput.setAttribute("placeholder", "women's handicap")

        parent.appendChild(womensHandicapInput)

        let teeCountInput = document.createElement("input")
        teeCountInput.setAttribute("class", "hole-tee-count")
        teeCountInput.setAttribute("placeholder", "Tee count")

        parent.appendChild(teeCountInput)

        let teeCountDiv = document.createElement("div")
        teeCountDiv.setAttribute("class", "tee-count-div")
        teeCountDiv.style.display = "flex"
        teeCountDiv.style.flexDirection = "column"
        
        parent.appendChild(teeCountDiv)

        teeCountInput.addEventListener("input", function(e){
            let value = parseInt(e.target.value)

            if (document.getElementsByClassName(`hole-tee ${i}`).length > 0){
                Array.from(document.getElementsByClassName(`hole-tee ${1}`)).forEach((e) => e.remove())
            }

            for (let b = 1; b <= value; b++){
                let teeNameInput = document.createElement("input")
                teeNameInput.setAttribute("class", `hole-tee ${i}`)
                //teeNameInput.setAttribute("id", `${i}`)
                teeNameInput.setAttribute("placeholder", `#${b} name,rating,slope,distance`)

                teeCountDiv.appendChild(teeNameInput)

            }
        })

    }

    document.getElementById("submit-course").style.display = "flex"
})

document.getElementById("submit-course").addEventListener("click", function(){
    let courseName = document.getElementById("course-name").value 
    let subCourseName = document.getElementById("sub-course-name").value
    let courseHoleCount = parseInt(document.getElementById("course-hole-count").value)
    let holeNumbers = Array.from(document.getElementsByClassName("hole-number"))
    let holeNames = Array.from(document.getElementsByClassName("hole-name"))
    let holePars = Array.from(document.getElementsByClassName("hole-par"))
    let holeMensHandicaps = Array.from(document.getElementsByClassName("hole-mens-handicap"))
    let holeWomensHandicaps = Array.from(document.getElementsByClassName("hole-womens-handicap"))
    let holeTeesCounts = Array.from(document.getElementsByClassName("hole-tee-count"))

    let courseId

    let createCourseObject = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: `${courseName}`,
            subName: `${subCourseName}`,
            holeCount: `${courseHoleCount}`
        })
    }

    fetch("https://golfingapi.herokuapp.com/createcourse", createCourseObject)
        .then(function(response){
            return response.json()
        })
        .then(function(object){
            if (object.done){
                courseId = object.course_id
                addHoles(courseId)
            }
        })
        .catch(function(error){
            console.log(error)
            alert("error")
        })

    console.log(createCourseObject)

    function addHoles(id){
        holeNumbers.forEach(function(number){
            let count = parseInt(number.value) - 1

            let tees = Array.from(document.getElementsByClassName(`hole-tee ${number.value}`))
    
            let createHoleObject = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    courseId: `${id}`,
                    number: `${parseInt(number.value)}`,
                    par: `${parseInt(holePars[count].value)}`,
                    holeName: `${holeNames[count].value}`,
                    mensHandicap: `${parseInt(holeMensHandicaps[count].value)}`,
                    womensHandicap: `${parseInt(holeWomensHandicaps[count].value)}`
                })
            }

            let holeId

            fetch("https://golfingapi.herokuapp.com/createhole", createHoleObject)
                .then(function(response){
                    return response.json()
                })
                .then(function(object){
                    if (object.done){
                        holeId = object.hole_id
                        addTees(holeId)
                    }
                })
                .catch(function(error){
                    console.log(error)
                    alert("error")
                })

            function addTees(holeId){
                tees.forEach(function(tee){
                    let valueArray = tee.value.split(",")
                    //let teeName = valueArray[0]
                    //let teeRating = parseFloat(valueArray[1])
                    //let teeSlope = parseInt(valueArray[2])
                    //let teeDistance = parseInt(valueArray[3])

                    let sendTee = {
                        name: valueArray[0],
                        rating: parseFloat(valueArray[1]),
                        slope: parseInt(valueArray[2]),
                        distance: parseInt(valueArray[3])
                    }

                    let createTeeObject = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify({
                            name: `${sendTee.name}`,
                            holeId: `${holeId}`,
                            rating: `${sendTee.rating}`,
                            slope: `${sendTee.slope}`,
                            distance: `${sendTee.distance}`
                        })
                    }

                    console.log(createTeeObject)

                    fetch("https://golfingapi.herokuapp.com/createtee", createTeeObject)
                        .then(function(response){
                            return response.json()
                        })
                        .then(function(object){
                            if (object.done){
                                document.getElementById("submit-course").firstElementChild.innerText = "Success!"
                                window.location.reload()
                                console.log("fully submitted")
                            }
                        })
                        .catch(function(error){
                            console.log(error)
                            alert("error")
                        })


                })
            }
    
            console.log(createHoleObject)
        })
    }

    

})

function addCoursesToHome(){

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
                addCourse(course)
            })
        })
        .catch(function(error){
            console.log(error)
            alert("error")
        })
}

function addCourse(course){
    let parent = document.getElementById("courses")

    let courseDiv = document.createElement("div")
    parent.appendChild(courseDiv)

    let p = document.createElement("p")
    p.innerText = course.name

    courseDiv.appendChild(p)

    let playDiv = document.createElement("div")
    playDiv.innerHTML = "<p>Play</p>"
    playDiv.setAttribute("id", course.id)

    courseDiv.appendChild(playDiv)

}