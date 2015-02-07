var express = require('express')
var app = express()

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res) {
    res.sendFile('index.html', {'root': 'public'});
 });

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://localhost', host, port);

});