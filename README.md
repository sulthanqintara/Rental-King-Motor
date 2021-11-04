# Rental King Motor Backend

This is code to be used as a CRUD API for Rental King Motor Website and Android app

### Contains CRUD For:

1. Auth
2. Vehicle
3. Transactions
4. User
5. Chat

## Built With

---

[![Node.js v14.17.3](https://img.shields.io/badge/Node.js%20-v14.17.3-blue.svg?style=flat)](https://nodejs.org/en/)
[![Express.js v4.17.1](https://img.shields.io/badge/Express.js-v4.17.1-blue)](https://expressjs.com/)
[![mysqljs v2.18.1](https://img.shields.io/badge/mysqljs-v2.18.1-blue)](https://github.com/mysqljs/mysql)

[![bcrypt v5.0.1](https://img.shields.io/badge/bcrypt-v5.0.1-brightgreen)](https://www.npmjs.com/package/bcrypt)
[![cors v2.8.5](https://img.shields.io/badge/cors-v2.8.5-green)](https://www.npmjs.com/package/bcrypt)
[![dotenv v10.0.0](https://img.shields.io/badge/dotenv-v10.0.0-yellowgreen)](https://www.npmjs.com/package/dotenv)
[![jsonwebtoken v8.5.1](https://img.shields.io/badge/jsonwebtoken-v8.5.1-yellow)](https://www.npmjs.com/package/dotenv)
[![morgan v1.10.0](https://img.shields.io/badge/morgan-v1.10.0-orange)](https://github.com/expressjs/morgan#readme)
[![multer v1.4.2](https://img.shields.io/badge/multer-v1.4.2-red)](https://github.com/expressjs/multer)
[![Nodemailer v6.7.0](https://img.shields.io/badge/Nodemailer-v6.7.0-blueviolet)](https://nodemailer.com/about/)
[![pm2 v5.1.0](https://img.shields.io/badge/pm2-v5.1.0-blueviolet)](https://pm2.keymetrics.io/)
[![Socket.io v4.2.0](https://img.shields.io/badge/socket.io-v4.2.0-success)](https://github.com/socketio/socket.io)
[![uuis v3.4.0](https://img.shields.io/badge/uuid-v3.4.0-red)](https://github.com/uuidjs/uuid)

## Optional Requirements

- [XAMPP](https://www.apachefriends.org/index.html) for local Database. Or [MySQL Workbench](https://www.mysql.com/products/workbench/).
- [Postman](https://www.postman.com/) to send request to back end.

### Installaton

---

1. Download this Project or you can type

```
git clone https://github.com/sulthanqintara/Rental-King-Motor
```

2. Open terminal or CMD on the app's directory and type

```
npm install
```

3. Add .env at the root of the project's folder

```
DB_HOST = "your_db_host"
DB_USER = "your_db_username"
DB_PASSWORD = "your_db_password"
DB_DATABASE = "your_database_name"

REACT_APP_EMAIL = "email_used_for_forgot_password"
REACT_APP_EMAIL_PASS = "email_password"

SECRET_KEY = "your_secret_key"

ISSUER_ADMIN = "you_are_an_admin"
ISSUER_SELLER = "you_are_a_seller"
ISSUER_USER = "you_are_a_user"
```

4. Type on the terminal/CMD

```
npm start
or
npm run dev
```

### Available routes

---

[Postman Documentation](https://documenter.getpostman.com/view/4016974/Tzz5tyQ9)

- `/auth` route to handle any sort of authentication within the app.
- `/user` handles user requests for their own.
- `/vehicles` search, add, and edit vehicle related.
- `/transactions` transactions flow goes here.
- `/chat` all chat related goes to this route.

### Related Projects

---

- [Rental King Motor Mobile Apps](https://github.com/sulthanqintara/rental_king_mobile)
- [Rental King Motor Website](https://github.com/sulthanqintara/React-Rental-King-Motor)
