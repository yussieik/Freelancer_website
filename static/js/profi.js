const regionSelect=document.getElementById('regionInput')

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
    regionID= regionSelect.value

    //TODO: refresh the list
}

// Geting the id of a profi
const root = document.getElementById('root');
const pathname = window.location.pathname;
const pathnameParts = pathname.split('/');
const profiID = pathnameParts[2];
console.log(profiID)
