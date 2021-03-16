import express from 'express'
import fs from 'fs'
import path from 'path'

const __dirname = path.resolve();
const PORT = 8080;
const app = express();

// Подключаем шаблонизатор
app.set('view engine', 'ejs');

// Делаем папку build статичной
app.use(express.static(path.resolve(__dirname, 'build')));

// Обрабатываем корневой запрос
app.get('/', (req, res) => {

    // Считываем нужные параметры get запроса
    let theme = req.query.theme || 'dark';
    let slide = req.query.slide || 0;

    // Читаем JSON
    fs.readFile(path.join(__dirname, 'data', 'data.json'), 'utf-8', (err, content) => {
        if (err) throw err;

        // Парсим JSON и достаем нужный слайд
        let jsonData = JSON.parse(content);
        let dataStr = JSON.stringify(jsonData[slide].data);

        // Рендерим ответ
        res.render('index', {
            theme: theme,
            alias: jsonData[slide].alias,
            data: dataStr
        });
    });
});

// Слушаем порт
app.listen(PORT, () => {
    console.log(`Server has been started... port: ${PORT}`);
});