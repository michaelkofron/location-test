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

    }
})