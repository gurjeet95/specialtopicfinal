const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
module.exports.get = (event, context, callback) => {
    const params = {
    TableName: 'musicapptable',
    Key: {
    fileName: event.pathParameters.name
    }
    };
	dynamoDb.get(params, (error, result) => {
     if(error){
     console.log(error);
     console.log("error");
     callback(new Error('No file with that name'));
     return;
     }
     let info = result.Item;
     if(info == undefined){
     const response = {
     statusCode: 200,
     body: JSON.stringify({
      message: 'No Song with that name',
    })
     };
     callback(null,response);
     return;
     
}
else{
    const response1 = {
     statusCode: 200,
     body: JSON.stringify(result.Item)
     };
     callback(null,response1);
     return;
}


	});
}