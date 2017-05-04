Mapilary Company Website
========================================

## Build using Docker

Build docker image:

    docker build -t "mapilary/web" https://raw.githubusercontent.com/mapilary/mapilary-web/master/Dockerfile

Run build in docker container:

    mkdir -p dist
    docker run --rm -v $(pwd)/dist:/dist -t mapilary/web

Website will be generated into `dist` directory of current folder ➔ $(pwd).
You can also run above command to rebuild website on updates.

**Warning**: All content of `dist` folder will be removed as part of docker run build.

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
