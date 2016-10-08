'use strict';

var storeHours = ['6:00am','7:00am', '8:00am', '9:00am', '10:00am', '11:00am','12:00pm','1:00pm','2:00pm','3:00pm','4:00pm', '5:00pm','6:00pm', '7:00pm', '8:00pm'];

var round = function (number, precision) {
  return parseFloat(number.toFixed(precision));
};

var calcRandomCustNumber = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var allCoffeeLocations = [];
function Coffeelocation(location, custmin, custmax, averageCupsPerCust, averagePoundsPerCust) {
  this.location = location;
  this.custmin = custmin;
  this.custmax = custmax;
  this.averageCupsPerCust = averageCupsPerCust;
  this.averagePoundsPerCust = averagePoundsPerCust;
  this.custPerHour = [];
  this.custPerDay = 0;
  this.cupsPerHour = [];
  this.cupsPerDay = 0;
  this.toGoPoundsPerHour = [];
  this.toGoPoundsPerDay = 0;
  this.beansNeededHourlyToMakeCup = [];
  this.beansPerDay = 0;
  this.totalPoundNeededDaily = 0;
  this.staffPerHour = [];
  allCoffeeLocations.push(this);
}

Coffeelocation.prototype.generateCustNumber = function() {
  for (var i = 0; i < storeHours.length; i++) {
    this.custPerHour.push(calcRandomCustNumber(this.custmin, this.custmax));
    this.custPerDay += this.custPerHour[i];
  }
};

Coffeelocation.prototype.generateCupsNumber = function() {
  for (var i = 0; i < storeHours.length; i++) {
    this.cupsPerHour.push(round((this.custPerHour[i] * this.averageCupsPerCust),1));
    round((this.cupsPerDay += this.cupsPerHour[i]),1);
  }
};

Coffeelocation.prototype.generatePoundsNumber = function() {
  for (var i = 0; i < storeHours.length; i++) {
    this.toGoPoundsPerHour.push(round((this.custPerHour[i] * this.averagePoundsPerCust),2));
    this.toGoPoundsPerDay += this.toGoPoundsPerHour[i];
  }
};

Coffeelocation.prototype.generateBeanNumber = function() {
  for (var i = 0; i < storeHours.length; i++) {
    this.beansNeededHourlyToMakeCup.push(round((this.cupsPerHour[i] / 16),1));
    round((this.beansPerDay += this.beansNeededHourlyToMakeCup[i]),1);
  }
};

Coffeelocation.prototype.calcTotalPoundNeededDaily = function() {
  this.totalPoundNeededDaily = round((this.beansPerDay + this.toGoPoundsPerDay),1);
};

Coffeelocation.prototype.generateStaffNumber = function() {
  for (var i = 0; i < storeHours.length; i++) {
    this.staffPerHour.push((Math.ceil((round(this.custPerHour[i] / 30),1))));
  }
};

Coffeelocation.prototype.callAllTheThings = function() {
  this.generateCustNumber();
  this.generateCupsNumber();
  this.generatePoundsNumber();
  this.generateBeanNumber();
  this.calcTotalPoundNeededDaily();
  this.generateStaffNumber();
};

new Coffeelocation('Pike Place', 14, 35, 1.2, 0.34);
new Coffeelocation('Capitol Hill', 12, 28, 3.2, 0.03);
new Coffeelocation('Seattle Public Library', 9, 45, 2.6, 0.02);
new Coffeelocation('South Lake Union', 5, 18, 1.3, 0.04);
new Coffeelocation('Sea-Tac Airport', 28, 44, 1.1, 0.41);

function makeTheMagic() {
  for (var i = 0; i < allCoffeeLocations.length; i++) {
    allCoffeeLocations[i].callAllTheThings();
  }
};

makeTheMagic();

function makeFirstRow() {
  var parentHeader = document.getElementById('header-row');
  for (var i = 0; i < storeHours.length; i++) {
    var childHeader = document.createElement('th');
    childHeader.textContent = storeHours[i];
    parentHeader.appendChild(childHeader);
  }
};

makeFirstRow();

function makeOtherRows() {
  var coffeeRow = document.getElementById('data-table');
  for (var i = 0; i < allCoffeeLocations.length; i++) {
    var makeRow = document.createElement('tr');
    makeRow.setAttribute = 'rowsID';
    makeRow.textContent = makeCells();
    coffeeRow.appendChild(makeRow)
  }
 function makeCells() = {
var firstCellInData = document.getElementById('rowsID');
var makeFirstCell = document.createElement('td')
makeFirstCell.te
 var coffeeData = document.getElementById('rowsID');
    for (var x = 0; x < storeHours.length; x++) {
      var makeCell = document.createElement('td');
      makeCell.textContent = allCoffeeLocations[x].prototype.toGoPoundsPerHour + allCoffeeLocations[x].prototype.beansNeededHourlyToMakeCup;
      //append cell
    }
    coffeeData.appendChild(makeCell);
  }
  coffeeRow.appendChild(makeRow);
};
makeBeanTable();
