var imported = document.createElement('script');
imported.src = 'js/md5.js';
document.head.appendChild(imported)
var socket = io.connect( 'https://user.tjhsst.edu/', {path: '/2019mjones/socket.io/'}) ;

socket.on('connect',function(data){
        socket.emit('start')
})

socket.on('init',function(data){
    var obj = document.getElementById('myItem');
    obj.innerHTML = data.item ;
});

socket.on("hereistestdata",function(data){
		if(data[0]==0)
        {
		          var image = document.getElementById("img1")
		          		          image.style.display="none";
		          var canvas = document.getElementById("canvas1");
		          canvas.style.display="inline";

		var canvas = document.getElementById("canvas1");
		var context = canvas.getContext("2d");
		var jsonparsed = data[1];
		context.clearRect(0,0,canvas.width,canvas.height)
		context.beginPath();
		for(item in jsonparsed)
		{
		context.moveTo(jsonparsed[item].startx,jsonparsed[item].starty);
		context.lineTo(jsonparsed[item].endx,jsonparsed[item].endy);
		}
		context.stroke();
        }
        else
        {
            console.log(data[1]);
            		          var image = document.getElementById("img1")
		          		          image.style.display="inline";
            var canvas = document.getElementById("canvas1");
            canvas.style.display="none";
            var img = document.getElementById("img1")
            //var b64encoded = btoa(String.fromCharCode.apply(null, data[1]));
            // var b64encoded = Buffer.from(data[1]).toString('base64')
            var mid = hexToBase64('data[1]')
            console.log(mid)
            img.src = 'data:image/jpeg;base64,' + data[1];
        }
});
socket.on('listofusersdata',function(data){
    parent = document.getElementById("listofusers")
    child = document.createElement("UL")
    for(item in data)
    {
        var name = data[item]
        var x = document.createElement("li")
    var player = document.createElement("button");
    player.innerHTML = name + '\'s page';
    player.onclick = function(){whoisit(this.id)};
    player.id = name;
    x.appendChild(player)
    child.append(x)
    }
    parent.append(child) 
});
socket.on('listofyourposts',function(data){
    parent = document.getElementById("privatepostarea")
    parent.innerHTML = ""
    child = document.createElement("UL")
    for(item in data["text"])
    {
        var name = data[item]
        var x = document.createElement("li")
    var player = document.createElement("text");
    player.innerHTML = name;   
    player.id = name;
    x.appendChild(player)
    child.append(x)
    }
    var canvas = document.getElementById("canvas1");
		var context = canvas.getContext("2d");
		var jsonparsed = data["creasepattern"];
		context.clearRect(0,0,canvas.width,canvas.height)
		context.beginPath();
		for(item in jsonparsed)
		{
		context.moveTo(jsonparsed[item].startx,jsonparsed[item].starty);
		context.lineTo(jsonparsed[item].endx,jsonparsed[item].endy);
		}
		context.stroke();
	child.append(canvas)
    parent.append(child) 
});
socket.on('userdata',function(data){
var canvas = document.getElementById("canvas1");

canvas.style.display="inline";
creasepatternfiles = data.creasepatternfiles;
var dropdown = document.getElementById("dropdownmenu")
dropdown.style.display="inline";


for(file in dropdown.children)
{
dropdown.remove(file);
}
for(file in creasepatternfiles)
{
var option = document.createElement("option")
option.text = creasepatternfiles[file].slice(0,-5)
option.value = creasepatternfiles[file]
dropdown.add(option)
}
obj = document.getElementById("myUsername")
obj.innerHTML = data.name + "'s Page"
        parent = document.getElementById("privatepostarea")
    parent.innerHTML = ""
    child = document.createElement("UL")
    for(item in data.posts)
    {
        var name = data.posts[item]
        var x = document.createElement("li")
    var player = document.createElement("text");
    player.innerHTML = name;   
    player.id = name;
    x.appendChild(player)
    child.append(x)
    }

        obj = document.getElementById("listofusers")   
        obj.innerHTML = ''
        var parent = document.getElementById("buttonfirst") 

              var hint = document.createElement("button");
    hint.innerHTML = "go to main page";
        hint.id = "button2"
            hint.onclick = function(){goToMainPage()};
    parent.appendChild(hint);
    socket.emit("isitmypage",data)
        
});
socket.on('itismypage',function(data){
    var filetext = document.getElementById("filetext")
var file = document.getElementById("fileinput")
file.style.display="inline";
filetext.style.display="inline";
var filetext = document.getElementById("uploadbutton")
filetext.style.display="inline";
var filetext = document.getElementById("deletebutton")
filetext.style.display="inline";
       parent = document.getElementById("buttonfirst") 
                   var hint = document.createElement("input");
       hint.placeholder = "share some text";
    hint.type = 'text'
    hint.onkeydown = function(event){sharetexty(event)};
    hint.id = "inputtext";
    parent.appendChild(hint);
    var r = document.getElementById("postarea")
    r.innerHTML = "Your Posts"
    
});
function whoisit(data)
{
        userpage = data
        socket.emit('givemepage',data)   
}
function makeTheLogin()
{
    newuser = true;
    obj = document.getElementById("Userprompt")
    obj.innerHTML = 'Enter New UserName'
    obj = document.getElementById("Passprompt")
    obj.innerHTML = 'Enter New Password'
    
}
function clear()
{
currentdesign = ""
var dropdown = document.getElementById("dropdownmenu")
dropdown.style.display="none";
var canvas = document.getElementById("canvas1");
canvas.style.display="none";
var file = document.getElementById("fileinput")
file.style.display="none";
var filetext = document.getElementById("filetext")
filetext.style.display="none";
var filetext = document.getElementById("uploadbutton")
filetext.style.display="none";
var filetext = document.getElementById("deletebutton")
filetext.style.display="none";

}
function sharetexty(thing)
{
if(thing.keyCode== 13)
{
boj = document.getElementById("inputtext")
socket.emit("storevalue", boj.value)
boj.value = ""
}
}
function upload()
{
var info = document.getElementById("fileinput")
        var reader = new FileReader();
		var filename = info.files[0];
        reader.readAsText(filename);
		var jsonstorage = reader.result;
		infopiece = {"file": filename.name, "info":filename};
		socket.emit("hereisjson", infopiece);

		var dropdown = document.getElementById("dropdownmenu")
		var option = document.createElement("option")
option.text = filename.name.slice(0,-5)
option.value = filename.name
dropdown.add(option)
}
function deletefile()
{
var drop = document.getElementById("dropdownmenu")
if(currentdesign == ""|currentdesign == " ")
{
alert("No file chosen")
}
else
{
if(confirm('are you sure you want to delete this file?')){
    socket.emit('deletethisfile', currentdesign)
    var canvas = document.getElementById("canvas1");
	var context = canvas.getContext("2d");
	context.clearRect(0,0,canvas.width,canvas.height)
	for(var x =0;x<drop.length;x++)
	{
	if(drop.options[x].value == currentdesign){
	 drop.remove(x)
	}
	}
}
}
}
function goToMainPage()
{
    currentdesign = ""
    var dropdown = document.getElementById("dropdownmenu")
dropdown.style.display="none";
var canvas = document.getElementById("canvas1");
		canvas.style.display="none";
		var file = document.getElementById("fileinput")
file.style.display="none";
var filetext = document.getElementById("filetext")
filetext.style.display="none";
var filetext = document.getElementById("uploadbutton")
filetext.style.display="none";
var filetext = document.getElementById("deletebutton")
filetext.style.display="none";

		var context = canvas.getContext("2d");
		context.clearRect(0,0,canvas.width,canvas.height)
var dropdown = document.getElementById("dropdownmenu")
for(var i in dropdown.children)
{
dropdown.remove(i);
}
obj = document.getElementById("myUsername")
obj.innerHTML = "Main Page(click on other pages to view them)"
       obj = document.getElementById("inputtext")   
        if(obj!== null)
        {
                  obj.remove()              
        }
        obj = document.getElementById("button2")   
        if(obj!== null)
        {
                  obj.remove()              
        }        obj = document.getElementById("buttonfirst")
        if(obj!== null)
        {
                  obj.innerHTML = ""              
        }    
         obj = document.getElementById("privatepostarea")
        if(obj!== null)
        {
                  obj.innerHTML = ""              
        }    
        socket.emit('generateuserslist',"")
        var r = document.getElementById("postarea")
    r.innerHTML = ""

}


