const otpTemplate = (otp)=>{
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
        *{
            box-sizing: border-box;
            font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
            padding: 0;
            margin: 0;
        }
        h1{
            font-size: 70px;
            color: #b141fc;
            width: 100%;
            text-align: center;
            margin: 1.5rem 0 ;
        }
        h2{
            text-align: center;
            color: #b141fc;
        }
        @media (min-width: 300px) and (max-width: 600px) {
        h1{
            font-size: 60px;
        }
        }
        @media (min-width: 200px) and (max-width: 300px) {
        h1{
            font-size: 40px;
        }
        }
        @media (min-width: 100px) and (max-width: 200px) {
        h1{
            font-size: 20px;
        }
        }
        @media only screen and (max-width: 100px) {
        h1{
            font-size: 20px;
        }
        }
    
        </style>
    </head>
    <body>
        <div>
            <h1>Connectify</h1>
            <h2>OTP=> ${otp}</h2>
        </div>
    </body>
    </html> `
}

const sendLinkTemplate = (link) =>{
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            *{
                box-sizing: border-box;
                text-decoration: none;
                text-align: center;
                margin: 0;
                padding: 0;
                font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
            }
            h1{
                font-size: 70px;
                margin: 1rem 0;
                color: #b141fc;
                width: 100%;
            }
            h2{
                margin-bottom: 1.2rem;
            }
            button{
                font-size: 20px;
                background-color:#b141fc;
                border: 1px solid #b141fc;
                border-radius: 0.375rem;
                padding: 10px;
            }
            @media (min-width: 300px) and (max-width: 600px) {
            h1{
                font-size: 35px;
            }
            button{
                font-size: 10px;
                padding: 7px;
            }
            }
            @media (min-width: 200px) and (max-width: 300px) {
            h1{
                font-size: 25px;
            }
            button{
                font-size: 10px;
                padding: 5px;
            }
            }
            @media (min-width: 100px) and (max-width: 200px) {
            h1{
                font-size: 15px;
            }
            button{
                font-size: 8px;
                padding: 5px;
            }
            }
            @media only screen and (max-width: 100px) {
            h1{
                font-size: 10px;
            }
            button{
                font-size: 6px;
                padding: 4px;
            }
            }
        </style>
    </head>
    <body>
        <div>
            <h1>Connectify</h1>
            <h2>Change your password</h2>
            <button type="button"><a style="color: white;" href=${link}>Open Link</a></button>
        </div>
    </body> `
}

const greetingTemplate = (massage)=>{
    return` <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            *{
                box-sizing: border-box;
                text-decoration: none;
                text-align: center;
                font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
            }
            h1{
                font-size: 70px;
                color: #b141fc;
                width: 100%;
            }
            h2{
                color: #b141fc;
            }
            p{
                font-size: 20px;
            }
            button{
                font-size: 20px;
                background-color: #b141fc;
                border: 1px solid #b141fc;
                border-radius: 2px;
                padding: 10px;
            }
            @media (min-width: 300px) and (max-width: 600px) {
            h1{
                font-size: 35px;
            }
            p{
                font-size: 20px;
            }
            button{
                font-size: 10px;
                padding: 7px;
            }
            }
            @media (min-width: 200px) and (max-width: 300px) {
            h1{
                font-size: 25px;
            }
            p{
                font-size: 15px;
            }
            button{
                font-size: 10px;
                padding: 5px;
            }
            }
            @media (min-width: 100px) and (max-width: 200px) {
            h1{
                font-size: 15px;
            }
            p{
                font-size: 10px;
            }
            button{
                font-size: 8px;
                padding: 5px;
            }
            }
            @media only screen and (max-width: 100px) {
            h1{
                font-size: 10px;
            }
            p{
                font-size: 5px;
            }
            button{
                font-size: 6px;
                padding: 4px;
            }
            }
        </style>
    </head>
    <body>
        <div>
            <h1>Connectify</h1>
            <h2>Congratulations!</h2>
            <p>${massage}</p>
            <button type="button"><a style="color: white;" href=${process.env.FRONTEND_URL}>Go to homepage</a></button>
        </div>
    </body>
    </html> `
}

module.exports = {
    otpTemplate,
    sendLinkTemplate,
    greetingTemplate
}