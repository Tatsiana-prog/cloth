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
  const productReview = document.createElement('div');
  productReview.classList.add('product-review');
  productReview.innerHTML = `
    <svg width="48" height="47" viewBox="0 0 48 47" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="23.1533" cy="23.0557" r="23.0557" fill="#F5E0C7"/>
      <path d="M12.1533 23.0557C12.1533 23.0557 16.1533 15.0557 23.1533 15.0557C30.1533 15.0557 34.1533 23.0557 34.1533 23.0557C34.1533 23.0557 30.1533 31.0557 23.1533 31.0557C16.1533 31.0557 12.1533 23.0557 12.1533 23.0557Z" stroke="#692F6C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M23.1533 26.0557C24.8102 26.0557 26.1533 24.7125 26.1533 23.0557C26.1533 21.3988 24.8102 20.0557 23.1533 20.0557C21.4965 20.0557 20.1533 21.3988 20.1533 23.0557C20.1533 24.7125 21.4965 26.0557 23.1533 26.0557Z" stroke="#692F6C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
  const iconInfo = document.createElement('span');
  iconInfo.classList.add('icon-info');
  iconInfo.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9.59753" cy="9.5155" r="9.5155" fill="#F5E0C7"/>
      <path d="M9.22195 12.0099C9.22195 11.6901 9.24099 11.4121 9.27907 11.176C9.32476 10.9323 9.39711 10.7076 9.49612 10.502C9.59512 10.2964 9.72839 10.0984 9.89594 9.908C10.0711 9.71761 10.2881 9.51199 10.5471 9.29114C10.7908 9.08552 10.9621 8.89132 11.0611 8.70854C11.1601 8.52577 11.2096 8.32776 11.2096 8.11452C11.2096 7.74136 11.0878 7.43673 10.8441 7.20065C10.6004 6.95695 10.2881 6.8351 9.90736 6.8351C9.13818 6.8351 8.69648 7.31488 8.58224 8.27445H7.30282C7.32566 7.85559 7.40563 7.48243 7.54271 7.15495C7.67979 6.81987 7.85876 6.53809 8.07961 6.30962C8.30808 6.07354 8.57843 5.89457 8.89067 5.77272C9.20291 5.64325 9.54943 5.57852 9.93021 5.57852C10.3034 5.57852 10.6461 5.64325 10.9583 5.77272C11.2782 5.90218 11.5523 6.08115 11.7808 6.30962C12.0093 6.53809 12.1882 6.81225 12.3177 7.13211C12.4472 7.44435 12.5119 7.78324 12.5119 8.14879C12.5119 8.33918 12.4929 8.51815 12.4548 8.68569C12.4167 8.84562 12.352 9.00555 12.2606 9.16548C12.1768 9.31779 12.0626 9.47391 11.9179 9.63384C11.7732 9.79377 11.598 9.96893 11.3924 10.1593C11.2096 10.3192 11.0611 10.4639 10.9469 10.5934C10.8327 10.7229 10.7413 10.8561 10.6727 10.9932C10.6118 11.1303 10.5661 11.2788 10.5356 11.4387C10.5128 11.5987 10.5014 11.7891 10.5014 12.0099H9.22195ZM9.22195 12.7182H10.5128V14.1689H9.22195V12.7182Z" fill="#423A2F"/>
    </svg>
  `;
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
              // Проверяем, есть ли "фиалковый" цвет в объекте content[key]
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

// Загрузка данных и создание карточек
let allProducts = [];
fetch('products.json')
.then(response => response.json())
.then(data => {
  allProducts = data; // Сохраняем все продукты для последующей фильтрации
  const productContainer = document.getElementById('products-cards');
  data.forEach(productsData => createProductCard(productsData, productContainer));
  // Устанавливаем "All" кнопкой по умолчанию
  const btnAll = document.getElementById('all');
  btnAll.click(); // Эмулируем клик на кнопку "All"
})
.catch(error => {
  console.error('Произошла ошибка при загрузке данных:', error);
});
// Обработка кнопок для фильтрации
const btnCustom1 = document.getElementById('custom1');
btnCustom1.addEventListener('click', function() {
    const filteredCards = allProducts.filter(card => card.name === "Футер");
    const productContainer = document.getElementById('products-cards');
    productContainer.innerHTML = ''; // Очистите контейнер перед добавлением
    filteredCards.forEach(productsData => createProductCard(productsData, productContainer));
});

const btnCustom2 = document.getElementById('custom2');
btnCustom2.addEventListener('click', function() {
    const filteredCards = allProducts.filter(card => card.name === "Флис");
    const productContainer = document.getElementById('products-cards');
    productContainer.innerHTML = ''; // Очистите контейнер перед добавлением
    filteredCards.forEach(productsData => createProductCard(productsData, productContainer));
});

const btnCustom3 = document.getElementById('custom3');
btnCustom3.addEventListener('click', function() {
    const filteredCards = allProducts.filter(card => card.sale === "В наличии");
    const productContainer = document.getElementById('products-cards');
    productContainer.innerHTML = ''; // Очистите контейнер перед добавлением
    filteredCards.forEach(productsData => createProductCard(productsData, productContainer));
});

const btnCustom4 = document.getElementById('custom4');
btnCustom4.addEventListener('click', function() {
    const filteredCards = allProducts.filter(card => card.sale === "Под заказ");
    const productContainer = document.getElementById('products-cards');
    productContainer.innerHTML = ''; // Очистите контейнер перед добавлением
    filteredCards.forEach(productsData => createProductCard(productsData, productContainer));
});

// Обработка кнопки "All" для показа всех карточек
const btnAll = document.getElementById('all');
btnAll.addEventListener('click', function() {
    const productContainer = document.getElementById('products-cards');
    productContainer.innerHTML = ''; // Очистите контейнер перед добавлением
    allProducts.forEach(productsData => createProductCard(productsData, productContainer));
});

// Получаем все кнопки и иконки
const buttons = document.querySelectorAll('.product-btn');
const iconImgs = document.querySelectorAll('.icon-img');

// Функция, которая скрывает все иконки
function hideAllIcons() {
    iconImgs.forEach(icon => {
        icon.style.opacity = 0; // Скрыть иконку
    });
}

// Устанавливаем обработчики событий для всех кнопок
buttons.forEach(button => {
    button.addEventListener('click', function() {
        hideAllIcons(); // Сначала скрываем все иконки
        // Показываем иконку у текущей кнопки
        const iconImg = button.querySelector('.icon-img');
        if (iconImg) {
            iconImg.classList.add("fade-in");
            iconImg.style.opacity = 1; // Показываем иконку
        }
    });
});