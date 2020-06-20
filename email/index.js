const nodemailer = require('nodemailer');
const { templateHTML } = require('../helpers');

const config = {
  subject: 'Сообщение из приложения express.notify',
  to: process.env.MAIL_TO,
  smtp: {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_AUTH_USER,
      pass: process.env.SMTP_AUTH_PASS
    }
  }
};

// инициализируем модуль для отправки писем и указываем данные из конфига
const transporter = nodemailer.createTransport(config.smtp);

// отправляем почту
module.exports.send = (res, content) => {
  transporter.sendMail(
    {
      from: 'microlabigtest@gmail.com',
      to: config.to,
      subject: config.subject,
      html: templateHTML(content),
      generateTextFromHtml: true
    },
    (error, info) => {
      // если есть ошибки при отправке - сообщаем об этом
      if (error) {
        return console.log(`При отправке письма произошла ошибка!: ${error}`);
        // return res.json({
        //   success: true,
        //   message: `При отправке письма произошла ошибка!: ${error}`
        // });
      }
      return console.log(`Письмо успешно отправлено!\n${info}`);
      // res.json({ success: true, message: 'Письмо успешно отправлено!' });
    }
  );
};
