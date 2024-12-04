let brewery = document.getElementById('name');
let searchBTN = document.getElementById('search-btn');
let searchInput = document.getElementById('user-input');
let queryDropdown = document.getElementById('search-query');
let randomBtn = document.getElementById('random-btn');
let result = document.getElementById('result');
let listResult = document.getElementById('result-list')

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
    if(queryDropdown.value == "" || !queryDropdown.value){
        searchErr.innerHTML = "Error: please select a value from the dropdown menu";
        return false;
    } else if( searchInput.value == "") {
        searchErr.innerHTML = "Error: please fill out the search field.";
    } else {
         searchErr.style.display = "none"
    }
    
}

//Search for a brewery
searchBTN.addEventListener('click', () => {
    let searchValue = searchInput.value; 
    let urlValue = encodeURI(searchValue); 
    let category = queryDropdown.value;
    searchError();
  
    fetch(`${url}?${category}=${urlValue}&per_page=5`, {
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
            const searchResult = data; 

            listResult.classList.remove('result-hidden');

            for(let i = 0; i < searchResult.length; i++) {
                let brewery = document.createElement('ul');
                brewery.classList.add('result')
                brewery.innerHTML = `
                    <li id="name" class="random-name"> ${searchResult[i].name} </li>
                    <li id="url" class="random-url">
                        <iframe src="${searchResult[i].website_url}" style="border: none;"title="Visit their website: ${searchResult[i].website_url}"></iframe>
                    </li>
                    <li id="addres" class="random-address">
                    Address: <a href="https://maps.google.com/?ll=${searchResult[i].latitude},${searchResult[i].longitude}" target="_blank">${searchResult[i].address_1}, 
                    ${searchResult[i].city}, ${searchResult[i].country}, ${searchResult[i].postal_code}</a>
                    </li>
                
                
                    `; 
                    //  <li id="url" class="random-url"> <a href="${searchResult[i].website_url}" target="_blank"> ${searchResult[i].website_url} </a></li>
                listResult.appendChild(brewery); 
            }
            window.scrollBy(0, 500);
            console.log(searchResult);
        })
            .catch(error => console.log(error))
            console.log('Search Button clicked'); 
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
        result.style.display = "block";
        
        result.innerHTML = `
        <ul id="list-random" class="list-random">
                <li id="name" class="random-name"> ${name} </li>
                <li id="addres" class="random-address">
                 Address: ${address} 
                </li>
                <li id="state" class="random-state">State: ${state} </li>
                <li id="country" class="random-country"> Country: ${country}</li>
                <li id="url" class="random-url"> <a href="${website}" target="_blank"> ${website} </a></li>
             </ul>`;
        window.scrollBy(0, 500);
        console.log(randomBrewery)
        // result.innerHTML = data
        console.log('Random Button Clicked')
    })
    .catch(error => console.log(error)) 
})