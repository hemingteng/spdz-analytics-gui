FROM node:7

# Run the analytics GUI node server to serve the GUI and provide REST services to GUI.
# Build container with:
#   docker build -t spdz/analytics-gui:v0.1.0 .
# Run container with:
#   docker run -d --rm --name analytics-gui -p 8080:8080 \ 
#        -v /home/me/config/analyticConfig.docker.json:/usr/app/config/analyticConfig.json \
#        -v /home/me/logs:/usr/app/logs spdz/analytics-gui:m.n.p

LABEL name="SPDZ analytics demonstrator GUI." \
  description="Provide the GUI and REST servcies for the analytics demo." \
  maintainer="Jonathan Evans" \
  license="University of Bristol : Open Access Software Licence" 

ENV NODE_ENV=production
ENV LOG_LEVEL=info
# Here because in certain deployments (UOB VMs) have to use internal IP to contact spdz proxies 
# and certificate is only valid for external hostname.
ENV NODE_TLS_REJECT_UNAUTHORIZED=1

# Create app directory
RUN mkdir -p /usr/app
WORKDIR /usr/app

# Install app dependencies
COPY package.json /usr/app
RUN npm install --production

# Bundle app source
RUN mkdir -p /usr/app/src
COPY src /usr/app/src/

# Copy react transpiled app.
COPY gui_build /usr/app/gui_build

EXPOSE 8080

# Mount analytics gui config
VOLUME /usr/app/config/analyticConfig.json
# Logs are kept
VOLUME /usr/app/logs

CMD exec node src/index.js 2>&1 | tee /usr/app/logs/analytics-gui.log
