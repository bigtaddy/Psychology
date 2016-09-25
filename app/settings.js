(function (global) {

    'use strict';
    
    global.NodeUtils = {};

    NodeUtils.gui = require('nw.gui');
    if(NodeUtils.gui) {
        NodeUtils.win = NodeUtils.gui.Window.get();
    } else {
        NodeUtils.win = null;
    }
   // NodeUtils.win.enterFullscreen();
    NodeUtils.htmlDocx = global.htmlDocx //require('html-docx-js');
    NodeUtils.fs = require('fs');
    NodeUtils.notifier = require('node-notifier');

}(this));