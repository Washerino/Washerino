async function dates(){
    let numWeeks = 1;
    date = new Date(),
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate(),
    date.setDate(date.getDate() + numWeeks * 7),
    year1 = date.getFullYear(),
    month1 = date.getMonth() + 1,
    day1 = date.getDate(),
    shcedule = document.getElementById("schedules");
    shcedule.textContent = "Schedule: "+ day + "/" + month + "/" + year + " - " + day1 + "/" + month1 + "/" + year1; 
    //document.getElementById("schedules").innerHTML = "Schedule: "+ day + "/" + month + "/" + year + " - " + day1 + "/" + month1 + "/" + year1; 
    };

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