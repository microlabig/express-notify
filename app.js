require('dotenv').config(); // считываем необходимые переменные окружения
const PORT = process.env.PORT || 3000; // порт сервера

const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();

// парсинг post запросов от клиента
app.use(bodyParser.urlencoded({ extended: true })); // ключ: значение
app.use(bodyParser.json());

// статика
app.use(express.static(path.join(__dirname, 'public')));

// роутер
app.use(cors());
app.use('/', require('./routes'));

// основной сервер
app.listen(PORT, () => {
  console.log('CORS-enabled web server');
  console.log(`Сервер запущен на порту ${PORT}`);
});

// error handler
app.use((err, req, res, next) => {
  if (err) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  } else {
    next();
  }
});

// в случае неопределенной ошибки
process.on('uncaughtException', (err) => {
  console.error(
    `${new Date().toUTCString()} uncaught exception: ${err.message}`
  );
  console.error(err.stack);
  process.exit(1);
});
