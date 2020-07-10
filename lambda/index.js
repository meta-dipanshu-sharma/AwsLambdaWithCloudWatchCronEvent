const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-2' })

const ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })

const params = {
    InstanceIds: [
        'i-03ca061abfd1b1cde'
    ]
}

exports.handler = async (event) => {
    try {
        const data = await new Promise((resolve, reject) => {
            if (event.type === "start") {
                ec2.startInstances(params,
                    function (err, data) {
                        if (err) {
                            console.log(err, err.stack)
                            reject(err)
                        } else {
                            console.log(`Starting ec2 instance ${InstanceIds[0]} at ${new Date()}`)
                            resolve(data)
                        }
                    })
            }
            else {
                ec2.stopInstances(params,
                    function (err, data) {
                        if (err) {
                            console.log(err, err.stack)
                            reject(err)
                        } else {
                            console.log(`Stopping ec2 instance ${InstanceIds[0]} at ${new Date()}`)
                            resolve(data)
                        }
                    })
            }
        })
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        }
    }
    catch (err) {
        return {
            statusCode: 400,
            body: err.message
        }
    }
}