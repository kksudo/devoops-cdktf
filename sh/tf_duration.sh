#!/usr/bin/env bash

# Measure the execution tool time
start=$(date +%s)

cd ../ec2-nginx-terraform || exit
terraform apply --auto-approve > /dev/null

end=$(date +%s)
printf "===\nNative terraform\n"
printf  "Elapsed Time: %s seconds\n===\n" $(($end-$start))

terraform destroy --auto-approve > /dev/null
cd - || exit