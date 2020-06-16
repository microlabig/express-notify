const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise; // для работы с Promise

// установка схем
// объект писем
const mailScheme = new Schema(
  {
    name: String,
    email: String,
    comment: String,
    from: String
  },
  { timestamps: true }
);

// модели данных
module.exports.Mail = mongoose.model('mail', mailScheme);
