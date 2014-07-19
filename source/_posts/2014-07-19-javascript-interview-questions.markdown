---
layout: post
title: "Javascript interview questions"
date: 2014-07-19 18:29:09 +1000
comments: true
categories: ['Javascript', 'Interview questions']
---

##Javascript Interview Questions

I was asked recently by a friend of mine to come up with a list of interview questions that you can get asked during
a Javascript interview. I looked by to my last interview and came up with a few topics for him to brush up on. 
I thought I'd write them down so others might make use of them. If you were asked anything I've not included, let me
know in the comments section. 

We'll start easy...

###What is Javascript?
Mozilla Developer Network describes Javascript as: 

>JavaScript® (often shortened to JS) is a lightweight, interpreted, object-oriented language with first-class functions, 
>most known as the scripting language for Web pages, but used in many non-browser environments as well such as node.js 
>or Apache CouchDB. It is a prototype-based, multi-paradigm scripting language that is dynamic,and supports 
>object-oriented, imperative, and functional programming styles.

The standards for Javascript are written in the ECMAScript documents. Currently we're on ES5 but ES6 has just been 
locked down so I'm looking forward to checking out some of the goodies it has to offer such as native promises and 
modules and classes. 

###What is variable scoping?
Variable scoping in Javascript can get complicated so lets do some examples. 

####Globally scoped variable

```javascript
var a = 1;

function test () {
    console.log(a); //1
}
```

####Locally scoped variable

```javascript
function test() {
    var a = 1;
    console.log(a); //1
}
```

####Intermediately scoped variable 

```javascript
var a = 1;
var x = true;
function test() {
    if (x) {
        var a = 100;
    }
    console.log(a) //100
}
```

####Closure

The return function still has access to the internal variable by trapping it in the closure. 
This is one of the great features of closures. More on this later.

```javascript
var close = (function () {
    var a = 1;
    return function () {
        console.log(a); //1
    };
})();

close();
```


####Implicit Globals *WATCH OUT FOR THESE*

This is where you don't declare a variable but then set it, these automatically go into the global scope. 
It is worth while checking for implicit globally scoped variables every now and again in your javascript 
because they can cause issues where things don't seem to act like they should. 

```javascript
function test() {
    a = 1;
}

console.log(a); //1
```


##What is the difference between == and === in Javascript?

== checks equality whereas === checks equality and type. What does this mean? 

```javascript 
//==

 3  == 3    //true
'3' == 3    //true
 3  == "3"  //true
 
//===
 3  === 3   //true
'3' === 3   //false
 3  === "3" //false
```

##What kind of conditional statements are available in javascript

####if statement

```javascript
if (x === 1) {
    //...
}
```

####if else statement
```javascript
if (x === 1) {
    //...
} else {
    //...
}
```

####if else if statement
```javascript
if (x === 1) {
    //...
} else if(y === 1) {
    //...
}
```

####switch statement
```javascript 
switch (x) {
    case 1: 
        console.log('one');
        break;
    case 2: 
        console.log('two');
        break;
    case 3: 
        console.log('three');
        break;
    default: 
        console.log('This is the default condition');
        break;
}
```
##What would the following if condition example check for 
```javascript 
if (!condition) {
    //... 
}
``` 
This would satisfy if condition==='undefined', also if condition===null and also if condition===false. 
This is a common way of checking for null or undefined but you have to double check that your variable 
would not ever be set to false or it will also satisfy. 


##What kind of loops are available in Javascript? 
####for loop
You can see in the second loop, we cache the length of the array so we don't need to calculate the length of the 
array each iteration. Micro-performance improvement that can add up over time.  

```javascript
for(var i=0; i<arr.length; i++) {
    //do stuff
}

for(var i=0, l=arr.length; i<l; i++) {
    //do stuff
}
```

####for in loop
```javascript
for (var x in arr) {
    //do stuff
}
```

####while loop 
```javascript
while(x===true) {
    //do stuff
}
```

####do while loop 
NOTE: This does one full iteration before checking the condition
```javascript
do {
    //do stuff
} while (x === true)
```

