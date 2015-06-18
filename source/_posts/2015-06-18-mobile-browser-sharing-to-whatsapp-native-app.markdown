---
layout: post
title: "Mobile browser sharing to WhatsApp native app"
date: 2015-06-18 11:59:02 +1000
comments: true
categories: code example
keywords: whatsapp, sharing, social, browser, native
description: Custom sharing button for WhatsApp native apps from the mobile browser
---

####BuzzFeed Says:
> iPhone users are clicking their new WhatsApp button more than Twitter's. This was enough for us to build a WhatsApp sharing button generator, so you can easily create your own.

They have a built a button generator, for you to generate a button for your site and you can just drop a script tag into your site and link with it. 

![Imgur](http://i.imgur.com/1twQFTnm.png)

[WhatsApp-Sharing.com](http://whatsapp-sharing.com)


###What if you want more control over your button? 
<!--more-->

_How does your mobile browser hand off to the WhatsApp application?_

####Opening WhatsApp from your browser

Type `whatsapp://` into your mobile browser address bar. 

It should open the WhatsApp application on your phone. 

####Sending a text from the browser

In order to send a text here, we want to open directly at the contacts page, to do this type this into the address bar 

`whatsapp://send`

This should open the app at the contacts page where you can choose a contact to send a message to.

####How do you send text content to application? 

You can add a text query string to the url which will appear in the input area. 

`whatsapp://send?text=test`

This text needs to be encoded, you can do this with javascript's native encodeURIComponent() function.

`whatsapp://send?text=hello%20world!`

All you have to do now is to put it in an a tag, style it and click it on a mobile device. 

`<a href="whatsapp://send?text=hello%20world!">Send to WhatsApp</a>`


To do this dynamically in your website, here's an example using jQuery


<p data-height="268" data-theme-id="0" data-slug-hash="rVzRxE" data-default-tab="result" data-user="madole" class='codepen'>See the Pen <a href='http://codepen.io/madole/pen/rVzRxE/'>Whatsapp Share</a> by Andrew McDowell (<a href='http://codepen.io/madole'>@madole</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>


This approach works on both Android and iOS phones with WhatsApp installed. 

Have a play with it and leave some feedback in the comments if you have any.