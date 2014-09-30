---
layout: post
title: "Cool Function.prototype.bind() quirk"
date: 2014-09-30 11:58:10 +1000
comments: true
categories: ['JavaScript', 'Functions', 'bind', 'prototypes']
---

Today I came up against a need to bind a parameter to a callback before passing it to a function. This is fine and a fairly normal thing to do. 

However, the function that was receiving the callback was also passing a parameter to the callback. 

I'd not come up against this scenario before so I asked a colleague what would happen, we came up with a list of 3 possibilities. 


   * The function passing the parameter to the callback would overwrite the bound argument.
   * The bound argument would be the first parameter and the passed in argument would be the second.
   * The passed in argument would be the first parameter and bound argument would be the second.

I headed over to JSFiddle.net to mock up a trivial example that would demonstrate my issue so I could see the outcome. I've copied it below.

```javascript
function callbackToPass(first, second) {
    console.log(first);
    console.log(second);
}

function funkyFunc(callback) {
    callback('is good for horses');
}

funkyFunc(callbackToPass);
//is good for horses
//undefined

funkyFunc(callbackToPass.bind(null, 'hay'));
//hay
//is good for horses

```

http://jsfiddle.net/madole404/zbLbLymt/

####Outcome: 
When you bind an argument to the callback, it binds it as the first parameter.
Then when you pass an argument to the same callback function when you are calling it, it becomes the secondary parameter.  