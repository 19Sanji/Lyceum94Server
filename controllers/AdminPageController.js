const db = require("../db");

class AdminPageController {
  async AddNewPost(req, res) {
    try {
      const imageName = req.file.filename;
      const myUrl = req.body.myVideoUrl;
      const myBool = true;
      // Узнаем нынешнее время и дату и приводим их в привычный для чтения вид
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

      // Отправляем запросы в базу данных
      await db.query(
        'INSERT INTO "Изображение" (Ссылка_на_изображение) VALUES ($1)',
        [imageName]
      );

      let id_img = await db.query(
        'SELECT id_изображения FROM "Изображение" WHERE Ссылка_на_изображение=$1',
        [imageName]
      );

      await db.query(
        'INSERT INTO public."Видео"("Ссылка_на_YouTube") VALUES ($1);',
        [myUrl]
      );

      let id_video = await db.query(
        'SELECT id_видео FROM "Видео" WHERE "Ссылка_на_YouTube"=$1',
        [myUrl]
      );

      await db.query(
        'INSERT INTO "Пост" (Заголовок, Текст, Дата_публикации, Утвержден, id_пользователя, id_изображения, id_видео) VALUES ($1,$2,$3,$4,$5,$6,$7)',
        [
          req.body.postTitle,
          req.body.postText,
          myDate,
          myBool,
          Number(req.body.thisUserId),
          id_img.rows[0].id_изображения,
          id_video.rows[0].id_видео,
        ]
      );
      res.send("Пост успешно добавлен!");
    } catch (error) {
      res.send("Произошла ошибка: " + error);
    }
  }
  async GetSuggestPosts(req, res) {
    try {
      let result = await db.query(
        'SELECT p.id_поста, p.Заголовок, u.id_пользователя, u.Фамилия, u.Имя, u.Отчество FROM "Пост" p, "Пользователь" u WHERE p."Утвержден" = false AND p.id_пользователя=u.id_пользователя ORDER BY id_поста DESC'
      );
      res.send(result.rows);
    } catch (error) {
      res.send("Произошла ошибка: " + error);
    }
  }
  async DeleteSuggestPosts(req, res) {
    try {
      let result = await db.query(
        'DELETE FROM public."Пост" WHERE id_поста = $1;',
        [req.body.idDeletePost]
      );
      res.send("Пост удален");
    } catch (error) {
      res.send("Произошла ошибка: " + error);
    }
  }
  async AcceptSuggestPost(req, res) {
    try {
      let result = await db.query(
        'UPDATE public."Пост" SET "Утвержден" = true WHERE "id_поста" = $1;',
        [req.body.idAcceptPost]
      );
      res.send("Пост добавлен");
    } catch (error) {
      res.send("Произошла ошибка: " + error);
    }
  }

}

module.exports = new AdminPageController();
