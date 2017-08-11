angular.module('TrialBalance').service('closeYearService',function($http,$window,$q){



this.updateBalances = function(scope){

 var deferred = $q.defer()

 for(var ctr=0;ctr<scope.accounts.length;ctr++) {

 var balArr =  scope.accounts[ctr].balances.filter(function(balance){ return ((balance.tbyear == scope.currenttbyear) &&  (balance.tbday == scope.currenttbday) && (balance.tbmonth == scope.currenttbmonth)) })
 
 balArr[0].adjbal = scope.getAdjustedBalance(scope.accounts[ctr]) }

 $http.post('/adjBalances/',{accounts:scope.accounts,client:scope.openclient[0].name})
   .success(function(data,status,headers,config){
   
   deferred.resolve()
   
   })


return deferred.promise

  }

})