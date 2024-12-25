document.addEventListener('DOMContentLoaded', () => {
    // Функция для рендеринга карточки товара
    function renderProductCard(product) {
        const card = document.createElement('div');
        card.className = 'card';

        const cardRow = document.createElement('div');
        cardRow.className = 'card-row';

        const cardImages = document.createElement('div');
        cardImages.className = 'card-images';

        // Проверка на наличие изображений в объекте товара
        const images = [product.image1, product.image2, product.image3, product.image4];
        const validImages = images.filter(image => image); // Фильтруем пустые изображения

        if (validImages.length > 0) {
            // Основное изображение
            const mainImage = document.createElement('div');
            mainImage.className = 'card-image';
            const mainImg = document.createElement('img');
            mainImg.src = validImages[0];  // Первое изображение
            mainImg.alt = 'image';
            mainImage.appendChild(mainImg);

            const imageWrapper = document.createElement('div');
            imageWrapper.className = 'card-image_wrapper';

            validImages.slice(1).forEach(imageSrc => { // Добавляем оставшиеся изображения
                const smallImage = document.createElement('div');
                smallImage.className = 'card-image';
                const img = document.createElement('img');
                img.src = imageSrc;
                img.alt = 'image';
                smallImage.appendChild(img);
                imageWrapper.appendChild(smallImage);
            });

            cardImages.appendChild(mainImage);
            cardImages.appendChild(imageWrapper);
        } else {
            // Если изображений нет, показываем заглушку или пустое место
            const noImage = document.createElement('div');
            noImage.className = 'no-image';
            noImage.textContent = 'Изображение отсутствует';
            cardImages.appendChild(noImage);
        }

        cardRow.appendChild(cardImages);

        const cardDescription = document.createElement('div');
        cardDescription.className = 'card-description';

        const title = document.createElement('h3');
        title.className = 'title-3';
        title.textContent = product.description || 'Без описания';  // Если описание отсутствует, показываем заглушку
        cardDescription.appendChild(title);

        const cardBox = document.createElement('div');
        cardBox.className = 'card-box';
        cardDescription.appendChild(cardBox);

        const cardSale = document.createElement('div');
        cardSale.className = 'card-sale';
        cardSale.textContent = product.sale || 'Не указано';  // Если статус отсутствует, показываем заглушку
        cardBox.appendChild(cardSale);

        const fieldsetColor = document.createElement('fieldset');
        const legendColor = document.createElement('legend');
        legendColor.className = 'menu-color';
        legendColor.textContent = 'Выберите цвет';
        fieldsetColor.appendChild(legendColor);

        const colorWrapper = document.createElement('div');
        colorWrapper.className = 'color';

        // Массив для хранения выбранного цвета
        let selectedColor = null;

        // Генерация блоков для выбора цвета
        for (const colorKey in product.content['Цвет']) {
            const div = document.createElement('div');
            const input = document.createElement('input');
            input.type = 'radio';
            input.id = `color-${colorKey}-${product.id}`;  // Добавляем уникальный идентификатор с ID товара
            input.name = `color-${product.id}`;  // Уникальное имя для группы радиокнопок
            input.value = colorKey;

            const label = document.createElement('label');
            label.htmlFor = `color-${colorKey}-${product.id}`;
            label.textContent = product.content['Цвет'][colorKey];

            div.appendChild(input);
            div.appendChild(label);
            colorWrapper.appendChild(div);
        }

        // Обработка события выбора радиокнопки
        colorWrapper.addEventListener('change', function(event) {
            if (event.target.name.includes('color')) {  // Проверяем, что это выбор цвета
                const selectedColorKey = event.target.value;
                selectedColor = product.content['Цвет'][selectedColorKey]; // Сохраняем выбранный цвет

                // Обновляем элемент для текущей карточки
                const colorLi = card.querySelector('.card-item.color'); // Используем card как родитель
                if (colorLi) {
                    const itemMean = colorLi.querySelector('.item-mean');
                    itemMean.textContent = selectedColor || 'Не указано';
                }

                // Дополнительные действия, например, вывод в консоль
                console.log(`Выбранный цвет для товара ${product.id}:`, selectedColor);
            }
        });

        fieldsetColor.appendChild(colorWrapper);
        cardBox.appendChild(fieldsetColor);

        const cardList = document.createElement('ul');
        cardList.className = 'card-list';

        const items = [
            { name: 'Плотность', mean: product.content['Плотность'] },
            { name: 'Цвет', mean: selectedColor || 'Не указано' }, // Сюда добавляем цвет, который будет обновляться
            { name: 'Состав', mean: product.content['Состав'] },
            { name: 'Ширина', mean: product.content['ширина'] },
            { name: 'Страна производитель', mean: product.content['Страна производитель'] },
            { name: 'Цена', mean: product.content['Цена'] }
        ];

        items.forEach(item => {
            const listItem = document.createElement('li');
            listItem.className = 'card-item';
            if (item.name === 'Цвет') {
                listItem.classList.add('color'); // Добавляем класс для цвета
            }
            const itemName = document.createElement('span');
            itemName.className = 'item-name';
            itemName.textContent = item.name;
            const itemMean = document.createElement('span');
            itemMean.className = 'item-mean';
            itemMean.textContent = item.mean || 'Не указано';  // Проверка значения
            listItem.appendChild(itemName);
            listItem.appendChild(itemMean);
            cardList.appendChild(listItem);
        });

        cardDescription.appendChild(cardList);

        // Добавляем количество товара
        const countCard = document.createElement('div');
        countCard.id = 'count-card';
        const decreaseButton = document.createElement('button');
        decreaseButton.id = 'decrease';
        decreaseButton.textContent = '-';
        const counterText = document.createElement('div');
        counterText.className = 'cuonter-text';
        const quantitySpan = document.createElement('span');
        quantitySpan.id = 'quantity';
        quantitySpan.textContent = '1';
        const unitSpan = document.createElement('span');
        unitSpan.textContent = 'рул.';
        counterText.appendChild(quantitySpan);
        counterText.appendChild(unitSpan);
        const increaseButton = document.createElement('button');
        increaseButton.id = 'increase';
        increaseButton.textContent = '+';

        countCard.appendChild(decreaseButton);
        countCard.appendChild(counterText);
        countCard.appendChild(increaseButton);
        cardList.appendChild(countCard);

        // Кнопки "Заказать образец" и "Купить"
        const cardButtons = document.createElement('div');
        cardButtons.className = 'card-buttons';
        const sampleButton = document.createElement('button');
        sampleButton.className = 'card-btn1';
        sampleButton.textContent = 'Заказать образец';
        const buyButton = document.createElement('button');
        buyButton.className = 'card-btn2';
        buyButton.id = 'order-button';
        buyButton.textContent = 'Купить';

        cardButtons.appendChild(sampleButton);
        cardButtons.appendChild(buyButton);

        const cardContentWrapper = document.createElement('div');
        cardContentWrapper.className = 'card-content__wrapper';

        // Иконки с дополнительной информацией
        const features = [
            { icon: './public/img/card/icon-1.svg', text: 'Возможности' },
            { icon: './public/img/card/icon-2.svg', text: 'Доставка' },
            { icon: './public/img/card/icon-3.svg', text: 'Оплата' },
        ];

        features.forEach(feature => {
            const cardContent = document.createElement('div');
            cardContent.className = 'card-content';
            const contentIcon = document.createElement('span');
            contentIcon.className = 'content-icon';
            const img = document.createElement('img');
            img.src = feature.icon;
            img.alt = 'icon';
            contentIcon.appendChild(img);
            const cardText = document.createElement('span');
            cardText.className = 'card-text';
            cardText.textContent = feature.text;
            cardContent.appendChild(contentIcon);
            cardContent.appendChild(cardText);
            cardContentWrapper.appendChild(cardContent);
        });

        cardDescription.appendChild(cardBox);
        cardRow.appendChild(cardDescription);
        card.appendChild(cardRow);
        cardDescription.appendChild(cardList);
        cardDescription.appendChild(cardButtons);
        cardDescription.appendChild(cardContentWrapper);

        // Добавляем карточку на страницу
        document.body.appendChild(card);
    }

    // Загружаем данные из JSON и создаем карточки товара
    fetch('./products.json')  // Путь к JSON файлу
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка загрузки данных');
            }
            return response.json();
        })
        .then(data => {
            data.forEach(product => {
                renderProductCard(product);  // Вызываем новую функцию для рендеринга
            });
        })
        .catch(error => console.error('Ошибка:', error));
});
