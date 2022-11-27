import AWS from "aws-sdk";

class Logger {
  client;
  tablecreate;
  params;
  table;
  constructor(region = "us-west-2", endpoint = "http://localhost:8000", accessKeyId = "local", secretAccessKey = "local") {
    this.client = new AWS.DynamoDB.DocumentClient({
      region: region,
      endpoint: endpoint,
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    });
    this.tablecreate = new AWS.DynamoDB({
      region: "us-west-2",
      endpoint: "http://localhost:8000",
      accessKeyId: "local",
      secretAccessKey: "local",
    });
    this.table = {
      TableName: "Logs",
      KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
      AttributeDefinitions: [{ AttributeName: "id", AttributeType: "N" }],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
    };
    this.params = {
      TableName: "Logs",
    };
    this.tablecreate.createTable(this.table, function (err, data) {
    });
  }

  async error(message, log) {
    let id = Math.floor(new Date().getTime() / 1000);
    var params_put = {
      Item: { ...log, id, level: "error", message: message },
      ...this.params,
    };
    this.client.put(params_put, (err, data) => {
      if (!err) {
        console.log(data);
      } else {
        console.log(err);
      }
    });
  }

  async debug(message, log) {
    let id = Math.floor(new Date().getTime() / 1000);
    var params_put = {
      Item: { ...log, id, level: "debug", message: message },
      ...this.params,
    };
    this.client.put(params_put, (err, data) => {
      if (!err) {
        console.log(data);
      } else {
        console.log(err);
      }
    });
  }

  async warn(message, log) {
    let id = Math.floor(new Date().getTime() / 1000);
    var params_put = {
      Item: { ...log, id, level: "warning", message: message },
      ...this.params,
    };
    this.client.put(params_put, (err, data) => {
      if (!err) {
        console.log(data);
      } else {
        console.log(err);
      }
    });
  }

  async info(message, log) {
    let id = Math.floor(Date.now());
    var params_put = {
      Item: { ...log, id, level: "info", message: message },
      ...this.params,
    };
    this.client.put(params_put, (err, data) => {
      if (!err) {
        console.log(data);
      } else {
        console.log(err);
      }
    });
  }
}

const logger = new Logger();
export { logger, Logger };
