const AWS = require("aws-sdk");
const fs = require("fs");

//we'll use the aws-sdk to create the interface with DynamoDB. We'll also be using the file system package to read the users.json file
AWS.config.update({
  region: "us-east-2",
});
const dynamodb = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10",
});

//we'll use the fs package to read the users.json file and assign the object to the allUsers constant
console.log("Importing thoughts into DynamoDB. Please wait.");
const allUsers = JSON.parse(
  fs.readFileSync("./server/seed/users.json", "utf8")
);

//Next we'll loop over the allUsers array and create the params object with the elements in the array
allUsers.forEach((user) => {
  //n the loop, we assigned the values from the array elements in the Item property.
  const params = {
    TableName: "Thoughts",
    Item: {
      username: user.username,
      createdAt: user.createdAt,
      thought: user.thought,
    },
  };
  //we make a call to the database with the service interface object, dynamodb
  dynamodb.put(params, (err, data) => {
    if (err) {
      console.error(
        "Unable to add thought",
        user.username,
        ". Error JSON:",
        JSON.stringify(err.null, 2)
      );
    } else {
      console.log("PutItem succeeded:", user.username);
    }
  });
});
