FROM mapilary/web

VOLUME /src
WORKDIR /src

CMD git pull && git submodule -q foreach git pull -q origin master && \
    cd mapilary-widget && npm install && bower --allow-root install && grunt && \
    cd .. && npm install && grunt watch
