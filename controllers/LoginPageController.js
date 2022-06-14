const db = require("../db");

class LoginPageController {
  async Authorization(req, res) {
    let result = await db.query(
      'SELECT * FROM "Пользователь" WHERE Логин = $1 AND Пароль = $2',
      [req.body.login, req.body.password]
    );
    res.send(result.rows);
    // console.log(result.rows)
  }
}

module.exports = new LoginPageController();
