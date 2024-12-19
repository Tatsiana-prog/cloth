function createProductCard(productsData, container) {
  const productCard = document.createElement('div');
  productCard.classList.add('product-card');

  // Изображение продукта
  const productImage = document.createElement('div');
  productImage.classList.add('product-image');
  const image = document.createElement('img');
  image.src = productsData.image1 || 'placeholder.jpg'; // Используйте заглушку, если изображение отсутствует
  image.alt = productsData.description;
  productImage.appendChild(image);
  productCard.appendChild(productImage);

  // Название продукта
  const productContent = document.createElement('div');
  productContent.classList.add('product-content');
  const productName = document.createElement('h3');
  productName.classList.add('product-name');
  productName.textContent = productsData.description || 'Нет описания';
  productContent.appendChild(productName); 

  // Список свойств
  const productList = document.createElement('ul');
  productList.classList.add('product-list');
  const content = productsData.content || {};
  const keysToDisplay = ['Состав', 'Цвет', 'ширина'];

  // Размер продукта
  const productSize = document.createElement('div');
  productSize.classList.add('product-size');
  const sizeText = document.createElement('p');
  sizeText.classList.add('size-text');
  sizeText.innerHTML = 'От <span class="color-purple">500₽</span>/кг (5 п/м)';
  productSize.appendChild(sizeText);

  const productStock = document.createElement('div');
  productStock.classList.add('product-stock');

  const productOrder = document.createElement('div');
  productOrder.classList.add('product-order');
 
 
 

  keysToDisplay.forEach(key => {
      if (content[key] !== undefined) {
          const listItem = document.createElement('li');
          listItem.classList.add('product-item');
          const spanSpecies = document.createElement('span');
          spanSpecies.classList.add('species');
          spanSpecies.textContent = key;
          listItem.appendChild(spanSpecies);
          const spanLook = document.createElement('span');
          spanLook.classList.add('look');
          spanLook.textContent = typeof content[key] === 'object' ? Object.values(content[key]).join(', ') : content[key];
          listItem.appendChild(spanLook);
          productList.appendChild(listItem);
      }



  });

 
  productCard.appendChild(productContent);
  productContent.appendChild(productList);
  container.appendChild(productCard);
  productContent.appendChild(productSize);
}

// Загрузка данных и создание карточек
let allProducts = [];
fetch('products.json')
.then(response => response.json())
.then(data => {
  allProducts = data; // Сохраняем все продукты для последующей фильтрации
  const productContainer = document.getElementById('products-cards');
  data.forEach(productsData => createProductCard(productsData, productContainer));
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
    const btnCustom4 = document.getElementById('custom3');
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