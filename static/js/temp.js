/**
 * Created by cberman on 11/27/2014.
 */
var http = require('http');
var path = require('path');
var fs = require('fs');
var Firebase = require("firebase");
//var data = new Firebase("https://sailing-project.firebaseio.com/");
var file_name = "charts.json";
var dl_file = "http://earthncseamless.s3.amazonaws.com";



var download = function(url, dest, cb) {
    var file = fs.createWriteStream(dest);
    var request = http.get(url, function(response) {
        response.pipe(file);
        file.on('finish', function() {
            file.close(cb);  // close() is async, call cb after close completes.
        });
    }).on('error', function(err) { // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
        if (cb) cb(err.message);
    });
}

function addChart(name){
    var dataRef = data.child(name);
    var d = dataRef.push();
}

fs.readFile(file_name,'utf8',function(err,data) {
    if (err) {
        console.log('Error: ' + err);
        return;
    }
    data = JSON.parse(data);
    data = data.ListBucketResult.Contents;
});

    // create directories
    for (var i = 1; i < 20; i++) {
        var dir = "c:/images/" + i + "/";
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        for (var j = 10; j < 3000; j++) {
            {
                var p = "c:/images/" + i + "/" + j + "/";
                if (!fs.existsSync(p)) {
                    fs.mkdirSync(p);
                }
            }
        }
    }

    for (var i = 0; i < data.length; i++) {
//		console.log(data[i]);
        var item = data[i];
        console.log(item["Key"]);

        var key = item["Key"];

        var file = "c:/images/" + key;
        var dir = path.dirname("c:/images/" + key);
        console.log(dir);
        if (!fs.existsSync(dir)) {
            console.log('making directory');
            fs.mkdirSync(dir);
        }


        var file = fs.createWriteStream(file);
        if (key.indexOf("png") > -1) {
            download(dl_file + key, file, function () {
            });
        }


        // here jsonObject['sync_contact_list'][i] is your current "bit"
    }

//	console.dir(data);





