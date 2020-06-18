$(document).ready(function () {
    

console.log("link test");

var currentDate = moment().format("Do[ of] MMMM[,] YYYY");
var currentDay = moment().format('[Today is a ]dddd');
var currentTime = moment().format('[It is] hh:mm a');
var currentHour = moment().format('h a');
var idkMan = moment().format('L');


console.log(moment());
console.log(currentDate);
console.log(currentDay);
console.log(currentTime);
console.log(currentHour);
console.log(idkMan);


$(date).text(currentDate);
$(day).text(currentDay);
$(time).text(currentTime);






});