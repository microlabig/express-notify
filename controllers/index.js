const Mail = require('../api/mail');
const mail = new Mail();

// ------------
//     GET
// ------------
module.exports.get = (req, res) => {
  res.status(200).json([]);
};

// ------------
//     POST
// ------------
module.exports.post = async (req, res) => {
  const { url, body } = req;
  let result = null;

  switch (url) {
    // сохранение в БД и отправка mail
    case '/api/mail':
      result = await mail.save(body);
      break;
  }
  if (result) {
    res.status(201).json({ success: true, message: 'ok' });
  } else {
    res.status(404).json({ success: false, message: 'Неизвестная ошибка' });
  }
};

// ------------
//    DELETE
// ------------
module.exports.delete = async (req, res) => {
  const { url } = req;
  let result = null;

  switch (url) {
    // удаление всех писем из БД
    case '/api/mail:portfolio':
      result = await mail.deleteAll('portfolio');
      break;
  }
  if (result) {
    res.status(201).json({ success: true, message: 'ok' });
  } else {
    res.status(404).json({ success: false, message: 'Неизвестная ошибка' });
  }
};
