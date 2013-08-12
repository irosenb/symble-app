// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

Titanium.include('functions.js');

// create tab group

var db2 = installdb();

//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({
	title:"test",  
    backgroundColor:'#fff',
	navBarHidden:true,
	tabBarHidden:true
});

var label1 = Titanium.UI.createLabel({
	color:'#999',
	text:'Symble',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

var button1 = Ti.UI.createButton({
	title:'Start',
	borderRadius: 0,
	font: {size:36},
	bottom: 40,
	width: 'auto',
	height: 'auto' 
});

var backButton = Ti.UI.createButton({ 
	top:'1%',
	backgroundImage:"img/ui/back3.png",
	left: '1%',
	width: 45,
	height: 25,
	page: '',
});

var scrollLabel = Ti.UI.createLabel({
	color: "#999",
	text: "Choose",
	top: "1%",
	textAlign: "center",
	font: {fontSize:20,fontFamily:'Helvetica Neue'},
	width: "auto"
});

win1.add(label1);
win1.add(button1);

//
// third window with quiz part 
//

var nounView = Ti.UI.createImageView({
		width: 128,
		height: 128,
		top: '8.5%',
		textAlign: 'center'
	});
	
	var win2 = Titanium.UI.createView({  
	    title:'Tab 2',
	    backgroundColor:'#fff',
	    navBarHidden:true,
	    tabBarHidden:true
	});

	var label2 = Titanium.UI.createLabel({
		color:'#999',
		text:'Guess',
		shadowOffset: {x:1, y:1},
		font:{fontSize:20,fontFamily:'Helvetica Neue'},
		textAlign:'center',
		width:'auto',
		top:'1%'
	});

	var button2 = Ti.UI.createButton({
		title:'Check',
		borderRadius: 0,
		font: {size:24},
		bottom: 40,
		width: 'auto',
		height: 'auto' 
	});

	var textField =Ti.UI.createTextField({
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		top: '40%',
		width: '70%' 
	});


var indexScroll = Ti.UI.createScrollView({
	contentWidth: 'auto',
	contentHeight: 'auto',
	scrollType: 'vertical',
	showVerticalScrollIndicator: true,
	Height: '90%',
	bottom: '1%',
	Width: Ti.UI.FILL,
	backgroundColor:"#fff",
	
});

var indexTest = Ti.UI.createView({
  backgroundColor:'#fff',
  width: 'auto'
})

//end quiz part 

win1.open();

button1.addEventListener('click', function(e) {
	db2 = Ti.Database.open('symble');
	var rows = db2.execute('SELECT * FROM imgs');
	Ti.API.log(rows.rowCount);
	
	//create noun index, show
	indexTest.height = nounIndex(rows);
	indexScroll.add(indexTest);
	backButton.page = 'index';
	win1.add(indexScroll);
	win1.add(backButton);
	win1.add(scrollLabel);
	backButton.addEventListener('singletap', back);	
	
});
