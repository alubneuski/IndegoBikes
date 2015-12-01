var bikeAvailableSummary = {};
var initialBikeData = {};

var AggregationController = function(data) {
  var self = this;

  self.totalBikesRented = function(data){
    var previousData = {};
    var newDataArray = [{}];
    data.forEach(function (propertyElement) {
      previousData = propertyElement;
      data.forEach(function (elem) {
        if (typeof previousData !== 'undefined' &&
            elem.properties['kioskId'] === previousData.properties['kioskId']){
              if (elem.properties['bikesAvailable'] < previousData.properties['bikesAvailable']) {
                  elem.properties['bikesAvailable'] = parseInt(elem.properties['bikesAvailable']) -
                    parseInt(previousData.properties['bikesAvailable']);
                    newDataArray.push(elem);
              }
            }
      })
    })
  }
}
module.exports = AggregationController;
