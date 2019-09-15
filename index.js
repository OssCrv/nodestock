
const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');

const PORT = process.env.port || 5000;


//Create call_API function
function call_api(finishedAPI){
// API KEY pk_25028e0043ef489ba145026dd2a4e0bf
request('https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_25028e0043ef489ba145026dd2a4e0bf', {json: true}, (err, res, body) =>{
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

//Set handlebars routes
app.get('/', function (req, res) {
	call_api(function(doneAPI){
		res.render('home',{
    	stock: doneAPI
    })
	});
});

//Create about page route
app.get('/about.html', function (req, res) {
    res.render('about');
});


// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('Server listening on port'))