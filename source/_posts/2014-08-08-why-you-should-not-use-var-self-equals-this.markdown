---
layout: post
title: "Why you should not use var self = this"
date: 2014-08-08 07:39:07 +1000
comments: true
categories: [Javascript, browsers]
---

When trying to maintain context, like in a setTimeout, I've seen lots code that resembles 
> var self = this;

*self* is then used inside the timeout to execute the code within the scope of the parent function.

Self is a reserved word in the browser which is equal to Window in most browsers and therefore should not be 
overwritten as it could cause confusion for someone thinking self is referring to the window object reference. 


https://developer.mozilla.org/en-US/docs/Web/API/Window.self

<!--more--> 

self === window.self

>true

self === window

>true


###Screenshots
####Mozilla Firefox
{% img  /images/firefoxSelf.jpg 700  %} 

####Google Chrome
{% img  /images/chromeSelf.jpg 700 %}


####Apple Safari
{% img  /images/safariSelf.jpg 700 %}



In a lot of scenarios you can avoid this completely by refactoring your code to use private functions that are 
always in scope. But in the scenarios where you can't avoid it, it's better to use a word like "that" which is 
not reserved and is commonly used for this purpose, or using Function.prototype.bind to bind the context and 
return a function. 

##PROBLEM: 
```javascript

function MathPrint() {
    var x = 10;
    var y = 100;
    
    return {
        multiply: function (a, b) {
            return a * b;
        },
        printToConsole: function (text) {
            console.log(text);
        },
        printAndMultiplyAfterWait: function () {
            setTimeout(function () {
                this.printToConsole(this.multiply(x, y));
            }, 2000);
        }
    };

}

var mathPrint = new MathPrint();

console.log(mathPrint.multiply(10, 5)); //50

mathPrint.printToConsole(2000); //2000

mathPrint.printAndMultiplyAfterWait(); //undefined is not a function
}

```
----------------------------
BAD: 
----------------------------
```javascript

function MathPrint() {
    var x = 10;
    var y = 100;
    //self === window
    return {
        multiply: function (a, b) {
            return a * b;
        },
        printToConsole: function (text) {
            console.log(text);
        },
        printAndMultiplyAfterWait: function () {
            var self = this; //self -> function scope
            setTimeout(function () {
                self.printToConsole(self.multiply(x, y));
            }, 2000);
        }
    };
}

var mathPrint = new MathPrint();

console.log(mathPrint.multiply(10, 5)); //50

mathPrint.printToConsole(2000); //2000

mathPrint.printAndMultiplyAfterWait(); //1000
```

----------------------------
GOOD: 
----------------------------
```javascript

function MathPrint() {
    var x = 10;
    var y = 100;
    return {
        multiply: function (a, b) {
            return a * b;
        },
        printToConsole: function (text) {
            console.log(text);
        },
        printAndMultiplyAfterWait: function () {
            var that = this;
            setTimeout(function () {
            that.printToConsole(that.multiply(x, y));
            }, 2000);
        }
    };
}

var mathPrint = new MathPrint();

console.log(mathPrint.multiply(10, 5)); //50

mathPrint.printToConsole(2000); //2000

mathPrint.printAndMultiplyAfterWait(); //1000

```


------------------------------
GOOD - using Bind and Call
------------------------------

```javascript
function MathPrint() {
    var x = 10;
    var y = 100;
    return {
        multiply: function (a, b) {
            return a * b;
        },
        printToConsole: function (text) {
            console.log(text);
        },
        printAndMultiplyAfterWait: function () {
            setTimeout(this.printToConsole.bind(this, this.multiply.call(this,x,y)),2000);
        }
    };
}

var mathPrint = new MathPrint();

console.log(mathPrint.multiply(10, 5)); //50

mathPrint.printToConsole(2000); //2000

mathPrint.printAndMultiplyAfterWait(); //1000

```