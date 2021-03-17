
// Функция рендеринга слайдов
window.renderTemplate = function(alias, data) {

    // Преобразуем html-кавычки в нормальные
    let correctString = data.replace(/&#34;/g, `"`);

    // Парсим JSON данные
    let slideData = JSON.parse(correctString);

    // TODO: перенести сюда готовый HTML

    let html = 'тут какая-то ошибка, неправильный alias';

    if (alias === 'leaders') {

        let selectedUserIndex = -1;
        if (slideData.selectedUserId) {
            for (let i = 0; i < slideData.users.length; i++) {
                if (slideData.users[i].id === slideData.selectedUserId) {
                    selectedUserIndex = i;
                    break;
                }
            }
            if (selectedUserIndex >= 5) {
                let tmp = slideData.users[4];
                slideData.users[4] = slideData.users[selectedUserIndex];
                slideData.users[selectedUserIndex] = tmp;
            }
        }

        html = `
            <div class="slide leaders">
            <h1 class="slide__title">${slideData.title}</h1>
            <p class="slide__subtitle">${slideData.subtitle}</p>
            <div class="slide__content leaders__content">
                <div class="leaders__column">
                    <div class="user leaders__user">
                        <div class="user__avatar">
                            <picture>
                                <img	src="assets/images/1x/${slideData.users[4].avatar}"
                                        srcset="assets/images/2x/${slideData.users[4].avatar} 2x"
                                        class="user__photo"
                                        alt="avatar">
                            </picture>
                            <div class="user__emoji">${(slideData.selectedUserId && selectedUserIndex >= 4 ? '👍' : '')}</div>
                        </div>
                        <div class="user__name">${slideData.users[4].name}</div>
                        <div class="user__value-text">${slideData.users[4].valueText}</div>
                    </div>
                    <div class="leaders__stand">
                        <div class="leaders__place-number">${(slideData.selectedUserId && selectedUserIndex >= 5 ? selectedUserIndex + 1 : 5)}</div>
                    </div>
                </div>
                <div class="leaders__column">
                    <div class="user leaders__user">
                        <div class="user__avatar">
                            <picture>
                                <img	src="assets/images/1x/${slideData.users[2].avatar}"
                                        srcset="assets/images/2x/${slideData.users[2].avatar} 2x"
                                        class="user__photo"
                                        alt="avatar">
                            </picture>
                            <div class="user__emoji">${(slideData.selectedUserId && selectedUserIndex == 2 ? '👍' : '')}</div>
                        </div>
                        <div class="user__name">${slideData.users[2].name}</div>
                        <div class="user__value-text">${slideData.users[2].valueText}</div>
                    </div>
                    <div class="leaders__stand">
                        <div class="leaders__place-number">3</div>
                    </div>
                </div>
                <div class="leaders__column">
                    <div class="user leaders__user">
                        <div class="user__avatar">
                            <picture>
                                <img	src="assets/images/1x/${slideData.users[0].avatar}"
                                        srcset="assets/images/2x/${slideData.users[0].avatar} 2x"
                                        class="user__photo"
                                        alt="avatar">
                            </picture>
                            <div class="user__emoji">${slideData.emoji}</div>
                        </div>
                        <div class="user__name">${slideData.users[0].name}</div>
                        <div class="user__value-text">${slideData.users[0].valueText}</div>
                    </div>
                    <div class="leaders__stand">
                        <div class="leaders__place-number">1</div>`
                        + 
                        (slideData.selectedUserId && selectedUserIndex >= 3 ? 
                            `   <div class="user leaders__user leaders__user_bottom">
                                    <div class="user__avatar">
                                        <picture>
                                            <img	src="assets/images/1x/${slideData.users[4].avatar}"
                                                    srcset="assets/images/2x/${slideData.users[4].avatar} 2x"
                                                    class="user__photo"
                                                    alt="avatar">
                                        </picture>
                                        <div class="user__emoji">👍</div>
                                    </div>
                                    <div class="user__name">${slideData.users[4].name}</div>
                                    <div class="user__value-text">${slideData.users[4].valueText}</div>
                                </div>
                            <div class="leaders__place-number leaders__place-number_bottom">${(slideData.selectedUserId && selectedUserIndex >= 5 ? selectedUserIndex + 1 : 5)}</div>`
                        : '')
                        +
                    `</div>
                </div>
                <div class="leaders__column">
                    <div class="user leaders__user">
                        <div class="user__avatar">
                            <picture>
                                <img	src="assets/images/1x/${slideData.users[1].avatar}"
                                        srcset="assets/images/2x/${slideData.users[1].avatar} 2x"
                                        class="user__photo"
                                        alt="avatar">
                            </picture>
                            <div class="user__emoji">${(slideData.selectedUserId && selectedUserIndex == 1 ? '👍' : '')}</div>
                        </div>
                        <div class="user__name">${slideData.users[1].name}</div>
                        <div class="user__value-text">${slideData.users[1].valueText}</div>
                    </div>
                    <div class="leaders__stand">
                        <div class="leaders__place-number">2</div>
                    </div>
                </div>
                <div class="leaders__column">
                    <div class="user leaders__user">
                        <div class="user__avatar">
                            <picture>
                                <img	src="assets/images/1x/${slideData.users[3].avatar}"
                                        srcset="assets/images/2x/${slideData.users[3].avatar} 2x"
                                        class="user__photo"
                                        alt="avatar">
                            </picture>
                            <div class="user__emoji">${(slideData.selectedUserId && selectedUserIndex == 3 ? '👍' : '')}</div>
                        </div>
                        <div class="user__name">${slideData.users[3].name}</div>
                        <div class="user__value-text">${slideData.users[3].valueText}</div>
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

