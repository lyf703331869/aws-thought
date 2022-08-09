const { v4: uuidv4 } = require("uuid");
// we'll declare the params function
const params = (fileName) => {
  const myFile = fileName.originalname.split(".");
  const fileType = myFile[myFile.length - 1];

  const imageParams = {
    Bucket: "user-images-1f9c086d-2bb5-490c-bce6-7fb83464245b",
    Key: `${uuidv4()}.${fileType}`,
    Body: fileName.buffer,
  };

  return imageParams;
};

module.exports = params;
