#!/bin/bash

mkdir -p ./build_context


# 3. Build the docker image
docker build --platform=linux/x86_64 -t demo-project:latest .

# pushing the docker image into aws. if you want to run it locally, please comment out the next two lines.

# Authenticate Docker with ECR
aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin 836659526145.dkr.ecr.eu-west-1.amazonaws.com

docker tag demo-project:latest 836659526145.dkr.ecr.eu-west-1.amazonaws.com/demo-project:latest

docker push 836659526145.dkr.ecr.eu-west-1.amazonaws.com/demo-project:latest


# 4. Clean up the temporary folder after build
echo "Cleaning up..."
rm -rf ./build_context