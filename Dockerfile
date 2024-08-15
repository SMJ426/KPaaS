# **********
# base stage
# **********
FROM node:20.9.0-alpine AS base

WORKDIR /app

FROM base AS deps

# Copy package.json to /app
COPY package.json ./

# Copy available lock file
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Install dependencies according to the lockfile
RUN if [ -f "pnpm-lock.yaml" ]; then \
        npm install -g pnpm && \
        pnpm install; \
    elif [ -f "yarn.lock" ]; then \
        npm install -g yarn && \
        yarn install; \
    elif [ -f "package-lock.json" ]; then \
        npm install; \
    else \
        npm install; \
        # If you want to throw error on lockfile not being available, 
        # uncomment the following lines
        # echo "No Lockfile!"; \
        # exit 1; \
    fi

# Disable the telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# ***********
# inter stage
# ***********
FROM deps AS inter

# Copy all other files excluding the ones in .dockerignore
COPY . .

# Set build-time environment variables
ARG NEXT_PUBLIC_API_URL=http://default-api-gateway-05ed6-25524816-d29a0f7fe317.kr.lb.naverncp.com:8761
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Build the React application
RUN npm run build

# Exposing the port
EXPOSE 3000

# **********
# prod stage
# **********
FROM inter AS prod

CMD ["npm", "run", "dev"]