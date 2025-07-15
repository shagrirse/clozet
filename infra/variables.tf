variable "s3_bucket_name" {
  description = "Name of the S3 bucket"
  type        = string
  default     = "clozet-images"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "dev"
}

variable "use_localstack" {
  description = "Set to true to use LocalStack endpoints"
  type        = bool
  default     = false
}