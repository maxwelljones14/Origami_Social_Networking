
var imported = document.createElement('script');
var goodadress = true
var username = ''
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
socket.on('emailsent', function(data){
alert("Email sent succesfully")})
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
cookie = document.cookie
if(cookie.split(';')[0].split('_')[1] != '')
{
var deletebutton = document.getElementById("deletebutton")
deletebutton.style.display="none"
var uploadbutton = document.getElementById("uploadbutton")
uploadbutton.style.display="none"
var filetext = document.getElementById("filetext")
filetext.style.display = "none"
var fileinput = document.getElementById("fileinput")
fileinput.style.display = "none"
var contact = document.getElementById("contact")
fileinput.style.display = "none"
}
else
{
var deletebutton = document.getElementById("deletebutton")
deletebutton.style.display="inline"
var uploadbutton = document.getElementById("uploadbutton")
uploadbutton.style.display="inline"
var filetext = document.getElementById("filetext")
filetext.style.display = "inline"
var fileinput = document.getElementById("fileinput")
fileinput.style.display = "inline"
var contact = document.getElementById("contact")
fileinput.style.display = "inline"
}
var canvas = document.getElementById("canvas1");
canvas.style.display="none";
creasepatternfiles = data.creasepatternfiles;
var dropdown = document.getElementById("dropdownmenu")
dropdown.style.display="inline";
for(file in dropdown.children)
{
dropdown.remove(file);
}
if(creasepatternfiles.length == 1)
{
var option = document.createElement("option")
option.text = "No files yet"
dropdown.add(option)
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
        
});

