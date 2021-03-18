
// Функция рендеринга слайдов
window.renderTemplate = function(alias, data) {

    // Преобразуем html-кавычки в нормальные
    let correctString = data.replace(/&#34;/g, `"`);

    // Парсим JSON данные
    let slideData = JSON.parse(correctString);

    let html = 'тут какая-то ошибка, неправильный alias';

    if (alias === 'leaders') {

        // Индекс выбранного пользователя в массиве
        let selectedUserIndex = -1;

        // Если шаблон leaders используется для отображения результатов голосования, то нужно найти участника, за которого проголосовали
        if (slideData.selectedUserId) {

            // Ищем выбранного пользователя в массиве
            for (let i = 0; i < slideData.users.length; i++) {
                if (slideData.users[i].id === slideData.selectedUserId) {
                    selectedUserIndex = i;
                    break;
                }
            }

            // Если он стоит слишком далеко, ставим его на 5 место
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

        // Рендеринг пользователя, который будет стоять на месте с номером index
        let renderUser = (index) => {

            // Сдвигаем индекс на offset, если он задан
            index += slideData.offset || 0;

            // Если на странице есть место, а пользователи закончились - выводим заглушку
            if (index >= slideData.users.length) {
                return `
                    <button class="user vote__user vote__user_hidden" data-action="update" data-params="{ alias: 'leaders', data: { selectedUserId: ${ slideData.users[slideData.offset].id } } }" disabled>
                        <div class="user__avatar">
                            <picture>
                                <img	src="assets/images/1x/${ slideData.users[slideData.offset].avatar }"
                                        srcset="assets/images/2x/${ slideData.users[slideData.offset].avatar } 2x"
                                        class="user__photo"
                                        alt="avatar">
                            </picture>
                            <div class="user__emoji"></div>
                        </div>
                        <div class="user__name">${ slideData.users[slideData.offset].name }</div>
                    </button>
                `;
            }

            // Если всё нормально, то рендерим пользователя
            return `
                <button class="user vote__user${ slideData.selectedUserId && slideData.selectedUserId === slideData.users[index].id ? ' vote__user_active' : '' }" data-action="update" data-params="{ alias: 'leaders', data: { selectedUserId: ${ slideData.users[index].id } } }"${ slideData.selectedUserId && slideData.selectedUserId === slideData.users[index].id ? ' disabled' : '' }>
                    <div class="user__avatar">
                        <picture>
                            <img	src="assets/images/1x/${ slideData.users[index].avatar }"
                                    srcset="assets/images/2x/${ slideData.users[index].avatar } 2x" 
                                    class="user__photo"
                                    alt="avatar">
                        </picture>
                        <div class="user__emoji">${ slideData.selectedUserId && slideData.selectedUserId === slideData.users[index].id ? '👍' : '' }</div>
                    </div>
                    <div class="user__name">${ slideData.users[index].name }</div>
                </button>
            `;
        }

        html = `
            <div class="slide vote">
                <h1 class="slide__title">${slideData.title}</h1>
                <p class="slide__subtitle">${slideData.subtitle}</p>
                <div class="slide__content vote__content vote__content_orientation_portrait">
                    <div class="vote__column">
                        ${ renderUser(0) }
                        ${ renderUser(3) }
                        ${ renderUser(6) }
                    </div>
                    <div class="vote__column">
                        <button class="vote__arrow" data-action="update" data-params="{ alias: 'vote', data: { offset: 0 } }" disabled>
                            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(180)">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M32 62C48.5685 62 62 48.5685 62 32C62 15.4315 48.5685 2 32 2C15.4315 2 2 15.4315 2 32C2 48.5685 15.4315 62 32 62ZM32 64C49.6731 64 64 49.6731 64 32C64 14.3269 49.6731 0 32 0C14.3269 0 0 14.3269 0 32C0 49.6731 14.3269 64 32 64ZM59 32C59 46.9117 46.9117 59 32 59C17.0883 59 5 46.9117 5 32C5 17.0883 17.0883 5 32 5C46.9117 5 59 17.0883 59 32ZM25.0607 27.9393C24.4749 27.3536 23.5251 27.3536 22.9393 27.9393C22.3536 28.5251 22.3536 29.4749 22.9393 30.0607L30.9393 38.0607C31.5251 38.6464 32.4749 38.6464 33.0607 38.0607L41.0607 30.0607C41.6464 29.4749 41.6464 28.5251 41.0607 27.9393C40.4749 27.3536 39.5251 27.3536 38.9393 27.9393L32 34.8787L25.0607 27.9393Z" fill="#FCFBF7"/>
                            </svg>
                        </button>
                        ${ renderUser(1) }
                        ${ renderUser(4) }
                        <button class="vote__arrow" data-action="update" data-params="{ alias: 'vote', data: { offset: 0 } }">
                            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M32 62C48.5685 62 62 48.5685 62 32C62 15.4315 48.5685 2 32 2C15.4315 2 2 15.4315 2 32C2 48.5685 15.4315 62 32 62ZM32 64C49.6731 64 64 49.6731 64 32C64 14.3269 49.6731 0 32 0C14.3269 0 0 14.3269 0 32C0 49.6731 14.3269 64 32 64ZM59 32C59 46.9117 46.9117 59 32 59C17.0883 59 5 46.9117 5 32C5 17.0883 17.0883 5 32 5C46.9117 5 59 17.0883 59 32ZM25.0607 27.9393C24.4749 27.3536 23.5251 27.3536 22.9393 27.9393C22.3536 28.5251 22.3536 29.4749 22.9393 30.0607L30.9393 38.0607C31.5251 38.6464 32.4749 38.6464 33.0607 38.0607L41.0607 30.0607C41.6464 29.4749 41.6464 28.5251 41.0607 27.9393C40.4749 27.3536 39.5251 27.3536 38.9393 27.9393L32 34.8787L25.0607 27.9393Z" fill="#FCFBF7"/>
                            </svg>
                        </button>
                    </div>
                    <div class="vote__column">
                        ${ renderUser(2) }
                        ${ renderUser(5) }
                        ${ renderUser(7) }
                    </div>
                </div>
                <div class="slide__content vote__content vote__content_orientation_landscape">
                    <div class="vote__column">
                        ${ renderUser(0) }
                    </div>
                    <div class="vote__column">
                        ${ renderUser(1) }
                        ${ renderUser(4) }
                    </div>
                    <div class="vote__column">
                        <button class="vote__arrow" data-action="update" data-params="{ alias: 'vote', data: { offset: 0 } }" disabled>
                            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(180)">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M32 62C48.5685 62 62 48.5685 62 32C62 15.4315 48.5685 2 32 2C15.4315 2 2 15.4315 2 32C2 48.5685 15.4315 62 32 62ZM32 64C49.6731 64 64 49.6731 64 32C64 14.3269 49.6731 0 32 0C14.3269 0 0 14.3269 0 32C0 49.6731 14.3269 64 32 64ZM59 32C59 46.9117 46.9117 59 32 59C17.0883 59 5 46.9117 5 32C5 17.0883 17.0883 5 32 5C46.9117 5 59 17.0883 59 32ZM25.0607 27.9393C24.4749 27.3536 23.5251 27.3536 22.9393 27.9393C22.3536 28.5251 22.3536 29.4749 22.9393 30.0607L30.9393 38.0607C31.5251 38.6464 32.4749 38.6464 33.0607 38.0607L41.0607 30.0607C41.6464 29.4749 41.6464 28.5251 41.0607 27.9393C40.4749 27.3536 39.5251 27.3536 38.9393 27.9393L32 34.8787L25.0607 27.9393Z" fill="#FCFBF7"/>
                            </svg>
                        </button>
                        <button class="vote__arrow" data-action="update" data-params="{ alias: 'vote', data: { offset: 0 } }">
                            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M32 62C48.5685 62 62 48.5685 62 32C62 15.4315 48.5685 2 32 2C15.4315 2 2 15.4315 2 32C2 48.5685 15.4315 62 32 62ZM32 64C49.6731 64 64 49.6731 64 32C64 14.3269 49.6731 0 32 0C14.3269 0 0 14.3269 0 32C0 49.6731 14.3269 64 32 64ZM59 32C59 46.9117 46.9117 59 32 59C17.0883 59 5 46.9117 5 32C5 17.0883 17.0883 5 32 5C46.9117 5 59 17.0883 59 32ZM25.0607 27.9393C24.4749 27.3536 23.5251 27.3536 22.9393 27.9393C22.3536 28.5251 22.3536 29.4749 22.9393 30.0607L30.9393 38.0607C31.5251 38.6464 32.4749 38.6464 33.0607 38.0607L41.0607 30.0607C41.6464 29.4749 41.6464 28.5251 41.0607 27.9393C40.4749 27.3536 39.5251 27.3536 38.9393 27.9393L32 34.8787L25.0607 27.9393Z" fill="#FCFBF7"/>
                            </svg>
                        </button>
                    </div>
                    <div class="vote__column">
                        ${ renderUser(2) }
                        ${ renderUser(5) }
                    </div>
                    <div class="vote__column">
                        ${ renderUser(3) }
                    </div>
                </div>
            </div>
        `;
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

