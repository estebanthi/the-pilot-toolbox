import nodemailer from "nodemailer";


export default async function asynchandler(req, res) {

    const transporter = await nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }

    })
    var mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: req.body.email,
        subject: "The Pilot Toolbox - Réinitialisation de votre mot de passe",
        text: "Voici votre code : "+req.body.code,
    };
    await transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.status(500).json(error)
        } else {
            res.status(200).json('Email sent')
        }
    })

    return

}