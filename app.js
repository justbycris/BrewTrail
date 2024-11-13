let brewery = document.getElementById('name');
let randomBtn = document.getElementById('random-btn');
let listRandom = document.getElementById('result');

var url = "https://api.openbrewerydb.org/v1/breweries/random"; 

var uniqueURL = `${url}?timestamp=${new Date().getTime()}`;

randomBtn.addEventListener("click", () => {
    fetch(uniqueURL, { method: 'GET',  headers: {
        'Cache-Control': 'no-cache' 
    }})
    .then(response => {
        if(!response.ok) {
            console.log('There was an error making the request!')
        }
       return response.json()
    })
    .then(data => {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomBrewery = data[randomIndex];
        let name = randomBrewery.name;
        let address = randomBrewery.address_1;
        let country = randomBrewery.country;
        let website = randomBrewery.website_url;
        let state = randomBrewery.state;
        listRandom.innerHTML = `
        <ul id="list-random">
            <li id="name">Name: ${name} </li>
            <li id="addres">Address: ${address} </li>
            <li id="state">State: ${state} </li>
            <li id="country">Country: ${country}</li>
            <li id="url">Website: <a href="${website}" target="_blank"> ${website} </a></li>
         </ul>`
        console.log(randomBrewery)
        // listRandom.innerHTML = data
    })
    .catch(error => console.log(error)) 
})