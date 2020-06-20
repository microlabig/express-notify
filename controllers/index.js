const Mail = require('../api/mail');
const mail = new Mail();

const email = require('../email');

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
      if (result) {
        email.send(res, body);
      }
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
  const what = req.url.match(/^\/?API\/.{0,5}\/?/i)[0];
  const { from } = req.params;
  let result = null;

  switch (what) {
    // удаление всех писем из БД
    case '/api/mail/':
      result = await mail.deleteAll(from); // с пометкой from
      break;
  }
  if (result) {
    res.status(201).json({ success: true, message: 'ok' });
  } else {
    res.status(404).json({ success: false, message: 'Неизвестная ошибка' });
  }
};
