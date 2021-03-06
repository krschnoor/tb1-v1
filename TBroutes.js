var express = require('express');
module.exports = function(app){
var accounts = require('./controllers/accountController.js')
var client = require('./controllers/addClientController.js')
var clients = require('./controllers/clientsController.js')
var entry = require('./controllers/ajeController.js')
var closefye = require('./controllers/closeYearController.js')
var QBDesktopController = require('./controllers/QBDeskTopController.js')

app.use('/static',express.static('./static'))
app.use('/lib',express.static('../lib'))

app.get('/', function(req,res){
res.render('home.html')})

app.get('/clients/get',clients.getClients);
app.get('/client/get',clients.getClient);
app.get('/clientinfo/get',clients.getClientInfo);
app.get('/accounts/get',accounts.getAccounts);
app.post('/newclient',client.addClient);
app.post('/adjBalances',accounts.updateChart);
app.post('/closeYear/',closefye.closeYear)

app.post('/newAccount',accounts.addAccount);
app.post('/setAccountStatus/',accounts.inactivateAccount);
app.post('/newEntry',entry.addEntry);
app.post('/newEntryEdit',entry.addEntryEdit);
app.post('/deleteEntry/',entry.deleteAje);
app.get('/ajes/get',entry.getAjes);
app.get('/aje/get',entry.getAje);
app.get('/getAjeReport/',entry.getAjeReport);
app.post('/filterQbAccounts/',QBDesktopController.filterDeskTopAccounts);
app.post('/postQBAccounts/',QBDesktopController.postQBAccounts)

}




