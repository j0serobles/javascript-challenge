// Assign the data from `data.js` to a descriptive variable
var sightings = data;

// Select the button
var button = d3.select("#button");

// Select the form
var form = d3.select("#form");

// Create event handlers 
button.on("click", runEnter);
form.on("submit",runEnter);

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

  console.log(`Search End Date   = ${searchEndStr}`  );
  
  console.log(sightings);

  var filteredData = sightings.filter( sighting => {
    
    //Convert date strings to date type objects so comparison can be done.
    //Start by converting the sighting datetime to a Date object.

    var sightingDate      = toDate(sighting.datetime)
    var searchStartDate   = toDate(searchStartStr);
    var searchEndDate     = toDate(searchEndStr);
    
     console.log(sightingDate);
     console.log(searchStartDate);
     console.log(searchEndDate);
    
    return( (sightingDate >= searchStartDate) && (sightingDate <= searchEndDate) ); 

  });

  console.log(filteredData);

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

};

// Utility Function
function toDate( dateString ){
    let sightingDateArray = dateString.split("/");
    let sightingMonth     = parseInt(sightingDateArray[0]) - 1;
    let sightingDay       = sightingDateArray[1];
    let sightingYear      = sightingDateArray[2];
    let sightingDate      = new Date( sightingYear, sightingMonth, sightingDay);
    return sightingDate; 
}
