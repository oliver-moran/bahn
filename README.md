bahn
====

A ready-for-road HTML5 application stack combining [Bootstrap](http://getbootstrap.com), [AngularJS](https://angularjs.org/), [H5BP](http://html5boilerplate.com/), and [Node.js](http://nodejs.org/) (BAHN).

bahn comes pre-rolled a NoSQL database ([NeDB](https://github.com/louischatriot/nedb) or [MongoDB](http://www.mongodb.org/)), a HTTP application server ([Express](http://expressjs.com/)), and [WebSocket](http://www.html5rocks.com/en/tutorials/websockets/basics/) support for dynamic applications ([Socket.io](http://socket.io/)).

Apart from bundling all of these together, the philosophy is otherwise agnostic. Use one, use all, use some. But have fun!

## Installation ##

You can download and manually install/start the default bahn application directly. However, the recommended way is through the the [bahn command-line interface](https://github.com/oliver-moran/bahn-cli).

After installing Node.js, type the following command:

    npm install bahn -b

Once installation is complete, navigate to an empty directory and type:

    bahn

This will download, install and start the latest release of the default bahn application (i.e. the latest release from this repository).

By default the bahn application server will run on port 8080. To run it on a port 80, try:

    bahn --port 80
    
For further help, see the [bahn command-line interface](https://github.com/oliver-moran/bahn-cli) documentation or type:

    bahn --help

## License ##

All of the software distributed in this stack is released under the [MIT license](http://opensource.org/licenses/MIT). Node.js ([see license](https://raw.githubusercontent.com/joyent/node/v0.10.29/LICENSE)) and MongoDB ([see license](http://www.mongodb.org/about/licensing/)) are distributed separately under different open source licenses.
