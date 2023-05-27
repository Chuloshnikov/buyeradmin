import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { selectedUsers, emailContent } = req.body;

  // Конфігурація транспорту для відправки електронних листів
  const transporter = nodemailer.createTransport({
    // Налаштування вашого провайдера електронної пошти (SMTP, Gmail і т.д.)
    // Перегляньте документацію nodemailer для детальнішої настройки
    // Нижче приведений приклад для Gmail
    service: 'Gmail',
    auth: {
      user: 'your-email@gmail.com', // Ваша адреса електронної пошти
      pass: 'your-password' // Ваш пароль електронної пошти
    }
  });

  // Отримання списку адрес електронної пошти для відправки
  const recipients = selectedUsers.map(userId => {
    // Ваш логіка отримання адрес електронної пошти користувачів за їхніми ідентифікаторами
    // Наприклад, шляхом звернення до бази даних або іншого джерела
    // Замість цього місця вставте власний код

    // Припустимо, що ми отримали адресу користувача по його ідентифікатору
    const email = 'example@gmail.com'; // Адреса електронної пошти користувача
    return email;
  });

  // Налаштування електронного листа
  const mailOptions = {
    from: 'your-email@gmail.com', // Ваша адреса електронної пошти
    to: recipients.join(','), // Список адрес електронної пошти через кому
    subject: 'Subject of the Email',
    text: emailContent // Вміст електронного листа
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