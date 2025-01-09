document.addEventListener('DOMContentLoaded', () => {
    const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
    
    if (selectedProduct) {
        displaySelectedCard(selectedProduct); // Вызовите функцию для отображения выбранной карточки
    } else {
        console.error('Нет выбранного продукта');
    }
});

function displaySelectedCard(product) {
    const productCardsContainer = document.querySelector('.products-cards');
    productCardsContainer.innerHTML = ''; // Очистить контейнер

    // Создание карточки продукта
    const productCard = document.createElement('div');
    productCard.className = 'product-card';

    // Добавьте здесь код для отображения информации о продукте (как в функции showNewFormat)
    // Создаем блок для отображения в новом формате
    //const product = data[index]; // Используем глобальную переменную data
    productCardsContainer.style.display = "block";

    productCardsContainer.innerHTML = ''; // Очистить контейнер

    // Создаем кнопку для отображения в старом формате
    const btnBackWrapper = document.createElement('div');
    btnBackWrapper.className = "btn-back__wrapper";
    btnBackWrapper.style.display = "flex";

    const btnBackIcon = document.createElement('span');
    btnBackIcon.innerHTML = `
    <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.19061 1.9523C5.2643 1.88364 5.3234 1.80084 5.36439 1.70884C5.40538 1.61684 5.42743 1.51753 5.4292 1.41682C5.43098 1.31612 5.41245 1.21609 5.37473 1.1227C5.33701 1.02932 5.28087 0.944483 5.20965 0.873264C5.13843 0.802045 5.0536 0.745901 4.96021 0.70818C4.86682 0.670458 4.76679 0.651934 4.66609 0.65371C4.56538 0.655487 4.46607 0.677529 4.37407 0.718521C4.28207 0.759513 4.19927 0.818616 4.13061 0.892303L0.34961 4.6723L4.12961 8.4523C4.271 8.58899 4.46041 8.66468 4.65706 8.66306C4.85371 8.66144 5.04186 8.58266 5.18098 8.44367C5.3201 8.30467 5.39907 8.1166 5.40087 7.91995C5.40267 7.72331 5.32716 7.53382 5.19061 7.3923L3.22061 5.4223L13.5996 5.4223C13.7985 5.4223 13.9893 5.34329 14.1299 5.20263C14.2706 5.06198 14.3496 4.87122 14.3496 4.6723C14.3496 4.47339 14.2706 4.28263 14.1299 4.14197C13.9893 4.00132 13.7985 3.9223 13.5996 3.9223L3.22061 3.9223L5.19061 1.9523Z" fill="#524431" fill-opacity="0.56"/>
    </svg>`
    const btnBack = document.createElement('button');
    btnBack.className = 'back-button';
    btnBack.id = 'back-button';
    btnBack.textContent = 'вернуться назад';
    btnBack.onclick = function() {
        goBack();
      };
    btnBackWrapper.appendChild(btnBackIcon);
    btnBackWrapper.appendChild(btnBack);


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
    cardRow.appendChild(cardDescription);

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
    colorWrapper.className = 'color-wrapper';

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
      input.className = "input-color";

      const label = document.createElement('label');
      label.htmlFor = `color-${colorKey}-${product.id}`;
      label.textContent = product.content['Цвет'][colorKey];
      label.className = "custom-color";

      const iconColor = document.createElement('label');
      iconColor.className = "icon-label";

      const iconImg = document.createElement('div');
      iconImg.className = "icon-img";

      div.appendChild(input);
      div.appendChild(label);
      colorWrapper.appendChild(div);
      label.appendChild(iconColor);
      iconColor.appendChild(iconImg);
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

  
  legendColor.appendChild(colorWrapper);
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
countCard.className = 'count-card'; // Изменено на className для независимости
const decreaseButton = document.createElement('button');
decreaseButton.className = 'decrease'; // Изменено на className
decreaseButton.textContent = '-';
const counterText = document.createElement('div');
counterText.className = 'counter-text'; // Исправлено название класса
const quantitySpan = document.createElement('span');
quantitySpan.className = 'quantity'; // Изменено на className
quantitySpan.textContent = '1';
const unitSpan = document.createElement('span');
unitSpan.textContent = ' рул.';
counterText.appendChild(quantitySpan);
counterText.appendChild(unitSpan);
const increaseButton = document.createElement('button');
increaseButton.className = 'increase'; // Изменено на className
increaseButton.textContent = '+';

countCard.appendChild(decreaseButton);
countCard.appendChild(counterText);
countCard.appendChild(increaseButton);
cardList.appendChild(countCard);

// Локальная переменная quantity для каждого счетчика
let quantity = 1;

// Обработчики событий для кнопок увеличения и уменьшения
increaseButton.addEventListener('click', () => {
    quantity++;
    quantitySpan.textContent = quantity;
});

decreaseButton.addEventListener('click', () => {
    if (quantity > 1) {
        quantity--;
        quantitySpan.textContent = quantity;
    }
});

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
      { icon: './public/img/card/icon-1.svg', text: 'Возможности', id:'btn-possibilities' },
      { icon: './public/img/card/icon-2.svg', text: 'Доставка', id:'btn-delivery'  },
      { icon: './public/img/card/icon-3.svg', text: 'Оплата', id:'btn-payment'  },
  ];

  features.forEach(feature => {
    const cardContent = document.createElement('div');
    cardContent.className = 'card-content';
    // Присваиваем свойство 'id' элементу cardContent
    cardContent.id = feature.id;
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


  card.appendChild(cardRow);
  cardRow.appendChild(cardDescription);
  cardDescription.appendChild(cardBox);
  cardDescription.appendChild(cardList);
  cardDescription.appendChild(cardButtons);
  cardDescription.appendChild(cardContentWrapper);

  // Добавляем карточку на страницу
  productCardsContainer.innerHTML = ''; // Очистить контейнер
  productCardsContainer.appendChild(card); // Добавить карточку в контейнер
  productCardsContainer.appendChild(btnBackWrapper);
  btnBackWrapper.appendChild(btnBackIcon);
  btnBackWrapper.appendChild(btnBack);
  card.appendChild(cardRow);
  // Добавляем карточку на страницу
    productCardsContainer.appendChild(card); // Добавить карточку в контейнер


    const btnDelivery = document.getElementById('btn-delivery');
    const btnPayment = document.getElementById('btn-payment');
    const btnPossibilitiest = document.getElementById('btn-possibilities');
    
    const windowDelivery = document.getElementById('window-delivery');
    const windowPayment = document.getElementById('window-payment');
    const windowPossibilitiest = document.getElementById('window-possibilities');
    const overlay = document.querySelector('.overlay');
    card.appendChild(windowDelivery);

      
    
    btnDelivery.addEventListener('click', () => {
        windowDelivery.style.display = 'flex';
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';

        windowPayment.style.display = 'none';
        windowPossibilitiest.style.display = 'none';
    });
    
    btnPayment.addEventListener('click', () => {
        windowPayment.style.display = 'block';
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';

        windowDelivery.style.display = 'none' ;
        windowPossibilitiest.style.display = 'none' ;
    });

    btnPossibilitiest.addEventListener('click', () => {
        windowPossibilitiest.style.display = 'block' ;
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';

        windowPayment.style.display = 'none' ;
        windowDelivery.style.display = 'none' ;
    });

    const btnClose = document.querySelectorAll('.btn-close');

btnClose.forEach(btn => {
    btn.addEventListener('click', () => {
        const windows = document.querySelectorAll('.window-delivery, .window-possibilities, .window-payment');
        const overlay = document.querySelector('.overlay');

        windows.forEach(window => {
            window.style.display = 'none';
        });

        overlay.style.display = 'none';
        document.body.style.overflow = 'scroll';
    }); productCardsContainer.appendChild(productCard); // Добавьте карточку в контейнер
    // Показать кнопку назад
    document.getElementById('back-button').style.display = 'block';
});



// Функция для возврата к первоначальному виду карточек
function goBack() {
    const productCardsContainer = document.querySelector('.products-cards');
    productCardsContainer.innerHTML = ''; // Очистить контейнер
    displayCards(originalCards); // Отображаем оригинальные карточки
}
}
