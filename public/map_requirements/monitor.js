const fields = ["station_name", "address", "information", "data_entry", "contact_info"];
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
    contact_info[0].innerText = "Other ways to contact us:\n05849643279 - washscreens@qld.gov.au";
}

async function populateSelectionDiv(event)
{
    event.preventDefault();
    
    let selected_station_id = sessionStorage.getItem("selected_id");
    const name = await fetch ("map/getStation/" + selected_station_id.toString());
    const deter = await name.json();
    console.log(deter[0]);
    let station_name = document.getElementsByClassName("station_name");
    let info = deter[0].information
    let stationName = deter[0].information.substring(0, info.indexOf("~"))
    station_name[0].innerText = stationName;

    let information = document.getElementsByClassName("information");
    let stationInfo = deter[0].information.substring(info.indexOf("~")+1, info.length);
    information[0].innerText = stationInfo;

    


}

const dataForm = document.querySelector('#dataForm');
//form.addEventListener('submit', addMessage);
window.addEventListener('load', constructSelectionDiv);
window.addEventListener('load', populateSelectionDiv);