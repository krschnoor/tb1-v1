var app = angular.module('TrialBalance',[])




app.controller('TBcontroller', ['$scope','$http','$location','$timeout','ajeservice','closeYearService','chartservice','$window',
'QuickBooksService',function($scope,$http,$location,$timeout,ajeservice,closeYearService,chartservice,$window,QuickBooksService){

  $scope.accounts;
  $scope.currentAccount;
  $scope.newclient = {};
  $scope.currentfye ;
  $scope.openclient;
  $scope.openclientfyes = [];
  $scope.ajeList;
  $scope.nextfye;
  $scope.ajeEdit ;
  $scope.content;
  $scope.activeAccounts;
  $scope.ajeReportList;
  $scope.QBAccounts;

  setJournalEntry($scope)
  setReports($scope)
  setChart($scope)


  $scope.postAjeEdit = function(){

   ajeservice.postAjeEdit($scope)
  
  }
   

  $scope.postAje = function() {
            
   if($scope.ajeform.$valid){
   ajeservice.postAje($scope)}

  }
    
 $scope.deleteAje =  function(id){

  if ($window.confirm("Do You Want to Delete Journal Entry?")) {
        ajeservice.deleteAje($scope,id).then(function(){
          ajeservice.getAjes($scope,$scope.openclient[0].name).then(function(){
             ajeservice.getAjeReport($scope).then(function(){
              alert("Journal Entry " + id  + " Deleted")
              $scope.setContent('start.html')
            })
          });
        })
  }
  else {return false;}

  }



  $scope.inactivateAccount = function(account,balance) {
  
  var entriesArr = $scope.ajeList.filter(function(aje){ return ((aje.accountID==account._id) && (aje.tbdate ==$scope.currentfye)) })       
   
   if( entriesArr.length>0  || parseFloat(balance.unadjbal)!=0){
     alert("Account has Activity, Cannot Deactivate.")
     balance.active = true
     return
   }
   
   chartservice.inactivateAccount($scope,account).then(function(){

   alert("status Updated.")

   })

  }
    



$scope.printToCart = function(printSectionId) {
        var innerContents = document.getElementById(printSectionId).innerHTML;
        var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" media="print" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" /></head><body onload="window.print()">' + innerContents + '</html>');
        popupWinindow.document.close();
      }



  // will put in chart service

   $scope.addAccount = function(cat,cls,sub,ssort,name){
   
    chartservice.addAccount($scope,cat,cls,sub,ssort,name).then(function(){

    alert("Account " + name + " Created Successfully.")

   })
  
   }



//will put in chartservice
 $scope.postChart = function(){

  
   chartservice.postChart($scope).then(function(){

    chartservice.getActiveAccounts($scope).then(function(){
  
    $scope.setContent('start.html')}
  
    )
    

   })
   

  }



   
  $scope.setCurrentFye = function(ye){
  $scope.currentfye = new Date(ye)
  $scope.currenttbyear = $scope.currentfye.getYear() + 1900
  $scope.currenttbday = $scope.currentfye.getDate() 
  $scope.currenttbmonth = $scope.currentfye.getMonth() + 1
  $scope.currentfye = ye;
  $scope.getActiveAccounts($scope)
  $scope.setContent('start.html')}

  $scope.setAccount = function(acct){
  $scope.currentAccount = acct}

  
    
  $scope.setContent = function(page){ 
     
     if(page=='aje.html' || page =='ajeedit.html'){
       setJournalEntry($scope,$http)
       $scope.getActiveAccounts($scope)
      }
     if(page=='classBalanceSheet.html' || page=='classIncomeStatement.html'
      || page=='standardTrialBalance.html'){
      setReports($scope)
     }
      if(page=='ajeReport.html'){
       ajeservice.getAjeReport($scope).then(function(){
       $scope.content = '/static/' +   page 
       return})   
       }
        

     $scope.content = '/static/' +   page
  }


 $scope.getContent = function(){

   return $scope.content;
 }




 $scope.addClient = function() {
  

  if($scope.clientform.$valid){
 
   var d = new Date($scope.newclient.fye);
   var m = d.getMonth() + 1; 
   var dy = d.getDate() + 1 
   var y = d.getYear() + 1900; 
  
    $http.post('/newclient',{clientName:$scope.newclient.name,month:m,day:dy,year:y}).success(function                  (data,status,headers,config){
   
           $scope.client = data;
    
           alert("New " + $scope.newclient.name + " Account Created.")
    
          
            }).error(function(data,status,headers,config){  })
  
   }

 }

// create client service put in there
 
 $scope.getClients = function(){
 
 $http.get('/clients/get').success(function(data,status,headers,config){
   $scope.clients = data.databases
   $scope.setContent('clientlist.html')
   }).error(function(data,status,headers,config){    })
 

  }

//create client service put in there
 $scope.openClient = function(name){
 
 $http.get('/client/get',{params:{db:name}}).success(function(data,status,headers,config){
   $scope.accounts = null
   $scope.currentfye = null
   $scope.openclient = null
   $scope.openclientfyes = []
   $scope.accounts = data
   $scope.getClientInfo(name)
   $scope.getAjes(name)
   
   
   }).error(function(data,status,headers,config){    })
 




  }

// create client service put in there

 $scope.getClientInfo = function(name){

  $http.get('/clientinfo/get',{params:{db:name}}).success(function(data,status,headers,config){
   $scope.openclient = data
   $scope.openclientfyes = data[0].fye
   $scope.setContent('openclient.html')
   }).error(function(data,status,headers,config){    })

}


   $scope.getAjes = function(name){
    
    ajeservice.getAjes($scope,name).then(function(){}
    
    ) }

  
  $scope.getAje = function(name,id){
    
    ajeservice.getAje($scope,name,id).then(function(){
  
    $scope.setContent('ajeedit.html') }) }



  $scope.closeFye = function(newfye){
  
  var balArr = $scope.openclientfyes.filter(function(fye){return fye = newfye})

  if(balArr.length>0){
    alert("Cannot Overwrite Existing Period.")
    return false
  }

   if($scope.closeYearForm.$valid){
  
    if ($window.confirm("Do You Want to Close Period? This Process Cannot be Reversed.")) {
     var d = new Date(newfye);
     var m = d.getMonth() + 1; 
     var dy = d.getDate() + 1 
     var y = d.getYear() + 1900; 

     var dp = $scope.currenttbday;
     var mp = $scope.currenttbmonth;
     var yp = $scope.currenttbyear;
   
     // save unadjusted balance then use that to fill py balance in new balance object
     closeYearService.updateBalances($scope).then(function(){
 
        closeYearService.closeYear($scope,m,dy,y,mp,dp,yp).then(function(){
        alert("Fiscal Year " + newfye + " Created.");
        $scope.$parent.setContent('start.html')
       })

     })

    
    } 
  }

 }


//should go in qb controller

 $scope.getQuickBooksReport= function() {
  

  
    $http.get("http://10.1.2.68:50033/webform1.aspx?id=7").success(function  (data,status,headers,config){
   
                 
          $scope.QBAccounts = data.QBXML.QBXMLMsgsRs.AccountQueryRs.AccountRet //.QBXMLMsgsRs.AccountRet;

          QuickBooksService.filterDeskTopAccounts($scope,$scope.QBAccounts).then(function(){
        
          console.log($scope.QBAccounts)

          $scope.setContent('qbImport.html')
         

          })       
        
                 
    }).error(function(data,status,headers,config){  })


 

   }

 
// should go in qb controller


  $scope.postQbAccounts= function() {
  

      QuickBooksService.postQBAccounts($scope,$scope.QBAccounts).then(function(){
        
              
       chartservice.getActiveAccounts($scope).then(function(){
       
        alert("QuickBooks Imported Successfully.")
        $scope.setContent('start.html')

       })  

       })       
        
                 
     

   }


$scope.sa=function(){
alert("p")
  for(ctr=0;ctr<$scope.accounts.length;ctr++){

 alert($scope.accounts[ctr].name + " " + $scope.accounts[ctr].csort + ' ' + $scope.accounts[ctr].ssort)

  }
}



}])
   