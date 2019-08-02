document.addEventListener("DOMContentLoaded", setUpPage)

const beers = "http://localhost:3000/beers/"
function setUpPage() {
    listOfBeers()
}

function listOfBeers(){
    fetch(beers)
    .then(res => res.json())
    .then(data => createListOfBeers(data))
}

function createListOfBeers(beers){
    beers.forEach(liOfBeers)
}

function liOfBeers (beer){
    // console.log(beer.name)
    const ul = document.querySelector("#list-group")

    let name = document.createElement("li")
    name.className = "list-group-item"
    name.innerText = beer.name
    ul.appendChild(name)
    name.addEventListener("click", () =>
        addDetails(beer)
    )
}

function addDetails(beer){
    console.log(beer)
    const div = document.querySelector("#beer-detail")
    div.innerText = null

    let name = document.createElement("h1")
    name.innerText = beer.name
    div.appendChild(name)

    let image = document.createElement("img")
    image.src = beer.image_url
    div.appendChild(image)

    let tagLine = document.createElement("h3")
    tagLine.innerText = beer.tagline
    div.appendChild(tagLine)

    let description = document.createElement("textarea")
    description.innerText = beer.description
    description.dataset.id = beer.id 
    div.appendChild(description)
    
    

    let editBtn = document.createElement("button")
    editBtn.className = "btn btn-info"
    editBtn.innerText = "Save"
    editBtn.dataset.id = beer.id 
    div.appendChild(editBtn)   
    editBtn.addEventListener("click", (e) => {
        createEdit(e, beer)
    })

}

function createEdit(e, beer){
    const newDescription = e.target.previousSibling.value

    fetch(beers + beer.id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }, 
        body: JSON.stringify({
            description: newDescription
        })
    })

    .then(res => res.json())
    .then(data => console.log(data))

}



// function handleChange(e) {
    //     textContent = `
    //         ${e.target.value}`;
    //        document.querySelector(".btn.btn-info") 

    //     const editBtn = document.createElement("button")
    //     editBtn.addEventListener("click", () =>
    //     createEdit(textContent, beer))
    //    }




