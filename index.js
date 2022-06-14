const express = require("express");
const cors = require("cors");
const router = require("./routers/index");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json()); // Необходимый парсер! Нужен для корректного получения POST
app.use('/image', express.static(path.resolve(__dirname, 'public')))
app.use("/", router);

app.listen(3001, () => {
  console.log("Сервер запущен!");
});
