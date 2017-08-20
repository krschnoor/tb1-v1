angular.module('TrialBalance').service('ajeservice',function($http,$window,$q){

  


this.postAje = function(scope){
 
 var deferred = $q.defer()
    
    $http.post('/newEntry/',{entry:scope.aje,client:scope.openclient[0].name}).success(
      function(data,status,headers,config){
      deferred.resolve()
      scope.clearAje()  
      for(var ctr=0;ctr<data[0].aje.length;ctr++){
       scope.ajeList.push(data[0].aje[ctr])
       }

     })
   .error(function(data,status,headers,config){ })
   
     
  return deferred.promise
 

}


this.getAjes = function(scope,name){
 
 var deferred = $q.defer()
 $http.get('/ajes/get',{params:{db:name}}).success(function(data,status,headers,config){
 scope.ajeList = data;
 deferred.resolve()
 }).error(function(data,status,headers,config){   })
     
return deferred.promise

}


this.getAje = function(scope,name,id){
 
 var deferred = $q.defer()
 
  $http.get('/aje/get',{params:{db:name, id:id}}).success(function(data,status,headers,config){
   scope.ajeEdit = data
   console.log(data)
   deferred.resolve()
   }).error(function(data,status,headers,config){   })
     
 return deferred.promise

}



this.postAjeEdit = function(scope){
     
  var ajeid = scope.ajeEdit[0].ajeid


  $http.post('/newEntryEdit/',{entry:scope.ajeEdit,client:scope.openclient[0].name,id:ajeid})
   .success(function(data,status,headers,config){
  
     alert("Entry Adjsuted Successfully.")

     for(var ctr = scope.ajeList.length-1;ctr>=0;ctr--){

       if(scope.ajeList[ctr].ajeid ==ajeid ){
         scope.ajeList.splice(ctr,1)}
     }

    for(var ctr = 0;ctr<scope.ajeEdit.length;ctr++){
    scope.ajeList.push(scope.ajeEdit[ctr])}

    scope.setContent('start.html')
     
  })

}


this.getAjeReport = function(scope){
  
var deferred = $q.defer()
  $http.get('/getAjeReport/',{params:{client:scope.openclient[0].name}})
  .success(function(data,status,headers,config){
    console.log(data)
    scope.ajeReportList = data
    deferred.resolve()
   })

 return deferred.promise

}


})