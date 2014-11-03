Mapilary Company Website
========================================

### How to build

Install [nodejs and npm](http://nodejs.org/download/) (they come together), then [install grunt-cli](http://gruntjs.com/getting-started).

Then just run `npm install` in the root directory of this project.

### Client side scripts

Install [bower](http://bower.io/#installing-bower).

Then run `bower install` in the root directory of this project.

### Mapilary Widget submodule

Web is using [Mapilary Widget](https://github.com/mapilary/mapilary-widget), which has to be build first:

    git submodule init

    git submodule update

    cd mapilary-widget

    npm install

    bower install

    grunt

Follow documentation on github, how to build widget project.

### Usage

Auto-compile `.less` and `.coffee` files from the `src/less/` and `src/coffee` folders (and place the results in `src/css/` and `src/js/`).

    grunt watch

Build the project, compile `.less` and `.coffee` files, run jshint, and combine any static assets that are specified in `build` HTML comments (see examples in src/index.html).

    grunt
