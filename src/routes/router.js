var express = require('express')
var router = express.Router()
var sqlite3 = require('sqlite3').verbose();

const path = require('path')
const dbfile = path.resolve(__dirname, '../database/us-census.db')

// retrieve all available data from database
router.get('/getVariables', function (req, res, next) {
	var result = [];

	var db = new sqlite3.Database(dbfile, sqlite3.OPEN_READWRITE, (err) => {
	  	 
	  	if (err) {
	  		return console.error(err.message);
	  	}

  		console.log('server.js get Variables API: Connected to the database.');

		db.all("PRAGMA table_info(census_learn_sql)", function(err, rows) {
			rows.forEach(function (row,index) {
	  			result.push({ text: row.name , value: index });	
			})

			res.json(result).end();
	  	});	  
	});	
})

// Given one data, retrieve all data associated to the var request.
// 1. all differents values of the data
// 2. the count of each values
// 3. the average age of people associated to each set of values
router.get('/getData/:varid', function (req, res, next) {

	var displayLimit = 100;

	var varid = decodeURI(req.params.varid);

	var db = new sqlite3.Database(dbfile, sqlite3.OPEN_READWRITE, (err) => {
	  	 
	  	if (err) {
	  		return console.error(err.message);
	  	}

  		var variableid = "\"" + varid + "\"";
  		var countId = "COUNT(" + variableid + ")";
  		var ageId = "AVG(age)";

		var sqlReq = "select " + variableid  + ","+ countId +"," + ageId
					+ " from census_learn_sql"
					+ " where " + variableid + " <>'NULL'"
					+ " group by " + variableid 
					+ " order by " + variableid + " DESC";
		console.log('server.js getData API : Request to the database.');
		db.all(
			sqlReq,
			function(err, rows) {
				var result = [];
				var count = 0;
				var age = 0;
				var nbLines = 0;
				// push json as this if no need to filter 100 data and display a special data for non-visible data
				// otherwise, treat result and format it
				rows.forEach(function (row,index) {
	  				if (index < displayLimit)
		  				result.push(row);
		  			else
		  			{
		  				nbLines++;
		  				age += row[countId] * row[ageId];
		  				count += row[countId];
		  			}	
	  			})

	  			if (nbLines != 0)
	  			{
	  				age = age/count;
	  				let text = "Other values (" + nbLines + ")";
	  				finalData ={};
	  				finalData[variableid] = text;
	  				finalData[countId] = count;
	  				finalData[ageId] = age;

	  				result.push(finalData);
	  			}
	  			
				res.json(result).end();
			}
		);
	}); 
})

module.exports = router
