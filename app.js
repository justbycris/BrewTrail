let brewery = document.getElementById('name');
let searchBTN = document.getElementById('search-btn');
let searchInput = document.getElementById('user-input');
let queryDropdown = document.getElementById('search-query');
let randomBtn = document.getElementById('random-btn');
let result = document.getElementById('result');
let listResult = document.getElementById('result-list');
let notFound = document.getElementById('not-found');
var searchErr = document.getElementById('search-error');

//API URL
var url = "https://api.openbrewerydb.org/v1/breweries"; 

//Change search input placeholder when option is selected 
queryDropdown.addEventListener('change', () => {
    console.log('testing')
     if(queryDropdown.value == "by_name") {
        searchInput.placeholder = 'Enter a Brewery Name...'
    } else if(queryDropdown.value == "by_city") {
        searchInput.placeholder = 'Enter a City...'
    } else if(queryDropdown.value == "by_country") {
        searchInput.placeholder = 'Enter a Country...'
    } else if(queryDropdown.value == "by_state") {
        searchInput.placeholder = 'Enter a State...'
    } else if(queryDropdown.value == 'empty') {
        searchInput.placeholder = 'Select an option above...'
    }
});

//Randomized beer search images
let myImgs = 
[
    '/public/img/1.jpg',
    '/public/img/2.jpg',
    '/public/img/3.jpg',
    '/public/img/4.jpg'
]

function randomImg(){
    let random = myImgs[Math.floor(Math.random()*myImgs.length)];
    console.log(random)
    return random;
}


//Error Handleing for dropdown search values 
function searchError(event) {
    if(queryDropdown.value == "" || !queryDropdown.value){
        searchErr.innerHTML = "Error: please select a value from the dropdown menu";
        event.preventDefault();
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
  
    fetch(`${url}?${category}=${urlValue}&per_page=10`, {
        method: 'GET',
        headers: {
            'Cache-Control': 'no-cache', 
        }
    })
        .then(response => {
            if(!response.ok) {
            console.log('Error!'); 
            } 
        return response.json()
        })
        .then(data => {
            
            //Clear past search results
            listResult.innerHTML = '';
            result.innerHTML = '';
            const searchResult = data; 
            if(searchResult.length == 0) {
                listResult.style.display = 'none'
                notFound.classList.add('show-notfound');
            } else {
                notFound.classList.remove('show-notfound');
                notFound.classList.remove('hide-notfound');
            }
            listResult.classList.remove('result-hidden');
            
            for(let i = 0; i < searchResult.length; i++) {
                let brewery = document.createElement('ul');
                brewery.classList.add('result'); 
                brewery.innerHTML = 
                `
                    <li id="name" class="random-name"> ${searchResult[i].name} </li>
                    <img src=${randomImg()} alt='Photo of beer.' class="beer-img" />
                    <li id="addres" class="random-address">
                    Address: <a href="https://maps.google.com/?ll=${searchResult[i].latitude},${searchResult[i].longitude}" target="_blank">${searchResult[i].address_1}, 
                    ${searchResult[i].city}, ${searchResult[i].country}, ${searchResult[i].postal_code}</a>
                    </li><br>
                    ${searchResult[i].website_url 
                    ? `<li class="random-address">Website: <a href="${searchResult[i].website_url}" target="_blank">${searchResult[i].website_url}</a></li>`
                    : `<li class="random-address">Website: No website found...</li>`}
                    `; 
                
                listResult.appendChild(brewery); 
            }
            //Scroll down to show results
            window.scroll({
            top: 600,
            left: 0,
            behavior: "smooth",
            });
            // console.log('searchResult:' + searchResult);
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
        listResult.innerHTML = '';
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomBrewery = data[randomIndex];
        let name = randomBrewery.name;
        let address = randomBrewery.address_1;
        let country = randomBrewery.country;
        let website = randomBrewery.website_url;
        let state = randomBrewery.state;

        result.style.display = "block";

        //Clear past results
        result.innerHTML = '';
        listResult.innerHTML = '';
        listResult.style.display = 'none';

        //Show a random search
        result.innerHTML = `
        <ul id="list-random" class="list-random">
                <li id="name" class="random-name"> ${name} </li>
                <img src=${randomImg()} alt='Photo of beer.' class="beer-img" />
                <li id="addres" class="random-address">
                 Address: ${address} 
                </li>
                <li id="state" class="random-state">State: ${state} </li>
                <li id="country" class="random-country"> Country: ${country}</li>
                <li id="url" class="random-url"> <a href="${website}" target="_blank"> ${website} </a></li>
             </ul>`;
        //Scroll down to show results
            window.scroll({
            top: 600,
            left: 0,
            behavior: "smooth",
            });
        console.log(randomBrewery)
        
    })
    .catch(error => console.log(error)) 
})