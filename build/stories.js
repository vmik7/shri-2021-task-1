
// Функция рендеринга слайдов
window.renderTemplate = function(alias, data) {

    // Преобразуем html-кавычки в нормальные
    let correctString = data.replace(/&#34;/g, `"`);

    // Парсим JSON данные
    let slideData = JSON.parse(correctString);

    // TODO: перенести сюда готовый HTML

    let html = 'тут какая-то ошибка, неправильный alias';

    if (alias === 'leaders') {
        html = `
            <div class="slide leaders">
            <h1 class="slide__title">${slideData.title}</h1>
            <p class="slide__subtitle">${slideData.subtitle}</p>
            <div class="slide__content leaders__content">
                <div class="leaders__column">
                    <div class="user leaders__user">
                        <div class="user__avatar">
                            <picture>
                                <img	src="assets/images/1x/8.jpg"
                                        srcset="assets/images/2x/8.jpg 2x"
                                        class="user__photo"
                                        alt="avatar">
                            </picture>
                            <div class="user__emoji">👍</div>
                        </div>
                        <div class="user__name">Александр Иванков</div>
                        <div class="user__value-text">19</div>
                    </div>
                    <div class="leaders__stand">
                        <div class="leaders__place-number">5</div>
                    </div>
                </div>
                <div class="leaders__column">
                    <div class="user leaders__user">
                        <div class="user__avatar">
                            <picture>
                                <img	src="assets/images/1x/7.jpg"
                                        srcset="assets/images/2x/7.jpg 2x"
                                        class="user__photo"
                                        alt="avatar">
                            </picture>
                            <div class="user__emoji"></div>
                        </div>
                        <div class="user__name">Дмитрий Андриянов</div>
                        <div class="user__value-text">22</div>
                    </div>
                    <div class="leaders__stand">
                        <div class="leaders__place-number">3</div>
                    </div>
                </div>
                <div class="leaders__column">
                    <div class="user leaders__user">
                        <div class="user__avatar">
                            <picture>
                                <img	src="assets/images/1x/3.jpg"
                                        srcset="assets/images/2x/3.jpg 2x"
                                        class="user__photo"
                                        alt="avatar">
                            </picture>
                            <div class="user__emoji">${slideData.emoji}</div>
                        </div>
                        <div class="user__name">Дарья Ковалева</div>
                        <div class="user__value-text">32</div>
                    </div>
                    <div class="leaders__stand">
                        <div class="leaders__place-number">1</div>
                        <div class="user leaders__user leaders__user_bottom">
                            <div class="user__avatar">
                                <picture>
                                    <img	src="assets/images/1x/11.jpg"
                                            srcset="assets/images/2x/11.jpg 2x"
                                            class="user__photo"
                                            alt="avatar">
                                </picture>
                                <div class="user__emoji">👍</div>
                            </div>
                            <div class="user__name">Юрий Фролов</div>
                            <div class="user__value-text">15 голосов</div>
                        </div>
                        <div class="leaders__place-number leaders__place-number_bottom">5</div>
                    </div>
                </div>
                <div class="leaders__column">
                    <div class="user leaders__user">
                        <div class="user__avatar">
                            <picture>
                                <img	src="assets/images/1x/9.jpg"
                                        srcset="assets/images/2x/9.jpg 2x"
                                        class="user__photo"
                                        alt="avatar">
                            </picture>
                            <div class="user__emoji"></div>
                        </div>
                        <div class="user__name">Сергей Бережной</div>
                        <div class="user__value-text">27</div>
                    </div>
                    <div class="leaders__stand">
                        <div class="leaders__place-number">2</div>
                    </div>
                </div>
                <div class="leaders__column">
                    <div class="user leaders__user">
                        <div class="user__avatar">
                            <picture>
                                <img	src="assets/images/1x/6.jpg"
                                        srcset="assets/images/2x/6.jpg 2x"
                                        class="user__photo"
                                        alt="avatar">
                            </picture>
                            <div class="user__emoji"></div>
                        </div>
                        <div class="user__name">Андрей Мокроусов</div>
                        <div class="user__value-text">20</div>
                    </div>
                    <div class="leaders__stand">
                        <div class="leaders__place-number">4</div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
    else if (alias === 'vote') {
        html = 'Голосование, алиас шаблона vote';
    }
    else if (alias === 'chart') {
        html = 'Статистика, алиас шаблона chart';
    }
    else if (alias === 'diagram') {
        html = 'Круговая диаграмма, алиас шаблона diagram';
    }
    else if (alias === 'activity') {
        html = 'Карта активности, алиас шаблона activity';
    }

    return html;
}

