#####################################
###                               ###
###           NGINX               ###
###                               ###
#####################################
FROM node:22.12.0 AS builder

WORKDIR /var/www/app

# add env `/var/www/app/node_modules/.bin` to $PATH
ENV PATH=/var/www/app/node_modules/.bin:$PATH

# add app
COPY . ./

RUN npm install
RUN npm run build

ENTRYPOINT ["npm", "run", "start"]