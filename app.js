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
  this.totalStaff = 0;
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
    this.staffPerHour.push(Math.ceil(round((this.custPerHour[i] / 30),1)));
    this.totalStaff += this.staffPerHour[i];
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
  var dailyTotal = document.createElement('th');
  dailyTotal.textContent = 'Daily Totals';
  parentHeader.appendChild(dailyTotal);
  for (var i = 0; i < storeHours.length; i++) {
    var childHeader = document.createElement('th');
    childHeader.textContent = storeHours[i];
    parentHeader.appendChild(childHeader);
  }
};

makeFirstRow();

function makeOtherRows(cof) {
  var coffeeRow = document.getElementById('data-table');
  var makeRow = document.createElement('tr');
  makeRow.textContent = firstCell;

  var firstCell = document.createElement('td');
  firstCell.textContent = cof.location;
  makeRow.appendChild(firstCell);

  var makeSecondCell = document.createElement('td');
  makeSecondCell.textContent = cof.totalPoundNeededDaily;
  makeRow.appendChild(makeSecondCell);

  for (var x = 0; x < storeHours.length; x++) {
    var makeCell = document.createElement('td');
    makeCell.textContent = round((cof.toGoPoundsPerHour[x] + cof.beansNeededHourlyToMakeCup[x]),2);
    makeRow.appendChild(makeCell);
  }
  coffeeRow.appendChild(makeRow);
}

function makeBeanTable(arr) {
  for (var index in arr) {
    makeOtherRows(arr[index]);
  }
}
makeBeanTable(allCoffeeLocations);

var totalsObject = {
  totalBeansInStores: [],
  totalBeansInCompany: 0,
};
totalsObject.calcTotalBeansInStores = function() {
  for (var z = 0; z < storeHours.length; z++) {
    var y = 0;
    for (var l = 0; l < allCoffeeLocations.length; l++) {
      y += (allCoffeeLocations[l].toGoPoundsPerHour[z] + allCoffeeLocations[l].beansNeededHourlyToMakeCup[z]);
    }
    this.totalBeansInStores.push(y);
  }
};
totalsObject.calcTotalBeansInStores();

function makeLastRow() {
  var parentLastRow = document.getElementById('footer');
  var childLastRow = document.createElement('tr');
  childLastRow.textContent = cell1;
  var cell1 = document.createElement('td');
  cell1.textContent = 'Totals';
  childLastRow.appendChild(cell1);
  var cell2 = document.createElement('td');
  for (var s = 0; s < storeHours.length; s++) {
    totalsObject.totalBeansInCompany += totalsObject.totalBeansInStores[s];
  };
  cell2.textContent = totalsObject.totalBeansInCompany;
  childLastRow.appendChild(cell2);
  for (var total = 0; total < storeHours.length; total ++) {
    var totalsCell = document.createElement('td');
    totalsCell.textContent = round((totalsObject.totalBeansInStores[total]), 1);
    childLastRow.appendChild(totalsCell);
  }
  parentLastRow.appendChild(childLastRow);
};
makeLastRow();

function makeFirstRow2() {
  var parentHeader2 = document.getElementById('header-row2');
  var dailyTotal2 = document.createElement('th');
  dailyTotal2.textContent = 'Daily Employee Totals';
  parentHeader2.appendChild(dailyTotal2);
  for (var i = 0; i < storeHours.length; i++) {
    var childHeader2 = document.createElement('th');
    childHeader2.textContent = storeHours[i];
    parentHeader2.appendChild(childHeader2);
  }
};

makeFirstRow2();

function makeOtherRows2(coffee) {
  var coffeeRow2 = document.getElementById('employee-table');
  var makeRow2 = document.createElement('tr');
  makeRow2.textContent = firstCell2;

  var firstCell2 = document.createElement('td');
  firstCell2.textContent = coffee.location;
  makeRow2.appendChild(firstCell2);

  var makeSecondCell2 = document.createElement('td');
  makeSecondCell2.textContent = coffee.totalStaff;
  makeRow2.appendChild(makeSecondCell2);

  for (var x = 0; x < storeHours.length; x++) {
    var makeCell2 = document.createElement('td');
    makeCell2.textContent = coffee.staffPerHour[x];
    makeRow2.appendChild(makeCell2);
  }
  coffeeRow2.appendChild(makeRow2);
}

function makeStaffTable(arr) {
  for (var index in arr) {
    makeOtherRows2(arr[index]);
  }
}
makeStaffTable(allCoffeeLocations);

var totalsObject2 = {
  totalStaffInStores: [],
  totalStaffInComp: 0,
};

totalsObject2.calcTotalStaffInStores = function() {
  for (var z = 0; z < storeHours.length; z++) {
    var y = 0;
    for (var l = 0; l < allCoffeeLocations.length; l++) {
      y += allCoffeeLocations[l].staffPerHour[z];
    }
    this.totalStaffInStores.push(y);
  }
};
totalsObject2.calcTotalStaffInStores();

function makeLastRow2() {
  var parentLastRow2 = document.getElementById('footer2');
  var childLastRow2 = document.createElement('tr');
  childLastRow2.textContent = cellc;
  var cellc = document.createElement('td');
  cellc.textContent = 'Totals';
  childLastRow2.appendChild(cellc);
  var celld = document.createElement('td');
  for (var p = 0; p < storeHours.length; p++) {
    totalsObject2.totalStaffInComp += totalsObject2.totalStaffInStores[p];
  };
  celld.textContent = totalsObject2.totalStaffInComp;
  childLastRow2.appendChild(celld);
  for (var total = 0; total < storeHours.length; total ++) {
    var totalsCell2 = document.createElement('td');
    totalsCell2.textContent = round((totalsObject2.totalStaffInStores[total]), 1);
    childLastRow2.appendChild(totalsCell2);
  }
  parentLastRow2.appendChild(childLastRow2);
}
makeLastRow2();
