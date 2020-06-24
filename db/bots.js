const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise; // для работы с Promise

// установка схем
// объект ботов
const botsScheme = new Schema(
  {
    id: {
      $type: Number,
      unique: true,
      required: true
    },
    username: {
      $type: String,
      required: true
    },
    first_name: String,
    last_name: String,
    type: String,
    source: String
  },
  {
    timestamps: true, // проставлять created_At и updated_At
    typeKey: '$type' // typeKey: '$type' просим mongoose использовать $type для интерпретации тип ключа вместо ключевого слова по умолчанию type
  }
);

// модели данных
module.exports.Bots = mongoose.model('bot', botsScheme);
