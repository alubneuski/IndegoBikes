'use strict';

var bikeServices = angular.module('indegoServices', ['ngResource']);

bikeServices.factory('bikeService', ['$resource', 
                           function($resource){
                               return $resource('https://api.phila.gov/bike-share-stations/v1',{}, {
                                   query: {method: 'GET', params:{kioskId : 'kiosk' }, isArray:false}
                               });
                           }]);
