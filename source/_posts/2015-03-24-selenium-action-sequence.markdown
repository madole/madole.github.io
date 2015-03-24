---
layout: post
title: "Selenium ActionSequence"
date: 2015-03-24 23:30:03 +1100
comments: true
categories: 
keywords: [Selenium, JavaScript]
description: Using Selenium ActionSequence to get around a click issue
---
####Selenium test
Should do something when an outer div, with an inner div placed in the middle in front, is clicked.

####How to usually do this?
```javascript
    driver.findElement(webdriver.By.className('outer')).then(function(element) {
         element.click();
    }
```

    Uncaught UnknownError: unknown error: Element is not clickable at point (170, 90).
    Other element would receive the click: <div class="midde"></div>

<!--more-->

Say our test is trying to test that a video plays when an image is clicked.

But our image has a play button overlay right in the center like below.

{% img  /images/Keyboard_cat.png 500  %}

Selenium's default behaviour is to click right in the middle of your selected element.

Because there is a "play" div over the top of it right in the middle, selenium complains that your element is not clickable.

####How to get around this?

[Selenium Docs: ActionSequence](https://selenium.googlecode.com/git/docs/api/javascript/class_webdriver_ActionSequence.html)

Selenium's WebDriver ActionSequence provides a mouseMove function on its prototype
```javascript
    WebDriver.ActionSequence.prototype.moveMouse()
```
We create an action sequence that moves the mouse to the outer div, but with an offset from its top left corner.
```javascript
    new webdriver.ActionSequence(driver).moveMouse(outerElement, 10, 10).click(outerElement)
```
This will now click 10px in from the top of the outer element and 10px in from the left.

By doing this we can now avoid clicking the middle div while clicking the outer div programmatically.
