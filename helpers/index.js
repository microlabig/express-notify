// валидация входных данных
module.exports.validateData = (obj) => {
  for (const item in obj) {
    if (obj.hasOwnProperty(item)) {
      if (obj[item] === '') {
        return false;
      }
    }
  }
  return true;
};

module.exports.contentFormat = (content) => {
  const { name = '', email = '', comment = '', from = '' } = content;
  return `
    Имя: ${name}

    E-mail: ${email}

    Комментарий: ${comment}

    Откуда: ${from}
  `;
};

module.exports.contentFormatToHTML = (content) => {
  const { name = '', email = '', comment = '', from = '' } = content;
  return `
  <div>
    <p>
        <span style="font-weight: 700;">Имя: </span>
        <span>${name}</span>
    </p>
    <p>
        <span style="font-weight: 700;">E-mail: </span>
        <span>${email}</span>
    </p>
    <p>
        <span style="font-weight: 700;">Комментарий: </span>
        <span>${comment}</span>
    </p>
    <p>
        <span style="font-weight: 700;">Откуда: </span>
        <span>${from}</span>
    </p>
    <p style="font-weight: 700;">Отправлено с приложения express.notify! ✔</p>
  </div>
  `;
};
