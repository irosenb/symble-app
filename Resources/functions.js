/**
 * @author isaac rosenberg
 * Include functions here
 * to save space + organize.
 **/

//this replaces dashes with spaces, returning spaced name
function nodash(name) {
	//rplc variable for storing result 
	var rplc = name.replace(/-/g,' ');
	
	return rplc;
}

//this installs the database, returning the resulting db object.
function installdb() {
	
	if (Ti.Platform.name === 'android' && Ti.Filesystem.isExternalStoragePresent()) {
      var db = Ti.Database.install('nounquizdb', Ti.Filesystem.externalStorageDirectory + 'path' + Ti.Filesystem.separator + 'to' + Ti.Filesystem.separator + 'symble');
    }
  
    else {
    	var db = Ti.Database.install('nounquizdb', 'symble');
    }
    
}
//this function gets path of img from database, returning img path.
function fetchImg(img) {
	var name = "img/" + img + ".png";
	
	return name;
}

//this function returns whether two inputs, regardless of case, are equal.
function compareNoun(name, input) {
	//comparing string w/o case
	var areEqual = name.toLowerCase() === input.toLowerCase();
	
	return areEqual;
}

//adding something to the db. 
function addTodb(name) {
var request = Titanium.Network.createHTTPClient();
var url = "http://localhost/mobile.php?action=add_user&email="+email+"&user="+user+"&pass="+pass;

xhr.open('GET', <server_url+php_uri>);
xhr.send(); 
}

function registerUser(email, user, pass){
  var request = Titanium.Network.createHTTPClient();
  request.open("GET",url);

/* //leave this for later  
xhr.onload = function(){
	    var json = JSON.parse(this.responseText);
	    if (!json) { 
	        Titanium.API.info('Error - Null return!'); 
	        return;
	    }
	    var json = json.symble;
	    var pos;
	    for(pos=0; pos < jsonsymble.length; pos++){
	        //Ti.UI.info(json[pos]._name, json[pos].colour_name);
    	}
	};
*/



//this function renders a index sheet, for browsing icons. 
function nounIndex(rows) {
	for (var i = 1; i < rows.rowCount + 1; i++) {
		var name = rows.field(0);
		
		var image = Ti.UI.createImageView({
			image: fetchImg(name),
			width: 64,
			height: 64,
			center:{
				//center.x: spacing 30 apart, reset every 5 iterations.
				//center.y: spacing 10 apart from previous row, increase every 5 times 
				x: (((i - 1) % 5) * 64) + 30,
				y: (Math.ceil(i / 5) * 64) + 10 * Math.ceil(i / 5) 
			},
			id: i 
		});
		Ti.API.log("image x: " + image.center.x);
		Ti.API.log("image y: " + image.center.y);
		Ti.API.log(image.id);
		Ti.API.log("----------------");
		var id = 1;
		
		image.addEventListener('singletap', game);
		indexTest.add(image);
		rows.next();
	}
	
	return image.center.y + 50;
}

function game(e) { 
	db2 = Ti.Database.open('symble');
	Ti.API.log("object:" + e.source);
	Ti.API.log("object var: " + e.source.id)
	var rows = db2.execute('SELECT * FROM imgs');
	Ti.API.log(rows.rowCount);
	backButton.page = 'quiz';
	
	for (var i = 1; i < e.source.id; i++) {
		rows.next();
	}
	
	var name = rows.field(0);
	var path = fetchImg(name);
	Ti.API.log(path);
	nounView.image = path;
	
	var button2 = Ti.UI.createButton({
		title:'Check',
		borderRadius: 0,
		font: {size:24},
		bottom: 40,
		width: 'auto',
		height: 'auto' 
	});
	
	win2.add(button2);
	win2.add(label2);
	win2.add(textField);	
	win2.add(nounView);
	win2.add(backButton);
	
	win1.add(win2);
	button2.addEventListener('singletap', function(e) {
		userInput = textField.value;
		name = nodash(name);
		equal = compareNoun(name, userInput);
		Ti.API.log("Equal:" + equal);
		
		var color = "";
		var shadow = "";
		var isNext = '';
		if (equal) {
			color = "#0dbd30";
			shadow = "#0a9827";
			label2.text = "Correct! Swipe for next.";
			
			var i = 1;
			win2.addEventListener('swipe', function(e) {
				if (e.direction == 'left' && equal) {
					Ti.API.log("next icon");
					
					rows.next();
					name = rows.field(0);
					
					var noun = fetchImg(name);
					nounView.image = noun;
					label2.text = "Guess";
					label2.color = "#999";
					nounView.backgroundColor = "#ffff";
					label2.shadowColor = "#fff";
					
					textField.value = "";
					Ti.API.log(rows.field(0));
					equal = false;
					
				}
			});
		}
		else {
			color = "#bd300d";
			shadow = "#98270a";
			label2.text = "Try Again!";	
		}
		
		nounView.backgroundColor = color;
		label2.color = color;
		label2.shadowColor = color;
		
	});
}

function back(e) {
	Ti.API.log('clicked.');
	switch (e.source.page) {
		case "index":
			win1.remove(indexScroll);
			win1.remove(backButton);
			win1.remove(scrollLabel);
			break;
			
		case "quiz":
			win1.remove(win2);
			win1.add(backButton);
			equal = false;
			textField.value = "";
			label2.text = "Guess";
			label2.color = "#999";
			label2.shadowColor = "#fff";
			button2 = null;
			nounView.backgroundColor = "#ffff";
			backButton.page = "index";
			break;
	}; 
}

