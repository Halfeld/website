FROM jekyll/jekyll

RUN npm install -g grunt

USER jekyll

ADD . /srv/jekyll
WORKDIR /srv/jekyll

CMD ['npm', 'install', '&&', 'grunt']
