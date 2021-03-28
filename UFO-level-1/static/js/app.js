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
    var sightingDateArray = sighting.datetime.split("/");
    var sightingMonth     = parseInt(sightingDateArray[0]) - 1;
    var sightingDay       = sightingDateArray[1];
    var sightingYear      = sightingDateArray[2];
    var sightingDate      = new Date( sightingYear, sightingMonth, sightingDay);

    var searchStartDateArray   = searchStartStr.split("/");
    var searchStartMonth       = parseInt(searchStartDateArray[0]) - 1;
    var searchStartDay         = searchStartDateArray[1];
    var searchStartYear        = searchStartDateArray[2];
    var searchStartDate        = new Date( searchStartYear, searchStartMonth, searchStartDay);
    
    var searchEndDateArray   = searchEndStr.split("/");
    var searchEndMonth       = parseInt(searchEndDateArray[0]) - 1;
    var searchEndDay         = searchEndDateArray[1];
    var searchEndYear        = searchEndDateArray[2];
    var searchEndDate        = new Date( searchEndYear, searchEndMonth, searchEndDay);
    
    // console.log(sightingDate);
    // console.log(searchStartDate);
    // console.log(searchEndDate);
    
    return( (sightingDate >= searchStartDate) && (sightingDate <= searchEndDate) ); 

  });

  console.log(filteredData);

  // BONUS: Calculate summary statistics for the age field of the filtered data

  // First, create an array with just the age values
  //var ages = filteredData.map(person => person.age);

  // Next, use math.js to calculate the mean, median, mode, var, and std of the ages
  // var mean = math.mean(ages);
  // var median = math.median(ages);
  // var mode = math.mode(ages);
  // var variance = math.variance(ages);
  // var standardDeviation = math.std(ages);

  // Then, select the unordered list element by class name
  //var list = d3.select(".summary");

  // remove any children from the list to
  //list.html("");

  // append stats to the list
  //list.append("li").text(`Mean: ${mean}`);
  // list.append("li").text(`Median: ${median}`);
  // list.append("li").text(`Mode: ${mode}`);
  // list.append("li").text(`Variance: ${variance}`);
  // list.append("li").text(`Standard Deviation: ${standardDeviation}`);
};
