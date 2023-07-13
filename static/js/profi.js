const regionSelect = document.getElementById('regionInput')
const containerDiv = document.getElementById('container')
const searchParams = new URLSearchParams(window.location.search);
let regionID = searchParams.get('regionID');
console.log('regionID', regionID);

function cleanObject(object){
    while (object.firstChild){
        object.removeChild(object.firstChild)
    }
}
async function fetchingFunc(url) {

    try {
        request = await fetch(url)
        if (request.ok) {
            result = await request.json()
            return result
        } else {
            throw Error
        }

    } catch (err) {
        return false
    }
}

// Populating regions selection field
async function getRegionsList() {
    return await fetchingFunc('/api/regions')
}

async function populateRegionSelect() {
    const regionsUnsorted = await getRegionsList()
    const regions = regionsUnsorted.sort((a, b) => (a.name > b.name) ? 1 : -1)
    // const select=document.getElementById('regionInput');
    for (let region of regions) {
        let option = document.createElement('option')
        option.textContent = region.name;
        option.setAttribute('value', region.id)
        if (region.id == regionID) {
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


function changeRegion() {
    console.log('region changed')
    regionID = regionSelect.value

    //TODO: refresh the list
}

// Geting the id of a profi

const root = document.getElementById('root');
const pathname = window.location.pathname;
const pathnameParts = pathname.split('/');
const profiID = pathnameParts[2];
console.log(profiID)


// fetch profi data
async function getProfiData() {
    return await fetchingFunc(`/api/freelancer/${profiID}`)
}

// show profi data

async function showProfiData() {
    const profiData = await getProfiData()
    constContainerHTML = `
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
    `

    containerDiv.innerHTML = constContainerHTML
}

showProfiData()


// Show reviews
async function showReviews() {
    reviewData = await fetchingFunc(`/api/reviews/${profiID}`)
    for (review of reviewData.sort((a, b) => new Date(b.id) - new Date(a.id))) {
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


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


async function createReview(author, score, text, freelancer) {
    const csrftoken = getCookie('csrftoken');
    console.log('csrf', csrftoken)
    const data = {
        method: 'POST',
        headers: {
            "X-CSRFToken": csrftoken,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            author,
            score,
            text,
            freelancer
        }),
        credentials: 'include'
    }
    console.log(data)
    await fetch('/api/create-review/', data)
    return
}

// submit a review
// const reviewsContainerDiv = document.getElementById("reviews-container")
// const reviewSubmit = document.getElementById("submitForm")
// reviewSubmit.addEventListener('click', e => {
//     e.preventDefault();
//     const score = document.querySelector('input[name="score"]:checked').id[4];
//     const text = document.getElementById("text").value;
//     const author = document.getElementById("author").value
//     console.log('createview func')
//     createReview(author, score, text, profiID)
//     cleanObject(document.getElementById("reviews-container"))
//     showReviews()
// })


const reviewsContainerDiv = document.getElementById("reviews-container")
const reviewSubmit = document.getElementById("submitForm")
reviewSubmit.addEventListener('click', e => {
    e.preventDefault();
    addReview()
})

async function addReview(){
    const score = document.querySelector('input[name="score"]:checked').id[4];
    const text = document.getElementById("text").value;
    const author = document.getElementById("author").value
    console.log('createview func')
    await createReview(author, score, text, profiID)
    cleanObject(document.getElementById("reviews-container"))
    showReviews()

}
