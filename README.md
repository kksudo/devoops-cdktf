# devoops-cdktf
DEMO: CDK for Terraform: programming infrastructure in high-level languages

## Subject  

[Pulumi and CDK for Terraform: programming infrastructure in high-level languages](https://devoops.ru/en/talks/pulumi-and-cdk-for-terraform-programming-infrastructure-in%20high-level%20languages/)

## Description  

Nowadays Terraform is leading among IaC solutions where its own configuration language HCL (HashiCorp Configuration Language) is widely used.
Although this language is pretty simple, it has its own specifics, different types of variables and approach to cycles which is not always evident. Thus, DevOps and developers have to spend time on figuring out its subtleties and opportunities.
In their talk the speakers would like to present other way of working with IaC, using different programming languages with Pulumi and cdktf as the example. So, the developers and DevOps may use familiar tools and IDE while working with infrastructure

## What's inside?

There are few examples to demonstrate deploy infrastructure like ~~code~~ software without DSL and YAML.

### ec2-nginx   

It's a simple example to deploy via CDKTF (typescript)

* Deploy EC2 instance 
* Allow I/O traffic
* Setup nginx web-server
* Change welcome page


### ec2-nginx-terraform 

Same as ec2-nginx   

* Deploy EC2 instance 
* Allow I/O traffic
* Setup nginx web-server
* Change welcome page

### sh  

There are few scripts to measure time deploy Cloud Development Kit for Terraform vs native Terraform


## How to run ?

* Install requirements 
  * Terraform v1+
  * CDK for Terraform 0.6.4 ( The 0.7.0 CDKTF works unstable )
  * Node.js v16
  * an AWS account and AWS Access Credentials 
* Move to `ec2-nginx` and run `cdktf deploy` 

## Links

* [devoops-pulumi](https://github.com/ilyareist/devoops-pulumi)
* [devoops conf](https://devoops.ru/en/talks/pulumi-and-cdk-for-terraform-programming-infrastructure-in%20high-level%20languages/)


