FROM hub.yottab.io/library/node:22.8.0-alpine3.20 AS build_image
ENV NODE_ENV=production \
    NEXT_PUBLIC_API_URL='https://kloud.team/api/core'
CMD ["yarn", "start"]
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production
COPY . .
RUN yarn build