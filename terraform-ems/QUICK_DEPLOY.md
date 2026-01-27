# Quick Deploy Guide

## Prerequisites
- AWS access keys configured
- .pem file for SSH access
- Terraform installed

## Deploy Steps

```bash
# 1. Set AWS credentials (if not already set)
export AWS_ACCESS_KEY_ID="your-key"
export AWS_SECRET_ACCESS_KEY="your-secret"
export AWS_DEFAULT_REGION="ap-south-1"

# 2. Initialize terraform
terraform init

# 3. Check what will be created
terraform plan

# 4. Deploy
terraform apply
```

## After Deployment

Terraform will output:
- `instance_public_ip` - Your server's IP
- `frontend_url` - Access your app: http://<ip>:5333
- `backend_url` - API: http://<ip>:5000

## Access Your Server

```bash
ssh -i your-key.pem ec2-user@<public-ip>

# Check containers
docker ps

# View logs
docker logs frontend
docker logs backend
docker logs mongo
```

## Destroy (if needed)

```bash
terraform destroy
```

That's it!
