   var MongoClient = require('mongodb').MongoClient;

   
   MongoClient.connect("mongodb://127.0.0.1:27017/" + "ACE", function (err,db) {
            if (err) {
                
                db.close()
                return console.dir(err);
              
            }
            
           
            var tbmonth = 12 //req.body.month
            var tbday = 31 //req.body.day
            var tbyear = 2020 //req.body.year

           console.log(tbmonth + ' ' + tbday + '' + tbyear)

             var collection = db.collection('accounts');
            
               collection.find().toArray(function (err, items) {
                for(var ctr=0;ctr<items.length;ctr++){
                items[ctr].balances.push({tbmonth:tbmonth,tbday:tbday,tbyear:tbyear,unadjbal:0,entries:[],adjbal:0})
                collection.save(items[ctr],{w:1},function(err,results){console.log(results)}) } } );
         
        
        
   });
 


 MongoClient.connect("mongodb://127.0.0.1:27017/" + "ACE" , function (err,db) {
         
            if (err) {
                
                db.close()
                return console.dir(err);
              
            }
            
           
            var tbmonth = 12 //req.body.month
            var tbday = 31 //req.body.day
            var tbyear = 2020 //req.body.year

            var collection2 = db.collection('clientinfo');
           
              //      
                collection2.find().toArray(function (err, items2) {
                for(var ctr2=0;ctr2<items2.length;ctr2++){
                items2[ctr2].fye.push(new Date(tbyear,tbmonth-1,tbday))
                collection2.save(items2[ctr2],{w:1},function(err,results){
                console.log("saved" + results);
                //res.json(200,results);  
                }) } }  );


         
        
        
   });
