data "local_file" "initScriptFile" {
  filename = "${path.module}/provision.sh"
}

resource "aws_security_group" "allow_web" {
  name        = "allow-http-web"
  description = "Allow all incoming http traffic"

  ingress = [
    {
      description = "Allow all incoming http traffic"
      from_port   = 80
      to_port     = 80
      protocol    = "TCP"
      cidr_blocks = ["0.0.0.0/0"]
      security_groups : []
      ipv6_cidr_blocks : []
      prefix_list_ids : []
      self : false
    }
  ]

  egress = [
    {
      description : "Allow all outgoing traffic",
      from_port   = 0
      to_port     = 0
      protocol    = "-1"
      cidr_blocks = ["0.0.0.0/0"]
      security_groups : []
      ipv6_cidr_blocks : []
      prefix_list_ids : []
      self : false

    }
  ]
}

resource "aws_instance" "web" {
  ami           = "ami-047e03b8591f2d48a"
  instance_type = "t2.micro"
  user_data     = data.local_file.initScriptFile.content
  vpc_security_group_ids = [aws_security_group.allow_web.id]
}