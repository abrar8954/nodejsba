const admin =  require('firebase-admin')
const express = require('express')
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


app.post('/send-noti',(req,res)=>{
    console.log('req.body.tokens: ', req.body.tokens)
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain');
    // res.end('HI there');
   const message = { 
    notification:{
        title:"title",
        body:"new ad posted click to open",
        imageUrl: 'https://my-cdn.com/app-logo.png',
    },
    tokens:req.body.tokens
    
}

admin.messaging().sendMulticast(message).then(res=>{
   console.log('send success')
}).catch(err=>{
    console.log(err)
}) 
})

app.listen(port,()=>{
    console.log('server running')
})