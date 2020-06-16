# Сервис нотификаций (Express.js + Mongoose + Docker)
Дата прохождения курса 10.03.2020 - 17.04.2020

Итоговый проект находится на heroku [https://microlabig.herokuapp.com](https://microlabig.herokuapp.com "https://microlabig.herokuapp.com")

## Необходимые действия для запуска проекта

1. установить node.js - [nodejs.org](https://nodejs.org/ "Node.JS")
2. установить mongodb - [MongoDBCompassCommunity](https://www.mongodb.com/download-center/compass "MongoDB Compass") (используется для отладки работы с БД)
3. cклонировать проект к себе и перейти в каталог проекта
4. `npm i` или `yarn install` - установить зависимости
5. создать в корне проекта файл `.env`, настроить следующим образом:  
   
   ```dotnetcli
    PORT=3000               # порт приложения
    mode=production         # режим работы приложения ("development" работает с локальной БД)

    DB_HOST='127.0.0.1'     # сервер локальной БД
    DB_PORT='27017'         # порт локальной БД

    REMOTE_DB_NAME='nameDB' # имя удаленной БД
    REMOTE_DB_USER='user'   # логин доступа к удаленной БД
    REMOTE_DB_PASS='pass'   # пароль к удаленной БД
   ```

6. запуск проекта командой `node app`

---
## ТЗ:

### Логика обработки различных запросов:
   - POST-запрос на /api/mail - создание нового письма (сохранение в БД). Возвращается объект {success, message}.   
   - DELETE-запрос на /api/mail/:from - удаление писем с пометкой from из БД. Возвращается объект {success, message}.
   
### Сигнатуры:

   - обьект отправляемого письма:

        ```javascript
        {
            name: String, // имя отправителя
            email: String, // email отправителя
            comment: String, // текст отправителя
            from: String // с какого источника отправлен (landing, portfolio, service)
        }
        ```