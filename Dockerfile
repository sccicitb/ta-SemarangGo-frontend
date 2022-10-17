# The first image is for compiling the client files, the second is for serving.

# BUILD IMAGE
FROM node:18-alpine as build-stage

WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile

# Build
COPY . .

RUN yarn build

# -----------------------------------------------------------------------------
# SERVING IMAGE
FROM nginx:alpine

# Copy nginx config
#COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 80 for HTTP
EXPOSE 3000

# Run nginx
CMD nginx -g 'daemon off;'