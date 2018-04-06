const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
module.exports.filedelinf = (event) => {
  event.Records.forEach((record) => {
    const filename = record.s3.object.key;
   const params = {
    TableName: 'musicapptable',
    Key: {
    fileName: filename
    }
    };
    
    	dynamoDb.delete(params, (error) => {
     if(error){
     console.log(error);
     }
     else{
       console.log("success");
     }
});
});
}