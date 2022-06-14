
let map;
let pins=[];
let currentPosition;
let currentSelection;
async function initMap(){
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 6,
        center: {lat:-15.6891,lng:142.5316,}
    });
    sessionStorage.setItem("selected_id",);
    const test = await fetch("/map/getAllStations/");
    let pin_json = await test.json();
    console.log(pin_json);
    let i;
    for(i=0;i<pin_json.length;i++){
        pins.push(new google.maps.Marker({
            position: new google.maps.LatLng(pin_json[i].latitude,pin_json[i].longitude),
            title:pin_json[i].id.toString(),
            label:"Wash-down Station "+ (i+1).toString(),
            map: map,
            optimized: false,
        }));

        pins[i].addListener("click",function(){
            map.setZoom(8);
            showDetails(pins[this].getTitle());
            reverseGeocode(pins[this]);
        }.bind(i));

    }
}
async function reverseGeocode(currentPin){
    const geocoder = new google.maps.Geocoder();
    const infowindow = new google.maps.InfoWindow();
    //referenced from google maps reverse geocoding documentation
    geocoder
        .geocode({location:currentPin.getPosition()})
        .then((response)=>{
            if (response.results[1]) {
                console.log(response.results[1].formatted_address);
                infowindow.setContent(response.results[1].formatted_address);
                infowindow.open(map, currentPin);
            } else {
                window.alert("No results found");
            }
        })
        .catch((e) => window.alert("Geocoder failed due to: " + e));

}

async function showDetails(current_id){
    const temp = await fetch ("map/getStation/"+current_id.toString());
    const deter = await temp.json();
    console.log(deter[0]);
    let selected = sessionStorage.setItem("selected_id", current_id);
    console.log("Selected station id : " + sessionStorage.getItem("selected_id"));
}





//adds the carpark options to the select tag
async function createReport(event) {
    event.preventDefault();

    const reportForm = document.querySelector('#report-form');

    const stationSelector = document.querySelector('#station_selector');

    console.log(sessionStorage.getItem("selected_id"));

    const reportDetails = {
        rangerID: null,
        stationID: sessionStorage.getItem("selected_id"),
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
    let x = document.getElementById("check");
    x.innerText = json;
    reportForm.reset();

};
window.initMap = initMap;
const form = document.querySelector('#report-form');
form.addEventListener('submit', createReport);