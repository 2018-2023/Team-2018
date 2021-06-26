const functions = require("firebase-functions")

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// オブジェクトの生成
const express = require("express")
const apiRouter = require("./route")
const app = express()
app.use("/", apiRouter)
exports.hottoPepperApi = functions
  .region("asia-northeast1")
  .https.onRequest(app)
