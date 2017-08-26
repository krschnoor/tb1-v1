angular.module('TrialBalance').service('QuickBooksService',function($http,$window,$q){

  


 this.filterDeskTopAccounts = function(scope,accounts){
 
  var deferred = $q.defer()
  var accountArr = [];

    $http.post('/filterQbAccounts/',{client:scope.openclient[0].name}).success(
      function(data,status,headers,config){
      
     
     var liveAccounts = data
      
          
     for(var ctr = 0; ctr<accounts.length;ctr++){

          var acct = liveAccounts.filter(function(acct){return acct.ListID == accounts[ctr].ListID })
         
         if(acct.length==0){
         accountArr.push(accounts[ctr])
         }

      }

      scope.QBAccounts = accountArr;

      deferred.resolve()

     }).error(function(data,status,headers,config){ })
   
     
   return deferred.promise
 

  }

 this.postQBAccounts = function(scope,accounts){
 
  var deferred = $q.defer()
  var tbday = scope.currenttbday;
  var tbmonth = scope.currenttbmonth;
  var tbyear = scope.currenttbyear;

    $http.post('/postQBAccounts/',{client:scope.openclient[0].name,accounts:scope.QBAccounts,tbday:tbday,tbmonth:tbmonth,tbyear:tbyear}).success(
      function(data,status,headers,config){
      
      deferred.resolve()


     }).error(function(data,status,headers,config){ })
   
     
   return deferred.promise
 

  }





})
