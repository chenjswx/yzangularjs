﻿var app = angular.module('importData', []);

app.controller('importCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.selectedFile = null;
    $scope.msg = "";


    $scope.loadFile = function (files) {

        $scope.$apply(function () {

            $scope.selectedFile = files[0];

        })

    }

    $scope.handleFile = function (url) {

        var file = $scope.selectedFile;

        if (file) {

            var reader = new FileReader();

            reader.onload = function (e) {

                var data = e.target.result;

                var workbook = XLSX.read(data, { type: 'binary' });

                var first_sheet_name = workbook.SheetNames[0];

                var dataObjects = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);

                //console.log(excelData);  

                if (dataObjects.length > 0) {


                    $scope.save(url,dataObjects);


                } else {
                    $scope.msg = "Error : Something Wrong !";
                }

            }

            reader.onerror = function (ex) {

            }

            reader.readAsBinaryString(file);
        }
    }


    $scope.save = function (url,data) {

        $http.post(url, data).then(function (data) {
            if (data.status) {
                $scope.msg = "Data has been inserted ! ";
            }
            else {
                $scope.msg = "Error : Something Wrong";
            }
        }, function (error) {
            $scope.msg = "Error : Something Wrong";
        });

    }

}]);