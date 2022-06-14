const db = require("../db");

class PostPageController {
  async GetPost(req, res) {
    let result = await db.query(
      'SELECT p."id_поста", p."Заголовок", p."Текст", p."Дата_публикации", p."Утвержден", p."id_пользователя", i."id_изображения", i."Ссылка_на_изображение", v."Ссылка_на_YouTube" FROM "Пост" p, "Изображение" i, "Видео" v WHERE id_поста=$1 AND p.id_изображения=i.id_изображения AND p.id_видео=v.id_видео',
      [req.body.idPost]
    );
    res.send(result.rows);
  }

  async GetAllPostComment(req, res) {
    let result = await db.query(
      'SELECT u."id_пользователя", u."Фамилия", u."Имя", u."Отчество", k."id_комментария", k."Текст", k."Дата", p."id_поста" FROM "Пользователь" u, "Комментарий" k, "Пост" p WHERE p.id_поста=k.id_поста AND u.id_пользователя=k.id_пользователя AND p.id_поста=$1',[req.body.postId]
    );
    res.send(result.rows);
  }

  async AddNewComment(req, res) {
    let thisDate = new Date();
    let myTime = "";

    if (+thisDate.getHours() < 10 && +thisDate.getMinutes() < 10) {
      myTime = "0" + thisDate.getHours() + ":0" + thisDate.getMinutes();
    }
    if (+thisDate.getHours() > 10 && +thisDate.getMinutes() < 10) {
      myTime = thisDate.getHours() + ":0" + thisDate.getMinutes();
    }
    if (+thisDate.getHours() < 10 && +thisDate.getMinutes() > 10) {
      myTime = "0" + thisDate.getHours() + ":" + thisDate.getMinutes();
    }
    if (+thisDate.getHours() > 10 && +thisDate.getMinutes() > 10) {
      myTime = thisDate.getHours() + ":" + thisDate.getMinutes();
    }

    let myDate = "";
    if (+(thisDate.getMonth() + 1) < 10 && +thisDate.getDate() < 10) {
      myDate =
        thisDate.getFullYear() +
        "-0" +
        (thisDate.getMonth() + 1) +
        "-0" +
        thisDate.getDate();
    }
    if (+(thisDate.getMonth() + 1) > 10 && +thisDate.getDate() < 10) {
      myDate =
        thisDate.getFullYear() +
        "-" +
        (thisDate.getMonth() + 1) +
        "-0" +
        thisDate.getDate();
    }
    if (+(thisDate.getMonth() + 1) < 10 && +thisDate.getDate() > 10) {
      myDate =
        thisDate.getFullYear() +
        "-0" +
        (thisDate.getMonth() + 1) +
        "-" +
        thisDate.getDate();
    }
    if (+(thisDate.getMonth() + 1) > 10 && +thisDate.getDate() > 10) {
      myDate =
        thisDate.getFullYear() +
        "-" +
        (thisDate.getMonth() + 1) +
        "-" +
        thisDate.getDate();
    }
    console.log(req.body.postId);
    console.log(req.body.myArea);
    console.log(req.body.thisUserId);
    console.log(myDate);
    let result = await db.query(
      'INSERT INTO public."Комментарий"("Дата", "Текст", "id_пользователя", "id_поста")VALUES ($1,$2,$3,$4);',
      [myDate, req.body.myArea, req.body.thisUserId, req.body.postId]
    );
    res.send(result.rows);
  }
}

module.exports = new PostPageController();
