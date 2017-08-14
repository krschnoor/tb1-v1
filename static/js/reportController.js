setReports = function($scope){
 
    
    $scope.getAdjustedBalance = function(acct) {
 
    var balArr =  acct.balances.filter(function(balance){ return ((balance.tbyear == $scope.currenttbyear) &&  (balance.tbday == $scope.currenttbday) && (balance.tbmonth == $scope.currenttbmonth)) })

   
    var entriesArr = $scope.ajeList.filter(function(aje){ return ((aje.accountID==acct._id) && (aje.tbdate ==$scope.currentfye)) })
  

      var adjBal = 0;

      for(var ctr=0; ctr< entriesArr.length;ctr++) {
    
         if(acct.category=='Asset'){
         adjBal +=  parseFloat(entriesArr[ctr].debit) || 0 ; 
         adjBal -= parseFloat(entriesArr[ctr].credit) || 0;}
         else if (acct.category == 'Expense' || acct.category=='CostOfGoodsSold'){
         adjBal +=  parseFloat(entriesArr[ctr].debit) || 0 ; 
         adjBal -= parseFloat(entriesArr[ctr].credit) || 0;}
         else {
         adjBal -=  parseFloat(entriesArr[ctr].debit) || 0 ; 
         adjBal += parseFloat(entriesArr[ctr].credit) || 0;}
        
       }

      if(balArr==null || balArr == '' || balArr==undefined){
         adjBal += 0  }
      else{adjBal +=  balArr[0].unadjbal || 0 }    
          

    return adjBal 

   }
   

$scope.getSubTotalsAdj = function(type){
    
      
      var adjBal = 0;
      
      var filtered = $scope.accounts.filter(function(account){ return account.class==type})
      
        for(ctr=0;ctr<filtered.length;ctr++){
         
         var balArr = filtered[ctr].balances.filter(function(balance){ return ((balance.tbyear == $scope.currenttbyear) &&  (balance.tbday == $scope.currenttbday) && (balance.tbmonth == $scope.currenttbmonth)) })
        
         var entriesArr = $scope.ajeList.filter(function(aje){ return ((aje.accountID==filtered[ctr]._id) && (aje.tbdate ==$scope.currentfye)) })       
        
          for(var ctr2=0;ctr2<entriesArr.length;ctr2++){

            if(filtered[ctr].category=='Asset' || filtered[ctr].category=='Expense' || filtered[ctr].category=='CostOfGoodsSold' ){
             adjBal +=  parseFloat(entriesArr[ctr2].debit) || 0 ; 
             adjBal -= parseFloat(entriesArr[ctr2].credit) || 0;}
            else{
            adjBal -=  parseFloat(entriesArr[ctr2].debit) || 0 ; 
            adjBal += parseFloat(entriesArr[ctr2].credit) || 0;}
         
          }     
          
         if(balArr==null || balArr == '' || balArr==undefined){
         adjBal += 0  }
         else{adjBal +=  balArr[0].unadjbal || 0 }    
         
        }

           
      return adjBal 

    }


$scope.getSubTotalsPy = function(type){
    
      
      var pybal = 0;
      
      var filtered = $scope.accounts.filter(function(account){ return account.class==type})
       
        for(ctr=0;ctr<filtered.length;ctr++){
         
         var balArr = filtered[ctr].balances.filter(function(balance){ return ((balance.tbyear == $scope.currenttbyear) &&  (balance.tbday == $scope.currenttbday) && (balance.tbmonth == $scope.currenttbmonth)) })
          
          if(balArr==null || balArr == '' || balArr==undefined){
           pybal += 0  }
          else{pybal +=  balArr[0].pybal || 0 }    
         
        }

           
      return pybal

    }



$scope.getSubTotalsUnadj = function(type){
    
      
      var unadjBal = 0;
      
      var filtered = $scope.accounts.filter(function(account){ return account.class==type})
       
        for(ctr=0;ctr<filtered.length;ctr++){
         
         var balArr = filtered[ctr].balances.filter(function(balance){ return ((balance.tbyear == $scope.currenttbyear) &&  (balance.tbday == $scope.currenttbday) && (balance.tbmonth == $scope.currenttbmonth)) })
          
          if(balArr==null || balArr == '' || balArr==undefined){
           unadjBal += 0  }
          else{unadjBal +=  balArr[0].unadjbal  || 0}    
         
        }

           
      return unadjBal 

    }



   $scope.getSubTotalsDebits = function(type){
    
      var debits = 0;
      
      var filtered = $scope.accounts.filter(function(account){ return account.class==type})
       
        for(ctr=0;ctr<filtered.length;ctr++){
         
         var entriesArr = $scope.ajeList.filter(function(aje){ return ((aje.accountID==filtered[ctr]._id) && (aje.tbdate == $scope.currentfye)) })
          
           for(ctr2=0;ctr2<entriesArr.length;ctr2++){
            debits += parseFloat(entriesArr[ctr2].debit) || 0
           }
          
         
        }

           
      return debits

    

   }


$scope.getSubTotalsCredits = function(type){
    
      var credits = 0;
      
      var filtered = $scope.accounts.filter(function(account){ return account.class==type})
       
        for(ctr=0;ctr<filtered.length;ctr++){
         
         var entriesArr = $scope.ajeList.filter(function(aje){ return ((aje.accountID==filtered[ctr]._id) && (aje.tbdate == $scope.currentfye)) })
          
           for(ctr2=0;ctr2<entriesArr.length;ctr2++){
            credits += parseFloat(entriesArr[ctr2].credit) || 0
           }
          
         
        }

           
      return credits

    }

$scope.getGrossProfit = function(){

retutrn



}


$scope.getTotalsPy = function(category){
  
      var pybal = 0;
      
      var filtered = $scope.accounts.filter(function(account){ return account.category==category})
      
        for(ctr=0;ctr<filtered.length;ctr++){
         
         var balArr = filtered[ctr].balances.filter(function(balance){ return ((balance.tbyear == $scope.currenttbyear) &&  (balance.tbday == $scope.currenttbday) && (balance.tbmonth == $scope.currenttbmonth)) })
        
                  
         if(balArr==null || balArr == '' || balArr==undefined){
         pybal += 0  }
         else{pybal +=  balArr[0].pybal || 0 }    
         
        }

           
      return pybal

    }





$scope.getTotalsUnadj = function(category){
  
      var unadj = 0;
      
      var filtered = $scope.accounts.filter(function(account){ return account.category==category})
      
        for(ctr=0;ctr<filtered.length;ctr++){
         
         var balArr = filtered[ctr].balances.filter(function(balance){ return ((balance.tbyear == $scope.currenttbyear) &&  (balance.tbday == $scope.currenttbday) && (balance.tbmonth == $scope.currenttbmonth)) })
        
                  
         if(balArr==null || balArr == '' || balArr==undefined){
         unadj += 0  }
         else{unadj +=  balArr[0].unadjbal || 0 }    
         
        }

           
      return unadj 

    }


$scope.getTotalsDebits = function(category){
     
     var totaldebit = 0;
      
      var filtered = $scope.accounts.filter(function(account){ return account.category==category})
      
        for(var ctr=0;ctr<filtered.length;ctr++){
         
        
        
         var entriesArr = $scope.ajeList.filter(function(aje){ return ((aje.accountID==filtered[ctr]._id) && (aje.tbdate ==$scope.currentfye)) })       
        
          for(var ctr2=0;ctr2<entriesArr.length;ctr2++){
           
              totaldebit += parseFloat(entriesArr[ctr2].debit) || 0;
                          
          }     
          
                
        }

           
      return totaldebit
    }



$scope.getTotalsCredits = function(category){
    
    
      var totalcredit = 0;
      
      var filtered = $scope.accounts.filter(function(account){ return account.category==category})
      
        for(var ctr=0;ctr<filtered.length;ctr++){
         
        
        
         var entriesArr = $scope.ajeList.filter(function(aje){ return ((aje.accountID==filtered[ctr]._id) && (aje.tbdate ==$scope.currentfye)) })       
        
          for(var ctr2=0;ctr2<entriesArr.length;ctr2++){
           
              totalcredit += parseFloat(entriesArr[ctr2].credit) || 0;
                          
          }     
          
                
        }

           
      return totalcredit

    }


$scope.getTotalsAdj = function(category){
    
      
      var adjBal = 0;
      
      var filtered = $scope.accounts.filter(function(account){ return account.category==category})
      
        for(var ctr=0;ctr<filtered.length;ctr++){
         
         var balArr = filtered[ctr].balances.filter(function(balance){ return ((balance.tbyear == $scope.currenttbyear) &&  (balance.tbday == $scope.currenttbday) && (balance.tbmonth == $scope.currenttbmonth)) })
        
         var entriesArr = $scope.ajeList.filter(function(aje){ return ((aje.accountID==filtered[ctr]._id) && (aje.tbdate ==$scope.currentfye)) })       
        
          for(var ctr2=0;ctr2<entriesArr.length;ctr2++){

            if(filtered[ctr].category=="Asset" || filtered[ctr].category=="Expense" || filtered[ctr].category=="CostOfGoodsSold"){
              
             adjBal +=  parseFloat(entriesArr[ctr2].debit) || 0 ; 
             adjBal -= parseFloat(entriesArr[ctr2].credit) || 0;}
             
            else{
            adjBal -=  parseFloat(entriesArr[ctr2].debit) || 0 ; 
            adjBal += parseFloat(entriesArr[ctr2].credit) || 0;}
         
          }     
          
         if(balArr==null || balArr == '' || balArr==undefined){
         adjBal += 0  }
         else{adjBal += parseFloat(balArr[0].unadjbal) || 0  }     
         
         
        }

           
      return adjBal 

    }


 $scope.getSumAdjustments = function(account){

  var totalAdjustments = null;
      
             
         var entriesArr = $scope.ajeList.filter(function(aje){ return ((aje.accountID==account._id) && (aje.tbdate ==$scope.currentfye)) })       
        
          for(var ctr2=0;ctr2<entriesArr.length;ctr2++){
           
             if(account.category=="Asset" || account.category=="Expense" || account.category=="CostOfGoodsSold"){
              totalAdjustments += parseFloat(entriesArr[ctr2].debit) || 0;
              totalAdjustments -= parseFloat(entriesArr[ctr2].credit) || 0;}
              else{
              totalAdjustments -= parseFloat(entriesArr[ctr2].debit) || 0;
              totalAdjustments += parseFloat(entriesArr[ctr2].credit) || 0;
              }
             
          }     
          
                
        

           
    return totalAdjustments
 }

$scope.getTotalsPyAll = function(){
    
      
      var adjBal = 0;
      var totAdj = 0;
        
        for(var ctr=0;ctr<$scope.accounts.length;ctr++){
         
         var balArr = $scope.accounts[ctr].balances.filter(function(balance){ return ((balance.tbyear == $scope.currenttbyear) &&  (balance.tbday == $scope.currenttbday) && (balance.tbmonth == $scope.currenttbmonth)) })
        
         if(balArr==null || balArr == '' || balArr==undefined){
         adjBal += 0  }
         else{adjBal += parseFloat(balArr[0].pybal) || 0 }         
         
         
        if($scope.accounts[ctr].category=="Asset" || $scope.accounts[ctr].category=="Expense" ||
             $scope.accounts[ctr].category=="CostOfGoodsSold"){
             totAdj += adjBal;
              adjBal = 0;}
        else{totAdj -= adjBal;
             adjBal = 0;}
      
        }

           
      return totAdj 

    }

$scope.getTotalsUnadjAll = function(){
    
      
      var adjBal = 0;
      var totAdj = 0;
        
        for(var ctr=0;ctr<$scope.accounts.length;ctr++){
         
         var balArr = $scope.accounts[ctr].balances.filter(function(balance){ return ((balance.tbyear == $scope.currenttbyear) &&  (balance.tbday == $scope.currenttbday) && (balance.tbmonth == $scope.currenttbmonth)) })
        
         if(balArr==null || balArr == '' || balArr==undefined){
         adjBal += 0  }
         else{adjBal += parseFloat(balArr[0].unadjbal) || 0 }         
         
         
        if($scope.accounts[ctr].category=="Asset" || $scope.accounts[ctr].category=="Expense" ||
             $scope.accounts[ctr].category=="CostOfGoodsSold"){
             totAdj += adjBal;
              adjBal = 0;}
        else{totAdj -= adjBal;
             adjBal = 0;}
      
        }

           
      return totAdj 

    }


$scope.getTotalsEntriesAll = function(){
    
      
      var adjBal = 0;
      var totAdj = 0;
        
        for(var ctr=0;ctr<$scope.accounts.length;ctr++){
         
         var balArr = $scope.accounts[ctr].balances.filter(function(balance){ return ((balance.tbyear == $scope.currenttbyear) &&  (balance.tbday == $scope.currenttbday) && (balance.tbmonth == $scope.currenttbmonth)) })
        
         var entriesArr = $scope.ajeList.filter(function(aje){ return ((aje.accountID==$scope.accounts[ctr]._id) && (aje.tbdate ==$scope.currentfye)) })       
        
          for(var ctr2=0;ctr2<entriesArr.length;ctr2++){

            if($scope.accounts[ctr].category=="Asset" || $scope.accounts[ctr].category=="Expense" ||
             $scope.accounts[ctr].category=="CostOfGoodsSold"){
              
             adjBal +=  parseFloat(entriesArr[ctr2].debit) || 0 ; 
             adjBal -= parseFloat(entriesArr[ctr2].credit) || 0;}
             
            else{
            adjBal -=  parseFloat(entriesArr[ctr2].debit) || 0 ; 
            adjBal += parseFloat(entriesArr[ctr2].credit) || 0;}
         
          }     
          
                  
        if($scope.accounts[ctr].category=="Asset" || $scope.accounts[ctr].category=="Expense" ||
             $scope.accounts[ctr].category=="CostOfGoodsSold"){
              totAdj += adjBal;
              adjBal = 0;}
        else{totAdj -= adjBal;
              adjBal = 0;}
      

        }

           
      return totAdj 
    }






 $scope.getTotalsAdjAll = function(){
    
      
      var adjBal = 0;
      var totAdj = 0;
        
        for(var ctr=0;ctr<$scope.accounts.length;ctr++){
         
         var balArr = $scope.accounts[ctr].balances.filter(function(balance){ return ((balance.tbyear == $scope.currenttbyear) &&  (balance.tbday == $scope.currenttbday) && (balance.tbmonth == $scope.currenttbmonth)) })
        
         var entriesArr = $scope.ajeList.filter(function(aje){ return ((aje.accountID==$scope.accounts[ctr]._id) && (aje.tbdate ==$scope.currentfye)) })       
        
          for(var ctr2=0;ctr2<entriesArr.length;ctr2++){

            if($scope.accounts[ctr].category=="Asset" || $scope.accounts[ctr].category=="Expense" ||
             $scope.accounts[ctr].category=="CostOfGoodsSold"){
              
             adjBal +=  parseFloat(entriesArr[ctr2].debit) || 0 ; 
             adjBal -= parseFloat(entriesArr[ctr2].credit) || 0;}
             
            else{
            adjBal -=  parseFloat(entriesArr[ctr2].debit) || 0 ; 
            adjBal += parseFloat(entriesArr[ctr2].credit) || 0;}
         
          }     
          
         if(balArr==null || balArr == '' || balArr==undefined){
         adjBal += 0  }
         else{adjBal += parseFloat(balArr[0].unadjbal) || 0 }     
         
         
        if($scope.accounts[ctr].category=="Asset" || $scope.accounts[ctr].category=="Expense" ||
             $scope.accounts[ctr].category=="CostOfGoodsSold"){
             totAdj += adjBal;
              adjBal = 0;}
        else{totAdj -= adjBal;
             adjBal = 0;}
      

        }

           
      return totAdj 

    }


 $scope.isCurrentAccount = function(account){
 
  var balArr = null

  var balArr = account.balances.filter(function(balance){ return ((balance.tbyear == $scope.currenttbyear) &&  (balance.tbday == $scope.currenttbday) && (balance.tbmonth == $scope.currenttbmonth)) })

 
  if(balArr == null || balArr == undefined || balArr=='')
  {return false}
  else{ return true }

 }

$scope.isActiveAccount = function(account){
 
  var balArr = null

  var balArr = account.balances.filter(function(balance){ return ((balance.tbyear == $scope.currenttbyear) &&  (balance.tbday == $scope.currenttbday) && (balance.tbmonth == $scope.currenttbmonth)) })

 
  if(balArr == null || balArr == undefined || balArr=='')
  {return false}
  else if(balArr[0].active==false){
    return false}
  else{return true }

 }


$scope.getActiveAccounts = function($scope){
 
  var tempArr=[];

  for(var ctr=0;ctr<$scope.accounts.length;ctr++){

  var balArr =  $scope.accounts[ctr].balances.filter(function(balance){ return ((balance.tbyear == $scope.currenttbyear) &&  (balance.tbday == $scope.currenttbday) && (balance.tbmonth == $scope.currenttbmonth)) })   

   if(balArr[0].active == true)
   {tempArr.push($scope.accounts[ctr])}

  }    

 $scope.activeAccounts = tempArr
 

}







}