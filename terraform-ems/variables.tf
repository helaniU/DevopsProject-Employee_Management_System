variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "ap-south-1"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}

variable "github_repo_url" {
  description = "GitHub repository URL"
  type        = string
  default     = "https://github.com/helaniU/DevopsProject-Employee_Management_System"
}

variable "key_pair_name" {
  description = "Name of the AWS key pair"
  type        = string
  default     = "terraform-key"
}

variable "public_key_path" {
  description = "Path to the public key file"
  type        = string
  default     = "/home/helaa/.ssh/id_ed25519.pub"
}

variable "enable_monitoring" {
  description = "Enable CloudWatch monitoring"
  type        = bool
  default     = true
}

variable "tags" {
  description = "Common tags for all resources"
  type        = map(string)
  default = {
    Project     = "Employee-Management-System"
    Environment = "Production"
    Terraform   = "true"
  }
}
