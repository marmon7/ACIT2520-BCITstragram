const path = require("path");
/*
 * Project: Milestone 1
 * File Name: main.js
 * Description: This file contains the main logic for the application.
 *
 * Created Date: October 10 2023
 * Author: Brandon Barnett
 *
 */

const IOhandler = require("./IOhandler");
const pathProcessed = path.join(__dirname, "grayscaled");
const fs = require("fs");
const pathIn = path.join(__dirname, "myfile.zip");
const pathOut = path.join(__dirname, "unzipped");

// Step 1: read zip
// Step 2: unzip
// step 3: read all png
// step 4: grayscale
// step 5: after all images grayscaled show success message
// all errors must show in .catch in promise chain
// use promise.all() to wait for all images to be grayscaled

IOhandler.unzip(pathIn, pathOut)
IOhandler.readDir(pathOut).then((pngs) => {console.log(pngs);})