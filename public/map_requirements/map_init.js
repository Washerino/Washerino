
async function initMap(){
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 7,
        center: {lat:-15.6891,lng:142.5316,}
    });

}



window.initMap = initMap();
// document.addEventListener('DOMContentLoaded',dropper)