const nodemailer = require('nodemailer');

const { validateData, contentFormatToHTML } = require('../helpers');
const { MailDB } = require('../db');

// конфигурация для отправки email
const config = {
  subject: 'Сообщение из приложения express.notify',
  from: process.env.MAIL_FROM,
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

// -------------------
//    Class MAIL
// -------------------
class Mail {
  constructor(data = {}) {
    this.data = new MailDB.Mail({ ...data });
  }

  // чтение данных объекта текущего письма
  getData() {
    return this.data;
  }

  // установка даннных письма для дальнейшей обработки
  setData(newData = {}) {
    if (validateData(newData)) {
      this.data = new MailDB.Mail({ ...newData });
    } else {
      throw new Error('Не все поля заполнены');
    }
  }

  // сохранение письма в БД
  async save(body) {
    try {
      this.setData(body);
      const doc = await this.data.save();
      console.log('mail - saved:', doc);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  // удаление всех писем
  async deleteAll(from) {
    try {
      const status = await MailDB.Mail.deleteMany({ from });
      if (status && status.ok === 1) {
        console.log(
          `mail - all deleted with conditions from = ${from}:\n`,
          status
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  // отправляем почту
  async send(content) {
    return new Promise((resolve, reject) => {
      transporter.sendMail(
        {
          from: config.from,
          to: config.to,
          subject: config.subject,
          html: contentFormatToHTML(content),
          generateTextFromHtml: true
        },
        (error, info) => {
          // если есть ошибки при отправке - сообщаем об этом
          if (error) {
            console.error(`При отправке письма произошла ошибка!: ${error}`);
            reject(new Error(error));
          }
          console.log(`\nПисьмо успешно отправлено!\n${info.response}`);
          resolve(true);
        }
      );
    });
  }
}

module.exports = Mail;
