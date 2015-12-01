'use strict';

/**
 * @ngdoc function
 * @name indegoUiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the indegoUiAppk
 */
var ctrs = angular.module('BikeControllers',[]);
  ctrs.controller('BikeUsageController', ['$scope', 'bikeService', function ($scope, bikeService) {
      $scope.myData = [10,20,30,40,60, 80, 20, 50];
        bikeService.query(function(data){
            $scope.dataSet = data.features;
        });
  }]);

  ctrs.controller('BikeDetailController', ['$scope','$routeParams','bikeService',
                                           function($scope, $routeParams, bikeService) {
      bikeService.query(function(data) {
         //Iterate throgh the data and pass
         var myLatLng = new google.maps.LatLng(39.9522, -75.1639);
         var mapOptions = {
                 center: myLatLng,
                 zoom: 12
             };

         var map = new google.maps.Map(document.getElementById('map'), mapOptions);

          angular.forEach( data.features, function (value){

              if (value.properties.kioskId == $routeParams.kioskId) {
                $scope.kioskData = value;
                var myLatLng = new google.maps.LatLng(value.geometry.coordinates[1], value.geometry.coordinates[0]);
                var mapOptions = {
                        center: myLatLng,
                        zoom: 15
                    };
                var map = new google.maps.Map(document.getElementById('map'), mapOptions);
                var contentForInfoWindow = '<div>Available Bikes:' + value.properties.bikesAvailable + '</div>' +
                '<div>Station Name: ' + value.properties.name;
                var infowindow = new google.maps.InfoWindow({
                    content: contentForInfoWindow
                });

                var marker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    animation: google.maps.Animation.DROP,
                    title: value.properties.addressStreet
                });
                marker.addListener('click', function() {
                    infowindow.open(map,marker);
                });
              }
           });
      });
  }]).directive('barsChart', function ($parse) {
       //explicitly creating a directive definition variable
       //this may look verbose but is good for clarification purposes
       //in real life you'd want to simply return the object {...}
       var directiveDefinitionObject = {
           //We restrict its use to an element
           //as usually  <bars-chart> is semantically
           //more understandable
           restrict: 'E',
           //this is important,
           //we don't want to overwrite our directive declaration
           //in the HTML mark-up
           replace: false,
           //our data source would be an array
           //passed thru chart-data attribute
           scope: {data: '=chartData'},
           link: function (scope, element, attrs) {
             //in D3, any selection[0] contains the group
             //selection[0][0] is the DOM node
             //but we won't need that this time
             var chart = d3.select(element[0]);
             //to our original directive markup bars-chart
             //we add a div with out chart stling and bind each
             //data entry to the chart
              chart.append("div").attr("class", "chart")
               .selectAll('div')
               .data(scope.data).enter().append("div")
               .transition().ease("elastic")
               .style("width", function(d) { return d + "%"; })
               .text(function(d) { return d + "%"; });
             //a little of magic: setting it's width based
             //on the data value (d)
             //and text all with a smooth transition
           }
        };
        return directiveDefinitionObject;
     });

  ctrs.controller('BikeMainController', ['$scope','$routeParams','bikeService',
                                           function($scope, $routeParams, bikeService) {
      bikeService.query(function(data) {
         //Iterate throgh the data and pass
         //Iterate throgh the data and pass
         var myLatLng = new google.maps.LatLng(39.9522, -75.1639);
         var mapOptions = {
                 center: myLatLng,
                 zoom: 13
             };

         var map = new google.maps.Map(document.getElementById('map'), mapOptions);

          angular.forEach( data.features, function (value){
            var contentForInfoWindow = '<div>Available Bikes:' + value.properties.bikesAvailable + '</div>' +
            '<div><a href="#/details/ '+ value.properties.kioskId +'">Station Details</a></div>'
            var infowindow = new google.maps.InfoWindow({
                content: contentForInfoWindow
            });
                    var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(value.geometry.coordinates[1], value.geometry.coordinates[0]),
                    map: map,
                    animation: google.maps.Animation.DROP,
                    title: value.properties.addressStreet
                });
                marker.addListener('click', function() {
                    infowindow.open(map,marker);
                });

           });

      });
  }]);
