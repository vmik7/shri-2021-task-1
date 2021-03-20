
// Функция рендеринга слайдов
window.renderTemplate = function(alias, data) {

    // *** Если передаём JSON с помощью инлайн-строки

    // Преобразуем html-кавычки в нормальные
    // let correctString = data.replace(/&#34;/g, `"`);

    // Парсим JSON данные
    // let slideData = JSON.parse(correctString);

    // ***

    // *** Если передаём JSON с помощью инлайн-строки

    let slideData = data;

    // ***

    // html-строка, которую будем возвращать
    let html = 'тут какая-то ошибка, неправильный alias';

    // Смотрим, какой алиас пришёл
    if (alias === 'leaders') {

        // * Шаблон "лидеры"

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

        // html для пользователя, за которого проголосовали, но он не в топ 3
        let htmlToBottomPosition = '';
        if (slideData.selectedUserId && selectedUserIndex >= 3) {
            htmlToBottomPosition = `
                <div class="user leaders__user leaders__user_bottom">
                    <div class="user__avatar">
                        <picture>
                            <img	src="assets/images/1x/${ slideData.users[4].avatar }"
                                    srcset="assets/images/2x/${ slideData.users[4].avatar } 2x"
                                    class="user__photo"
                                    alt="avatar">
                        </picture>
                        <div class="user__emoji">👍</div>
                    </div>
                    <div class="user__name">${ slideData.users[4].name }</div>
                    <div class="user__value-text">${ slideData.users[4].valueText }</div>
                </div>
                <div class="leaders__place-number leaders__place-number_bottom">${ (slideData.selectedUserId && selectedUserIndex >= 5 ? selectedUserIndex + 1 : 5) }</div>
            `;
        }

        // Формируем html
        html = `
            <div class="slide leaders">
            <h1 class="slide__title">${ slideData.title }</h1>
            <p class="slide__subtitle">${ slideData.subtitle }</p>
            <div class="slide__content leaders__content">
                <div class="leaders__column">
                    <div class="user leaders__user">
                        <div class="user__avatar">
                            <picture>
                                <img	src="assets/images/1x/${ slideData.users[4].avatar }"
                                        srcset="assets/images/2x/${ slideData.users[4].avatar } 2x"
                                        class="user__photo"
                                        alt="avatar">
                            </picture>
                            <div class="user__emoji">${ (slideData.selectedUserId && selectedUserIndex >= 4 ? '👍' : '') }</div>
                        </div>
                        <div class="user__name">${ slideData.users[4].name }</div>
                        <div class="user__value-text">${ slideData.users[4].valueText }</div>
                    </div>
                    <div class="leaders__stand">
                        <div class="leaders__place-number">${ (slideData.selectedUserId && selectedUserIndex >= 5 ? selectedUserIndex + 1 : 5) }</div>
                    </div>
                </div>
                <div class="leaders__column">
                    <div class="user leaders__user">
                        <div class="user__avatar">
                            <picture>
                                <img	src="assets/images/1x/${ slideData.users[2].avatar }"
                                        srcset="assets/images/2x/${ slideData.users[2].avatar } 2x"
                                        class="user__photo"
                                        alt="avatar">
                            </picture>
                            <div class="user__emoji">${ (slideData.selectedUserId && selectedUserIndex == 2 ? '👍' : '') }</div>
                        </div>
                        <div class="user__name">${ slideData.users[2].name }</div>
                        <div class="user__value-text">${ slideData.users[2].valueText }</div>
                    </div>
                    <div class="leaders__stand">
                        <div class="leaders__place-number">3</div>
                    </div>
                </div>
                <div class="leaders__column">
                    <div class="user leaders__user">
                        <div class="user__avatar">
                            <picture>
                                <img	src="assets/images/1x/${ slideData.users[0].avatar }"
                                        srcset="assets/images/2x/${ slideData.users[0].avatar } 2x"
                                        class="user__photo"
                                        alt="avatar">
                            </picture>
                            <div class="user__emoji">${ slideData.emoji }</div>
                        </div>
                        <div class="user__name">${ slideData.users[0].name }</div>
                        <div class="user__value-text">${ slideData.users[0].valueText }</div>
                    </div>
                    <div class="leaders__stand">
                        <div class="leaders__place-number">1</div>
                        ${ htmlToBottomPosition }
                    </div>
                </div>
                <div class="leaders__column">
                    <div class="user leaders__user">
                        <div class="user__avatar">
                            <picture>
                                <img	src="assets/images/1x/${ slideData.users[1].avatar }"
                                        srcset="assets/images/2x/${ slideData.users[1].avatar } 2x"
                                        class="user__photo"
                                        alt="avatar">
                            </picture>
                            <div class="user__emoji">${ (slideData.selectedUserId && selectedUserIndex == 1 ? '👍' : '') }</div>
                        </div>
                        <div class="user__name">${ slideData.users[1].name }</div>
                        <div class="user__value-text">${ slideData.users[1].valueText }</div>
                    </div>
                    <div class="leaders__stand">
                        <div class="leaders__place-number">2</div>
                    </div>
                </div>
                <div class="leaders__column">
                    <div class="user leaders__user">
                        <div class="user__avatar">
                            <picture>
                                <img	src="assets/images/1x/${ slideData.users[3].avatar }"
                                        srcset="assets/images/2x/${ slideData.users[3].avatar } 2x"
                                        class="user__photo"
                                        alt="avatar">
                            </picture>
                            <div class="user__emoji">${ (slideData.selectedUserId && selectedUserIndex == 3 ? '👍' : '') }</div>
                        </div>
                        <div class="user__name">${ slideData.users[3].name }</div>
                        <div class="user__value-text">${ slideData.users[3].valueText }</div>
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

        // * Шаблон "голосование"

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

        // Формируем html
        html = `
            <div class="slide vote">
                <h1 class="slide__title">${ slideData.title }</h1>
                <p class="slide__subtitle">${ slideData.subtitle }</p>
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

        // * Шаблон "chart"

        // Ищем индекс текущего стобца диаграммы
        let activeIndex = 0;
        for (let i = 0; i < slideData.values.length; i++) {
            if (slideData.values[i].active) {
                activeIndex = i;
                break;
            }
        }

        // Ищем диапазон элементов, которые будем выводить
        let indexR = Math.min(activeIndex + 2, slideData.values.length - 1);
        let indexL = Math.max(indexR - 9 + 1, 0);

        // Ищем максимум по всем стобцам из диапазона
        let maxValue = slideData.values[indexR].value;
        for (let i = indexL; i < indexR; i++) {
            maxValue = Math.max(maxValue, slideData.values[i].value);
        }

        // Рендерим столбики с нужной высотой
        let readyItemsHtml = ``;
        for (let i = indexL; i <= indexR; i++) {
            readyItemsHtml += `
                <div class="graph__item${ slideData.values[i].active ? ' graph__item_active' : '' }">
                    <div class="graph__column">
                        <div class="graph__value">${ i <= activeIndex ? slideData.values[i].value : '' }</div>
                        <div class="graph__bar" style="height: calc(70% * ${ slideData.values[i].value } / ${ maxValue });"></div>
                    </div>
                    <div class="graph__label">${ slideData.values[i].title }</div>
                </div>
            `;
        }

        // Формируем готовый html
        html = `
            <div class="slide chart">
                <h1 class="slide__title">${ slideData.title }</h1>
                <p class="slide__subtitle">${ slideData.subtitle }</p>
                <div class="slide__content chart__content">
                    <div class="chart__graph graph">
                        <div class="graph__track">
                            ${ readyItemsHtml }
                        </div>
                    </div>
                    <div class="chart__users">
                        <div class="user user_view_inline chart__user">
                            <div class="user__avatar">
                                <picture>
                                    <img	src="assets/images/1x/${ slideData.users[0].avatar }"
                                            srcset="assets/images/2x/${ slideData.users[0].avatar } 2x"
                                            class="user__photo"
                                            alt="avatar">
                                </picture>
                            </div>
                            <div class="user__info">
                                <div class="user__name">${ slideData.users[0].name }</div>
                                <div class="user__value-text">${ slideData.users[0].valueText }</div>
                            </div>
                        </div>
                        <div class="chart__users-sep"></div>
                        <div class="user user_view_inline chart__user">
                            <div class="user__avatar">
                                <picture>
                                    <img	src="assets/images/1x/${ slideData.users[1].avatar }"
                                            srcset="assets/images/2x/${ slideData.users[1].avatar } 2x"
                                            class="user__photo"
                                            alt="avatar">
                                </picture>
                            </div>
                            <div class="user__info">
                                <div class="user__name">${ slideData.users[1].name }</div>
                                <div class="user__value-text">${ slideData.users[1].valueText }</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    else if (alias === 'diagram') {

        // * Шаблон "diagram"

        // Выделяем числовую часть valueText и differenceText в отдельные массивы
        let values = [], diffs = [];
        for (let i = 0; i < 4; i++) {
            values[i] = slideData.categories[i].valueText.match(/[+-]?[0-9]+/g);
            diffs[i] = slideData.categories[i].differenceText.match(/[+-]?[0-9]+/g);
        }

        // Cчитаем проценты для диаграммы
        let sum = +values[0] + +values[1] + +values[2] + +values[3];

        let percents = [];
        for (let i = 0; i < 3; i++) {
            percents[i] = Math.floor(values[i] * 1000 / sum);
        }
        percents[3] = 1000 - percents[0] - percents[1] - percents[2];

        // Считаем сдвиги секторов для диаграммы
        let offsets = [];
        offsets[0] = 250 + 80;
        offsets[1] = 1000 + 250 + 80 - percents[0];
        offsets[2] = offsets[1] - percents[1];
        offsets[3] = offsets[2] - percents[2];
        
        // Формируем готовый html
        html = `
            <div class="slide diagram">
                <h1 class="slide__title">${ slideData.title }</h1>
                <p class="slide__subtitle">${ slideData.subtitle }</p>
                <div class="slide__content diagram__content">
                    <div class="diagram__figure">
                        <svg width="100%" height="100%" viewBox="-190 -190 380 380" class="diagram__pie-chart pie-chart">
                            <radialGradient id="grad-l1-dark" cx="0" cy="0" r="159.1549430918954" gradientUnits="userSpaceOnUse" gradientTransform="scale(1.25)">
                                <stop offset="0.71875" stop-color="#FFA300"/>
                                <stop offset="1" stop-color="#5B3A00"/>
                            </radialGradient>
                            <radialGradient id="grad-l2-dark" cx="0" cy="0" r="159.1549430918954" gradientUnits="userSpaceOnUse" gradientTransform="scale(1.25)">
                                <stop offset="0.729167" stop-color="#633F00"/>
                                <stop offset="1" stop-color="#0F0900"/>
                            </radialGradient>
                            <radialGradient id="grad-l3-dark" cx="0" cy="0" r="159.1549430918954" gradientUnits="userSpaceOnUse" gradientTransform="scale(1.25)">
                                <stop offset="0.71875" stop-color="#9B9B9B"/>
                                <stop offset="1" stop-color="#382900"/>
                            </radialGradient>
                            <radialGradient id="grad-l4-dark" cx="0" cy="0" r="159.1549430918954" gradientUnits="userSpaceOnUse" gradientTransform="scale(1.25)">
                                <stop offset="0.71875" stop-color="#4D4D4D"/>
                                <stop offset="1" stop-color="#382900"/>
                            </radialGradient>
                            <radialGradient id="grad-l1-light" cx="0" cy="0" r="159.1549430918954" gradientUnits="userSpaceOnUse" gradientTransform="scale(1.25)">
                                <stop offset="0.8125" stop-color="#FFB800" stop-opacity="0.7"/>
                                <stop offset="1" stop-color="#FFEF99" stop-opacity="0.4"/>
                            </radialGradient>
                            <radialGradient id="grad-l2-light" cx="0" cy="0" r="159.1549430918954" gradientUnits="userSpaceOnUse" gradientTransform="scale(1.25)">
                                <stop offset="0.8125" stop-color="#FFB800" stop-opacity="0.4"/>
                                <stop offset="1" stop-color="#FFEF99" stop-opacity="0.2"/>  
                            </radialGradient>
                            <radialGradient id="grad-l3-light" cx="0" cy="0" r="159.1549430918954" gradientUnits="userSpaceOnUse" gradientTransform="scale(1.25)">
                                <stop offset="0.828125" stop-color="#A6A6A6" stop-opacity="0.69"/>
                                <stop offset="0.921875" stop-color="#CBCBCB" stop-opacity="0.2"/>
                            </radialGradient>
                            <radialGradient id="grad-l4-light" cx="0" cy="0" r="159.1549430918954" gradientUnits="userSpaceOnUse" gradientTransform="scale(1.25)">
                                <stop offset="0.828125" stop-color="#BFBFBF" stop-opacity="0.69"/>
                                <stop offset="0.921875" stop-color="#E4E4E4" stop-opacity="0.2"/>
                            </radialGradient>
                            <circle class="pie-chart__segment pie-chart__segment_l1" cx="0" cy="0" r="159.1549430918954" fill="transparent" stroke-width="57" stroke-dasharray="${ percents[0] - 3 } ${ 1003 - percents[0] }" stroke-dashoffset="${ offsets[0] }"></circle>
                            <circle class="pie-chart__segment pie-chart__segment_l2" cx="0" cy="0" r="159.1549430918954" fill="transparent" stroke-width="57" stroke-dasharray="${ percents[1] - 3 } ${ 1003 - percents[1] }" stroke-dashoffset="${ offsets[1] }"></circle>
                            <circle class="pie-chart__segment pie-chart__segment_l3" cx="0" cy="0" r="159.1549430918954" fill="transparent" stroke-width="57" stroke-dasharray="${ percents[2] - 3 } ${ 1003 - percents[2] }" stroke-dashoffset="${ offsets[2] }"></circle>
                            <circle class="pie-chart__segment pie-chart__segment_l4" cx="0" cy="0" r="159.1549430918954" fill="transparent" stroke-width="57" stroke-dasharray="${ percents[3] - 3 } ${ 1003 - percents[3] }" stroke-dashoffset="${ offsets[3] }"></circle>
                        </svg>
                        <div class="diagram__center-block">
                            <div class="diagram__text-total">${ slideData.totalText }</div>
                            <div class="diagram__text-diff">${ slideData.differenceText }</div>
                        </div>
                    </div>
                    <div class="diagram__legend">
                        <div class="diagram__legend-line">
                            <div class="diagram__legend-dot diagram__legend-dot_l1"></div>
                            <div class="diagram__legend-title">${ slideData.categories[0].title }</div>
                            <div class="diagram__legend-diff">${ diffs[0] }</div>
                            <div class="diagram__legend-value">${ values[0] }</div>
                        </div>
                        <div class="diagram__legend-line">
                            <div class="diagram__legend-dot diagram__legend-dot_l2"></div>
                            <div class="diagram__legend-title">${ slideData.categories[1].title }</div>
                            <div class="diagram__legend-diff">${ diffs[1] }</div>
                            <div class="diagram__legend-value">${ values[1] }</div>
                        </div>
                        <div class="diagram__legend-line">
                            <div class="diagram__legend-dot diagram__legend-dot_l3"></div>
                            <div class="diagram__legend-title">${ slideData.categories[2].title }</div>
                            <div class="diagram__legend-diff">${ diffs[2] }</div>
                            <div class="diagram__legend-value">${ values[2] }</div>
                        </div>
                        <div class="diagram__legend-line">
                            <div class="diagram__legend-dot diagram__legend-dot_l4"></div>
                            <div class="diagram__legend-title">${ slideData.categories[3].title }</div>
                            <div class="diagram__legend-diff">${ diffs[3] }</div>
                            <div class="diagram__legend-value">${ values[3] }</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    else if (alias === 'activity') {

        // * Шаблон "activity"

        // Ключи для дней недели
        let keysPerDay = [ 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun' ];

        // Считаем значения карты для портретной ориентации
        let valuesPortrait = []; // [24]x[7]
        for (let i = 0; i < 24; i++) {
            valuesPortrait[i] = [];
            for (let j = 0; j < 7; j++) {
                valuesPortrait[i][j] = slideData.data[keysPerDay[j]][i];
            }
        }

        // Считаем максимальное значение для портретной ориентации
        let maxValuePortrait = valuesPortrait[0][0];
        for (let i = 0; i < 24; i++) {
            for (let j = 0; j < 7; j++) {
                if (valuesPortrait[i][j] > maxValuePortrait) {
                    maxValuePortrait = valuesPortrait[i][j];
                }
            }
        }

        // Вычисляем шкалу для легенды в портретной ориентации
        let breakPointsPortrait = [];
        breakPointsPortrait[0] = 0;
        breakPointsPortrait[1] = Math.max(2, Math.floor(maxValuePortrait / 3));
        breakPointsPortrait[2] = Math.max(4, 2 * Math.floor(maxValuePortrait / 3));
        breakPointsPortrait[3] = Math.max(6, maxValuePortrait);


        // Считаем значения карты для ландшафтной ориентации
        let valuesLandscape = []; // [7]x[12]
        for (let i = 0; i < 7; i++) {
            valuesLandscape[i] = [];
            for (let j = 0; j < 12; j++) {
                valuesLandscape[i][j] = slideData.data[keysPerDay[i]][2 * j] + slideData.data[keysPerDay[i]][2 * j + 1]
            }
        }

        // Считаем максимальное значение для ландшафтной ориентации
        let maxValueLandscape = valuesLandscape[0][0];
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 12; j++) {
                if (valuesLandscape[i][j] > maxValueLandscape) {
                    maxValueLandscape = valuesLandscape[i][j];
                }
            }
        }

        // Вычисляем шкалу для легенды в ландшафтной ориентации
        let breakPointsLandscape = [];
        breakPointsLandscape[1] = Math.max(2, Math.floor(maxValueLandscape / 3));
        breakPointsLandscape[2] = Math.max(4, 2 * Math.floor(maxValueLandscape / 3));
        breakPointsLandscape[3] = Math.max(6, maxValueLandscape);

        // Эта функция будет навешивать нужный модификатор на класс стобика
        let getColumnMod = (value, breakPoints) => {
            if (value == 0)
                return 'min';
            else if (value <= breakPoints[1])
                return 'mid';
            else if (value <= breakPoints[2])
                return 'max';
            return 'extra';
        }
        
        // Генерируем html для портретной ориентации
        let htmlPortrait = '';
        for (let i = 0; i < 24; i++) {
            htmlPortrait += '<div class="map__row">';
            for (let j = 0; j < 7; j++) {
                htmlPortrait += `<div class="map__col map__col_${ getColumnMod(valuesPortrait[i][j], breakPointsPortrait) }"></div>`;
            }
            htmlPortrait += '</div>';
        }

        // Генерируем html для ландшафтной ориентации
        let htmlLandscape = '';
        for (let i = 0; i < 7; i++) {
            htmlLandscape += '<div class="map__row">';
            for (let j = 0; j < 12; j++) {
                htmlLandscape += `<div class="map__col map__col_${ getColumnMod(valuesLandscape[i][j], breakPointsLandscape) }"></div>`;
            }
            htmlLandscape += '</div>';
        }

        // Формируем финальный html
        html = `
            <div class="slide activity">
                <h1 class="slide__title">${ slideData.title }</h1>
                <p class="slide__subtitle">${ slideData.subtitle }</p>
                <div class="slide__content activity__content">
                    <div class="activity__figure">
                        <div class="map map__orientation_portrait">
                            ${ htmlPortrait }
                        </div>
                        <div class="map map__orientation_landscape">
                            ${ htmlLandscape }
                        </div>
                    </div>
                    <div class="activity__legend">
                        <div class="activity__legend-item">
                            <div class="activity__legend-tile"><div class="activity__legend-segment"></div></div>
                            <div class="activity__legend-label activity__legend-label_portrait">1 час</div>
                            <div class="activity__legend-label activity__legend-label_landscape">2 часa</div>
                        </div>
                        <div class="activity__legend-item">
                            <div class="activity__legend-tile"></div>
                            <div class="activity__legend-label">0</div>
                        </div>
                        <div class="activity__legend-item">
                            <div class="activity__legend-tile"></div>
                            <div class="activity__legend-label activity__legend-label_portrait">1&thinsp;—&thinsp;${ breakPointsPortrait[1] }</div>
                            <div class="activity__legend-label activity__legend-label_landscape">1&thinsp;—&thinsp;${ breakPointsLandscape[1] }</div>
                        </div>
                        <div class="activity__legend-item">
                            <div class="activity__legend-tile"></div>
                            <div class="activity__legend-label activity__legend-label_portrait">${ breakPointsPortrait[1] + 1 }&thinsp;—&thinsp;${ breakPointsPortrait[2] }</div>
                            <div class="activity__legend-label activity__legend-label_landscape">${ breakPointsLandscape[1] + 1 }&thinsp;—&thinsp;${ breakPointsLandscape[2] }</div>
                        </div>
                        <div class="activity__legend-item">
                            <div class="activity__legend-tile"></div>
                            <div class="activity__legend-label activity__legend-label_portrait">${ breakPointsPortrait[2] + 1 }&thinsp;—&thinsp;${ breakPointsPortrait[3] }</div>
                            <div class="activity__legend-label activity__legend-label_landscape">${ breakPointsLandscape[2] + 1 }&thinsp;—&thinsp;${ breakPointsLandscape[3] }</div>
                        </div>
                    </div>
                </div>
            </div>        
        `;
    }

    // Возвращаем сформированный html
    return html;
}

