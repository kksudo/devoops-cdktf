import { Construct } from "constructs";
import { App, TerraformStack, TerraformOutput } from "cdktf";
import { AwsProvider, EC2 } from "./.gen/providers/aws";

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    // Configures the AWS provider
    new AwsProvider(this, 'aws', {
      region: 'us-west-1',
    })

    // Configures the EC2 instance
    const instance = new EC2.Instance(this, 'compute', {
      ami: 'ami-01456a894f71116f2',
      instanceType: 't2.micro',
    })

    // Output similar terraform output
    new TerraformOutput(this, 'public_ip', {
      value: instance.publicIp,
    })
  }
}

const app = new App();
new MyStack(app, "ec2-nginx");
app.synth();
