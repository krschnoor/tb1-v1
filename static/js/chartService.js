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



this.addAccount = function(scope,cat,cls,sub,ssort,name){
  
  var deferred = $q.defer()
     
   
    var csort, fs;
    
 
     if(cls=='CurrentAsset'){
       csort = 1;
       fs = 1 }
 
     else if(cls=='FixedAsset'){
       csort = 2;
       fs = 1
     }
 
    else if(cls=='Other Assets'){
       csort = 3;
       fs = 1
     }
 
    else if(cls=='CurrentLiability'){
       csort = 4;
       fs = 1
     }
 
     else if(cls=='LongTermLiability'){
       csort = 5;
       fs = 1
     }
 
     else if(cls=='Equity'){
       csort = 6;
       fs = 1
     }
 
    else if(cls=='Sales'){
       csort = 1;
       fs = 2
     }
 
   else if(cls=='Fees'){
       csort = 1;
       fs = 2
     }
 
   else if(cls=='CostOfGoodsSold'){
       csort = 2;
       fs = 2
     }
 
   else if(cls=='SellingExpenses'){
       csort = 3;
       fs = 2
     }
 
 
  else if(cls=='GeneralExpenses'){
       csort = 4;
       fs = 2
     }
 
   else if(cls=='OtherIncome'){
       csort = 5;
       fs = 2
     }
 
   else if(cls=='OtherExpense'){
       csort = 6;
       fs = 2
     }
 
 
 
     var tbday = scope.currenttbday;
     var tbmonth = scope.currenttbmonth;
     var tbyear = scope.currenttbyear;
 
 
 
 
     var acct = {
               name:name,
               category:cat,
               class: cls,
               subtype:sub, 
               csort: parseInt(csort),
               ssort: parseInt(ssort),
               fs:fs, 
               balances:[{tbmonth:tbmonth,tbday:tbday,tbyear:tbyear,active:true,pybal:0,unadjbal:0,entries:[],adjbal:0}]
               }
 
         
    $http.post('/newAccount/',{account:acct,client:scope.openclient[0].name})
    .success(function(data,status,headers,config){
    deferred.resolve()
    scope.accounts.push(data[0]);
    scope.setContent('start.html');
    })
   
     
      
   return deferred.promise
  
 
 }


  this.postChart = function(scope){
 
    var deferred = $q.defer()


    $http.post('/adjBalances/',{accounts:scope.accounts,client:scope.openclient[0].name})
    .success(function(data,status,headers,config){
      deferred.resolve()
     })
     
     return deferred.promise
 
  }



})