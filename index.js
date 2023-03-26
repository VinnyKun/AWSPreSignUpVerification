const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    const user = event.request.userAttributes;
    const email = user.email;
    const ses = new AWS.SES({ region: 'us-east-1' });
    const params = {
        EmailAddress: email
    };

    try {
        const data = await ses.verifyEmailIdentity(params).promise();
        console.log(data);
    } catch (err) {
        console.log(err);
        throw err;
    }

    event = {
        ... event,
        response : {
            autoVerifyEmail: true,
            autoConfirmUser: true
        }
    }
    return event;
};