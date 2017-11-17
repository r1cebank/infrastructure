############################################################
# Dockerfile to run elica-bot
# Based on node
############################################################

FROM keymetrics/pm2:8

# File Author / Maintainer
LABEL Maintainer="Siyuan Gao <siyuangao@gmail.com>"

RUN apk add --update ca-certificates bash openssl && update-ca-certificates

# Install docker-gen
ENV DOCKER_GEN_VERSION 0.7.3

RUN wget https://github.com/jwilder/docker-gen/releases/download/$DOCKER_GEN_VERSION/docker-gen-linux-amd64-$DOCKER_GEN_VERSION.tar.gz \
 && tar -C /usr/local/bin -xvzf docker-gen-linux-amd64-$DOCKER_GEN_VERSION.tar.gz

# Install Forego
ADD https://github.com/jwilder/forego/releases/download/v0.16.1/forego /usr/local/bin/forego
RUN chmod u+x /usr/local/bin/forego

# Bundle app source
COPY . /src

WORKDIR /src

ENV DOCKER_HOST unix:///tmp/docker.sock

# Install app dependencies
RUN cd /src
RUN npm install --silent

ENV NODE_ENV production

EXPOSE 4040

# ENTRYPOINT ["/src/entrypoint.sh"]
CMD ["forego", "start", "-r"]
