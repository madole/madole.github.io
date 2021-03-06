---
layout: post
title: "Setting up webpack dev middleware in express"
date: 2015-08-26 19:18:02 +1000
comments: true
categories: workflow
keywords: webpack, javascript, webpack-dev-server, webpack-dev-middleware, hot reloading
description: "Setting up webpack dev middleware with hot reloading in express"
---
 
 **What is webpack dev server?**
  
Webpack dev server is a live reloading server for webpack. 

**What is webpack dev middleware?**

It's a simple wrapper middleware for webpack. It serves the files emitted from webpack over a connect server.

It has a few advantages over bundling it as files:

-	No files are written to disk, it handles the files in memory
-	If files changed in watch mode, the middleware no longer serves the old bundle, but delays requests until the compiling has finished. You don't have to wait before refreshing the page after a file modification.

**What is webpack hot middleware?**

Webpack hot reloading using only webpack-dev-middleware. This allows you to add hot reloading into an existing server without webpack-dev-server.

**Using webpack-dev-server as a middleware**  
    
  
Web pack provides an express middleware that you can plug into your app to serve up your fronted assets via web pack-dev-server rather than express.static or express/serve-static.  
To do this you’ll need to install webpack-dev-middleware and webpack-hot-middleware  
```bash 
    npm i webpack-dev-middleware webpack-hot-middleware 
```  
First off you need to make a webpack.dev.config file.
In your config, add ```webpack/hot/dev-server```  and  ```webpack-hot-middleware/client``` to your entry point as well as your js or coffee script frontend entry point.  

```coffeescript
entry:    [
    'webpack/hot/dev-server'  
    'webpack-hot-middleware/client'  
    "#{__dirname}/../client/index.coffee"  
]
```
  
Make your output path ‘/‘ because remember, you’re building your app into memory now rather than a build folder.  

```coffeescript
output: {	
    path: '/'
    publicPath: 'http://localhost:3000/scripts/'
    filename: 'bundle.js' 
}
```  

Add in whatever loaders and plugins you need and target 'web' … you can see my config [here](https://github.com/madole/webpack-dev-middleware-boilerplate/blob/master/src/config/webpack.dev.config.coffee)  
<!--more-->
Now we’ve got our dev config, we need to build our express application.  
We need to require webpack, webpack-dev-middleware and webpack-hot-middleware as well as express.   

```coffeescript
express = require 'express'  
webpack = require 'webpack'  
webpackDevMiddleware = require 'webpack-dev-middleware'  
webpackHotMiddleware = require 'webpack-hot-middleware'  
```

We need to create our express app as usual and a router to receive our requests.   

```coffeescript
app = express()
router = express.Router()  

router.get('/', someController) 
app.use(router)
```

Now for the webpack magic, we need to import our webpack config  

```coffeescript
config = require './config/webpack.dev.config'
```  

Next, we need to create a compiler by feeding our config into webpack.   

```coffeescript
compiler = webpack(config)
```  

Now we need to hook in the webpack-dev-middleware  

```coffeescript
app.use(webpackDevMiddleware(compiler, {  
    publicPath: config.output.publicPath,  
    stats: {colors: true}  
}))
```

The public path here is where you want your front-end bundle to end up.   
We also need to plug in the webpack-hot-middleware  

```coffeescript
app.use(webpackHotMiddleware(compiler, { 
    log: console.log 
})) 
```

When all this is done, call listen on the app.   

```coffeescript
app.listen(3000,  -> console.log 'listening on 3000') 
```
Now we just need to include the bundle.js in your index.html and we’re off.   
I use nodemon to monitor my back end files so I can make changes and restart the node process, but remember to exclude your client-side files so webpack-dev-middleware can take care of them instead.   

When you load up the app, you should see webpack-hot-middleware trying to connect to the dev server in the console

![Imgur](http://i.imgur.com/MovchxZ.png)

  
**How do you hook this into production code?** 

Simple, have a conditional statement checking your environment variable, if you’re in a dev environment use the webpack-dev-middleware, if not, use express.static to serve your static assets.   

You can checkout my boilerplate express app with webpack-dev-middleware and webpack-hot-middleware plugged in at [https://github.com/madole/webpack-dev-middleware-boilerplate](https://github.com/madole/webpack-dev-middleware-boilerplate)