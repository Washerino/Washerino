const fields = ["station_name", "address", "information", "data_entry", "water_level", "water_quality", "contact_info"];
async function constructSelectionDiv(event)
{
    event.preventDefault();

    for(let i=0;i<fields.length;i++){
        const selection_div = document.getElementById("selection_div");
        var element = document.createElement("div");
        element.className = fields[i];
        //element.innerText = fields[i];
        const new_div = selection_div.appendChild(element);
    }
    let contact_info = document.getElementsByClassName("contact_info");
    contact_info[0].innerText = "\nOther ways to contact us:\n05849643279 - washscreens@qld.gov.au";
}

async function populateSelectionDiv(event)
{
    event.preventDefault();
    
    // get selected id from session storage
    let selected_station_id = sessionStorage.getItem("selected_id");

    // get station table result
    const tmp_station = await fetch ("map/getStation/" + selected_station_id.toString());
    const station = await tmp_station.json();
    console.log(station[0]);

    // create station name from info field
    let station_name_element = document.getElementsByClassName("station_name");
    let info = station[0].information
    let stationName = station[0].information.substring(0, info.indexOf("~"))
    station_name_element[0].innerText = stationName;

    // create station info from info field
    let information_element = document.getElementsByClassName("information");
    let stationInfo = station[0].information.substring(info.indexOf("~")+1, info.length);
    information_element[0].innerText = stationInfo;

    // get station_check table result
    const tmp_station_check = await fetch ("map/getStationCheck/" + selected_station_id.toString());
    const station_check = await tmp_station_check.json();
    console.log(station_check[0]);

    // create station water level from water level field
    let water_level_element = document.getElementsByClassName("water_level");
    let station_check_waterLevel = station_check[0].waterlevel;
    water_level_element[0].innerText = "Water level : " + station_check_waterLevel;

    // create station water quality from water quality field
    let water_quality_element = document.getElementsByClassName("water_quality");
    let station_check_waterQuality = station_check[0].waterquality;
    water_quality_element[0].innerText = "Quality : " + station_check_waterQuality;
}

const _populateSelectionDiv = populateSelectionDiv;
export {_populateSelectionDiv as populateSelectionDiv};

const dataForm = document.querySelector('#dataForm');
//form.addEventListener('submit', addMessage);
window.addEventListener('load', constructSelectionDiv);
//window.addEventListener('load', populateSelectionDiv);