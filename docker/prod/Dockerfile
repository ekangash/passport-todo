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

FROM nginx AS runner

WORKDIR /var/www/app

COPY --from=builder --chown=1000:1000 /var/www/app/dist /var/www/app/dist
COPY --from=builder /var/www/app/node_modules ./node_modules
COPY --from=builder /var/www/app/package.json ./package.json

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]