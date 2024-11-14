let brewery = document.getElementById('name');
let searchBTN = document.getElementById('search-btn');
let searchInput = document.getElementById('user-input');
let queryDropdown = document.getElementById('search-query');
let randomBtn = document.getElementById('random-btn');
let listRandom = document.getElementById('result');

//Error variables
var searchErr = document.getElementById('search-error');

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

//Error Handleing 
function searchError() {
    if(queryDropdown.value == ""){
        searchErr.innerHTML = "Error: please select a value from the dropdown menu";
    } else if( searchInput.value == "") {
        searchErr.innerHTML = "Error: please fill out the search field.";
    } else {
         searchErr.style.display = "none"
    }
    console.log('Error')
    return false;
}

//Search for a brewery
searchBTN.addEventListener('click', () => {
    let searchValue = searchInput.value; 
    let category = queryDropdown.value;
    searchError();
  
    fetch(`${url}/search?${category}=${searchValue}`, {
        method: 'GET',
        headers: {
            'Cache-Control': 'no-cache', 
        }
    })
    .then(response => {
        if(!response.ok) {
        console.log('There was an error making the request!')
    }
   return response.json()
})
    .then(data => {
        const randomIndex = Math.floor(Math.random() * data.length);
        const searchResult = data[randomIndex]; 
        console.log(searchResult)
    })
    .catch(error => console.log(error))
    console.log('clicked'); 
}); 


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