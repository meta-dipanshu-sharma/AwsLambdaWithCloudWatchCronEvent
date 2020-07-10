# AwsLambdaWithCloudWatchCronEvent

A simple nodejs task to start and stop Ec2 instance on AWS programatically which runs at specific time in the morning to start and stops at night using cloudwatch cron events.
It uses a lambda function to start and stop ec2 instance. Cloudwatch event rule is used to invoke the function at specific time in a day.
