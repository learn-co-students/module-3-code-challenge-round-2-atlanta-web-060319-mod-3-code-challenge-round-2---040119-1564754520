document.addEventListener('DOMContentLoaded', init)

const beerAPI = 'http://localhost:3000/beers/'


function init(){
    fetch(beerAPI)
    .then(r => r.json())
    .then(makeBeerList)
}

function makeBeerList(beers){
    let beerRow = document.querySelector('.list-group')
    beers.map(beer=>{
        let li = document.createElement('li')
        li.innerText = beer.name
        li.className = 'list-group-item'
        beerRow.appendChild(li)
        li.addEventListener('click', (e)=>{
            showBeerDetails(e, beer)
        })
    })
}

function showBeerDetails(e,beer){
    
    let details = document.querySelector('#beer-detail')
    details.innerHTML = null

    let h1 = document.createElement('h1')
    h1.innerText = beer.name
    details.appendChild(h1)

    let img = document.createElement('img')
    img.src = beer.image_url
    details.appendChild(img)

    let h3 = document.createElement('h3')
    h3. innerText = beer.tagline
    details.appendChild(h3)

    let desc = document.createElement('textarea')
    desc.innerText = beer.description
    desc.setAttribute('data-id', beer.id)
    desc.className = 'desc'
    details.appendChild(desc)

    let btn = document.createElement('button')
    btn.setAttribute('id', 'edit-beer')
    btn.setAttribute('data-desc', beer.description)
    btn.setAttribute('data-id', beer.id)
    btn.className = 'btn btn-info'
    btn.innerText = 'Save'
    details.appendChild(btn)
    btn.addEventListener('click', (e)=>{
        handleSaveBtn(e)
    })
}

function handleSaveBtn(e){

    let beerTarget = e.target.dataset.id
    console.log(e.target)
    let beerDesc = e.target.dataset.desc
    let beerNewField = document.querySelector('textarea').value
    

    fetch(beerAPI + beerTarget, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            description: beerNewField
        })
    })
    .then(r => r.json())
    .then((beer)=>{
        showBeerDetails('',beer)
    })


}

