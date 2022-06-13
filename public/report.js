

async function getStations() {
    

    const response =  await fetch('/map/getAllStations');
    const stations = await response.json();

    const stationSelector = document.querySelector('#station_selector');

    stations.forEach(station => addOptions(station, stationSelector)); // add new select option for each car park

};


//adds the carpark options to the select tag 
function addOptions(station, selector)
{
    const option = document.createElement("option");
    option.value = station.id;
    option.text = station.id;
    selector.add(option);
}


async function createReport(event) {
    event.preventDefault();

    const reportForm = document.querySelector('#report-form');

    const stationSelector = document.querySelector('#station_selector');


    const reportDetails = {
        rangerID: null,
        stationID: stationSelector.value,
        issue: reportForm.elements.namedItem('issue').value
    };

    
    // turns reportDetails object into JSON string
    const serializedMessage = JSON.stringify(reportDetails);

    // posts JSON string to the server at the end point /login
    const response = await fetch('/report/createReport', { method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: serializedMessage
    })

    const json = await response.json();

    console.log(json);

    reportForm.reset();

};

const form = document.querySelector('#report-form');
form.addEventListener('submit', createReport);

document.addEventListener('DOMContentLoaded', getStations);