function checkcookie()
{
    console.log(document.cookie)
    bigdata = document.cookie.split(';');
    if(bigdata[0].startsWith("name="))
    {
        data =bigdata[0].split('=')[1]
    }
        if (data.split('_')[1] != '')
        {
obj = document.getElementById("myUsername")
           datanew = data.split('_')[1]
       obj.innerHTML = datanew + "\'s Page"
       username = datanew
    userpage = datanew
    var canvas = document.getElementById("canvas1");
canvas.style.display="none";
var image = document.getElementById("img1");
image.style.display="none";
    socket.emit('givemepage',datanew)
        }
           else{
           datanew = data.split('_')[0]
           obj = document.getElementById("myUsername")
       obj.innerHTML =  datanew+ "\'s Page"
       username = datanew
    userpage = datanew
    var canvas = document.getElementById("canvas1");
canvas.style.display="none";
var image = document.getElementById("img1");
image.style.display="none";
    socket.emit('givemepage',datanew)  
    }
    
 
}
function getusers(data)
{
socket.emit('getusers','')    
}
socket.on('herearetheusers',function(data)
{
a = new Array()
parent = document.getElementById("userlist")
    child = document.createElement("UL")
count = 0
var x = document.createElement("li")
    x.style = "list-style-type:none"
for(item in data)
{

    var name = item
    var player = document.createElement("button");
    player.type = 'button'
    player.innerHTML = name ;
    player.className = 'w3-button w3-round-xxlarge'
player.onclick = function(){whoisit(this.id)};
player.id = name;

    x.appendChild(player)
    document.cookie = document.cookie.split('_')[0] + "_;" + document.cookie.split(';')[1];

    
}
parent.append(x)

});
function whoisit(data)
{
        
if(document.cookie.split('=')[1].split('_')[0] != data)
{
document.cookie = document.cookie.split('_')[0] + '_' + data + document.cookie.split('_')[1];
}
        window.location.href = 'csshome.html'
        userpage = data
        socket.emit('givemepage',data)   
        console.log(data)
}
function makeTheLogin()
{
    if (newuser == true)
    {
                   newuser = false;
               obj = document.getElementById("makeloginbutton")
               obj.innerHTML = "Make new account"
             obj = document.getElementById("loginbutton")
               obj.innerHTML = "Log in"
       obj = document.getElementById("Userprompt")
    obj.style.display = "none"
    obj = document.getElementById("Passprompt")
    obj.style.display = "none"
         obj = document.getElementById("Userallowed")   
    obj.style.display = "none"

    }
    else
    {
                      obj = document.getElementById("makeloginbutton")
               obj.innerHTML = "Use existing account"
               obj = document.getElementById("loginbutton")
               obj.innerHTML = "Create Account"
    newuser = true;
    obj = document.getElementById("Userprompt")
    obj.innerHTML = 'Enter New UserName'
        obj.style.display = "inline"

    obj = document.getElementById("Passprompt")
    obj.innerHTML = 'Enter New Password'
    obj.style.display = "inline"
             obj = document.getElementById("Userallowed")   
    obj.style.display = "inline"
    obj.innerHTML = ""

    }
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
socket.emit("storevalue", {"value":boj.value, name:username})
boj.value = ""
}
}
function upload()
{
var info = document.getElementById("fileinput")
if(info.files.length == 0)
{
alert("No file chosen")
}
    else{

        var reader = new FileReader();
		var filename = info.files[0];
        reader.readAsText(filename);
		var jsonstorage = reader.result;
		infopiece = {"name":username, "file": filename.name, "info":filename};
		socket.emit("hereisjson", infopiece);

		var dropdown = document.getElementById("dropdownmenu")
		var option = document.createElement("option")
option.text = filename.name.slice(0,-5)
option.value = filename.name
dropdown.add(option)
}
        
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
    socket.emit('deletethisfile', [username, currentdesign])
    console.log(currentdesign)
    var canvas = document.getElementById("canvas1");
	var context = canvas.getContext("2d");
	context.clearRect(0,0,canvas.width,canvas.height)
	for(var x =0;x<drop.length;x++)
	{
	if(drop.options[x].value == currentdesign){
	 drop.remove(x)
	}
	}
	var canvas = document.getElementById("canvas1");
canvas.style.display="none";
	var image = document.getElementById("img1");
image.style.display="none";
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

function checkadress(data)
{
    var regex = /^[a-zA-Z0-9]@*.*$/
if (checkadress == true && badregex)
{
    checkadress = false
    obj = document.getElementById(mailbutton)
    obj.innerHTML = "Invalid Adress"
}
else if(goodregex)
{
obj = document.getElementById(mailbutton)
obj.innerHTML = "Send Message"
}
}
}
function sendemail(data)
{

// namee = document.getElementById('emailname')
// textt = document.getElementById('emailadress')
// subjectt = document.getElementById('emailsubject')
// commentt = document.getElementById('emailcomment')
// socket.emit('emailthis', {name:namee.value, adress:textt.value, subject:subjectt.value, comment:commentt.value})
    
}
function switchaccounts(data)
{
     bigdata = document.cookie.split(';');
        data =bigdata[0].split('=')[1]
    var date = new Date()
    var expires = 'expires='
    date.setDate(date.getDate() - 50)
    expires+=date.toGMTString()
    document.cookie="name="+data+'; '+expires
    location.reload()
}
function checkcookielogin(data)
{
    bigdata = document.cookie.split(';');
    if(bigdata[0].startsWith("name="))
    {
        data =bigdata[0].split('=')[1].split('_')[0]
        var filetext = document.getElementById("Userinput")
filetext.style.display="none";
        var filetext = document.getElementById("Passinput")
filetext.style.display="none";
        var filetext = document.getElementById("makeloginbutton")
filetext.style.display="none";
        var filetext = document.getElementById("loginbutton")
filetext.style.display="none";
 var filetext = document.getElementById("continueAs")
 filetext.innerHTML = "Continue As " + data
filetext.style.display="inline";
 var filetext = document.getElementById("switchaccounts")
filetext.style.display="inline";
        
    }
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
  if(part1.indexOf('_')!=-1)
  {
    alert("illegal character in username  ---> _")
  }
  else
  {
  hash = MD5(part2)
  console.log(hash)
  obj = {username:part1, password: hash}
  socket.emit('usertakenornah',obj)   
 }
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
    var date = new Date()
    var expires = 'expires='
    date.setDate(date.getDate() + 1)
    expires+=date.toGMTString()
    document.cookie="name="+part1+'_; '+expires
    window.location.href = 'csshome.html'
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
var date = new Date()
    var expires = 'expires='
    date.setDate(date.getDate() + 1)
    expires+=date.toGMTString()
    document.cookie="name="+part1+'_; '+expires
    window.location.href = 'csshome.html'
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
