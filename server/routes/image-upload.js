const express = require("express");
const router = express.Router();
const multer = require("multer");
const AWS = require("aws-sdk");
const paramsConfig = require("../utils/params-config");

// we'll create a temporary storage container that will hold the image files until it is ready to be uploaded to the S3 bucket
const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

// we'll declare the upload object, which contains the storage destination and the key, image
const upload = multer({ storage }).single("image");

// we'll instantiate the service object, s3, to communicate with the S3 web service, which will allow us to upload the image to the S3 bucket
const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
});

router.post("/image-upload", upload, (req, res) => {
  console.log("post('/api/image-upload'", req.file);
  const params = paramsConfig(req.file);
  // use the s3 service interface object we instantiated previously with the aws-sdk package to call the upload() method
  s3.upload(params, (err, data) => {
    if (err) {
      console.log(err);
      res.json(500).send(err);
    }
    res.json(data);
  });
});

module.exports = router;
