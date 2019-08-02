document.addEventListener("DOMContentLoaded", setUpPage)
const url = "http://localhost:3000/beers"
const beerLstPanel = document.getElementById("list-group")

function setUpPage(){
    fetchBeers()
}

function fetchBeers() {
    fetch(url)
    .then(response => response.json())
    .then(data => listBeers(data))
}

function listBeers(beers){
    // console.log(arr); => got all the beers
    beers.forEach(function(beer){
        let beerListing = document.createElement("li")
        beerListing.setAttribute("class","list-group-item")
        beerListing.setAttribute("id",beer.id)
        // debugger
        beerListing.innerHTML = beer.name
        beerLstPanel.appendChild(beerListing)
        beerListing.addEventListener("click", getBeer)
    })
}

function getBeer() {
    let clickedBeerId = parseInt(event.target.id)
    fetch(url+"/"+clickedBeerId)
    .then(response => response.json())
    .then(data => showBr(data))
}

function showBr(data){
    console.log(data);
    let beerShowcase = document.getElementById("beer-detail")

    beerShowcase.innerHTML = ""

    let beerName = document.createElement("h1")
    beerName.innerHTML = data.name
    beerShowcase.appendChild(beerName)

    let beerImg = document.createElement("img")
    beerImg.setAttribute("src",data.image_url)
    beerShowcase.appendChild(beerImg)

    let beerTagLn = document.createElement("h3")
    beerTagLn.innerHTML = data.tagline
    beerShowcase.appendChild(beerTagLn)

    let beerDescription = document.createElement("textarea")
    beerDescription.innerHTML = data.description
    beerShowcase.appendChild(beerDescription)

    let beerEditBtn = document.createElement("button")
    beerEditBtn.setAttribute("id","edit-beer")
    beerEditBtn.setAttribute("class","btn btn-info")
    beerEditBtn.innerText = "Save"
    beerShowcase.appendChild(beerEditBtn)

    let editBr = document.getElementById("edit-beer")
    editBr.addEventListener("click", (event)=>{ beerEdit(event, data)})
}

function beerEdit(event, data){
    event.preventDefault();
    let newContent = document.querySelector("textarea").value
    fetch(url+"/"+data.id,{
      method: "PATCH",
      headers: {'Accept': 'application/json',
              'Content-Type': 'application/json'},
      body: JSON.stringify({
        description: newContent
       })
    })
    .then(res => res.json())
    .then(data => getBeer)

}