function fileselect(data)
{
var file1 = [data.value,userpage]
currentdesign = data.value
socket.emit("userfiledata",file1)

    
}



function goToGame()
{
if(newuser === false)
{

  part1 = document.getElementById("Userinput").value;
  part2 = document.getElementById("Passinput").value;
    hash = MD5(part2)
  console.log(hash)
  obj = {username:part1, password:hash}
socket.emit('newuserornah',obj)
}
 else
 {
  part1 = document.getElementById("Userinput").value;
  part2 = document.getElementById("Passinput").value;
    hash = MD5(part2)
  console.log(hash)
  obj = {username:part1, password: hash}
  socket.emit('usertakenornah',obj)   
 }
}

socket.on('isitauser', function(data){
    if(data === false)
    {
     if(alreadypressed === false)
     {
     obj = document.getElementById("Userallowed")   
        obj.innerHTML = "Username or Password incorrect"
     }
         
     }
    else
    {
       alreadypressed = true;
            obj = document.getElementById("Userallowed")   
        obj.remove()              

       obj = document.getElementById("Userinput")   
        obj.remove()              
        obj = document.getElementById("Passinput")   
        obj.remove()              
        obj = document.getElementById("loginbutton")   
        obj.remove()              
                          obj = document.getElementById("prompt")   
        obj.innerHTML = ""    
             obj = document.getElementById("letsnotplay")   
        obj.innerHTML = ""    
        parent = document.getElementById("buttonfirst") 
    var hint = document.createElement("input");
    hint.placeholder = "share some text";
    hint.type = 'text'
    hint.onkeydown = function(event){sharetexty(event)};
    hint.id = "inputtext";
    //parent.appendChild(hint);
    parent = document.getElementById("buttonfirst")   
    var hint = document.createElement("button");
    hint.innerHTML = "go to main page";
    hint.id = "button2"
    hint.onclick = function(){goToMainPage()};
    //parent.appendChild(hint);
        socket.emit('giveUsername', '')
            var r = document.getElementById("postarea")
    r.innerHTML = "Your Posts"
    //  socket.emit('givetestdata','')

      }
});
socket.on('usertaken', function(data){
    if(data === true)
    {
     if(alreadypressed === false)
     {
     obj = document.getElementById("Userallowed")   
     obj.innerHTML = "Username already taken"
     }
     }
    else
    {
        alreadypressed = true;
                    obj = document.getElementById("Userallowed")   
        obj.remove()        
        obj = document.getElementById("Userinput")   
        obj.remove()     
        obj = document.getElementById("Userprompt")   
        obj.remove()     
        obj = document.getElementById("Passprompt")   
        obj.remove()     
        obj = document.getElementById("Passinput")   
        obj.remove()              
        obj = document.getElementById("loginbutton")   
        obj.remove()              
                          obj = document.getElementById("prompt")   
        obj.innerHTML = ""    
             obj = document.getElementById("letsnotplay")   
        obj.innerHTML = ""    
        parent = document.getElementById("buttonfirst") 
                   var hint = document.createElement("input");
    hint.placeholder = "share some text";
    hint.type = 'text'
    hint.onkeydown = function(event){sharetexty(event)};
    hint.id = "inputtext";
    //parent.appendChild(hint);
               parent = document.getElementById("buttonfirst")   
              var hint = document.createElement("button");
    hint.innerHTML = "go to main page";
        hint.id = "button2"
    var r = document.getElementById("postarea")
    r.innerHTML = "Your Posts"
    hint.onclick = function(){goToMainPage()};
    //parent.appendChild(hint);
        socket.emit('giveUsername', '')
        //socket.emit('givetestdata','')
    }
});
socket.on('thisistheusername', function(data){
obj = document.getElementById("myUsername")
obj.innerHTML = data + "'s Page"
userpage = data
    socket.emit('givemepage',data)   
});
function setusername()
{
socket.emit('giveUsername', '')
console.log("this works")
}
function setoverallscore()
{
socket.emit('giveoverallscore', '')
}
function hexToBase64(str) {
    return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
}
