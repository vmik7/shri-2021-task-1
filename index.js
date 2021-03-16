import express from 'express'
import path from 'path'

const __dirname = path.resolve();
const PORT = 8080;
const app = express();

app.use(express.static(path.resolve(__dirname, 'build')));

app.get('/', (req, res) => {
    res.send('<h1>Hello world!</h1>');
});

app.listen(PORT, () => {
    console.log(`Server has been started... port: ${PORT}`);
});