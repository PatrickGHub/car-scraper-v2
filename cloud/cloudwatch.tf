resource "aws_cloudwatch_log_group" "scraper" {
  name = "/aws/lambda/${aws_lambda_function.scraper.function_name}"
  retention_in_days = "5"
}

resource "aws_cloudwatch_event_rule" "trigger_scraper" {
  name = "trigger_scraper"
  schedule_expression = "cron(0 13 * * ? *)"
}

resource "aws_cloudwatch_event_target" "trigger_scraper_target" {
  rule = aws_cloudwatch_event_rule.trigger_scraper.name
  arn = aws_lambda_function.scraper.arn
}