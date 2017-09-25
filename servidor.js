var port= process.env.PORT || 3000;  
var express = require("express");
var multer = require("multer");
var app = express();
var nom = ' ';
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        nom=file.fieldname + '-' + Date.now() + '.txt';
        callback(null, nom);
        console.log("El arhivo se llama: "+nom);
    }
});
var upload = multer({ storage: storage }).single('userPhoto');
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post('/api/photo', function (req, res) {
    var salida=' ';
    upload(req, res, function (err) {
        if (err) {
            return res.end("Error al subir archivo");
        }
        //res.end("Archivo subido exitosamente");
        var exec = require("child_process").exec;
        //var child = exec('java -jar ./hastang.jar ./uploads/userPhoto-1506284997655.txt ./uploads/salidauserPhoto-1506284997655.txt',
        console.log("hasta ahorita el archivo se sigue llamando"+nom)
        var child = exec('java -jar ./hastang.jar ./uploads/' +nom+ ' ./uploads/salida'+nom,
            function (error, stdout, stderr) {
                console.log('Output -> ' + stdout);
                res.end('Archivo subido exitosamente'+stdout);
                if (error !== null) {
                    console.log("Error -> " + error);
                    res.end(stdout);
                }
            });
        module.exports = child;
    });
});

app.listen(port);
