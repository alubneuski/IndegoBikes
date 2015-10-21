'use strict';

var userlist = angular.module('indegoServices', ['ngResource']);

userlist.factory('bikeService', ['$resource', 
                           function($resource){
                               return $resource('https://api.phila.gov/bike-share-stations/v1',{}, {
                                   query: {method: 'GET', params:{kioskId : 'kiosk' }, isArray:false}
                               });
                           }]);