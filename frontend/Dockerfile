# syntax=docker/dockerfile:1.4

FROM node:lts AS development

WORKDIR /code
COPY face-predictor/package.json /code/face-predictor/package.json
COPY face-predictor/package-lock.json /code/face-predictor/package-lock.json

# npm install
WORKDIR /code/face-predictor
RUN npm ci

COPY . /code
RUN ls /code -a

ENV CI=true
ENV PORT=3000
RUN pwd
CMD [ "npm", "start" ]

FROM development AS dev-envs
RUN <<EOF
apt-get update
apt-get install -y git
EOF

RUN <<EOF
useradd -s /bin/bash -m vscode
groupadd docker
usermod -aG docker vscode
EOF
# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /

WORKDIR /code/face-predictor
RUN pwd
CMD [ "npm", "start" ]

FROM development AS build
RUN pwd
RUN ["npm", "run", "build"]

FROM nginx:1.13-alpine

# Copy config nginx

COPY --from=build /code/.nginx/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=build /code/face-predictor/build .

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]