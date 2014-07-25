///**
// * Created by Madole on 25/07/2014.
// */
//(function() {
//    var car1 = {make: 'Vauxhall', model: 'Corsa', year: '2005'};
//    var car2 = {make: 'Bugatti', model: 'Veyron', year: '2014'};
//
//
//    var udpateCar = function(make, model, year) {
//        this.make = make;
//        this.model = model;
//        this.year = year;
//    };
//
//    udpateCar.call(car2, 'Mini', 'Cooper', '2014');
//    udpateCar.apply(car1, ['Vauxhal', 'Astra', '2014'])
//
//    console.log(car1); //{ make: 'Vauxhal', model: 'Astra', year: '2014' }
//    console.log(car2); //{ make: 'Mini', model: 'Cooper', year: '2014' }
//})()
//
//
//var addFirstFiveNumbers = function() {
//    var count = 0;
//    for(var i=0; i<=5; i++) {
//        count += i;
//    }
//    return count;
//}
//
//console.log(addFirstFiveNumbers())
//
//var addFirstSixNumbers = (function(){
//    var count = 0;
//    for(var j=0; j<=6; j++) {
//        count += j;
//    }
//    return count;
//})();
//
//console.log(addFirstSixNumbers);
//
//
//
//console.log('--------------------------------');
//
//
//(function() {
//    if(true) {
//        var x = 5;
//    }
//    console.log(x)
//})();
//
//(function() {
//    var x;
//    if(true) {
//        var x = 5;
//    }
//    console.log(x)
//})()
//
//


var x = 100;

function test() {
    if(false) {
        var x = 199;
    }
    console.log(x);
}

test();



var x = 100;

function test() {
    var x;
    if(false) {
        x = 199;
    }
    console.log(x);
}

test();
