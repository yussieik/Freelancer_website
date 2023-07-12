const regionSelect=document.getElementById('regionInput')
const containerDiv = document.getElementById('container')
const searchParams = new URLSearchParams(window.location.search);
let regionID = searchParams.get('regionID');
console.log('regionID', regionID);


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
    return await fetchingFunc('/api/regions')
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
    regionID= regionSelect.value

    //TODO: refresh the list
}

// Geting the id of a profi

const root = document.getElementById('root');
const pathname = window.location.pathname;
const pathnameParts = pathname.split('/');
const profiID = pathnameParts[2];
console.log(profiID)


// fetch profi data
async function getProfiData(){
    return await fetchingFunc(`/api/freelancer/${profiID}`)
}

// show profi data

async function showProfiData(){
    const profiData = await getProfiData()
    constContainerHTML=`
        <div class="row justify-content-center d-flex">
            <img class="col-3" src="https://avatars.dicebear.com/api/micah/${profiData.user.username}.svg">
            <div class="col-4 pl-2">
                <h2>
                 ${profiData.user.first_name} 
                 ${profiData.user.last_name}
                </h2>
                <h4>${profiData.details}</h4>
                <h5>${profiData.user.email}</h5>
            </div>
        </div>

        <div id='reviews' class="row justify-content-center my-3">
        </div>
    `

    containerDiv.innerHTML = constContainerHTML
}
showProfiData()

const reviewsContainerDiv = document.getElementById("reviews-container")

// Show reviews
async function showReviews(){
    reviewData = await fetchingFunc(`/api/reviews/${profiID}`)
    for (review of reviewData){
        let stars = '★'.repeat(parseInt(review.score))
        stars += '☆'.repeat(5 - parseInt(review.score))
        let cardDiv = document.createElement('div')
        cardDiv.classList.add('card', 'm-4')
        cardDiv.innerHTML = `
            <div class="card-header d-flex justify-content-between">
                <h4 class="text-warning"> ${stars} </h4>
                <p>${review.date}</p>
            </div>
            <div class="card-body">
                <h5 class="card-title">${review.author}</h5>
                <p class="card-text">${review.text}</p>
            </div>
        `
        reviewsContainerDiv.appendChild(cardDiv)
    }


}

showReviews()

