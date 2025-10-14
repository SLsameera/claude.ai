Terraform skeleton

This folder is a placeholder for Terraform infrastructure code. Recommended structure:

- infra/
  - modules/
  - environments/
    - prod/
    - staging/
  - provider.tf
  - backend.tf
  - variables.tf

Start by adding provider configuration (AWS/GCP/Azure) and a module for VPC/EKS/RDS.
