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

  self.generateActivityArray = function (data) {
    var activityArray = [];
    var previousAvailableBikes = -100;
    data.forEach(function (elem) {
      var elementOfArray = {};

//Create the fist element of the array
      if (previousAvailableBikes === -100 ) {
        previousAvailableBikes = elem.properties['bikesAvailable'];
        elementOfArray.hour = elem.properties['timeStamp'].getHours();
        elementOfArray.bikesAvailable = elem.properties['bikesAvailable'];
      }

//Any subsequent element
      rentOrReturnBike = previousAvailableBikes - elem.properties['bikesAvailable'];

      if (rentOrReturnBike >= 0 ) {
          elementOfArray.numberOfRentals = rentOrReturnBike;
          elementOfArray.numberOfReturns = 0;
          previousAvailableBikes = elem.properties['bikesAvailable'];
          elementOfArray.hour = elem.properties['timeStamp'].getHours();
      } else {
          //Bike was returned
          elementOfArray.numberOfReturns = Math.abs(rentOrReturnBike);
          elementOfArray.numberOfRentals = 0;
          previousAvailableBikes = elem.properties['bikesAvailable'];
          elementOfArray.hour = elem.properties['timeStamp'].getHours();
      };
      previousAvailableBikes = elem.properties['bikesAvailable'];
      activityArray.push(elementOfArray);
    });
    return activityArray;
  }

  self.getAverageFrequencyOfRentals = function(data) {
    return (data.length/24);
  }

  self.getActivityByHours = function (data) {
    return self.generateActivityArray(data);
  }

  self.getMetaData = function(data){
    var meta = {};
    meta.getAverageFrequencyOfRentals = self.getAverageFrequencyOfRentals(data);
    meta.getActivityByHours = self.getActivityByHours(data);
    return meta;
  }

}
module.exports = AggregationController;
