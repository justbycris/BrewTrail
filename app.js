let brewery = document.getElementById('name');
let searchBTN = document.getElementById('search-btn');
let searchInput = document.getElementById('user-input');
let queryDropdown = document.getElementById('search-query');
let randomBtn = document.getElementById('random-btn');
let listRandom = document.getElementById('result');

var url = "https://api.openbrewerydb.org/v1/breweries"; 

//Change search input placeholder when option is selected 
function changePlaceholder() {
    searchInput.setAttribute('placeholder','Find a brewery...')
     if(queryDropdown.value == "Name") {
        searchInput.setAttribute('placeholder', 'Name...'); 
    } else if(queryDropdown.value == "City") {
        searchInput.setAttribute('placeholder', 'City...'); 
    } else if(queryDropdown.value == "Country") {
        searchInput.setAttribute('placeholder', 'Country...'); 
    } else if(queryDropdown.value == "ZipCode") {
        searchInput.setAttribute('placeholder', 'Zip Code...'); 
    } else if(queryDropdown.value == "Type") {
        searchInput.setAttribute('placeholder', 'Brewery Type...'); 
    } 
}

queryDropdown.addEventListener('change', changePlaceholder);

//Search for a brewery
searchBTN.addEventListener('click', () => {
    let userQuery = searchInput.value; 
  
    fetch(`${url}/search?${userQuery}`, {
        method: 'GET',
        headers: {
            'Cache-Control': 'no-cache'
        }
    })
    .then(response => console.log(response))
    .catch(error => console.log(error))
    console.log('clicked'); 
})


//Get a random brewery
randomBtn.addEventListener("click", () => {
    fetch(`${url}/random`, { method: 'GET',  headers: {
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
                <li id="name" class="random-name">Name: ${name} </li>
                <li id="addres" class="random-address">
                Address: ${address} 
                </li>
                <li id="state" class="random-state">State: ${state} </li>
                <li id="country" class="random-country">Country: ${country}</li>
                <li id="url" class="random-url">Website: <a href="${website}" target="_blank"> ${website} </a></li>
             </ul>`
        console.log(randomBrewery)
        // listRandom.innerHTML = data
    })
    .catch(error => console.log(error)) 
})