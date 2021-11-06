import {Construct} from 'constructs';
import {App, TerraformStack, TerraformOutput} from 'cdktf';
import {AwsProvider, Instance, SecurityGroup } from './.gen/providers/aws';

class MyStack extends TerraformStack {
    constructor(scope: Construct, name: string) {
        super(scope, name);

        // Configures the AWS provider
        new AwsProvider(this, 'aws', {
            region: 'eu-central-1',
        })

        new SecurityGroup(this, "web", {
            name: "allow-http-web",
            description: "Allow all incoming http traffic",
            egress: [
                {
                    cidrBlocks: ["0.0.0.0/0"],
                    description: "Allow all outgoing traffic",
                    fromPort: 0,
                    ipv6CidrBlocks: ["::/0"],
                    protocol: "-1",
                    toPort: 0,
                },
            ],
            ingress: [
                {
                    cidrBlocks: ["0.0.0.0/0"],
                    description: "Allow all incoming http traffic",
                    fromPort: 0,
                    protocol: "-1",
                    self: true,
                    toPort: 0,
                },
            ],
        });

        // Configures the EC2 instance
        const instance = new Instance(this, 'compute', {
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
