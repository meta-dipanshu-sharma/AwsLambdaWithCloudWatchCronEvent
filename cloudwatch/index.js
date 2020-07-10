const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-2' })

var cloudWatchEvents = new AWS.CloudWatchEvents({ apiVersion: "2016-11-15" })

var lambda = new AWS.Lambda()

var cloudWatchParams = {
    Name: "cronFromCodeToStopEc2Instance",
    ScheduleExpression: "cron(50 8 * * ? *)",
    State: "ENABLED"
}

return new Promise((resolve, reject) => {
    cloudWatchEvents.putRule(cloudWatchParams, function (err, data) {
        if (err) {
            console.log("Error", err)
            reject(err)
        } else {
            console.log("Success", data.RuleArn)
            var lambdaParams = {
                Action: "lambda:InvokeFunction",
                FunctionName: "ec2StartStopFunc1",
                Principal: "events.amazonaws.com",
                SourceArn: data.RuleArn,
                StatementId: "ID-01"
            }
            lambda.addPermission(lambdaParams, function (err, data) {
                if (err) {
                    console.log(err, err.stack)
                    reject(err)
                }
                else {
                    console.log(data)
                    resolve(data)
                }
            })
        }
    })
})
    .then(() => {
        return new Promise((resolve, reject) => {
            var targetParams = {
                Rule: "cronFromCodeToStopEc2Instancetest",
                Targets: [
                    {
                        Arn: "arn:aws:lambda:us-east-2:403868635036:function:ec2StartStopFunc1",
                        Id: "myCloudWatchEventsTarget",
                        Input: '{ "type": "stop" }'
                    }
                ]
            }

            cloudWatchEvents.putTargets(targetParams, function (err, data) {
                if (err) {
                    console.log("Error", err)
                } else {
                    console.log("Success", data)
                }
            })
        })
    })
