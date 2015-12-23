/**
 * (c) Abid Mohammed 2015
 * Apache Licence
 *
 *Usage - To convert an array of LatLons X into an array of LatLons Y such that all LatLons in Y are at a Distance D(fineDistance) from each other.
 *
 */
'use strict';
if (typeof module != 'undefined' && module.exports) var LatLon = require('./latlon-ellipsoidal.js'); // CommonJS (Node)

function CalculateFinerLatLngs(latlons, fineDistance) {
    var fineShapePoints = [];
    fineShapePoints.push(latlons[0]);
    for (var i = 1; i < latlons.length; i++) {
        var distanceBetweenLatLon = latlons[i - 1].distanceTo(latlons[i]);
        var bearingBetweenLatLon = latlons[i - 1].initialBearingTo(latlons[i]);
        if (distanceBetweenLatLon <= fineDistance) {
            fineShapePoints.push(latlons[i]);
        } else {
            var div = 1;
            var remainingDist = distanceBetweenLatLon;
            while (remainingDist >= 0) {
                var toD = div++ * fineDistance;
                if (remainingDist - fineDistance >= 0) {
                    var nextPoint = latlons[i - 1].direct(toD, bearingBetweenLatLon);
                    fineShapePoints.push(nextPoint);
                } else {
                    fineShapePoints.push(latlons[i]);
                }
                remainingDist = remainingDist - fineDistance;
            }
        }
    }
    return fineShapePoints;
}