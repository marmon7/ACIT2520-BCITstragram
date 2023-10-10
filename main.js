const path = require("path");
/*
 * Project: Milestone 1
 * File Name: main.js
 * Description:
 *
 * Created Date:
 * Author:
 *
 */

const IOhandler = require("./IOhandler");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");
const unzipper = require("unzipper");
const fs = require("fs");

// Step 1: read zip
// Step 2: unzip
// step 3: read all png
// step 4: grayscale
// step 5: after all images grayscaled show success message
// all errors must show in .catch in promise chain
// use promise.all() to wait for all images to be grayscaled

fs.createReadStream(zipFilePath)
.pipe(unzipper.Extract({ path: pathUnzipped }))

const PNG = require("pngjs").PNG;

fs.createReadStream("unzipped/in.png")
  .pipe(
    new PNG({})
  )
  .on("parsed", function () {
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        var idx = (this.width * y + x) << 2;

        // invert color
        this.data[idx] = 255 - this.data[idx];
        this.data[idx + 1] = 255 - this.data[idx + 1];
        this.data[idx + 2] = 255 - this.data[idx + 2];

        // and reduce opacity
        this.data[idx + 3] = this.data[idx + 3] >> 1;
      }
    }

    this.pack().pipe(fs.createWriteStream("out.png"));
  });