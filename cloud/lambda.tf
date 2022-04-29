data "archive_file" "scraper" {
  type        = "zip"
  source_dir  = "scraper"
  output_path = "scraper.zip"
}

resource "aws_lambda_function" "scraper" {
  function_name = "scraper"
  runtime = "nodejs14.x"
  role = aws_iam_role.lambda_role.arn

  source_code_hash = base64sha256(filesha256("scraper.zip"))
  filename = data.archive_file.scraper.output_path
  handler = "index.handler"
  timeout = 15
}