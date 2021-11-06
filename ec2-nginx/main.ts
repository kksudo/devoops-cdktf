import {Construct} from 'constructs';
import {App, TerraformStack, TerraformOutput} from 'cdktf';
import {AwsProvider, EC2, VPC} from './.gen/providers/aws';
import { readFileSync } from 'fs';

class MyStack extends TerraformStack {
    constructor(scope: Construct, name: string) {
        super(scope, name);

        // Configures the AWS provider
        new AwsProvider(this, 'aws', {
            region: 'eu-central-1',
        })

        const sg = new VPC.SecurityGroup(this, "default", {
            name: "allow-http-web",
            description: "Allow all incoming http traffic",
            ingress: [
                {
                    description: "Allow all incoming http traffic",
                    cidrBlocks: ["0.0.0.0/0"],
                    protocol: "TCP",
                    fromPort: 80,
                    toPort: 80,
                    securityGroups: [],
                    ipv6CidrBlocks: [],
                    prefixListIds: [],
                    selfAttribute: false,
                },
            ],
            egress: [
                {
                    description: "Allow all outgoing traffic",
                    cidrBlocks: ["0.0.0.0/0"],
                    fromPort: 0,
                    toPort: 0,
                    protocol: "-1",
                    securityGroups: [],
                    ipv6CidrBlocks: [],
                    prefixListIds: [],
                    selfAttribute: false,
                },
            ]
        });
        const initScriptFile = readFileSync('./provision.sh', 'utf-8');

        // Configures the EC2 instance
        const instance = new EC2.Instance(this, 'compute', {
            ami: 'ami-047e03b8591f2d48a',
            instanceType: 't2.micro',
            vpcSecurityGroupIds: [sg.id],
            userData: initScriptFile
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
