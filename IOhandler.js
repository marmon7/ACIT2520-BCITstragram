/*
 * Project: Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date: October 10 2023
 * Author: Brandon Barnett
 *
 */

const AdmZip = require("adm-zip"),
  fs = require("fs"),
  PNG = require("pngjs").PNG,
  path = require("path");

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    const zip = new AdmZip(pathIn);
    zip.extractAllToAsync(pathOut, true, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, pngs) => {
      if (err) {
        reject(err);
      } else {
        pngs = pngs.filter((png) => {
          return path.extname(png) === ".png";
        });
        resolve(pngs);
      }
    });
  });
};
/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
  const readStream = fs.createReadStream(pathIn);
  const writeStream = fs.createWriteStream(pathOut);
  const pngStream = new PNG().on("parsed", function () {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const idx = (this.width * y + x) << 2;
        const red = this.data[idx];
        const green = this.data[idx + 1];
        const blue = this.data[idx + 2];
        const alpha = this.data[idx + 3];
        const grey = (red + green + blue) / 3;
        this.data[idx] = grey;
        this.data[idx + 1] = grey;
        this.data[idx + 2] = grey;
        this.data[idx + 3] = alpha;
      }
    }
    this.pack();
  });
  readStream
    .on("error", (err) => {
      reject(err);
    })
    .pipe(pngStream)
    .on("error", (err) => {
      reject(err);
    })
    .pipe(writeStream)
    .on("error", (err) => {
      reject(err);
    });
};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
