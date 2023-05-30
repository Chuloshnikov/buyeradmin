import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { selectedUsers, emailContent } = req.body;

  // Mailer config
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.MAILER_SENDER_EMAIL, 
      pass: process.env.MAILER_SENDER_PASSWORD 
    }
  });

  // Отримання списку адрес електронної пошти для відправки
  const recipients = selectedUsers.map(user => user.email);
  const recipientsNames = selectedUsers.map(user => user.name);

  // Налаштування електронного листа
  const mailOptions = {
    from: process.env.MAILER_SENDER_EMAIL, // Ваша адреса електронної пошти
    to: recipients.join(','), // Список адрес електронної пошти через кому
    subject: 'Subject of the Email',
    text: `Добрий день, ${recipientsNames}! + \n${emailContent} \n З повагою, Ваш Байер Анастасія.` // Вміст електронного листа
  };

  try {
    // Відправлення електронного листа
    await transporter.sendMail(mailOptions);
    console.log('Email sent:', mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
}