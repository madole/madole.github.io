---
layout: post
title: "Priciples: Don't Repeat Yourself (DRY)"
date: 2014-09-30 13:43:13 +1000
comments: true
categories: 
---

##Principles of software engineering: Don’t Repeat Yourself
###DRY

Aimed at reducing the repetition of code. 

>"Every piece of knowledge must have a single, unambiguous, authoritative representation within a system”
> - The Pragmatic Programmer

By following the DRY principle when coding, you will write small functions that do only one thing. Then other functions are made up of calls to these small functions. 


In this way, you can reuse code and refactor common functionality into modules that can be used in any part of your project. 


If you find yourself copying and pasting code, you are more than likely not following the DRY principle. This should be a red flag and a chance to refactor your existing code into smaller reusable components. 


Violations of the DRY principle are called WET (‘we enjoy typing’). 


Nobody likes getting wet, so keep it DRY to write better code in the future. 