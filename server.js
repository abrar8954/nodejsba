const admin = require('firebase-admin')
const express = require('express')
import notifee, { AndroidStyle } from '@notifee/react-native';
const app = express()
const port = process.env.PORT || 3000

var serviceAccount = require("./pushnotificationbtwdevices-firebase-adminsdk-ei1wh-6fca19de6a.json");
app.use(express.json())
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

//    const message = {
//     notification:{
//         title:"new ad",
//         body:"new ad posted click to open"
//     },
//     token: 'cnz2JTLuSyyHpkGw-YErLW:APA91bH_09XZ-0THSP1wPI9gBRr9LcSQQM6rv59aq5Qo936n6JWBlLBMVDjji_BinQZ74lNhBS58jocXSuWV1-XqUSAeKg0sFpmMuUhCA1i9n0Rv2kE-LLu64lVaunZ-DAV-u4_Wfycq'
// }


// admin.messaging().sendMulticast(message).then(res=>{
//   console.log('send success')
// }).catch(err=>{
//    console.log(err)
// }) 
// admin.messaging().send(message).then(res=>{
//   console.log('send success')
// }).catch(err=>{
//    console.log(err)
// }) 


//   async function onDisplayNotification() {
//     // Request permissions (required for iOS)
//     await notifee.requestPermission()

//     // Create a channel (required for Android)
//     const channelId = await notifee.createChannel({
//         id: 'default',
//         name: 'Default Channel',
//     });

//     // Display a notification
//     await notifee.displayNotification({
//         title: 'Notification Title',
//         body: 'Main body content of the notification',
//         android: {
//             channelId,
//             // largeIcon: 'https://firebasestorage.googleapis.com/v0/b/dukanfiba.appspot.com/o/images%2FshopImages%2F-NWDYgcOggK8JILReyRt?alt=media&token=58ede0d3-7b8a-4e51-8228-fd35660bc49e',
//             circularLargeIcon: 'https://firebasestorage.googleapis.com/v0/b/dukanfiba.appspot.com/o/images%2FshopImages%2F-NWDYgcOggK8JILReyRt?alt=media&token=58ede0d3-7b8a-4e51-8228-fd35660bc49e',
//             // smallIcon: , // optional, defaults to 'ic_launcher'.
//             // pressAction is needed if you want the notification to open the app when pressed
//             pressAction: {
//                 id: 'default',
//             },
//         },
//     });
// }

app.post('/send-noti', (req, res) => {
    console.log('req.body.tokens: ', req.body.tokens)
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain');
    // res.end('HI there');
    // const message = {
    //     notification: {
    //         title: "Hi! Abrar",
    //         body: "Where are you going? man.",

    //     },
    //     // notification: onDisplayNotification(),
    //     tokens: req.body.tokens
    // }

        const message = {
            data: {
                notifee: JSON.stringify({
                    title: 'Hi there',
                    body: 'This message was sent via FCM!',
                    android: {
                        channelId: 'default',
                        largeIcon: 'https://firebasestorage.googleapis.com/v0/b/dukanfiba.appspot.com/o/images%2FshopImages%2F-NWDYgcOggK8JILReyRt?alt=media&token=58ede0d3-7b8a-4e51-8228-fd35660bc49e',
                        actions: [
                            {
                                title: 'Mark as Read',
                                pressAction: {
                                    id: 'read',
                                },
                            },
                        ],
                        style: {
                            type: AndroidStyle.MESSAGING,
                            person: {
                                name: 'John Doe',
                                icon: 'https://my-cdn.com/avatars/123.png',
                            },
                            messages: [
                                {
                                    text: 'Hey, how are you?',
                                    timestamp: Date.now() - 600000, // 10 minutes ago
                                },
                                {
                                    text: 'Great thanks, food later?',
                                    timestamp: Date.now(), // Now
                                    person: {
                                        name: 'Sarah Lane',
                                        icon: 'https://my-cdn.com/avatars/567.png',
                                    },
                                },
                            ],
                        },
                    },
                }),
            },
            tokens: req.body.tokens

        }

        admin.messaging().sendMulticast(message).then(res => {
            console.log('send success')
        }).catch(err => {
            console.log(err)
        })
    })

app.listen(port, () => {
    console.log('server running')
})