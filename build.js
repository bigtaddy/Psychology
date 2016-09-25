(function () {

//npm install nw-builder -g
    /**
     * Usage: nwbuild [options] [path]

     Options:
     -p, --platforms      Platforms to build, comma-sperated, can be: win32,win64,osx32,osx64,linux32,linux64   ['osx32', 'osx64', 'win32', 'win64']
     -v, --version        The nw version, eg. 0.8.4                                             [default: "latest"]
     -r, --run            Runs NW.js for the current platform                                   [default: false]
     -o, --buildDir       The build folder                                                      [default: "./build"]
     -f, --forceDownload  Force download of NW.js                                               [default: false]
     --cacheDir           The cache folder
     --quiet              Disables logging                                                      [default: false]
     */


//   files: [
// "package.json",
// "index.html",
// "./startScreen/**/*",
//"./app/**/*",
//    "./libs/**/*",
//    "./css/**/*"]
//

    var NwBuilder = require('nw-builder');
    var nw = new NwBuilder({
        files: [
            "./dist/**/**"
        ],
        cacheDir: './cache',
        platforms: ['win64'],
        version: '0.17.4',
        flavor: 'sdk',
        zip: false,
        appName: 'nw',   //Избирательность зрительного восприятия
        buildDir: './build'
    });


// Build returns a promise
    nw.build().then(function () {
        console.log('all done!');
    }).catch(function (error) {
        console.error(error);
    });
})();
