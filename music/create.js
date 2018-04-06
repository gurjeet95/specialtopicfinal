const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
module.exports.create = (event, context, callback) => {
    const data = JSON.parse(event.body);
    console.log(data)
    const filename = data.songname
    const params = {
        TableName: 'playlisttable',
        Item: {
            playlistName: data.playlistname,
            fileName: data.songname
        }
    }
    
    const params2 = {
    TableName: 'musicapptable',
    Key: {
    fileName: filename
    }
    };
    
    
    dynamoDb.get(params2, (error, result) => {
     if(error){
         console.log("error");
     console.log(error);
     callback(new Error('Song is not available in your s3 bucket.'));
     return;
     }
     let info = result.Item;
     if(info == undefined){
     const response = {
     statusCode: 200,
     body: JSON.stringify({
      message: 'No Song with that name available in your s3 bucket',
    })
     };
     callback(null,response);
     return;
     }
else{
    dynamoDb.put(params,(error, result) => {
        if(error){
            console.log(error)
            callback(new Error('could not able to add song to your playlist.'));
            return;
        }
        const response1 ={
            statusCode: 200,
            body: JSON.stringify({
      message: 'Song is added to your playlist',
    })
        }
        callback(null,response1);
    })
}
})
}