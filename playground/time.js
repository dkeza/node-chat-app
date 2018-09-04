var moment = require('moment');

var date = moment();

console.log(date.format('Do MMM YYYY'));

console.log(date.format('H:mm'));

var myTimestamp = moment().valueOf();
console.log(myTimestamp);