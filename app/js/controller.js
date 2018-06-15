angular.module('stressApp')
.controller('MainCtrl',['NgTableParams',function(NgTableParams){
    var self=this;
    self.mes='hello';
    var data = [{name: "Moroni", age: 50} /*,*/];
    self.tableParams = new NgTableParams({}, { dataset: data});
}])
.controller('towerCtrl',[function(){
    var self=this;
   
    self.message='this is the tower stress data';
    self.testTemplate='view/template/testTemplate.html';
    self.importDataTemplate='view/template/importDataTemplate.html';
    self.tableTemplate='view/template/ngtableTemplate.html';
}])
.controller('listCtrl',['datafromxls','NgTableParams','$modal',function(datafromxls,NgTableParams,$modal){
    var self=this;
    self.openModal=function(item){
        var modalInstance=$modal.open({
            templateUrl:'view/template/modalEid.html',
            controller:'modalCtrl',
            resolve:{
                data:function(){
                    return item;
                }
            }
        })
    }
    var datas=datafromxls.list();
    self.tableParams=new NgTableParams({},{dataset:datas});
}])
.controller('modalCtrl',[])
.controller('girderCtrl',[function(){
    var self=this;
    self.message='this is the steel box girder stress data';
    self.testTemplate='view/template/testTemplate.html';
}]);

angular.module('importData')
.controller('importDataCtrl', ['$scope', '$http', 'datafromxls',function ($scope, $http,datafromxls) {

    $scope.selectedFile = null;
    $scope.msg = "";
    $scope.items=[];

    $scope.loadFile = function (files) {

        $scope.$apply(function () {

            $scope.selectedFile = files[0];

        })

    }

    $scope.handleFile = function () {

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


                    //$scope.save(url,dataObjects);
                    $scope.save(dataObjects);


                } else {
                    $scope.msg = "Error : Something Wrong !";
                }

            }

            reader.onerror = function (ex) {

            }

            reader.readAsBinaryString(file);
        }
    }

    $scope.save=function(data){

        for (i=0;i<data.length;i++){
            datafromxls.add(data[i]);
        }
        //$scope.data=data;
        //var outputdata=$scope.data[1]
        //alert(data[1].CdValue);
    }

    $scope.list=function(){
        //alert("listdone")
        return datafromxls.list();
    }


    //$scope.save = function (url,data) {
//
    //    $http.post(url, data).then(function (data) {
    //        if (data.status) {
    //            $scope.msg = "Data has been inserted ! ";
    //        }
    //        else {
    //            $scope.msg = "Error : Something Wrong";
    //        }
    //    }, function (error) {
    //        $scope.msg = "Error : Something Wrong";
    //    });
//
    //}

}]);