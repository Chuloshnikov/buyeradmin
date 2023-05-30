import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { selectedUsers, emailContent } = req.body;

  const email = process.env.MAILER_SENDER_EMAIL;
  const pass = process.env.MAILER_SENDER_PASSWORD;

  // Mailer config
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email, 
      pass: pass 
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  try {
    // Відправлення електронного листа для кожного одержувача
    for (const user of selectedUsers) {
      const { email: recipientEmail, name: recipientName } = user;

      const mailOptions = {
        from: email, // Ваша адреса електронної пошти
        to: recipientEmail, // Адреса електронної пошти одержувача
        subject: 'Subject of the Email',
        text: `Добрий день, ${recipientName}, \n${emailContent} \nЗ повагою, Ваш Байер Анастасія.` // Вміст електронного листа
      };

      await transporter.sendMail(mailOptions);
      console.log('Email sent:', mailOptions);
    }

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ message: 'Failed to send emails' });
  }
}