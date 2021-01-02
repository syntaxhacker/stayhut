#stage-1
# client-build
# ---- Base Node ----
FROM node:12 AS cbase
# Create app directory
WORKDIR /home/app/client
# ---- Dependencies ----
FROM cbase AS cdependencies  
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY client/package*.json ./
# install app dependencies including 'devDependencies'
RUN npm install --silent

# ---- Copy Files/Build ---- 
FROM cdependencies AS cbuild
WORKDIR /home/app/client/
COPY client/ /home/app/client/
RUN npm run build

#stage-2
FROM node:12 AS sbase
WORKDIR /home/app/server

FROM sbase AS sdependencies  
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY server/package*.json ./
# install app dependencies including 'devDependencies'
RUN npm install --silent


# ---- Copy Files/Build ---- 
FROM sdependencies AS sbuild
WORKDIR /home/app/server/
COPY server/ /home/app/server/
RUN npm run build
# Move Client build folder into server 
FROM sbuild AS combine
WORKDIR /home/app/deploy/
COPY --from=sbuild /home/app/server/build /home/app/deploy/src
COPY --from=cbuild /home/app/client/build /home/app/deploy/src/client

#stage-3 release
FROM node:12-alpine AS release
WORKDIR /home/app/deploy/
COPY --from=sbuild /home/app/server/package*.json /home/app/deploy/
COPY --from=combine /home/app/deploy/src /home/app/deploy/src
RUN npm install --silent --only=prod
EXPOSE 3000
CMD ["node","src/index.js"]

