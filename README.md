Mapilary Company Website
========================================

## Build using Docker

Build docker image:

    docker build -t "mapilary/web" https://raw.githubusercontent.com/mapilary/mapilary-web/master/build/Dockerfile

Run build in docker container:

    docker run --rm -v $(pwd):/src -t mapilary/web

Website will be cloned and generated into `dist` directory of current folder ➔ $(pwd).
You can also run above command to rebuild website on git updates.

## Build in local environment

* Install [bower](http://bower.io/#installing-bower).
* Install [nodejs and npm](http://nodejs.org/download/) (they come together).
* Install [grunt-cli](http://gruntjs.com/getting-started).
* Install [compass](http://compass-style.org/install/)

Web has [Mapilary Widget](https://github.com/mapilary/mapilary-widget) dependency, which has to be build first:

    git submodule init && \
    git submodule update && \
    cd mapilary-widget && \
    npm install && bower install && \
    grunt && \
    cd ..

Finally web site can be generated:

    npm install && \
    grunt

Website will be generated into `dist` directory.

## Development

Auto-compile `.less` and `.coffee` files from the `src/less/` and `src/coffee` folders (and place the results in `src/css/` and `src/js/`).

    grunt watch

Or in docker dev container:

    docker build -t "mapilary/web-dev" .
    docker run -v $(pwd):/src -t mapilary/web-dev

Note: Above commands has to be run in same directory in which mapilary/web image was created.