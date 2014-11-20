---
layout: post
title: "JSFiddle - Firebug Lite"
date: 2014-11-20 20:45:26 +1100
comments: true
categories: Javascript
keywords: JavaScript, JSFiddle, Firebug, Console
description: Using firebug lite with JSFiddle
---

I recently discovered a cool feature in JSFiddle which changed the way I use it.

Until now, I've been hopping on to JSFiddle to test out little bits of code and logging out to the console.

If you're like me, you'll be familiar with having Chrome Dev Tools open to view your console logs.

{% img  /images/devToolsConsoleLog.png 700  %}

<!--more-->
This can be a bit of a pain to have to open every time, and especially for showing your JSFiddle to other people when you
send them a link, they have to open their Dev Tools up too.

#### *Firebug Lite to the rescue*

I came across a stack overflow where the user gave an answer and link to a JSFiddle with Firebug Lite enabled.

I now use it every single time I use JSFiddle.

Here's how to enable it.


First of all, write a line of code that logs to the console so you know it's worked at the end.

{% img  /images/logToConsole.png 700  %}

Then in the Frameworks and Extensions section, add jQuery (edge) to the Fiddle.

{% img  /images/addjQueryEdge.png 700  %}

It should look like this with a bunch of checkboxes you can choose from.

{% img  /images/jQueryEdgeAdded.png 700  %}

Click Firebug Lite to add it to the Fiddle

{% img  /images/chooseFirebug.png 700  %}

Finally, Run your JavaScript to see it logged out to the Firebug Lite Console in the output window.

{% img  /images/loggedOut.png 700  %}

