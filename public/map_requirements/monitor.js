const fields = ["station_name", "address", "information", "data_entry", "water_level", "water_quality", "report_form", "reports","contact_info"];
const map_fields = ["station_name", "address", "information", "report_form","contact_info"];
let isMonitor = false;
async function constructSelectionDiv(event)
{
    event.preventDefault();
    //var fields = fields
    if(document.getElementsByName("map_page").length == 0)
    { 
        console.log("monitor page");
        isMonitor = true;
    }

    for(let i=0;i<fields.length;i++){
        const selection_div = document.getElementById("selection_div");
        var element = document.createElement("div");
        element.className = fields[i];
        //element.innerText = fields[i];
        const new_div = selection_div.appendChild(element);
    }
    // set defualt contact details
    let contact_info = document.getElementsByClassName("contact_info");
    contact_info[0].innerText = "\nOther ways to contact us:\n05849643279 - washscreens@qld.gov.au";

    // hide water div by defualt
    let water_level_element = document.getElementsByClassName("water_level");
    water_level_element[0].style.display = "none";
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
    if(isMonitor)
    {
        let water_level_element = document.getElementsByClassName("water_level");
        water_level_element[0].style.display = "block";
        let station_check_waterLevel = station_check[0].waterlevel;

        let current_level_element = document.getElementsByClassName("water_level current");
        console.log(current_level_element);
    
        if (current_level_element.length == 0)
        {
            current_level_element = document.createElement("div");
            current_level_element.className = "water_level current";
            current_level_element.id = "water_level_width";
            water_level_element[0].appendChild(current_level_element);
            current_level_element.style.width = station_check_waterLevel.toString()+"%";
            current_level_element.innerText = "‏‏‎ ‎ Water lvl : " + station_check_waterLevel + "%";
        }
        else
        {
            current_level_element[0].style.width = station_check_waterLevel.toString()+"%";
            current_level_element[0].innerText =  "‏‏‎ ‎ Water lvl : " + station_check_waterLevel + "%";
        }
    

        // create station water quality from water quality field
        let water_quality_element = document.getElementsByClassName("water_quality");
        let station_check_waterQuality = station_check[0].waterquality;
        water_quality_element[0].innerText = "Quality : " + station_check_waterQuality;
    }

    let report_form = document.getElementsByClassName("report_form");
    let new_form = document.createElement("form");
    let new_input = document.createElement("input");
    let new_submit = document.createElement("button");
    let new_notif = document.createElement("p");
    
    new_form.className = "new_form";
    new_form.id = "reportForm";
    
    new_input.id = "report_message";
    new_input.className = "report_message_body";
    new_input.placeholder = "Type here...";
    new_input.name = "report_message_body";
    
    new_submit.id = "submit_report";
    new_submit.type = "submit";
    new_submit.innerText = "report";

    new_notif.className = "notif";
    new_notif.innerHTML = null;

    new_form.appendChild(new_input);
    new_form.appendChild(new_submit);

    if(document.getElementsByClassName("new_form").length == 0)
    {
        report_form[0].appendChild(new_form);
    }
    if(document.getElementsByClassName("notif").length == 0)
    {
        report_form[0].appendChild(new_notif);
    }
    else
    {
        let notif = document.getElementsByClassName("notif");
        notif[0].innerHTML = null;
    }
    const reportForm = document.querySelector('#reportForm');
    reportForm.addEventListener('submit', submitReport);
}

async function submitReport(event) {
    event.preventDefault();

    //selects the form element from form.hmtl
    const formData = document.querySelector('#reportForm');

    //create a new object that stores email and password
    const reportDetails = {
        //id : null,
        rangerid : sessionStorage.getItem('id'),
        stationid: sessionStorage.getItem('selected_id'),
        issue: formData.elements.namedItem('report_message_body').value,
        cleared : false
    };

    // turns loginCreds object into JSON string
    const serializedMessage = JSON.stringify(reportDetails);
    console.log(reportDetails);

    // posts JSON string to the server at the end point /login
    const response = await fetch('map/createReport', { method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        body: serializedMessage
                    }
                )

    const json = await response.json();
    console.log(json);

    if (response.status === 200) {

        let notif = document.getElementsByClassName("notif");
        let update_notif = notif[0].innerText = "report submitted successfully!";

        let input = document.getElementsByClassName("report_message_body");
        let update_input = input[0].value = null;
        
        console.log("report submitted!");
    }
}

const _populateSelectionDiv = populateSelectionDiv;
export {_populateSelectionDiv as populateSelectionDiv};

window.addEventListener('load', constructSelectionDiv);
//window.addEventListener('load', populateSelectionDiv);