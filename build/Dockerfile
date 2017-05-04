FROM ubuntu:16.04
MAINTAINER Marian Hello

ENV REPO=https://github.com/mapilary/mapilary-web.git
ENV BUILD_DIR=/tmp/mapilary-web

RUN apt-get update && apt-get install -y \
    git \
    ruby-dev \
    nodejs \
    nodejs-legacy \
    npm

RUN npm install -g grunt-cli
RUN npm install -g bower
RUN gem install compass

WORKDIR /tmp
VOLUME /src

RUN git clone --recursive $REPO $BUILD_DIR && \
    cd ${BUILD_DIR}/mapilary-widget && npm install && bower --allow-root install && \
    cd ${BUILD_DIR} && npm install

CMD cd ${BUILD_DIR} && git pull && git submodule -q foreach git pull -q origin master && \
    cd mapilary-widget && npm install && bower --allow-root install && grunt && \
    cd .. && npm install && grunt && \
    cp -a . /src
