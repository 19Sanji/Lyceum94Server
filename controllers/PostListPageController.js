const db = require("../db");
const fs = require("fs");
const path = require("path");

class PostListPageController {
  async AddSuggestPost(req, res) {
    try {
      console.log(req.body);
      console.log(req.file.filename);
      const myBool = false;
      let thisDate = new Date();
      const imageName = req.file.filename;
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
      let myVideoId = 0;

      let videoIsExist = await db.query(
        'SELECT * FROM public."Видео" WHERE "Ссылка_на_YouTube"=$1',
        [req.body.myVideoUrl]
      );

      await db.query(
        'INSERT INTO "Изображение" ("Ссылка_на_изображение") VALUES ($1)',
        [imageName]
      );

      let id_img = await db.query(
        'SELECT id_изображения FROM "Изображение" WHERE "Ссылка_на_изображение"=$1',
        [imageName]
      );

      if (videoIsExist.rows.length === 0) {
        console.log("Такого видео нет в БД");
        let query1 = await db.query(
          'INSERT INTO public."Видео"("Ссылка_на_YouTube") VALUES ($1);',
          [req.body.myVideoUrl]
        );

        let id_video = await db.query(
          'SELECT id_видео FROM public."Видео" WHERE "Ссылка_на_YouTube"=$1',
          [req.body.myVideoUrl]
        );
        myVideoId = id_video.rows[0].id_видео;
      } else {
        console.log("Такое видео есть в БД");
        myVideoId = videoIsExist.rows[0].id_видео;
      }
      // console.log(req.body.myTitle);
      // console.log(req.body.myArea);
      // console.log(myDate);
      // console.log(myBool);
      // console.log(Number(req.body.thisUserId));
      // console.log(id_img.rows[0].id_изображения);
      // console.log(myVideoId);

      await db.query(
        'INSERT INTO public."Пост"( "Заголовок", "Текст", "Дата_публикации", "Утвержден", "id_пользователя","id_изображения", "id_видео") VALUES ($1, $2, $3, $4, $5, $6, $7);',
        [
          req.body.myTitle,
          req.body.myArea,
          myDate,
          myBool,
          Number(req.body.thisUserId),
          id_img.rows[0].id_изображения,
          myVideoId,
        ]
      );

      res.send("Пост успешно добавлен!");
    } catch (error) {
      res.send("Произошла ошибка: " + error);
    }
  }

  async GetAllPosts(req, res) {
    try {
      // проверить есть ли фото

      let result = await db.query(
        'SELECT * FROM "Пост" p, "Изображение" i, "Пользователь" u WHERE p.id_изображения=i.id_изображения AND p.Утвержден=true AND u.id_пользователя=p.id_пользователя ORDER BY id_поста DESC'
      );
      res.send(result.rows);
    } catch (error) {
      res.send("Произошла ошибка: " + error);
    }
  }
  async DeletePost(req, res) {
    try {
      let idImg = await db.query(
        'SELECT id_изображения FROM "Пост" WHERE id_поста=$1',
        [req.body.postId]
      );

      let delete_img = await db.query(
        'SELECT Ссылка_на_изображение FROM "Изображение" WHERE id_изображения=$1',
        [idImg.rows[0].id_изображения]
      );

      let result = await db.query('DELETE FROM "Пост" WHERE id_поста=$1', [
        req.body.postId,
      ]);

      let result2 = await db.query(
        'DELETE FROM "Изображение" WHERE id_изображения=$1',
        [idImg.rows[0].id_изображения]
      );

      fs.unlinkSync(
        path.join("public/" + delete_img.rows[0].Ссылка_на_изображение)
      );
      res.send("Пост успешно удален");
    } catch (error) {
      res.send("Произошла ошибка: " + error);
    }
  }
}

module.exports = new PostListPageController();
