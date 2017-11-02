############################################################
# Dockerfile to run elica-bot
# Based on node
############################################################

FROM node:carbon-slim

# File Author / Maintainer
MAINTAINER Siyuan Gao <siyuangao@gmail.com>

# Bundle app source
COPY . /src

WORKDIR /src

# Install app dependencies
RUN cd /src
RUN npm install -g  --silent parse-dashboard
RUN npm install  --silent replace-in-file
RUN npm install  --silent docker-links
RUN npm install  --silent require-env

ENV NODE_ENV production

CMD bash bootstrap.sh
