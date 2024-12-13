import nodemailer from 'nodemailer';
import 'dotenv/config';

const userEmail = process.env.USER_EMAIL;
const userPassword = process.env.USER_PASSWORD;

const createEmailTransporter = () => {
    return nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: userEmail,
            pass: userPassword
        },

    });
}


export const sendingEmail = async (req, res) => {
    const {name, email, message} = req.body;

    const ThankYouMessage = `
     Dear ${name},

     A big THANK YOU for getting in touch with us! We have received your message, and we truly appreciate you taking the time to reach out.

     Here are the details you provided:

     Name: ${name}
     Email: ${email}
     Your Message: ${message}

     We will review your message and get back to you as soon as possible. If you need immediate assistance, feel free to contact us at support@example.com.

     Thank you once again for your message! We look forward to assisting you.

     Best regards,
     Ratnakar Giri
    `;

   try {
        const transporter = createEmailTransporter();

        const mailOptions = {
            from: userEmail,     
            to: email,        
            subject: `Welcome ${name}`,
            text: ThankYouMessage,
            html:  `
            <p>Dear <strong>${name}</strong>,</p>
            <p>A big <strong>THANK YOU</strong> for getting in touch with us! We have received your message, and we truly appreciate you taking the time to reach out.</p>
            <p><strong>Here are the details you provided:</strong></p>
            <ul>
              <li><strong>Name:</strong> ${name}</li>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Your Message:</strong> ${message}</li>
            </ul>
            <p>We will review your message and get back to you as soon as possible. If you need immediate assistance, feel free to contact us at support@emailsendingapplication.com.</p>
            <p>Thank you once again for your message! We look forward to assisting you.</p>
            <p>Best regards,<br>Ratnakar Giri</p>
          `,
        };

        await transporter.sendMail(mailOptions);
        
        res.status(200).json({ message: 'Thank you email sent successfully!' });

   } catch (error) {
       res.status(500).json({ error: 'Failed to send thank you email.' });
   }

}