let new_data_type = undefined;

window.onload = function() {
    let numWeeks = 1;
    date = new Date();
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    date.setDate(date.getDate() + numWeeks * 7);
    year1 = date.getFullYear();
    month1 = date.getMonth() + 1;
    day1 = date.getDate();
    document.getElementById("schedule").innerHTML = "Schedule: "+ day + "/" + month + "/" + year + " - " + day1 + "/" + month1 + "/" + year1;
}

async function getReports(){
    const reports = await fetch("/report/getAllReports");
    const item = await reports.json()
    //const item = JSON.parse((JSON.stringify(reports.json())));
    console.log(item[0])

    for(let i=0; i<item.length;i++){
        if(item[i].rangerid){
            const current = document.getElementById('repors');
            let reports_id  = document.createElement('li');
            reports_id.setAttribute("id", "lists")
            reports_id.innerText = "Station: " +  item[i].stationid + " - " + item[i].issue + "\n";
            current.appendChild((reports_id));
        }
        else{
            const current = document.getElementById('userreports');
            let reports_id  = document.createElement('li');
            reports_id.setAttribute("id", "lists")
            reports_id.innerText = "Station: " +  item[i].stationid + " - " + item[i].issue + "\n";
            current.appendChild((reports_id));

        }
    }
}
//gets station
async function getStation(){
    let new_data_type = document.createElement("select");
    const reports = await fetch("map/getAllStations/");
    const item = await reports.json()
    console.log(item[0])

    new_data_type.id = "idselector";
    const data_type_selector = document.getElementById('station_selector');

    for(let i =0;i<item.length;i++)
    {
        addOptions(item[i].id, data_type_selector); // add new select option for each type
        console.log(item[i].id)
    }
}


function addOptions(item, selector)
{
    const option = document.createElement("option");
    option.text = item;
    option.value = item;
    selector.add(option);
}

function changeReport(event){
    event.preventDefault();
    const stationselector = document.querySelector();
    selectedstation = stationselector.value;
    console.log("Hi");

}


document.addEventListener('DOMContentLoaded', getReports);
//document.addEventListener('DOMContentLoaded', getStations);
document.addEventListener('DOMContentLoaded', getStation);

const stationSelector = document.getElementById('station_selector');
stationSelector.addEventListener('change', changeReport);