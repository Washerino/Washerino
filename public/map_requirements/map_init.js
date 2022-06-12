let map;
let pins=[];
let currentPosition;
async function initMap(){
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 7,
        center: {lat:-15.6891,lng:142.5316,}
    });

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
            let selected = sessionStorage.setItem("selected_id", pins[this].getTitle());
            console.log(selected);
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
    document.location.reload(true);
    console.log(deter[0]);
}
async function giveDir(){
    let directionsService = new google.maps.DirectionsService();
    let directionsRenderer = new google.maps.DirectionsRenderer();
    await mapDirection();
    let closest = pins[0];
    let temp;
    let temp2 = (google.maps.geometry.spherical.computeDistanceBetween(pins[0].getPosition(),currentPosition));

    for (let i =0;i<pins.length;i++) {
        temp = (google.maps.geometry.spherical.computeDistanceBetween(pins[i].getPosition(),currentPosition));
        if(temp<temp2){
            closest = pins[i];
        }
        temp2 = temp;
    }
    let closestMarker = {
        origin:currentPosition,
        destination:closest.getPosition(),
        travelMode:('DRIVING'),
    };

    directionsService.route(closestMarker, function(result, status) {
        if (status == 'OK') {
            directionsRenderer.setDirections(result);
        }
    });

    directionsRenderer.setMap(map);

}

async function mapDirection(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPos);
    } else{
        alert("Sorry, browser does not support geolocation!");
    }
}
async function showPos(position){
    currentPosition = {"lat":position.coords.latitude,"lng":position.coords.longitude};
}
window.initMap = initMap;
const dirButton = document.getElementById("closest")
document.addEventListener('DOMContentLoaded', mapDirection);
dirButton.addEventListener("click",function(){
    giveDir();
});