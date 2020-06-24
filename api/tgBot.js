const { BotsDB } = require('../db');

// ------------------------
//    Class TelegramBots
// ------------------------
class TgBot {
  constructor(data = {}) {
    this.data = new BotsDB.Bots({ ...data });
  }

  // чтение данных объекта
  getData() {
    return this.data;
  }

  // установка даннных для дальнейшей обработки
  setData(newData = {}) {
    this.data = new BotsDB.Bots({ ...newData });
  }

  // сохранение в БД
  async save(body) {
    try {
      this.setData(body);
      const doc = await this.data.save();
      console.log('tgbots - saved:', doc);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  // удаление всех записей
  async deleteAll(from) {
    try {
      const status = await BotsDB.Bots.deleteMany({ from });
      if (status && status.ok === 1) {
        console.log( `tgbots - all deleted ${from}:\n`, status);
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  // проверяет, есть ли запись по id уже в БД
  async idIsExist(id) {
    try {
      const status = await BotsDB.Bots.exists({ id });
      return status;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  // возвращает все id по полю source
  async getAllIdBySource(source) {
    try {
      const status = await BotsDB.Bots.find({ source }, 'id');
      if (status.length) {
        return status.map(objId => objId.id);
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

module.exports = TgBot;
