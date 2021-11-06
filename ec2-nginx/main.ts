import {Construct} from 'constructs';
import {App, TerraformStack, TerraformOutput} from 'cdktf';
import {AwsProvider, EC2, VPC} from './.gen/providers/aws';

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

        // Configures the EC2 instance
        const instance = new EC2.Instance(this, 'compute', {
            //Nginx
            ami: 'ami-08ac35ebc1125d88c',
            // Ubuntu
            // ami: 'ami-08ac35ebc1125d88c',
            instanceType: 't2.micro',
            vpcSecurityGroupIds: [sg.id]
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
