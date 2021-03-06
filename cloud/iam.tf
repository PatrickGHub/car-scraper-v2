data "aws_iam_policy_document" "lambda-role-policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "lambda_role" {
  name = "lambda_role"
  assume_role_policy = data.aws_iam_policy_document.lambda-role-policy.json

  inline_policy {
    name   = "scraper_role_policy"
    policy = jsonencode(
      {
        Statement = [
          {
            Action = [
              "s3:PutObject",
              "s3:GetObject"
              ]
            Effect = "Allow"
            Resource = "arn:aws:s3:::car-scraper-bucket/cars.json"
          },
          {
            Action = [
              "logs:CreateLogStream",
              "logs:CreateLogGroup",
              "logs:PutLogEvents"
            ]
            Effect = "Allow"
            Resource = "*"
          }
        ]
        Version = "2012-10-17"
      }
    )
  }
}