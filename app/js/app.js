angular.module('stressApp',["ngRoute","importData","ngTable"]);
angular.module('importData',[])
.factory('datafromxls',[function(){
    var datas=[
        {CedianDetailId:'1',CdValue:'2',DanWei:'Mpa',JianceJd:'W1',JianceData:'2017-07-25'}
    ];
    return{
        list:function(){
            //alert('done');
            return datas;
        },
        add:function(data){
            datas.push(data);
        }
    };
}]);