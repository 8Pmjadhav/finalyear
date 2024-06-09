FROM node:20.14 AS builder

WORKDIR /frontend/

COPY ./ /frontend/

RUN npm install

# Build and optimize static file
RUN npm run build

# Stage-2
FROM nginx

# Copy the static file to my Nginx folder to serve static contain
COPY --from=builder /frontend/dist /usr/share/nginx/html

# Open the port to react
# EXPOSE 80

# Run nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]

# EXPOSE 5173

# CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
