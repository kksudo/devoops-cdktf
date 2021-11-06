#!/bin/bash

# Install nginx
sudo amazon-linux-extras enable nginx1
sudo yum clean metadata
sudo yum -y install nginx

# Change welcome words
echo "<h2>Hello, DevOops! </h1><h2>$(date)</h2>" | sudo tee /usr/share/nginx/html/index.html
sudo systemctl start nginx
