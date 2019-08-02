document.addEventListener("DOMContentLoaded", setUpPage)

const beerURL = "http://localhost:4000/beers/"
let description = document.createElement('textarea')

function setUpPage() {
    getBeers()
}

function getBeers() {
    fetch(beerURL)
    .then(resp => resp.json())
    .then(beers => createBeerList(beers))
}

function createBeerList(beers){
    console.log(beers)
    beers.forEach(createBeerCard)
}

function createBeerCard(beer){
    let beerList = document.querySelector("#list-group")
    let li = document.createElement('li')
    li.innerText = beer.name
    li.className = "list-group-item"
    li.setAttribute("data-id", beer.id)
    li.addEventListener('click', handleDetails)
    beerList.appendChild(li)
}

function handleDetails(e){
    console.log(e.target.dataset.id)
    fetch(`http://localhost:4000/beers/${e.target.dataset.id}`)
    .then(resp => resp.json())
    .then(beer => createDetailList(beer))
}

function createDetailList(beer){
    const deets = document.querySelector("#beer-detail")
    deets.innerHTML = null
    let ul = document.createElement('ul')
    deets.appendChild(ul)
    
    let h1 = document.createElement('h1')
    h1.innerText = beer.name
    ul.appendChild(h1)

    let img = document.createElement('img')
    img.src = beer.image_url
    ul.appendChild(img)

    let h3 = document.createElement('h3')
    h3.innerText = beer.tagline
    ul.appendChild(h3)

    let description = document.createElement('textarea')
    description.innerText = beer.description
    description.onchange = handleChange
    description.setAttribute("data-id", beer.id)
    ul.appendChild(description)

    let editBtn = document.createElement('button')
    editBtn.innerText = "save"
    ul.appendChild(editBtn)
    editBtn.className = "btn btn-info"
    editBtn.id = "edit-beer"
    editBtn.setAttribute("data-description", beer.description)
    editBtn.setAttribute("data-id", beer.id)
    editBtn.addEventListener("click", (e) => { 
    })  
}


function handleChange(e){
    console.log(e.target.value)
    console.log("BEER ID", e.target.dataset.id)
    
    let editBeer = document.getElementById("edit-beer")
        description.textContent = e.target.value

    let newDescription = description.textContent = e.target.value

    fetch(`http://localhost:4000/beers/${e.target.dataset.id}`, {
        method: "PATCH",
        headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            description: newDescription
        })
    }) .then(resp => resp.json())
       .then(data => console.log(data))

       alert("Yay! You updated this beer!")
}

