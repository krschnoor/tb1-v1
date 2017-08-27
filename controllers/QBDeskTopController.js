var MongoClient = require('mongodb').MongoClient;


exports.filterDeskTopAccounts = function(req,res){
 
 
 

 MongoClient.connect("mongodb://127.0.0.1:27017/" + req.body.client, function (err,db) {
          
        if (err) {
         db.close()
         return console.dir(err); }



      
      var collection = db.collection('accounts');
      
     
       collection.find({},{"sort": [['fs','asc'], ['csort','asc'],['ssort','asc']]}).toArray(function(err,accounts) {
         if(!err){
         res.json(200,accounts)
         console.log(accounts) 
         db.close()}
        });    
 
    

      
        
      });
 

 
  
}

            

exports.postQBAccounts = function(req,res){
 
 var accounts = req.body.accounts;
 var tbday = req.body.tbday;
 var tbmonth = req.body.tbmonth;
 var tbyear = req.body.tbyear;

  MongoClient.connect("mongodb://127.0.0.1:27017/" + req.body.client, function (err,db) {
         
     if (err) {
     db.close()
     return console.dir(err); }



      
     var collection = db.collection('accounts');
      
     
     for(var ctr=0;ctr<accounts.length;ctr++){

      var acctobj = {}
      acctobj.name = accounts[ctr].FullName;
      acctobj.category =  accounts[ctr].category;
      acctobj.class =  accounts[ctr].class;
      acctobj.subtype =  accounts[ctr].subtype;

   
 
    if(accounts[ctr].class=='CurrentAsset'){
       acctobj.csort = 1;
       acctobj.fs = 1 }
 
    else if(accounts[ctr].class=='FixedAsset'){
       acctobj.csort = 2;
       acctobj.fs = 1 }
 
    else if(accounts[ctr].class=='Other Assets'){
       acctobj.csort = 3;
       acctobj.fs = 1 }
 
    else if(accounts[ctr].class=='CurrentLiability'){
       acctobj.csort = 4;
       acctobj.fs = 1 }
 
    else if(accounts[ctr].class=='LongTermLiability'){
       acctobj.csort = 5;
       acctobj.fs = 1 }
 
    else if(accounts[ctr].class=='Equity'){
       acctobj.csort = 6;
       acctobj.fs = 1 }
 
    else if(accounts[ctr].class=='Sales'){
       acctobj.csort = 1;
       acctobj.fs = 2 }
 
    else if(accounts[ctr].class=='Fees'){
       acctobj.csort = 1;
       acctobj.fs = 2 }
 
    else if(accounts[ctr].class=='CostOfGoodsSold'){
       acctobj.csort = 2;
       acctobj.fs = 2 }
 
    else if(accounts[ctr].class=='SellingExpenses'){
     acctobj.csort = 3;
     acctobj.fs = 2 }
 
 
    else if(accounts[ctr].class=='GeneralExpenses'){
     acctobj.csort = 4;
     acctobj.fs = 2 }
 
    else if(accounts[ctr].class=='OtherIncome'){
     acctobj.csort = 5;
     acctobj.fs = 2 }
 
    else if(accounts[ctr].class=='OtherExpense'){
     acctobj.csort = 6;
     acctobj.fs = 2 }

  
     acctobj.ssort = 1
     acctobj.active = true
     acctobj.ListID =  accounts[ctr].ListID
 

     acctobj.balances = [{tbmonth:tbmonth,tbday:tbday,tbyear:tbyear,active:true,pybal:0,unadjbal:0,entries:[],adjbal:0}]    

 
     addAccount(collection,acctobj)
 

    } 
    

   res.json(200)
        
  });
  
  
}



function addAccount(collection, object)
{

 collection.insert(object,function(err,result){
 
  if(!err){
  console.log("inserted:")
  console.log(result)}
   
      
 

 })

}
