---
layout: post
title: "Patterns: Singleton"
date: 2014-08-18 13:21:18 +1000
comments: true
categories: ['JavaScript', 'patterns', 'singleton']
---


>The singleton pattern is a design pattern that restricts the instantiation of a class to one object. 
>This is useful when exactly one object is needed to coordinate actions across the system. 
>The concept is sometimes generalized to systems that operate more efficiently when only one object exists, 
>or that restrict the instantiation to a certain number of objects. 
>The term comes from the mathematical concept of a singleton.

<!--more--> 
###Features of the Singleton pattern
-   Lazy construction.
    -   The singleton object is not created until it is needed to be used for the first time.
-   The constructor is private so you can not build new instances of the object.
-   The constructor is only ever called by the getInstance function if the object does not already exist.

###Code example

A typical singleton pattern in JavaScript looks like this. 

```javascript
(function () {
  'use strict';
  var singletonDriver = (function () {

    var instance = null;

    function init() {
      //private methods and variables
      var name = 'Wilson';
      var cars = ['Porche', 'Ferarri', 'Volvo'];

      function printCars() {
        console.log(cars);
      }

      return {
        // Public methods
        getName: function () {
          return name;
        },
        getCars: function () {
          return cars;
        },
        printCars: printCars
      };
    }

    return {
      getInstance: function () {
        if (!instance) {
          instance = init();
        }
        return instance;
      }
    };
  })();

  // Usage:
  var driver1 = singletonDriver.getInstance();
  var driver2 = singletonDriver.getInstance();

  console.log(driver1 === driver2); //true
  console.log(driver1.getCars() === driver2.getCars()); // true
  console.log(driver1.getName()); //wilson
  console.log(driver2.getName()); //wilson
  driver1.printCars(); //[ 'Porche', 'Ferarri', 'Volvo' ]
})();
```
Lets look at what we have created. 

-   An instance variable that is set to null, this will hold our instance of the singleton when 
the getInstance function is called for the first time. 

-   An init() function which will build our singleton. It can contain private and public variables and functions. 

-   A public getInstance() function. This will return the instance if it already exists and or if it doesn't,
it will create it, set our instance variable and then return it. 

That's all there is to it. 