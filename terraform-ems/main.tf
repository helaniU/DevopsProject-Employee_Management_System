resource "aws_security_group" "ems_sg" {
  name        = "ems-security-group"
  description = "Allow HTTP, HTTPS, and SSH for EMS application"
  vpc_id      = data.aws_vpc.default.id

  # Frontend (React) - Port 5333
  ingress {
    from_port   = 5333
    to_port     = 5333
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "React Frontend"
  }

  # Backend API - Port 5000
  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Node.js Backend API"
  }

  # MongoDB - Port 27017
  ingress {
    from_port   = 27017
    to_port     = 27017
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "MongoDB Database"
  }

  # HTTP - Port 80
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "HTTP"
  }

  # HTTPS - Port 443
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "HTTPS"
  }

  # SSH - Port 22
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "SSH Access"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow all outbound traffic"
  }

  tags = {
    Name = "EMS-Security-Group"
  }
}

data "aws_vpc" "default" {
  default = true
}

resource "aws_instance" "ems_server" {
  ami                    = "ami-0f5ee92e2d63afc18"
  instance_type          = "t2.micro"
  vpc_security_group_ids = [aws_security_group.ems_sg.id]
  key_name               = "terraform-key"
  associate_public_ip_address = true

  # User data script to install Docker and deploy EMS application
  user_data = base64encode(<<-EOF
              #!/bin/bash
              set -e
              
              # Update system
              yum update -y
              
              # Install Docker
              yum install -y docker git curl
              
              # Start Docker service
              systemctl start docker
              systemctl enable docker
              
              # Add ec2-user to docker group
              usermod -aG docker ec2-user
              
              # Install Docker Compose
              curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
              chmod +x /usr/local/bin/docker-compose
              
              # Create app directory
              mkdir -p /opt/ems
              cd /opt/ems
              
              # Clone the repository
              git clone https://github.com/helaniU/DevopsProject-Employee_Management_System .
              
              # Deploy using Docker Compose
              docker-compose up -d
              
              # Wait for services to start
              sleep 30
              
              # Log deployment status
              echo "EMS Application deployed successfully" > /var/log/ems-deployment.log
              docker ps >> /var/log/ems-deployment.log
              
              # Set up auto-restart on reboot
              echo "@reboot cd /opt/ems && docker-compose up -d" | crontab -
              
              EOF
  )

  tags = {
    Name = "EMS-Application-Server"
    Environment = "Production"
    Application = "Employee-Management-System"
  }
}

# Output the important information
output "instance_public_ip" {
  value       = aws_instance.ems_server.public_ip
  description = "Public IP address of the EMS application server"
}

output "instance_id" {
  value       = aws_instance.ems_server.id
  description = "EC2 instance ID"
}

output "frontend_url" {
  value       = "http://${aws_instance.ems_server.public_ip}:5333"
  description = "Frontend URL (React application)"
}

output "backend_url" {
  value       = "http://${aws_instance.ems_server.public_ip}:5000"
  description = "Backend API URL"
}

output "mongodb_connection" {
  value       = "mongodb://${aws_instance.ems_server.public_ip}:27017/EMS_DB"
  description = "MongoDB connection string"
}

output "ssh_command" {
  value       = "ssh -i /path/to/your/key.pem ec2-user@${aws_instance.ems_server.public_ip}"
  description = "SSH command to connect to the instance"
}

output "security_group_id" {
  value       = aws_security_group.ems_sg.id
  description = "Security group ID"
}