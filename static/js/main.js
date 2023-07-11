const regionSelect=document.getElementById('regionInput')
const searchInput = document.getElementById('searchInput');
const popup = document.getElementById('popup');
const searchButton = document.getElementById('searchButton');
const resultsDiv = document.getElementById('results')

let regionID = 2 //Tel-Aviv by default
let servicesList


// clean a div function
function cleanObject(object){
    while (object.firstChild){
        object.removeChild(object.firstChild)
    }
}


async function fetchingFunc(url) {

    try{
        request = await fetch(url)
        if (request.ok){
            result = await request.json()
            return result
        } else {
            throw Error
        }

    } catch(err) {
        return false
    }
}

// Populating regions selection field
async function getRegionsList(){
    const result = await fetchingFunc('/api/regions')
    return result
}

async function populateRegionSelect(){
    const regionsUnsorted = await getRegionsList()
    const regions = regionsUnsorted.sort((a, b) => (a.name > b.name) ? 1 : -1)
    // const select=document.getElementById('regionInput');
    for (let region of regions){
        let option = document.createElement('option')
        option.textContent=region.name;
        option.setAttribute('value', region.id)
        if (region.id == regionID){
            option.setAttribute('selected', 'selected')
        }
        regionSelect.appendChild(option)
    }
}

populateRegionSelect()

// Handle region change

regionSelect.addEventListener('change', (event) => {
    changeRegion()
})


function changeRegion(){
    console.log('region changed')
    regionID = regionSelect.value

    //TODO: refresh the list
}

// fetching services
async function getServicessList() {
    const resultUnsorted = await fetchingFunc('/api/services')
    const result = resultUnsorted.sort((a, b) => (a.name > b.name) ? 1 : -1)
    servicesList = result.map((service) => service.name);
    console.log(servicesList)
    return result
}

getServicessList()

// search popup
searchInput.addEventListener('input', function () {
    const searchText = searchInput.value.toLowerCase();
    if (searchText.length < 2) {
        popup.style.display = 'none';
        return;
    }

    // Clear existing options
    popup.innerHTML = '';

    // Filter services based on input text
    const filteredServices = servicesList.filter(option =>
        option.toLowerCase().includes(searchText)
    );

    // Create and append option items to the popup
    filteredServices.forEach(option => {
        const item = document.createElement('div');
        item.classList.add('popup-item');
        item.textContent = option;
        item.addEventListener('click', function () {
            searchInput.value = option;
            popup.style.display = 'none';
        });
        popup.appendChild(item);
    });

    // Show the popup
    popup.style.display = 'block';
});

// Hide the popup when user clicks outside of it
document.addEventListener('click', function (event) {
    if (!popup.contains(event.target) && event.target !== searchInput) {
        popup.style.display = 'none';
    }
})

// Search and show freelancers
searchButton.addEventListener("click", async (event) => {
    event.preventDefault()
    let query = searchInput.value;
    let res = await fetchingFunc(`/api/freelancers/${regionID}/${query}`);
    console.log(res);
    showFreelancers(res)
    })

// Show cards

function showFreelancers(profis){
    cleanObject(resultsDiv)
    for (let profi of profis) {
        const serviceNames = profi.services.map(service => service.name);
        const servicesString = serviceNames.join(', ');
        const cardHTML = `
            <div class="card h-100">
                <img src="https://avatars.dicebear.com/api/micah/${profi.user.username}.svg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">
                        ${profi.user.first_name} ${profi.user.last_name}
                    </h5>
                    <p class="card-text">${profi.details}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Stars</li>
                    <li class="list-group-item">${servicesString}</li>
                </ul>
            </div>   
        `
        const freelancerCard = document.createElement('div');
        freelancerCard.innerHTML = cardHTML;
        freelancerCard.classList.add('col');
        freelancerCard.style.width = '18rem';
        resultsDiv.appendChild(freelancerCard);
    }
}


