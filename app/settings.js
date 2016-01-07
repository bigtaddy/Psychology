(function (global) {

    'use strict';

    if(typeof require === undefined) {
        return;
    }
   // var Datastore = require('nedb');
    //global.db = new Datastore({filename: 'database', autoload: true});
    //global.db = new Datastore({filename: 'database', autoload: true});
    //global.db = new Datastore({filename: 'database', autoload: true});

    global.gui = require('nw.gui');
    global.win = gui.Window.get();
    global.htmlDocx = require('html-docx-js');
    global.fs = require('fs');
    global.notifier = require('node-notifier');


    global.win = win;

}(this));