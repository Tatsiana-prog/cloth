

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


let allProducts = [];
fetch('products.json')
  .then(response => response.json())
  .then(data => {
    allProducts = data; // Сохраняем все продукты для последующей фильтрации
    const productContainer = document.getElementById('products-cards');
    
    // Создаем блоки для карточек и ряды для карточек

  //блоки
    const product1 = document.createElement('div');
    const product2 = document.createElement('div');
    const product3 = document.createElement('div');

    product1.classList.add('product-1');
    product2.classList.add('product-2');
    product3.classList.add('product-3');

    //ряды
    

    const product1Row1 = document.createElement('div');
    product1Row1.classList.add('row-1');

    const product1Row2 = document.createElement('div');
    product1Row2.classList.add('row-2');

    const product1Row3 = document.createElement('div');



    const product2Row1 = document.createElement('div');
    product2Row1.classList.add('row-1');

    const product2Row2 = document.createElement('div');
    product2Row2.classList.add('row-2');


    const product3Row1 = document.createElement('div');
    product3Row1.classList.add('row-1');

    // Create the product title block
    const productTitle = document.createElement('div');
    productTitle.classList.add('product-title');
    
    // Create the title box
    const titleBox = document.createElement('div');
    titleBox.classList.add('title-box');
    titleBox.innerHTML = '<a href="#" class="product-link">Cмотреть все ткани:</a><span class="product-header">Флис односторонний</span>';
    productTitle.appendChild(titleBox);

    // Create the title icon
    const titleIcon = document.createElement('div');
    titleIcon.classList.add('title-icon');
    titleIcon.innerHTML = `
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.449219" width="24" height="24" rx="12" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.6921 6.103C17.8475 6.00705 18.0331 5.97662 18.2099 6.0181C18.3867 6.05957 18.541 6.16972 18.6404 6.32543L19.3348 7.41239C19.4253 7.55438 19.464 7.72463 19.4441 7.89309C19.4242 8.06154 19.347 8.21736 19.2261 8.33306L19.2239 8.33594L19.1741 8.38345L19.0163 8.53821C18.1432 9.40753 17.2964 10.3044 16.4773 11.2275C14.9364 12.9667 13.1065 15.2428 11.8748 17.4512C11.5312 18.0674 10.6916 18.1999 10.1936 17.6679L5.64516 12.8176C5.57998 12.7481 5.52908 12.6658 5.4955 12.5757C5.46191 12.4856 5.44632 12.3895 5.44966 12.293C5.453 12.1966 5.47519 12.1018 5.51492 12.0144C5.55465 11.9269 5.6111 11.8486 5.68093 11.784L7.05564 10.5113C7.17645 10.3995 7.33136 10.3343 7.49385 10.3268C7.65634 10.3193 7.81632 10.37 7.9464 10.4703L10.2673 12.2562C13.8927 8.58716 15.9485 7.17916 17.6921 6.103Z" fill="#692F6C"/>
        </svg>`;

    productTitle.appendChild(titleIcon);

    const rowWrapper = document.createElement('div');
    rowWrapper.appendChild(product1Row1);


// Append title box and title icon to product title


    
    // Разделяем карточки по условию
    data.forEach(productsData => {
      if (productsData.description === "Флис односторонний") {
        createProductCard(productsData, product1Row1);
      } else 
      if (productsData.description === "Флис двуxcторонний") {
        createProductCard(productsData, product1Row2);
      } else
      if (productsData.description === "Трикотаж на флисе") {
        createProductCard(productsData, product1Row3);
      }

      if (productsData.description === "Футер 2-х нитка") {
        createProductCard(productsData, product2Row1);
      } else 
      if (productsData.description === "Футер 3-х нитка") {
        createProductCard(productsData, product2Row2);
      } else 
      if (productsData.description === "Ткань для термобелья") {
        createProductCard(productsData, product3Row1);
      }

    });
    // Добавляем блоки в контейнер
    productContainer.appendChild(product1);
    product1.appendChild(rowWrapper);
    rowWrapper.appendChild(product1Row1);
    rowWrapper.appendChild(productTitle);

   


    productContainer.appendChild(product2);
    product2.appendChild(product2Row1);
    product2.appendChild(product2Row2);

    productContainer.appendChild(product3);
    product3.appendChild(product3Row1);

  })








  .catch(error => {
    console.error('Произошла ошибка при загрузке данных:', error);
  });

  



