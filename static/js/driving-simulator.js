/**
 * (c) Abid Mohammed 2015
 *  Apache Licence
 **/

function msToHours(ms) {
    var seconds = ms / 1000;
    var hours = parseInt(seconds / 3600);
    seconds = seconds % 3600;
    var minutes = (seconds / 60);
    var result = hours + (minutes / 60);
    return result;
}

function calcSpeed(dist, time_in_msec) {
    return dist / msToHours(time_in_msec);
}

function calcTimeInMilliSec(speed, distance) {
    return (distance / speed) * 60 * 60 * 1000;
}

function calcDistTravelled(speed, time_in_msec) {
    return speed * msToHours(time_in_msec);
}

function createVehicleMarkerCanvas(elementId) {
    var vehicleMarkerCanvas = document.getElementById(elementId);
    var vMarkerContext = vehicleMarkerCanvas.getContext('2d');
    vMarkerContext.beginPath();
    vMarkerContext.shadowColor = '#0080FF';
    vMarkerContext.shadowOffsetX = 0;
    vMarkerContext.shadowOffsetY = 0;
    vMarkerContext.shadowBlur = 6;
    vMarkerContext.arc(vehicleMarkerCanvas.width / 2, vehicleMarkerCanvas.height / 2, 8, 0, 2 * Math.PI, false);
    vMarkerContext.fillStyle = '#2ECCFA';
    vMarkerContext.fill();
    vMarkerContext.lineWidth = 1.5;
    vMarkerContext.strokeStyle = 'white';
    vMarkerContext.stroke();
    return vehicleMarkerCanvas;
}

function convertRouteIntoFinerLatLngs(route, fineDist) {
    var latlongs = convertRouteToLatLngObjects(route);
    return CalculateFinerLatLngs(latlongs, fineDist);
}

function convertRouteToLatLngObjects(route) {
    var latlongs = [];
    route.shape.forEach(function (point) {
        var p = point.split(",");
        latlongs.push(new LatLon(p[0], p[1]));
    });
    return latlongs;
}