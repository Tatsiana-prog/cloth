document.addEventListener('DOMContentLoaded', function() {

// Функция для создания карточки товара
function createProductCard(productsData, container) {
  const productCard = document.createElement('div');
  productCard.classList.add('product-card');
  // Изображение продукта
  const productImage = document.createElement('div');
  productImage.classList.add('product-image');
  const image = document.createElement('img');
  image.src = productsData.image1;
  image.alt = productsData.description;
  productImage.appendChild(image);
  productCard.appendChild(productImage);
  // Название продукта
  const productContent = document.createElement('div');
  productContent.classList.add('product-content');
  const productName = document.createElement('h3');
  productName.classList.add('product-name');
  productName.textContent = productsData.description;
  productContent.appendChild(productName);

  const productDenst = document.createElement('p');
  productDenst.classList.add('product-density');
  productDenst.innerHTML = productsData.content['Плотность'];
  productContent.appendChild(productDenst);

  // Список свойств
  const productList = document.createElement('ul');
  productList.classList.add('product-list');
  const content = productsData.content || {};
  const keysToDisplay = ['Состав', 'Цвет', 'ширина'];
  productContent.appendChild(productList);

  // Размер продукта
  const productSize = document.createElement('div');
  productSize.classList.add('product-size');
  const sizeText = document.createElement('p');
  sizeText.classList.add('size-text');
  sizeText.innerHTML = 'От <span class="color-purple">500₽</span>/кг (5 п/м)';
  productSize.appendChild(sizeText);
  productContent.appendChild(productSize);

  // Кнопка "Заказать образец ткани"
  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('product-card__button-wrapper');
  const productBtn = document.createElement('button');
  productBtn.classList.add('product-card__btn');
  productBtn.innerHTML = 'Заказать образец ткани';
  btnWrapper.appendChild(productBtn);
  productContent.appendChild(btnWrapper);

  // Статус наличия
  const productStock = document.createElement('div');
  productStock.innerHTML = 'В наличии';
  productStock.classList.add('product-stock');

  const productOrder = document.createElement('div');
  productOrder.innerHTML = 'Под заказ';
  productOrder.classList.add('product-order');
  if (productsData.sale === 'В наличии') {
    productStock.style.display = "block";
    productOrder.style.display = "none";
  } else if (productsData.sale === 'Под заказ') {
    productStock.style.display = "none";
    productOrder.style.display = "block";
  }

  productCard.appendChild(productStock);
  productCard.appendChild(productOrder);

  // Отзывы
  const productReview = document.createElement('button');
  productReview.classList.add('product-review');
  productReview.setAttribute('data-id', productsData.id); // добавляем data-id
  productReview.innerHTML = `
  <img src="/public/img/icons/icon-review.svg" alt="image">
`;
  const productReviewButtons = document.querySelectorAll('.product-review');
  console.log(productReviewButtons.length);
  productReviewButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Получаем id товара из атрибута 'data-id' кнопки
      const productId = this.getAttribute('data-id');
      console.log('ghbdtn');

      // Загружаем данные из JSON и ищем нужный товар по id
      fetch('products.json')  // Путь к JSON файлу с товарами
        .then(response => {
          if (!response.ok) {
            throw new Error('Ошибка загрузки данных');
          }
          return response.json();
        })
        .then(data => {
          // Находим товар с нужным id
          const product = data.find(item => item.id === parseInt(productId));

          // Если товар найден, вызываем функцию renderProductCard
          if (product) {
            renderProductCard(product);  // Отображаем карточку товара
          } else {
            console.error('Товар не найден');
          }
        })
        .catch(error => console.error('Ошибка:', error));
    });

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
      input.className = 'custom-radio';

      const label = document.createElement('label');
      label.htmlFor = `color-${colorKey}-${product.id}`;
      label.textContent = product.content['Цвет'][colorKey];
      label.className = 'custom-label';

      const iconlabel = document.createElement('span');
      iconlabel.className = 'icon-label';
      label.appendChild(iconlabel);

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

  cardDescription.appendChild(cardContentWrapper);
  cardRow.appendChild(cardDescription);
  card.appendChild(cardRow);

  // Добавляем карточку на страницу
  document.body.appendChild(card);
}

});





















































































































































  const iconInfo = document.createElement('span');
  iconInfo.classList.add('icon-info');
  iconInfo.innerHTML = ` ... `; // Сюда вставьте SVG для информации
  productCard.appendChild(productReview);
  productSize.appendChild(iconInfo); // Переместили сюда

  // Отображаем свойства продукта
  keysToDisplay.forEach(key => {
      if (content[key] !== undefined) {
          const listItem = document.createElement('li');
          listItem.classList.add('product-item');
          const spanSpecies = document.createElement('span');
          spanSpecies.classList.add('species');
          spanSpecies.textContent = key;
          listItem.appendChild(spanSpecies);

          // Если ключ "Цвет", нужно отобразить только фиалковый
          if (key === "Цвет") {
              const purpleColor = content[key]["фиалковый"];
              if (purpleColor) {
                  const spanLook = document.createElement('span');
                  spanLook.classList.add('look');
                  spanLook.textContent = purpleColor; // Отображаем фиалковый цвет
                  listItem.appendChild(spanLook);
                  productList.appendChild(listItem);
              }
          } else {
              const spanLook = document.createElement('span');
              spanLook.classList.add('look');
              spanLook.textContent = content[key];
              listItem.appendChild(spanLook);
              productList.appendChild(listItem);
          }
      }
  });

  productCard.appendChild(productContent);
  container.appendChild(productCard);
}

