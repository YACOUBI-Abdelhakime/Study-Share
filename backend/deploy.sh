#!/bin/bash

# 1. Variables
SERVER_USER="ubuntu"
SERVER_IP="${EC2_IP}"
REMOTE_DIR="/home/ubuntu/my-server"
LOCAL_DIST_DIR="./dist"

# Clean up old files on the server
echo "Cleaning up old files on the server..."
ssh -i ~/.ssh/id_rsa $SERVER_USER@$SERVER_IP "rm -rf $REMOTE_DIR"

# Copy the dist folder to the server
echo "Copying the dist folder to the server..."
scp -i ~/.ssh/id_rsa -r $LOCAL_DIST_DIR $SERVER_USER@$SERVER_IP:$REMOTE_DIR/dist

# Copy the package.json to the server
echo "Copying the package.json to the server..."
scp -i ~/.ssh/id_rsa -r ./package.json $SERVER_USER@$SERVER_IP:$REMOTE_DIR

# Get dependencies
echo "Installing dependencies..."
ssh -i ~/.ssh/id_rsa $SERVER_USER@$SERVER_IP "cd $REMOTE_DIR && npm install"


# Run the production build <TEST>
echo "Running the production build..."
ssh -i ~/.ssh/id_rsa $SERVER_USER@$SERVER_IP "cd $REMOTE_DIR && npm run prod"

# End of script
echo "Deployment completed successfully!"
