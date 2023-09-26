const nodemailer = require('nodemailer')
const {otpTemplate,sendLinkTemplate,greetingTemplate} = require('./mailTemplate.js')
const transport = nodemailer.createTransport({
    host:process.env.MAIL_HOST,
    port:process.env.MAIL_PORT,
    secure:false,
    requireTLS:true,
    auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS
    }
})
const sendOtp = (to,otp)=>{
    transport.sendMail({
        from:process.env.MAIL_USER,
        to:to,
        subject:'Connectify Verify Account OTP',
        html:otpTemplate(otp)
    },(err,info)=>{
        if(err){
            console.log(`MAIL ERROR => ${err}`)
        }else{
            console.log('Mail sent successfylly')
        }
    })
}
const sendLink = (to,Link)=>{
    transport.sendMail({
        from:process.env.MAIL_USER,
        to:to,
        subject:'Connectify Change your password',
        html:sendLinkTemplate(Link)
    },(err,info)=>{
        if(err){
            console.log(`MAIL ERROR => ${err}`)
        }else{
            console.log('Mail sent successfylly')
        }
    })
}

const greetingMail = (to,massage)=>{
    transport.sendMail({
        from:process.env.MAIL_USER,
        to:to,
        subject:`Connectify`,
        html:greetingTemplate(massage)
    },(err,info)=>{
        if(err){
            console.log(`MAIL ERROR => ${err}`)
        }else{
            console.log('Mail sent successfylly')
        }
    })
}

module.exports={
    sendOtp,
    sendLink,
    greetingMail
}