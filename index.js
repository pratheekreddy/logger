import {DynamoDB} from "@aws-sdk/client-dynamodb";
import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import * as fs from 'fs';

// const client = new DynamoDB({
//     region: "us-west-2",
//     endpoint: "http://localhost:8000",
//     accessKeyId: 'local',
//     secretAccessKey: 'local',
//   })
//   async function test(){
//     const results = await client.listTables({});
//     console.log(results.TableNames);
//   }
//   test()
// console.log(DynamoDB.)
// console.log(pratheek.dynamoDB)
// AWS.DynamoDB.createTable()
// import fs from 'fs'
// const AWS = require('aws-sdk')

// const DynamoDB = AWS.DynamoDB

// AWS.config.update({
//   region: "us-west-2",
//   endpoint: "http://localhost:8000",
//   accessKeyId: 'local',
//   secretAccessKey: 'local',
// });

// var params = {
//     TableName : "Logs",
//     KeySchema: [
//         { AttributeName: "id", KeyType: "HASH"}, 
// ],
//     AttributeDefinitions: [
//         { AttributeName: "id", AttributeType: "N" },
// ],
//     ProvisionedThroughput: {
//         ReadCapacityUnits: 5,
//         WriteCapacityUnits: 5
//     }
// };
var logs = JSON.parse(fs.readFileSync('logs.json', 'utf8'))[0];
// console.log(logs)
// var params_put = {
//     TableName: "Logs",
//     Item: logs
// };
// module.exports = async function dynamo(){
// try{
//     DynamoDB.createTable(params, function(err, data) {
//         if (err) {
//             console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
//         } else {
//             console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
//         }
//     });
// }
// catch(e){
//     console.log('e')
// }

// var docClient = new AWS.DynamoDB.DocumentClient();
// docClient.put(params_put, function(err, data) {
//     if (err) {
//         console.error("Unable to add logs", logs.name, ". Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         console.log("PutItem succeeded:", logs.name);
//     }
//  });

// let tables = await DynamoDB.listTables({Limit: 10})
// console.log(tables)
// }

class Logger {
    client 
    constructor(){
        this.client = new DynamoDB({
            region: "us-west-2",
            endpoint: "http://localhost:8000",
            accessKeyId: 'local',
            secretAccessKey: 'local',
          })

        this.params = {
            TableName : "Logs",
            KeySchema: [
                { AttributeName: "id", KeyType: "HASH"}, 
        ],
            AttributeDefinitions: [
                { AttributeName: "id", AttributeType: "N" },
        ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        };
        
    }
    async error(message, log){
        // await this.client.createTable(this.params)
        var params_put = {
            TableName: "Logs",
            Item: {...log, "level" : "error", "message" : message }
        };
        // await this.client.putItem(params_put)
        this.client.send(new PutCommand(params_put))
        this.client.send(new GetCommand(params))
    }

    async info(message, log){
        // await this.client.createTable(this.params)
        var params_put = {
            TableName: "Logs",
            Item: {...log, "level" : "info", "message" : message }
        };
        let put = await this.client.send(new PutCommand(params_put))
        let get = await this.client.send(new GetCommand(params_put))
        console.log(get)
        
    }
}

const logger = new Logger()
logger.info('hello', {"id": 2,"name":"pratheek", "branch": "cs"})
export { logger }