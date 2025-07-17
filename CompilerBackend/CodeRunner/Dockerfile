
FROM ubuntu:22.04


RUN apt-get update && apt-get install -y \
    g++ \
    gcc \
    openjdk-17-jdk \
    python3 \
    python3-pip \
    nodejs \
    curl \
     coreutils \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app
