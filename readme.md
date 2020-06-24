# Сервис нотификаций (Express.js + Mongoose + Docker)
Сервис уведомлений на email, Telegram.

Итоговый проект находится на heroku [https://microlabig.herokuapp.com](https://microlabig.herokuapp.com "https://microlabig.herokuapp.com")

## Необходимые действия для запуска проекта

1. установить node.js - [nodejs.org](https://nodejs.org/ "Node.JS")
2. установить mongodb - [MongoDBCompassCommunity](https://www.mongodb.com/download-center/compass "MongoDB Compass") (используется для отладки работы с локальной БД)
3. cклонировать проект к себе и перейти в каталог проекта
4. `npm i` или `yarn install` - установить зависимости
5. отредактировать переменные окружения (например, создать в корне проекта файл `.env`), настроить следующим образом:  
   
   ```dotnetcli
    PORT=3000               # порт приложения
    mode=production         # режим работы приложения ("development" работает с локальной БД)

    DB_HOST='127.0.0.1'     # сервер локальной БД
    DB_PORT='27017'         # порт локальной БД

    REMOTE_DB_NAME='nameDB' # имя удаленной БД
    REMOTE_DB_USER='user'   # логин доступа к удаленной БД
    REMOTE_DB_PASS='pass'   # пароль к удаленной БД

    SMTP_HOST=smtp.yourmailergun.com   # адрес вашего smtp-хоста
    SMTP_PORT=port                     # порт smtp
    SMTP_AUTH_USER=user                # логин в smtp-авторизации
    SMTP_AUTH_PASS=pass                # пароль в smtp-авторизации
    MAIL_FROM=from@domain.com          # адрес email-отправителя
    MAIL_TO=to@domain.com              # адрес email-назначения 

    BOT_TOKEN_TELEGRAM=token           # ваш токен бота в Телеграм
   ```

6. запуск проекта командой `node app`

---
## ТЗ:

### Логика обработки различных запросов:
   - POST-запрос на /api/mail - создание нового письма (сохранение в БД). Возвращается объект {success, message}, отправка на email, телеграм с текстом письма
   - DELETE-запрос на /api/mail/:from - удаление писем с пометкой from из БД. Возвращается объект {success, message}.
   
### Сигнатуры:

   - обьект отправляемого письма:

        ```javascript
        {
            name: String, // имя отправителя
            email: String, // email отправителя
            comment: String, // текст отправителя
            from: String // с какого источника отправлен (landing, portfolio, service и т.п.)
        }
        ```
