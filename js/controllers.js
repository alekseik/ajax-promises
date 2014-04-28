'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('AllTechtalksCtrl', ['$scope', 'Techtalk', function($scope, Techtalk) {
       $scope.techtalks = [];
       $scope.lectorsData = {};
       Techtalk.getTechtalks().then(function(techtalks) {
           // save all techtalks
           $scope.techtalks = techtalks;
           return techtalks;
       }).then(function(techtalks) {
           // distinct array of lectors
           var lectors = [];
           // retrive lector from each techtalk
           for (var i = 0; i < techtalks.length; i++) {
               // handling if there is a lector
               if (techtalks[i]['lector'] && angular.isArray(techtalks[i]['lector'])) {
                   for (var j = 0; j < techtalks[i]['lector'].length; j++) {
                       // checking if we send request or not to avoid odd AJAX requests
                       if (lectors.indexOf(techtalks[i]['lector'][j]) == -1) {
                           lectors.push(techtalks[i]['lector'][j]);
                           // closure for promise
                           (function(i, j) {
                               Techtalk.getLector(techtalks[i]['lector'][j]).then(function(lector) {
                                   $scope.lectorsData[techtalks[i]['lector'][j]] = lector;
                               });
                           })(i, j);
                       }
                   }
                   
               }
           }
       });
  }])
  .controller('AddTechtalkCtrl', ['$scope', 'Techtalk', function($scope, Techtalk) {
          var data = {
              date: "4\/21\/2014",
              title: "AJAX",
              lector: [
                  "alena_karaba"
              ],
              location: "K1\/3",
              description: "some description",
              level: "D1-D5",
              notes: "",
              attendees: [
                  "alena_karaba"
              ],
              tags: [
                  "ajax",
                  "xmlhttprequest",
                  "promises"
              ]
          };
          
          $scope.data = data;
          
          Techtalk.addTechtalk(data).then(function(response) {
              if (!response._id) {
                  throw {
                      name: 'CreationTechtalkErrorType',
                      message: 'No _id received'
                  }
              }
              $scope.data.id = response._id;
              return response._id;
          }).then(function(id) {
              Techtalk.readTechtalk(id);
              return id;
          }).then(function(id) {
              // make some changes on init object
              data.notes = "Update";
              Techtalk.updateTechtalk(id, data);
              return id;
          }).then(function(id) {
              Techtalk.deleteTechtalk(id);
          });
  }]);
