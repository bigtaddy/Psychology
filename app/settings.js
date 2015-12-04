(function (global) {

    'use strict';

   // var Datastore = require('nedb');
    //global.db = new Datastore({filename: 'database', autoload: true});
    //global.db = new Datastore({filename: 'database', autoload: true});
    //global.db = new Datastore({filename: 'database', autoload: true});

    var gui = require('nw.gui');
    var win = gui.Window.get();

    global.win = win;

}(this));