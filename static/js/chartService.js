angular.module('TrialBalance').service('chartservice',function($http,$window,$q){

this.inactivateAccount = function(scope,account){
 
 var deferred = $q.defer()
    
    $http.post('/setAccountStatus/',{client:scope.openclient[0].name,account:account}).success(
      function(data,status,headers,config){
      deferred.resolve()
       })
   .error(function(data,status,headers,config){ })
   
     
  return deferred.promise
 

}

})