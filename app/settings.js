(function (global) {

    'use strict';

    if(typeof require === 'undefined') {
        var require = function () {
            return null;
        }
    }
    
    global.NodeUtils = {};

    NodeUtils.gui = require('nw.gui');
    if(NodeUtils.gui) {
        NodeUtils.win = gui.Window.get();
    } else {
        NodeUtils.win = null;
    }
    NodeUtils.htmlDocx = require('html-docx-js');
    NodeUtils.fs = require('fs');
    NodeUtils.notifier = require('node-notifier');

}(this));