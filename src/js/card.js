document.addEventListener('DOMContentLoaded', () => {
    // Функция для создания карточки товара
    function createProductCard() {
        const card = document.createElement('div');
        card.className = 'card';

        const cardRow = document.createElement('div');
        cardRow.className = 'card-row';

        const cardImages = document.createElement('div');
        cardImages.className = 'card-images';

        const mainImage = document.createElement('div');
        mainImage.className = 'card-image';
        const mainImg = document.createElement('img');
        mainImg.src = './public/img/products/flis/onesided/product1/img1.jpg';
        mainImg.alt = 'image';
        mainImage.appendChild(mainImg);

        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'card-image_wrapper';

        for (let i = 0; i < 3; i++) { // Добавляем три изображения
            const smallImage = document.createElement('div');
            smallImage.className = 'card-image';
            const img = document.createElement('img');
            img.src = './public/img/products/flis/onesided/product1/img1.jpg';
            img.alt = 'image';
            smallImage.appendChild(img);
            imageWrapper.appendChild(smallImage);
        }

        cardImages.appendChild(mainImage);
        cardImages.appendChild(imageWrapper);
        cardRow.appendChild(cardImages);

        const cardDescription = document.createElement('div');
        cardDescription.className = 'card-description';

        const title = document.createElement('h3');
        title.className = 'title-3';
        title.textContent = 'Флис односторонний';
        cardDescription.appendChild(title);

        const cardBox = document.createElement('div');
        cardBox.className = 'card-box';
        cardDescription.appendChild(cardBox);

        const cardSale = document.createElement('div');
        cardSale.className = 'card-sale';
        cardSale.textContent = 'В наличии';
        cardBox.appendChild(cardSale);

        const fieldsetColor = document.createElement('fieldset');
        const legendColor = document.createElement('legend');
        legendColor.className = 'menu-color';
        legendColor.textContent = 'Выберите цвет';
        fieldsetColor.appendChild(legendColor);

        const colorWrapper = document.createElement('div');
        colorWrapper.className = 'color-wrapper';
        const colors = ['color1', 'color2', 'color3', 'color4'];

        colors.forEach((color, index) => {
            const div = document.createElement('div');
            const input = document.createElement('input');
            input.type = 'radio';
            input.id = `color${index + 1}`;
            input.name = 'color';
            input.value = color;
            if (index === 0) input.checked = true; // Первый цвет по умолчанию выбран
            const label = document.createElement('label');
            label.htmlFor = `color${index + 1}`;
            label.textContent = color;
            div.appendChild(input);
            div.appendChild(label);
            colorWrapper.appendChild(div);
            legendColor.appendChild(colorWrapper);
        });

        fieldsetColor.appendChild(colorWrapper);
        cardBox.appendChild(fieldsetColor);

        const cardList = document.createElement('ul');
        cardList.className = 'card-list';
        const items = [
            { name: 'плотность', mean: 'ytgyt' },
            { name: 'цвет', mean: '' },
            { name: 'состав', mean: '' },
            { name: 'ширина', mean: '150-220' },
            { name: 'страна производитель', mean: 'Китай' },
        ];

        items.forEach(item => {
            const listItem = document.createElement('li');
            listItem.className = 'card-item';
            const itemName = document.createElement('span');
            itemName.className = 'item-name';
            itemName.textContent = item.name;
            const itemMean = document.createElement('span');
            itemMean.className = 'item-mean';
            itemMean.textContent = item.mean;
            listItem.appendChild(itemName);
            listItem.appendChild(itemMean);

            if (item.name === 'ширина') {
                const sizeFieldset = document.createElement('fieldset');
                const sizeLegend = document.createElement('legend');
                sizeLegend.textContent = 'Выбрать';
                sizeFieldset.appendChild(sizeLegend);
                const boxSize = document.createElement('div');
                const sizes = ['150', '180', '220'];

                sizes.forEach((size, index) => {
                    const div = document.createElement('div');
                    const input = document.createElement('input');
                    input.type = 'radio';
                    input.id = `size${index + 1}`;
                    input.name = 'size';
                    input.value = `size${index + 1}`;
                    if (index === 0) input.checked = true; // Первый размер по умолчанию выбран
                    const label = document.createElement('label');
                    label.htmlFor = `size${index + 1}`;
                    label.textContent = size;
                    div.appendChild(input);
                    div.appendChild(label);
                    boxSize.appendChild(div);
                });

                sizeFieldset.appendChild(boxSize);
                listItem.appendChild(sizeFieldset);
            }

            cardList.appendChild(listItem);
        });

        cardDescription.appendChild(cardList);

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

    // Вызов функции для создания карточки товара
    createProductCard();
});