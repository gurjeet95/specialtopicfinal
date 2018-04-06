const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
module.exports.filesaveinf = (event) => {
  event.Records.forEach((record) => {
      console.log(record);
    const filename = record.s3.object.key;
    const date = record.eventTime;
    const params = {
        TableName: 'musicapptable',
        Item: {
            fileName: filename ,
            dateCreated : date
        }
    }
    
    dynamoDb.put(params,(error, result) => {
        if(error){
            console.log(error);
        }
        console.log("success");
    });
  });
}