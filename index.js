
const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;
const host = '0.0.0.0';

// Use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));


//Create call_API function
function call_api(finishedAPI, ticker){
// API KEY pk_25028e0043ef489ba145026dd2a4e0bf
if(ticker == null){
	ticker = "FB";
}
request('https://cloud.iexapis.com/stable/stock/'+ ticker +'/quote?token=pk_25028e0043ef489ba145026dd2a4e0bf', {json: true}, (err, res, body) =>{
	if (err){return console.log(err);}
	if(res.statusCode === 200){
		//console.log(body);
		finishedAPI(body);
		};
	});
};




//Set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "hello there, this is other stuff!";

//Set handlebars GET index route
app.get('/', function (req, res) {
	call_api(function(doneAPI){
		res.render('home',{
    	stock: doneAPI
    	});
	});
});


//Set handlebars POST index route
app.post('/', function (req, res) {
	call_api(function(doneAPI){
		//posted_stuff = req.body.stock_ticker;
		res.render('home',{
    	stock: doneAPI,
    	});
	}, req.body.stock_ticker);

});



//Create about page route
app.get('/about.html', function (req, res) {
    res.render('about');
});


// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(process.env.PORT || 5000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});