import express from 'express'
import path from 'path'

const __dirname = path.resolve();
const PORT = 8080;
const app = express();

// Подключаем шаблонизатор
app.set('view engine', 'ejs');
console.log(app.get('views'));

// Делаем папку build статичной
app.use(express.static(path.resolve(__dirname, 'build')));

// Обрабатываем корневой запрос
app.get('/', (req, res) => {
    console.log(req.query);
    res.render('index', {
        slide: req.query.slide || 0,
        theme: req.query.theme || 'dark'
    });
});

// Слушаем порт
app.listen(PORT, () => {
    console.log(`Server has been started... port: ${PORT}`);
});