let allProducts = [];
fetch('products.json')
  .then(response => response.json())
  .then(data => {
    allProducts = data; // Сохраняем все продукты для последующей фильтрации
    const productContainer = document.querySelector('.products-cards');
    const row1 = document.querySelector('.row-1');
    const row2 = document.querySelector('.row-2');
    const row3 = document.querySelector('.row-3');
    const row4 = document.querySelector('.row-4');
    const row5 = document.querySelector('.row-5');
    const row6 = document.querySelector('.row-6');
    const row7 = document.querySelector('.row-7');
    const row8 = document.querySelector('.row-8');

    // Функция для добавления карточек в контейнеры
    function addCardsToRow(rowClass, description) {
      const filteredProducts = allProducts.filter(product => product.description === description);
      filteredProducts.forEach(product => createProductCard(product, rowClass));
    }

    // Функция для добавления карточек в контейнер
    function addCardsToContainer(rowClass, saleStatus) {
      const filteredProducts = allProducts.filter(product => product.sale === saleStatus);
      filteredProducts.forEach(product => createProductCard(product, rowClass));
    }

    // Клики по кнопкам
    const allButton = document.getElementById('all');
    const custom1Button = document.getElementById('custom1');
    const custom2Button = document.getElementById('custom2');
    const custom3Button = document.getElementById('custom3');
    const custom4Button = document.getElementById('custom4');

    const content1 = document.getElementById('content1');
    const content2 = document.getElementById('content2');
    const content3 = document.getElementById('content3');

    allButton.addEventListener('click', () => {
      row1.innerHTML = '';
      row2.innerHTML = '';
      row3.innerHTML = '';
      row4.innerHTML = '';
      row5.innerHTML = '';
      row6.innerHTML = '';
      addCardsToRow(row1, 'Флис односторонний');
      addCardsToRow(row2, "Флис двуxcторонний");
      addCardsToRow(row3, 'Трикотаж на флисе');
      addCardsToRow(row4, 'Футер 2-х нитка');
      addCardsToRow(row5, 'Футер 3-х нитка');
      addCardsToRow(row6, 'Ткань для термобелья');
    });

    // Вызываем отображение карточек по умолчанию сразу после загрузки данных
    row1.innerHTML = '';
    row2.innerHTML = '';
    row3.innerHTML = '';
    row4.innerHTML = '';
    row5.innerHTML = '';
    row6.innerHTML = '';
    addCardsToRow(row1, 'Флис односторонний');
    addCardsToRow(row2, "Флис двуxcторонний");
    addCardsToRow(row3, 'Трикотаж на флисе');
    addCardsToRow(row4, 'Футер 2-х нитка');
    addCardsToRow(row5, 'Футер 3-х нитка');
    addCardsToRow(row6, 'Ткань для термобелья');

    custom1Button.addEventListener('click', () => { 
      row1.innerHTML = '';
      row2.innerHTML = '';
      row3.innerHTML = '';
      row4.innerHTML = '';
      row5.innerHTML = '';
      row6.innerHTML = '';
      row7.innerHTML = '';
      row8.innerHTML = '';
      addCardsToRow(row4, 'Футер 2-х нитка');
      addCardsToRow(row5, 'Футер 3-х нитка');
      content2.style.display = "block";
      content1.style.display = "none";
      content3.style.display = "none";
    });

    custom2Button.addEventListener('click', () => { 
      row1.innerHTML = '';
      row2.innerHTML = '';
      row3.innerHTML = '';
      row4.innerHTML = '';
      row5.innerHTML = '';
      row6.innerHTML = '';
      row7.innerHTML = '';
      row8.innerHTML = '';
      addCardsToRow(row1, 'Флис односторонний');
      addCardsToRow(row2, "Флис двуxcторонний");
      content1.style.display = "block";
      content2.style.display = "none";
      content3.style.display = "none";
    });

    custom3Button.addEventListener('click', () => { 
      row1.innerHTML = '';
      row2.innerHTML = '';
      row3.innerHTML = '';
      row4.innerHTML = '';
      row5.innerHTML = '';
      row6.innerHTML = '';
      row7.innerHTML = '';
      row8.innerHTML = '';
      addCardsToContainer(row7, "В наличии");
    });

    custom4Button.addEventListener('click', () => {
      row1.innerHTML = '';
      row2.innerHTML = '';
      row3.innerHTML = '';
      row4.innerHTML = '';
      row5.innerHTML = '';
      row6.innerHTML = '';
      row7.innerHTML = '';
      row8.innerHTML = '';
      addCardsToContainer(row8, "Под заказ");
    });
  });


 

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
        input.className = 'custom-radio';

        const label = document.createElement('label');
        label.htmlFor = `color-${colorKey}-${product.id}`;
        label.textContent = product.content['Цвет'][colorKey];
        label.className = 'custom-label';

        const iconlabel = document.createElement('span');
        iconlabel.className = 'icon-label';
        label.appendChild(iconlabel);

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

    cardDescription.appendChild(cardContentWrapper);
    cardRow.appendChild(cardDescription);
    card.appendChild(cardRow);

    // Добавляем карточку на страницу
    document.body.appendChild(card);
});




