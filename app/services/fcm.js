const db = require('../services/dboperations');
const Model = require('../Model/');
const FCM = require('fcm-node');
const serverKey = require('../../rpiit-78fbe-firebase-adminsdk-cmvr9-d99188f402.json');
const fcm = new FCM(serverKey);

exports.sendPushNotification = async (message) => {
    try {
        console.log(message);
        
        const noti = await global.firebaseAdmin.messaging().send({
            data: message,
            topic: 'rpiit-web'  // put correct topic name here
          })
        console.log(noti);

    }
    catch (err) {
        console.log('ERROR', err);
    }
}

exports.sendPushNotificationWithToken = async (appRegisterationKey, message, priority) => {
    try {
        console.log(message);
        
        const noti = await global.firebaseAdmin.messaging().sendToDevice(appRegisterationKey, message, { priority, timeToLive: 60 * 60 * 24 })
        console.log(noti);

    }
    catch (err) {
        console.log('ERROR', err);
    }
}

exports.getAllStudentsForNotification = async () => {
    try {
        let studentData = await db.getData(Model.Student);
        if (!studentData) {
            return [];
        }
        else {
            return studentData.map(val => val.deviceToken)
        }
    } catch (err) {
        console.log(err);
    }
}

exports.sendNotificationToAllStudentsWithTopic = async (message) => {
    // for token based system
    this.sendPushNotification(message);
}

exports.sendNotificationToAllStudentsWithToken = async (message) => {
    // get the tokens from db
    const studentDeviceTokens = await this.getAllStudentsForNotification();
    
    // for sample purpose
    // const studentDeviceTokens = ['fCrXvJudQZae8hwGkFmtwf:APA91bHmtQtp5F8WY_IDZfQDfHhFok7cZjHh_IfwtXAzFG8CH-wQK1qi5GBtdQEEIrjwUoNQ9-9pfFYMZ_Km2VtnkfkX-8K42WVi68VNQgGPS8gWu820EL51RMoBwDo-WPEGGdg8z5FJ']

    console.log(studentDeviceTokens);

    // for token based system
    if (studentDeviceTokens.length > 0) {
        this.sendPushNotificationWithToken(studentDeviceTokens, {notification: message}, 'normal');
    }
}

// call this function wherever needed notification (topic based)
// sendNotificationToAllStudentsWithTopic({
  //   title: "This is a announcement Notification",
  //   body: "This is the body of the notification message."
  // })


//   // call this function wherever needed notification (token based)
// sendNotificationToAllStudentsWithToken({
  //   title: "This is a announcement Notification",
  //   body: "This is the body of the notification message."
  // })