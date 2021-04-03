// Assign the data from `data.js` to a descriptive variable
var sightings = data;

// Select the button
var button = d3.select("#button");

// Select the form
var form = d3.select("#form");

// Create event handlers 
button.on("click", runEnter);
form.on("submit",runEnter);

//Populate Search List of Values
fillLOV("sighting-city");
fillLOV("sighting-state");
fillLOV("sighting-country");
fillLOV("sighting-shape");

// Fill List Of Values (<select> elements)
// with column values from data.
function fillLOV(elementID) {

  let selectList = [];

  switch (elementID) { 
    case "sighting-city" : 
      selectList = sightings.map ( (sighting) => sighting.city);
      break;
    case "sighting-state":
      selectList = sightings.map ( (sighting) => sighting.state);
      break;
    case "sighting-country":
      selectList = sightings.map ( (sighting) => sighting.country);
      break;
     case "sighting-shape":
      selectList = sightings.map ( (sighting) => sighting.shape);
      break; 
  }

  //Get a handle to the <select> element
  let selectElement = d3.select(`#${elementID}`);
  
  //Create the list of distinct elements
  //by filtering the values in the selectList
  const distinct = (value, index, self) => {
    return self.indexOf(value) === index; 
  }
  let distinctValues = selectList.filter(distinct);
  //Sort list 
  distinctValues.sort();
  //Append default value
  distinctValues.unshift(" ");

  //Clear all options
  selectElement.selectAll("option").remove();
  
  //Append the distinct values to the <select> 
  distinctValues.forEach ( (value) => {
     selectElement.append("option").text(value); 
  })
}

// Complete the event handler function for the form
function runEnter() {

  // Prevent the page from refreshing
  d3.event.preventDefault();
  
  // Select the start date's input element and get the raw HTML node
  var inputElement = d3.select("#sighting-date-start");
  // Get the value property of the search start date element
  var searchStartStr = inputElement.property("value");
  console.log(`Search Start Date = ${searchStartStr}`);

  // Select the end date's input element and get the raw HTML node
  inputElement = d3.select("#sighting-date-end");
  // Get the value property of the search start date element
  var  searchEndStr = inputElement.property("value");
  console.log(`Search End Date   = ${searchEndStr}`);

  // Get a handle to the City list of Values element
  inputElement = d3.select("#sighting-city");
  // Get the value of the list of values
  var searchCity =  inputElement.property("value");

  // Get a handle to the State list of Values element
  inputElement = d3.select("#sighting-state");
  // Get the value of the list of values
  var searchState =  inputElement.property("value");

  // Get a handle to the Country list of Values element
  inputElement = d3.select("#sighting-country");
  // Get the value of the list of values
  var searchCountry =  inputElement.property("value");

  // Get a handle to the shape list of Values element
  inputElement = d3.select("#sighting-shape");
  // Get the value of the list of values
  var searchShape =  inputElement.property("value");

  console.log(`${searchStartStr}, ${searchEndStr}, ${searchCity}, ${searchState}, ${searchCountry}, ${searchShape}`);

  var filteredData = sightings.filter( sighting => {
    
    //Convert date strings to date type objects so comparison can be done.
    //Start by converting the sighting datetime to a Date object.

    var sightingDate      = toDate(sighting.datetime);
    var searchStartDate   = searchStartStr ? toDate(searchStartStr) : toDate("01/01/0000");
    var searchEndDate     = searchEndStr   ? toDate(searchEndStr)   : toDate("12/31/9999");
    
    console.log( 
          (sightingDate     >=  (searchStartDate ?  searchStartDate : sightingDate ))
      &&  (sightingDate     <=  (searchEndDate   ? searchEndDate : sightingDate))
      &&  (sighting.city    === (searchCity      ? searchCity    : sighting.city))
      &&  (sighting.state   === (searchState     ? searchState   : sighting.state))
      &&  (sighting.country === (searchCountry   ? searchCountry : sighting.country))
      &&  (sighting.shape   === (searchShape     ? searchShape   : sighting.shape))
    );

     return( (sightingDate >=  (searchStartDate ?  searchStartDate : sightingDate ))
     &&  (sightingDate     <=  (searchEndDate   ? searchEndDate : sightingDate))
     &&  (sighting.city    === (searchCity      ? searchCity    : sighting.city))
     &&  (sighting.state   === (searchState     ? searchState   : sighting.state))
     &&  (sighting.country === (searchCountry   ? searchCountry : sighting.country))
     &&  (sighting.shape   === (searchShape     ? searchShape   : sighting.shape))
   );
   
  });

  //Select the table body element
  var sightingsTable = d3.select(".table.table-striped>tbody");
  // Remove any children from the table to
  sightingsTable.html("");
  
  //For each element in filteredData, append a row to the table body
  filteredData.forEach( (row) => { 
    let table_row = sightingsTable.append("tr");
    table_row.append("td").text(row.datetime); 
    table_row.append("td").text(row.city); 
    table_row.append("td").text(row.state); 
    table_row.append("td").text(row.country); 
    table_row.append("td").text(row.shape); 
    table_row.append("td").text(row.durationMinutes); 
    table_row.append("td").text(row.comments); 
  });

}

// Utility Function
function toDate( dateString ){
    let sightingDateArray = dateString.split("/");
    let sightingMonth     = parseInt(sightingDateArray[0]) - 1;
    let sightingDay       = sightingDateArray[1];
    let sightingYear      = sightingDateArray[2];
    let sightingDate      = new Date( sightingYear, sightingMonth, sightingDay);
    return sightingDate; 
}
