///  <reference path="../typings/node_modules/@types/angular-route/index.d.ts" />
///  <reference path="../typings/node_modules/@types/angular/index.d.ts" />
angular.module('stressApp')
.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/towerstress',{
        templateUrl:'view/towerstress.html',
        controller: 'towerCtrl as ctrl'
    })
    .when('/girderstress',{
        templateUrl:'view/girderstress.html',
        controller: 'girderCtrl as ctrl'
    })
    .otherwise({redirectTo:'/'});
    
}])