const regionSelect=document.getElementById('regionInput')
const searchInput = document.getElementById('searchInput');
const popup = document.getElementById('popup');

let regionID


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

searchInput.addEventListener('input', function () {
    const searchText = searchInput.value.toLowerCase();
    if (searchText.length === 0) {
        popup.style.display = 'none';
        return;
    }

    // Clear existing options
    popup.innerHTML = '';

    // Simulated options list
    const options = [
        'apple',
        'banana',
        'cherry',
        'grape',
        'orange',
        'pear',
        'strawberry'
    ];

    // Filter options based on input text
    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchText)
    );

    // Create and append option items to the popup
    filteredOptions.forEach(option => {
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
});