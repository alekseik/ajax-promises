'use strict';
  
var techtalkServices = angular.module('techtalkServices',['ngResource']);

techtalkServices.factory('Techtalk', ['$http', '$q', function( $http, $q ) {
    return {
       getTechtalks: getTechtalks,
       getLector: getLector,
       addTechtalk: addTechtalk,
       readTechtalk: readTechtalk,
       updateTechtalk: updateTechtalk,
       deleteTechtalk: deleteTechtalk
    }
    
    function getTechtalks() {
        var request = $http({
            method: "get",
            url: "http://54.72.3.96:3000/techtalks"
        });

        return( request.then( handleSuccess, handleError ) );
    }
    
    function getLector(name) {
        var request = $http({
            method: "get",
            url: "http://54.72.3.96:3000/attendees/" + name
        });
        return( request.then( handleSuccess, handleError ) );
    }
    
    function addTechtalk(data) {
        var request = $http({
            method: "post",
            url: "http://54.72.3.96:3000/techtalks",
            data: data
        });
        return( request.then( handleSuccess, handleError ) );
    }
    
    function readTechtalk(id) {
        var request = $http({
            method: "get",
            url: "http://54.72.3.96:3000/techtalks/" + id
        });
        return( request.then( handleSuccess, handleError ) );
    }
    
    function updateTechtalk(id, data) {
        var request = $http({
            method: "put",
            url: "http://54.72.3.96:3000/techtalks/" + id,
            data: data
        });
        return( request.then( handleSuccess, handleError ) );
    }
    
    function deleteTechtalk(id) {
        var request = $http({
            method: "delete",
            url: "http://54.72.3.96:3000/techtalks/" + id
        });
        return( request.then( handleSuccess, handleError ) );
    }
    
    function handleError( response ) {
        if (! angular.isObject( response.data ) || ! response.data.message) {
           return( $q.reject( "An unknown error occurred." ) );
        }
        return( $q.reject( response.data.message ) );

    }

    function handleSuccess( response ) {
        return( response.data );
    }
}]);