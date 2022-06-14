const db = require("../db");

class RegistrationPageController {
  async AddNewUser(req, res) {
    const user = await db.query(
      'SELECT * FROM "Пользователь" WHERE Логин = $1;',
      [req.body.login]
    );
    console.log(user.rows);
    if (user.rows.length > 0) {
      res.send("Пользователь с таким логином уже существует");
    } else {
      const result = await db.query(
        'INSERT INTO public."Пользователь"(Фамилия, Имя, Отчество,Логин, Пароль) VALUES ($1,$2,$3,$4,$5);',
        [
          req.body.surname,
          req.body.name,
          req.body.patronymic,
          req.body.login,
          req.body.password,
        ]
      );
      res.send("Пользователь успешно добавлен");
    }
  }
}

module.exports = new RegistrationPageController();
