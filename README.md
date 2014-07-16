bahn
====

A ready-for-road HTML5 application stack combining [Bootstrap](http://getbootstrap.com), [AngularJS](https://angularjs.org/), [H5BP](http://html5boilerplate.com/), and [Node.js](http://nodejs.org/) (BAHN).

bahn comes pre-rolled a NoSQL database ([NeDB](https://github.com/louischatriot/nedb) or [MongoDB](http://www.mongodb.org/)), a HTTP application server ([Express](http://expressjs.com/)), and [WebSocket](http://www.html5rocks.com/en/tutorials/websockets/basics/) support for dynamic applications ([Socket.io](http://socket.io/)).

Apart from bundling all of these together, the philosophy is otherwise agnostic. Use one, use all, use some.

But have fun!

## Installation ##

To install, download and type:

    npm install
    
To run, type:

    npm start

You must have [Node.js installed](http://nodejs.org/download/) before installing. To use a MongoDB database, you must have [MongoDB installed](http://www.mongodb.org/downloads).

A seed TODO application that puts the stack through through its paces is included. Visit [http://127.0.0.1:8080/](http://127.0.0.1:8080/) and have a look in the `/application/` and `/application/static/` directories to get going.

## Configuration ##

Configuration is through the config setting in `/package.json`. The configuration options are:

- `port`: (default: `8080`) The port number used by HTTP and WebSocket servers.

- `database`: (default: `true`) If [`truthy`](http://docs.nodejitsu.com/articles/javascript-conventions/what-are-truthy-and-falsy-values) then the database module will be loaded. The type of the `truthy` value implicitly determines the type of database to use:

  - If the value is a string then MongoDB will be used as the database. The value of the string may be the name of the local database to use (e.g. `bahn`) or a path to a remote database (e.g. `username:password@example.com/bahn`).
  - Otherwise, a NeDB database will be used.
  
- `sockets`: (default: `true`) If `truthy` then the WebSocket module will be loaded.

## License ##

All of the software distributed in this stack is released under the [MIT license](http://opensource.org/licenses/MIT) with the exception of Node.js ([see license](https://raw.githubusercontent.com/joyent/node/v0.10.29/LICENSE)) and MongoDB ([see license](http://www.mongodb.org/about/licensing/)).
