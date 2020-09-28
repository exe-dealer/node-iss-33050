ARG IMAGE=node:14.11.0-alpine3.12
FROM $IMAGE
WORKDIR /app
CMD ["node", "index.js"]
STOPSIGNAL SIGKILL
COPY . ./