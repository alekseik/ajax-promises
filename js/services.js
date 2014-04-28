'use strict';
  
var techtalkServices = angular.module('techtalkServices',['ngResource']);

techtalkServices.factory('Techtalk', ['$http', '$q', function( $http, $q ) {
    
    var getTechtalks = function() {
            var request = $http({
                method: "get",
                url: "http://54.72.3.96:3000/techtalks"
            });
            return(request.then(handleSuccess, handleError));
        },
        
        getLector = function(name) {
            var request = $http({
                method: "get",
                url: "http://54.72.3.96:3000/attendees/" + name
            });
            return(request.then(handleSuccess, handleError));
        },
    
        addTechtalk = function(data) {
            var request = $http({
                method: "post",
                url: "http://54.72.3.96:3000/techtalks",
                data: data
            });
            return(request.then(handleSuccess, handleError));
        }, 
    
        readTechtalk = function(id) {
            var request = $http({
                method: "get",
                url: "http://54.72.3.96:3000/techtalks/" + id
            });
            return(request.then( handleSuccess, handleError));
        }, 
    
        updateTechtalk = function(id, data) {
            var request = $http({
                method: "put",
                url: "http://54.72.3.96:3000/techtalks/" + id,
                data: data
            });
            return(request.then(handleSuccess, handleError));
        },
    
        deleteTechtalk = function(id) {
            var request = $http({
                method: "delete",
                url: "http://54.72.3.96:3000/techtalks/" + id
            });
            return(request.then(handleSuccess, handleError));
        },
    
        handleError = function(response) {
            if (! angular.isObject( response.data ) || ! response.data.message) {
               return( $q.reject( "An unknown error occurred." ) );
            }
            return($q.reject(response.data.message));

        },

        handleSuccess = function(response) {
            return(response.data);
        };
        
        return {
            getTechtalks: getTechtalks,
            getLector: getLector,
            addTechtalk: addTechtalk,
            readTechtalk: readTechtalk,
            updateTechtalk: updateTechtalk,
            deleteTechtalk: deleteTechtalk
        };
}]);