##What different ways can you create an Array in Javascript?
The following examples show you different ways to create an array in Javascript
```javascript
var arr1 = new Array();
arr1.push('Me');
arr1.push('You');
arr1.push('Them');

var arr2 = new Array();
arr2[0] = 'Me';
arr2[1] = 'You';
arr2[2] = 'Them';

var arr3 = new Array('Me', 'You', 'Them');

var arr4 = [];
arr4.push('Me');
arr4.push('You');
arr4.push('Them');

var arr5 = [];
arr5[0] = 'Me';
arr5[1] = 'You';
arr5[2] = 'Them';

var arr6 = ['Me', 'You', 'Them']

```

##How can you handle errors in Javascript?
####Try Catch statements 
These allow you to throw errors inside the try and catch them in the catch block

```javascript
try {
    //do stuff
    throw 'My Error'
} catch(e) {
    console.log(e);
}
```

####Try Finally statements
These allow your code to fail gracefully by performing some clean up task after your code has finished executing or failing.

```javascript
openMyFile();
try {
    //tie up the resource
    writeTofile();
} 
finally {
    //release the resource
    closeMyFile();
}
```

####Try Catch Conditional statements
```javascript
try {
    //do stuff
    myRoutine(); //may throw three exceptions
} catch(e if e instanceof TypeError) {
    //handle type errors
} catch(e if e instanceof RangeError) {
    //handle range errors
} catch(e if e instanceof EvalError) {
    //handle eval errors
} catch (e) {
    logMyErrors(e);
}
```

##How would you execute a function in 30 seconds time? 

####Set Timeout
```javascript

var timeout = setTimeout(function(){
    //code to be executed in 30 seconds
}, 30000)

//To cancel this timeout
clearInterval(timeout);
```

##How would you execute a piece of code every 10 seconds?

####Set Interval
```javascript
var interval = setInterval(function() {
    //Code to be executed every 10 seconds
},10000);

//To remove this setInterval
clearInterval(interval);
```


##Explain Inheritance in Javascript

MDN explains: 
>Inheritance is a way to create a class as a specialized version of one or more classes (JavaScript only supports 
>single inheritance). The specialized class is commonly called the child, and the other class is commonly called the 
>parent. In JavaScript you do this by assigning an instance of the parent class to the child class, and then 
>specializing it. In modern browsers you can also use Object.create to implement inheritance.

### Difference between Object.create and the new operator

Both are ways to inherit from a base class, but Object.create inherits from the prototype. What does this mean? Well lets
do an example. 

```javascript
function Person() {
    this.species = 'human';
}

Person.prototype.speak = function () {
    console.log('Hello');
}

Person.prototype.sleep = function () {
    console.log('Snore...zzz');
}


var andrew = new Person();
console.log(andrew.species); //human
andrew.speak(); //Hello
andrew.sleep(); //Snore...zzz

var andy = Object.create(Person.prototype); 
console.log(andy.species); //undefined
andy.speak(); //Hello
andy.sleep(); //Snore...zzz
```

Here, Andrew is an instance of the Person class and so has species set on it. Andy on the other hand has inherited
from the Person class's prototype *only* and so has access to the prototype functions of the Person class but 
none of the attributes set on the class.

##How would you go about dealing with an asynchronous request? 

####Deferred promises
jQuery and Q both provide a way to do promises and ECMAScript6 will provide a way to do native promises. 

Lets look at the jQuery Deferred object.

```javascript
function asyncFunction() {
    var defer = $.Deferred();
    $.ajax({
        url: 'http://getPerson.com/?gender=female'
        context: this
    }).done(function (returnObj) {
        defer.resolve(returnObj);
    }).fail(function () {
        defer.reject();
    });
    return defer.promise();
}

function myFunction() {
    var personPromise = asyncFunction();
    personPromise.done(function (returnObj) { //executes when promise is resolved
            console.log(returnObj.name)
        });
    personPromise.fail(function () { //executes when promise is rejected
            console.log('Failed to get the person');
        });
}

myFunction();
```


myFunction is calling the asyncFunction and getting a deferred promise back. When the promise 
gets resolved after the ajax request returns, the done function will get executed. If the promise gets rejected, the fail 
function will get executed.

These are useful when you are making calls out to a webservice for data. 
