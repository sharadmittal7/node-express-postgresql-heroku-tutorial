var connString = 'postgres://ybmljkhgvryimr:9c0aab790c350ce4b6f5711346b66d8fdb35abff1f04637b5200cc1fd61618e2@ec2-107-20-250-195.compute-1.amazonaws.com:5432/d677ship16jo4';

var pg = require('pg');
var express = require("express");
var app = express();
app.use(express.logger());

app.get('/', function(request, response) {

	pg.connect(connString, function(err, client, done) {
		if(err) response.send("Could not connect to DB: " + err);
		client.query('SELECT * FROM MyTable', function(err, result) {
			done();
			if(err) return response.send(err);
			response.send(result.rows);
		});
	});
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
	console.log("Listening on " + port);
});
