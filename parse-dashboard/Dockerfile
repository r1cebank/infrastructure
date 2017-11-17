############################################################
# Dockerfile to run elica-bot
# Based on node
############################################################

FROM keymetrics/pm2:8

# File Author / Maintainer
LABEL Maintainer="Siyuan Gao <siyuangao@gmail.com>"

# Bundle app source
COPY . /src

COPY ./dashboard-config.json /data/config/dashboard-config.json

WORKDIR /src

# Install app dependencies
RUN cd /src
RUN npm install --silent

ENV NODE_ENV production

EXPOSE 4040

CMD ["node", "index.js"]
