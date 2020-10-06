#!/usr/bin/nodejs
var express = require( 'express' ) ;
var app = express() ;
var nodemailer = require( 'nodemailer' ) ;
var mkdirp = require('mkdirp');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var path = require('path') ;
var fs = require('fs-extra') ;
var fs2 = require('fs');
app.set( 'port' , process.env.PORT|| 8080 ) ;
var numberonline = 0;
var numberlist = [];
var mysql = require('mysql')
var iddict = {};
var pairs = {};
var unpairs = [];
var info = {};
var clientlist = [];
idtousername = {};
multiplayerr = {};
idtoclient = {};
usernametooverallscore = {};
scores = {};
var userandpass = {}; 
var ideas = {};
ideas = fs.readJsonSync('ideas.json')
userandpass = fs.readJsonSync('usernames.json')
usernametooverallscore = fs.readJsonSync('scores.json')

io.on('connection',function(client){
        client.on('giveUsername',function(data){
        client.emit('thisistheusername', 'MaxwellJones');
        });


client.on('deletethisfile',function(data){
if(data == '')
{
}
else
{
var path = data[0] + '/' + data[1]
console.log(path)
fs.unlink(path)
}
});

client.on('hereisjson',function(data){
    fs.writeFile(data.name + '/' + data.file, data.info)
});
client.on('emailthis', function(data){
    var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'origaminetworksite@gmail.com',
    pass: 'origami1!'
  }
});

var mailOptions = {
  from: data.adress,
  to: 'origaminetworksite@gmail.com',
  subject: data.subject,
  text: "Name: " + data.name + " Email: " + data.adress + " text: " + data.comment
};
console.log(mailOptions)
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log(data)
    console.log('Email sent: ' + info.response);
  client.emit('emailsent', '')
      
  }
});
});
client.on('getusers',function(data){
    client.emit('herearetheusers',userandpass)
})
client.on('storevalue',function(data){
ideas[data.name].push(data.value) 
                fs.writeJsonSync('ideas.json',ideas)
                obj = {"text":ideas[data.name],"creasepattern":initialcreasepatterns}
client.emit('listofyourposts', obj)



var connection = mysql.createConnection({
  database : 'site_2019mjones',
  host : "mysql1.csl.tjhsst.edu" ,
  user     : 'site_2019mjones',
  password : 'rJFv5Mds28FhPmewLdwTZhUg'
});
connection.connect();
var sql = "SELECT * FROM countrylanguage WHERE CountryCode = 'USA' ;" ;
connection.query(sql, function (error, results, fields) {
if (error) throw error;
  var sql = "INSERT INTO UsersandPosts (name, post) VALUES (\"" + idtousername[client.id] + "\",\"" + data +"\" )";
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });
});
});
client.on('isitmypage',function(data){

if (data.name == idtousername[client.id])
{
client.emit('itismypage')    
}
});

client.on('givemepage',function(data)
{
console.log(data)
directory = "./" + data
userfile = fs.readdir(directory, function(err, items){
  items.unshift(" ")
var obj = {"name":data, "posts":ideas[data],"creasepatternfiles":items}
client.emit('userdata',obj)    
});
});


// client.on('givetestdata',function(data){
//     client.emit("hereistestdata",initialcreasepatterns)
// });
client.on('userfiledata',function(data){
var initialcreasepatterns = {};
if(data[0].substr(data[0].length-5) == '.json')
{
initialcreasepatterns = fs.readJsonSync(data[1] + '/' + data[0])
client.emit("hereistestdata",[0,initialcreasepatterns])
}
else{
fs.readFile(data[1] + '/' + data[0], function read(err, filedata) {
    if (err) {
        throw err;
    }
    b64 = filedata.toString('base64')
    client.emit("hereistestdata",[1,b64])
    // client.emit("hereistestdata",[1,filedata])

});

// b64 = fr.readAsDataURL(data[1] + '/' + data[0]);
//client.emit("hereistestdata",[1,b64]);



// var base64data = fs.readAsDataURL(data[1] + '/' + data[0]);
// client.emit("hereistestdata",[1,base64data])

    
}
});

client.on('generateuserslist',function(data){
   obje = userandpass
   obj = []
   for(item in userandpass)
   {
     obj.push(item) 
   }

    client.emit('listofusersdata',obj)
   });

client.on('newuserornah',function(data){
var bool = false;
for(key in userandpass)    
    {
        if(key === data.username)
        {

            if(userandpass[data.username] === data.password)
            {
            bool = true;
            }
        }
    }
    client.emit('isitauser',bool);
    idtousername[client.id] = data.username;
});

client.on('usertakenornah',function(data){
var bool = false;
for(key in userandpass)    
    {
        if(key === data.username)
        {
            bool = true;
        }
    }
    client.emit('usertaken',bool);
    if(bool ===false)
    {
        console.log('/' + data.username)
        mkdirp('./' + data.username, function(err) { 
});
        idtousername[client.id] = data.username;
        userandpass[data.username] = (data.password);
        usernametooverallscore[data.username] = [0,0];
        ideas[data.username] = []
        fs.writeJsonSync('ideas.json',ideas)
        fs.writeJsonSync('scores.json',usernametooverallscore)
        fs.writeJsonSync('usernames.json',userandpass)


    }
});

client.on('start',function()
   {
       multiplayerr[client] = false;
       numberlist.push(client);
       idtoclient[client.id] = client;
       
   });
});
app.get( '/usernamesandpasswords.js' , function(req,res,next) {
    res.sendFile(__dirname + '/usernamesandpasswords.js' ) ;
}) ;

app.get( '/login.html' , function(req,res,next) {
    res.sendFile(__dirname + '/login.html' ) ;
}) ;
app.get( '/' , function(req,res,next) {
    res.sendFile(__dirname + '/index.html' ) ;
}) ;
app.get( '/:blah' , function(req,res,next) {
    res.sendFile(__dirname + req.url ) ;
}) ;
app.get( '/:blah/:blah' , function(req,res,next) {
    res.sendFile(__dirname + req.url ) ;
});
app.get( '/js/client.js' , function(req,res,next) {
    res.sendFile(__dirname + '/js/client.js' ) ;
}) ;
app.get( '/js/localdata.js' , function(req,res,next) {
    res.sendFile(__dirname + '/js/localdata.js' ) ;
}) ;
app.get( '/js/localdata.js' , function(req,res,next) {
    res.sendFile(__dirname + '/csshome.html' ) ;
}) ;
app.get( '/login.html' , function(req,res,next) {
    res.sendFile(__dirname + '/login.html' ) ;
}) ;
app.get( '/js/client.js' , function(req,res,next) {
    res.sendFile(__dirname + '/js/clientcss.js' ) ;
}) ;
app.get( '/js/localdata.js' , function(req,res,next) {
    res.sendFile(__dirname + '/js/localdatacss.js' ) ;
}) ;
app.get( '/login.html' , function(req,res,next) {
    res.sendFile(__dirname + '/csslogin.html' ) ;
}) ;
app.get( '/index.html' , function(req,res,next) {
    res.sendFile(__dirname + '/index.html' ) ;
}) ;
app.get( '/styles.css' , function(req,res,next) {
    res.sendFile(__dirname + '/styles.css' ) ;
}) ;
var listener = server.listen( app.get( 'port' ) , function() {
});
