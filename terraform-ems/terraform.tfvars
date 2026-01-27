aws_region = "ap-south-1"
instance_type = "t2.micro"
key_pair_name = "terraform-key"
public_key_path = "/home/helaa/.ssh/id_ed25519.pub"
enable_monitoring = true

tags = {
  Project     = "Employee-Management-System"
  Environment = "Production"
  Terraform   = "true"
  Owner       = "helaa"
}
