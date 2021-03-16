
// Функция рендеринга слайдов
window.renderTemplate = function(alias, data) {

    // Преобразуем html-кавычки в нормальные
    let correctString = data.replace(/&#34;/g, `"`);

    // Парсим JSON данные
    let slideData = JSON.parse(correctString);

    // TODO: перенести сюда готовый HTML

    console.log(alias);
    console.log(slideData);

    return 'HTML-разметка отдельного слайда в виде строки';
}

