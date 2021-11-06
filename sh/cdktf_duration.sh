#!/usr/bin/env bash

# Measure the execution tool time
start=$(date +%s)

cd ../ec2-nginx > /dev/null || exit
cdktf deploy --auto-approve > /dev/null

end=$(date +%s)
printf "===\nCDK for terraform\n"
printf  "Elapsed Time: %s seconds\n===\n" $(($end-$start))

cdktf destroy --auto-approve > /dev/null
cd - > /dev/null || exit