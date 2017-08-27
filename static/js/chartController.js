setChart= function($scope){

  $scope.getChartBegBalances = function(){
    
    if($scope.openclient){

     var totUnadj = 0
    
      for(var ctr = 0;ctr<$scope.accounts.length;ctr++){
   
      var balArr = $scope.accounts[ctr].balances.filter(function(balance){ return ((balance.tbyear == $scope.currenttbyear) &&  (balance.tbday == $scope.currenttbday) 
        && (balance.tbmonth == $scope.currenttbmonth)) })
    
        if($scope.accounts[ctr].category=="Asset" || $scope.accounts[ctr].category=='Expense' || $scope.accounts[ctr].category=='CostOfGoodsSold'  || $scope.accounts[ctr].category=='OtherExpense'){
            if( balArr=='' || balArr==null || balArr==undefined){
              totUnadj +=0;}
            else{ totUnadj += balArr[0].unadjbal}
         }
        
        else{
       
         if( balArr=='' || balArr==null || balArr==undefined){
            totUnadj ==0;}
         else{ totUnadj -= parseFloat(balArr[0].unadjbal) || 0}
        }
      
     }
   
     return Math.abs(parseFloat(totUnadj)) || 0
 
   }}

}