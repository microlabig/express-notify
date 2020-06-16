const { validateData } = require('../helpers');
const { MailDB } = require('../db');

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
        console.log(`mail - all deleted with conditions from = ${from}:\n`, status);
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

module.exports = Mail;
