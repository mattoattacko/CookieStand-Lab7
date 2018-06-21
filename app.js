'use strict';

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

var allLocations = [];
var stotalCookiesByHour = 0;
var netTotal = 0;

function MakeLocation(name, minCustPerHour, maxCustPerHour, avgCookiesSoldPerHour) {
  this.name = name;
  this.minCustPerHour = minCustPerHour;
  this.maxCustPerHour = maxCustPerHour;
  this.avgCookiesSoldPerHour = avgCookiesSoldPerHour;
  //these are the questions we need to solve
  this.randCustByHour = [];
  this.randCookiesSoldByHour = [];
  this.totalCookies = 0;
  allLocations.push(this);
}
//use the MakeLocation.prototype to calc random customers per hour
MakeLocation.prototype.calcRanCustByHour = function () {
  for (var i = 0; i < hours.length; i++) {
    this.randCustByHour.push(Math.floor(Math.random() * (this.maxCustPerHour - this.minCustPerHour + 1)) + this.minCustPerHour);
  }
};
//use the MakeLocation.prototype to calc cookies sold per hour
MakeLocation.prototype.calcrandCookiesSoldByHour = function () {
  for (var j = 0; j < hours.length; j++) {
    this.randCookiesSoldByHour.push(Math.round(this.randCustByHour[j] * this.avgCookiesSoldPerHour));
    //average customers per hour * avg cookies per customer = cookies sold per hour
  }
};
//Calc total cookies per store at the end of the day
MakeLocation.prototype.calctotalCookies = function () {
  for (var k = 0; k < hours.length; k++) {
    this.totalCookies += this.randCookiesSoldByHour[k];
  }
};
function calcnetTotal() {
  for (var l = 0; l < allLocations.length; l++) {
    netTotal += allLocations[l].totalCookies;
  }
}

function newLocations() {
  new MakeLocation('First and Pike', 23, 65, 6.3);
  new MakeLocation('SeaTac Airport', 3, 24, 1.2);
  new MakeLocation('Seattle Center', 11, 38, 3.7);
  new MakeLocation('Capitol Hill', 20, 38, 2.3);
  new MakeLocation('Alki', 2, 16, 4.6);
}

//names of locations and amount of cookies sold per hour
function fillArray() {
  for (var m = 0; m < allLocations.length; m++) {
    allLocations[m].calcRanCustByHour();
    allLocations[m].calcrandCookiesSoldByHour();
    allLocations[m].calctotalCookies();
  }
}

// Table head maker
var tableHeadEl = document.getElementById('tableHead');
function tableHeadMaker(inputArray) {
  var trEl = document.createElement('tr');
  var emptyEl = document.createElement('th');
  trEl.appendChild(emptyEl);
  for (var n = 0; n < inputArray.length; n++) {
    var thEl = document.createElement('th');
    thEl.textContent = inputArray[n];
    trEl.appendChild(thEl);
  }
  var totalEl = document.createElement('th');
  totalEl.textContent = 'Total';
  trEl.appendChild(totalEl);
  tableHeadEl.appendChild(trEl);
}

function tableRowMaker(name, inputArray, totalCookies) {
  var tableRowEl = document.getElementById('tableBody');
  var trEl = document.createElement('tr');
  //creating an element calling only the name of the locations from the allLocations varaible
  var nameEl = document.createElement('td');
  nameEl.textContent = name;
  trEl.appendChild(nameEl);
  for (var o = 0; o < inputArray.length; o++) {
    var tdEl = document.createElement('td');
    tdEl.textContent = inputArray[o];
    trEl.appendChild(tdEl);
  }
  //creating an element calling only the total cookies at each location
  var totalCookiesEl = document.createElement('td');
  totalCookiesEl.textContent = totalCookies;
  trEl.appendChild(totalCookiesEl);
  //attach the table row element to our table
  tableRowEl.appendChild(trEl);
}

function fillData() {
  for (var p = 0; p < allLocations.length; p++) {
    tableRowMaker(allLocations[p].name, allLocations[p].randCookiesSoldByHour, allLocations[p].totalCookies);
  }
}

//Create Table Footer
function tableFootMaker(inputArray) {
  var tableFoot = document.getElementById('tableFoot');
  var trEl = document.createElement('tr');
  var textTotalEl = document.createElement('td');
  textTotalEl.textContent = 'Total';
  trEl.appendChild(textTotalEl);
  //for loops for days son!
  for (var q = 0; q < hours.length; q++) { 
  //for loop for the cookieSoldPerHour
    var hourlyTotal = 0;
    for (var r = 0; r < inputArray.length; r++) {
      hourlyTotal += inputArray[r].cookiesSoldPerHour[r];
    }
    var tdEl = document.createElement('td');
    tdEl.textContent = hourlyTotal;
    trEl.appendChild(tdEl);
  }
  //input array for netTotal

  var netTotalEl = document.createElement('td');
  netTotalEl.textContent = netTotal;
  trEl.appendChild(netTotalEl);
  tableFoot.appendChild(trEl);
}

//creating newLocations to populate into makeLocation that will push into allLocations
newLocations();
fillArray();
calcnetTotal();

tableHeadMaker(hours);
fillData();
tableFootMaker(allLocations);
headerRowMaker(hours);
dataRowMaker(firstAndPikeTable);
dataRowMaker(seatacAirportTable);
dataRowMaker(seattleCenterTable);
dataRowMaker(capitolHillTable);
dataRowMaker(alkiTable);
//consider a for loop for the hours
//create a th element
//give the th element some text content like hours [i];
//appendChild

//remember to put an "empty" <th></th> element at the top of the table to push the "6am" cell over to the right.