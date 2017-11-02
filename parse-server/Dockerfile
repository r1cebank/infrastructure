############################################################
# Dockerfile to run elica-bot
# Based on node
############################################################

FROM node:carbon-slim

# File Author / Maintainer
LABEL Maintainer="Siyuan Gao <siyuangao@gmail.com>"

# Bundle app source
COPY . /src

WORKDIR /src

# Install app dependencies
RUN cd /src; npm install --silent

ENV NODE_ENV production
ENV PORT 8080

EXPOSE 8080

CMD node -r @std/esm src/index.js
