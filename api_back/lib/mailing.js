//on importe la librairie nodemailer
const nodeMailer = require('nodemailer');
//on importe l'api de google
const { google } = require("googleapis");
//on récupère l'objet d'authentification du proprio du gmail à brancher
const OAuth2 = google.auth.OAuth2;

module.exports = (mailTo, subject, title, text) =>{
    //on instancie l'authentification qu'on pourra utiliser dans le transport du mail
    const oauth2Client = new OAuth2(
        "576921623851-a85v049s63lu8aso50hb2qr19sjd6do3.apps.googleusercontent.com", // client Id
        "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", // client secret
        "https://developers.google.com/oauthplayground",// Redirect URL
    )
    
    //envoi des identifications client.
    oauth2Client.setCredentials({
        refresh_token: "1//04v_zCBVtnV3mCgYIARAAGAQSNwF-L9IrYhAH8QS7TksmF1xtRFi6LWyi4oecDe0KWL5vxILVLqt7sprMw37mT6VkFHBq-TyDots"
    })
    
    console.log("oauth2Client: ", oauth2Client);
    const accessToken = oauth2Client.getAccessToken()
    //création du transport du mail pret à partir (préparation)
    let transporter = nodeMailer.createTransport({
        service: 'gmail',
        secure:true,
        auth: {
            type: 'OAuth2',
            user: 'teambasket2022@gmail.com',
            clientId: "576921623851-a85v049s63lu8aso50hb2qr19sjd6do3.apps.googleusercontent.com",
            clientSecret: "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",
            refreshToken: "1//04v_zCBVtnV3mCgYIARAAGAQSNwF-L9IrYhAH8QS7TksmF1xtRFi6LWyi4oecDe0KWL5vxILVLqt7sprMw37mT6VkFHBq-TyDots",
            accessToken: accessToken,
        },
        tls:{
        rejectUnauthorized:false
        }
    })
    
    //modèle du mail
    let mailOptions = {
      from:'"Team basket" <teambasket2022@gmail.com>', // sender address
      to: mailTo, // list of receivers
      subject: subject, // Subject line
      text: '', // plain text body
      html: '<b>'+title+'</b><p>'+text+'<p>' // html body
    };
    
    //chemin d'envoi du mail
    transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.log('ça rate');
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
        
    });
    
}
