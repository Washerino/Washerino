import {populateSelectionDiv} from './monitor.js';

let map;
let pins=[];
let currentPosition;
let geocoder;
let infowindow;
//A function that initialises the map for the pages,that use it.
async function initMap(){
    //Gets the div of map and creates the map to be rendered centred in Australia
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 6,
        center: {lat:-15.6891,lng:142.5316,}
    });
    //Gets all stations registered on database
    const test = await fetch("/map/getAllStations/");
    let pin_json = await test.json();
    console.log(pin_json);
    infowindow = new google.maps.InfoWindow();
    geocoder = new google.maps.Geocoder();
    let i;
    //Loop that creates markers for each station in the database
    for(i=0;i<pin_json.length;i++){
        pins.push(new google.maps.Marker({
            position: new google.maps.LatLng(pin_json[i].latitude,pin_json[i].longitude),
            title:pin_json[i].id.toString(),
            label:"Wash-down Station "+ (i+1).toString(),
            map: map,
            optimized: false,
        }));
        //Event listener on click that zooms in to the pin and prints the details to the right
        //of the map and adds an info window of the address
        pins[i].addListener("click",function(){
            map.setZoom(8);
            showDetails(pins[this].getTitle());
            reverseGeocode(pins[this]);
        }.bind(i));

    }
}
async function reverseGeocode(currentPin){

    infowindow.close();

    //referenced from google maps reverse geocoding documentation
    //Uses google maps reverse geocoder to get the address given a lat and long
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
//Function that gets the details given a station id
async function showDetails(current_id){
    //fetches from router the station by id
    const temp = await fetch ("map/getStation/"+current_id.toString());
    const deter = await temp.json();
    //document.location.reload(true);
    console.log(deter[0]);
    //Stores current selected in sessionstorage and populates the div with info
    let selected = sessionStorage.setItem("selected_id", current_id);
    console.log("Selected station id : " + sessionStorage.getItem("selected_id"));
    let selected_station = new CustomEvent('selected_station', {
        detail: {
            //selection: pins[this].getTitle()
        }
    });
    populateSelectionDiv(selected_station)
}
//Function that calculates the directions to the closest available station
async function giveDir(){
    let directionsService = new google.maps.DirectionsService();
    let directionsRenderer = new google.maps.DirectionsRenderer();
    await mapDirection();
    //Gets a temporary closest pin
    let closest = pins[0];
    let temp;
    let temp2 = (google.maps.geometry.spherical.computeDistanceBetween(pins[0].getPosition(),currentPosition));
    //Loops to find the closest to current location
    for (let i =0;i<pins.length;i++) {
        temp = (google.maps.geometry.spherical.computeDistanceBetween(pins[i].getPosition(),currentPosition));
        if(temp<temp2){
            closest = pins[i];
        }
        temp2 = temp;
    }
    //Creates a marker to the closest marker
    let closestMarker = {
        origin:currentPosition,
        destination:closest.getPosition(),
        travelMode:('DRIVING'),
    };
    //Renders a route to this new marker
    directionsService.route(closestMarker, function(result, status) {
        if (status == 'OK') {
            directionsRenderer.setDirections(result);
        }
    });
    //Renders to map
    directionsRenderer.setMap(map);

}
//function to check support for geolocation
async function mapDirection(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPos);
    } else{
        alert("Sorry, browser does not support geolocation!");
    }
}
//Gets current position
async function showPos(position){
    currentPosition = {"lat":position.coords.latitude,"lng":position.coords.longitude};
}
window.initMap = initMap;
const dirButton = document.getElementById("closest")
document.addEventListener('DOMContentLoaded', mapDirection);
dirButton.addEventListener("click",function(){
    giveDir();
});