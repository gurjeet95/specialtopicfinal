const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
module.exports.list = (event, context, callback) => {
    const params = {
    TableName: 'musicapptable'
    }
	dynamoDb.scan(params, (error, result) => {
     if(error){
     console.error(error);
     callback(new Error('could not fetch the songs'));
     return;
     }
     const response = {
     statusCode: 200,
     body: JSON.stringify(result.Items)
     };
     callback(null,response);
	});
}