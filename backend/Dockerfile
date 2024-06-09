FROM node:20.14 AS build

WORKDIR /backend/

COPY ./ /backend/

RUN npm install

RUN npx prisma generate

# RUN npx prisma migrate dev --name migrate_to_docker

# EXPOSE 3000

CMD ["npm", "run", "server"]
