var express = require('express');
var app = express();
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');

app.use(express.static('./'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.post('/upload', function(req, res){
	var form = new multiparty.Form({uploadDir: './uploads/'});

	form.parse(req, function(err, fields, files) {

		var filesTmp = JSON.stringify(files, null, 2);

		if (err) {
			console.log('parse error: ' + err);
		} else {
			console.log('parse files: ' + filesTmp);
			var inputFile = files.file[0];
			var uploadedPath = inputFile.path;
			var dstPath = './uploads/' + inputFile.originalFilename;

			fs.rename(uploadedPath, dstPath, function(err) {
				if (err) {
					console.log('rename error: ' + err);
				} else {
					console.log('rename ok!');
				}
			});
		}

		res.writeHead(200, {'content-type': 'text/plain'});
		res.write('received upload: \n\n');
		res.end(util.inspect({fields: fields, files: filesTmp}));

	});

});

app.listen(3000, function(){
	console.log('listen on 3000');
});