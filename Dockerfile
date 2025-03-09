# Stage 1: Install dependencies and build the app
FROM node:20.11.1-alpine AS builder

ARG VITE_BACKEND_URL
ARG VITE_BACKEND_WS
ARG VITE_REST_API_SERVER

ENV NODE_ENV=development
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
ENV VITE_BACKEND_WS=$VITE_BACKEND_WS
ENV VITE_REST_API_SERVER=$VITE_REST_API_SERVER

RUN corepack enable && corepack prepare pnpm@latest --activate

# Set the working directory inside the container
WORKDIR /app

# Copy package manager lock files and install dependencies
COPY pnpm-lock.yaml ./
COPY package.json ./

# Make sure the dev dependencies (including Nest CLI) get installed for the build
RUN pnpm install --frozen-lockfile


# Copy the application code to the container
COPY . .


# Build the Vite application for production
RUN pnpm build

# Stage 2: Serve the app with a lightweight server for staging
FROM nginx:stable-alpine

# Set working directory to Nginx html folder
WORKDIR /usr/share/nginx/html

# Remove default Nginx static assets
RUN rm -rf ./*

# Copy built files from the previous stage
COPY --from=builder /app/dist ./

# Copy custom Nginx configuration, if needed (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]