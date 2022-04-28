resource "aws_cloudwatch_log_group" "scraper" {
  name = "/aws/lambda/${aws_lambda_function.scraper.function_name}"
  retention_in_days = "5"
}