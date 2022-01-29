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
            return studentData.map(val => val.deviceToken).filter(val => val);
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
    // for token based system
    if (studentDeviceTokens.length > 0) {
        this.sendPushNotificationWithToken(studentDeviceTokens, {notification: message}, 'normal');
    }
}