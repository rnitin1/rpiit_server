const db = require('../services/dboperations');
const Model = require('../Model/');
const FCM = require('fcm-node');
const serverKey = require('../../rpiit-78fbe-firebase-adminsdk-cmvr9-d99188f402.json');
const fcm = new FCM(serverKey);

exports.sendPushNotification = async (appRegisterationKey, message, priority) => {
    try {

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

exports.sendNotificationToTopics = (topic, message) => {
    const message1 = {
        to: topic,  // either DeviceRegistrationToken or topic
        notification: message

    };
    console.log(message1);
    fcm.send(message1, function (err, response) {
        if (err) {
            console.log(err);
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });
}

exports.sendNotificationToAllStudents = async (message, topic = '') => {
    // const studentDeviceTokens = await this.getAllStudentsForNotification();
    const studentDeviceTokens = ['absnckcndknc']

    console.log(studentDeviceTokens);

    // for token based system
    // if (studentDeviceTokens.length > 0) {
    //     for (let i = 0; i < studentDeviceTokens.length; i++) {
    //         this.sendPushNotification(studentDeviceTokens, {notification: message}, 'normal');
    //     }
    // }

    // for topics
    // this.sendNotificationToTopics(topic, message);
}