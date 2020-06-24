const TelegramBot = require('node-telegram-bot-api');

const { TgBot } = require('../../api');
const tgBot = new TgBot();

// настройки для бота Телеграм
const token = process.env.BOT_TOKEN_TELEGRAM;
const options = { polling: true }; // polling = true -> для автоматического обновления информации о новых сообщениях

const SOURCE = 'telegram'; // источник платформы бота

// ---------------------
// класс работы с ботом
// ---------------------
class ModifiedTelegramBot extends TelegramBot {
  constructor() {
    super(token, options);
  }

  // отправление сообщения всем пользователям бота
  async sendBotMessage(content) {
    const idList = await tgBot.getAllIdBySource(SOURCE);
    const that = this;
    if (idList.length) {
      idList.forEach((id) => {
        that.sendMessage(id, content);
      });
      console.log('\nСообщение отправлено в телеграм');
    }
  }

  // удаление всех пользователей из бота
  async deleteAllRecordsInDB() {
    await tgBot.deleteAll();
  }
}

// инстанс бота
const bot = new ModifiedTelegramBot(token, options);

// при регистрации пользователя в боте -
// добавить его в БД если такого не существует
bot.onText(/\/start/, async (msg, match) => {
  const { chat } = msg;
  const body = { ...chat, source: SOURCE };
  const isExisted = await tgBot.idIsExist(chat.id);
  if (!isExisted) { // если нет в БД
    await tgBot.save(body); // запистаь в БД
  }
});

module.exports.telegramBot = bot;
