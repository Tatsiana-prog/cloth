// Обработчик события загрузки страницы
document.addEventListener("DOMContentLoaded", () => {
  const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
  if (selectedProduct) {
    displaySelectedCard(selectedProduct);
    addToSelectedProducts(selectedProduct); // Добавляем продукт в массив выбранных продуктов
  } else {
    console.error("Нет выбранного продукта");
  }
});
renderSelectedProducts(); // Отображаем все выбранные карточки при загрузке
function displaySelectedCard(product) {
  const productCardsContainer = document.querySelector(".products-cards");
  productCardsContainer.innerHTML = ""; // Очистить контейнер
  // Создание карточки продукта
  productCardsContainer.style.display = "block";
  // Создаем кнопку для отображения в старом формате
  const btnBackWrapper = document.createElement("div");
  btnBackWrapper.className = "btn-back__wrapper";
  btnBackWrapper.style.display = "flex";

  const btnBackIcon = document.createElement("span");
  btnBackIcon.innerHTML = `
    <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.19061 1.9523C5.2643 1.88364 5.3234 1.80084 5.36439 1.70884C5.40538 1.61684 5.42743 1.51753 5.4292 1.41682C5.43098 1.31612 5.41245 1.21609 5.37473 1.1227C5.33701 1.02932 5.28087 0.944483 5.20965 0.873264C5.13843 0.802045 5.0536 0.745901 4.96021 0.70818C4.86682 0.670458 4.76679 0.651934 4.66609 0.65371C4.56538 0.655487 4.46607 0.677529 4.37407 0.718521C4.28207 0.759513 4.19927 0.818616 4.13061 0.892303L0.34961 4.6723L4.12961 8.4523C4.271 8.58899 4.46041 8.66468 4.65706 8.66306C4.85371 8.66144 5.04186 8.58266 5.18098 8.44367C5.3201 8.30467 5.39907 8.1166 5.40087 7.91995C5.40267 7.72331 5.32716 7.53382 5.19061 7.3923L3.22061 5.4223L13.5996 5.4223C13.7985 5.4223 13.9893 5.34329 14.1299 5.20263C14.2706 5.06198 14.3496 4.87122 14.3496 4.6723C14.3496 4.47339 14.2706 4.28263 14.1299 4.14197C13.9893 4.00132 13.7985 3.9223 13.5996 3.9223L3.22061 3.9223L5.19061 1.9523Z" fill="#524431" fill-opacity="0.56"/>
    </svg>`;
  const btnBack = document.createElement("a");
  btnBack.className = "back-button";
  btnBack.id = "back-button";
  btnBack.textContent = "вернуться назад";
  btnBack.href = "index.html#products-cards";
  btnBackWrapper.appendChild(btnBackIcon);
  btnBackWrapper.appendChild(btnBack);
  const card = document.createElement("div");
  card.className = "card";
  const cardRow = document.createElement("div");
  cardRow.className = "card-row";
  const cardImages = document.createElement("div");
  cardImages.className = "card-images";
  // Проверка на наличие изображений в объекте товара
  const images = [
    product.image1,
    product.image2,
    product.image3,
    product.image4,
  ];
  const validImages = images.filter((image) => image); // Фильтруем пустые изображения
  if (validImages.length > 0) {
    // Основное изображение
    const mainImage = document.createElement("div");
    mainImage.className = "card-image";
    const mainImg = document.createElement("img");
    mainImg.src = validImages[0]; // Первое изображение
    mainImg.alt = "image";
    mainImage.appendChild(mainImg);
    const imageWrapper = document.createElement("div");
    imageWrapper.className = "card-image_wrapper";
    validImages.slice(1).forEach((imageSrc) => {
      // Добавляем оставшиеся изображения
      const smallImage = document.createElement("div");
      smallImage.className = "card-image";
      const img = document.createElement("img");
      img.src = imageSrc;
      img.alt = "image";
      smallImage.appendChild(img);
      imageWrapper.appendChild(smallImage);
    });
    cardImages.appendChild(mainImage);
    cardImages.appendChild(imageWrapper);
  } else {
    // Если изображений нет, показываем заглушку или пустое место
    const noImage = document.createElement("div");
    noImage.className = "no-image";
    noImage.textContent = "Изображение отсутствует";
    cardImages.appendChild(noImage);
  }
  cardRow.appendChild(cardImages);
  const cardDescription = document.createElement("div");
  cardDescription.className = "card-description";
  cardRow.appendChild(cardDescription);
  const title = document.createElement("h3");
  title.className = "title-3";
  title.textContent = product.description || "Без описания"; // Если описание отсутствует, показываем заглушку
  cardDescription.appendChild(title);
  const cardBox = document.createElement("div");
  cardBox.className = "card-box";
  cardDescription.appendChild(cardBox);
  const cardSale = document.createElement("div");
  cardSale.className = "card-sale";
  cardSale.textContent = product.sale || "Не указано"; // Если статус отсутствует, показываем заглушку
  cardBox.appendChild(cardSale);
  const fieldsetColor = document.createElement("fieldset");
  const legendColor = document.createElement("legend");
  legendColor.className = "menu-color";
  legendColor.textContent = "Выберите цвет";
  fieldsetColor.appendChild(legendColor);
  const colorWrapper = document.createElement("div");
  colorWrapper.className = "color";
  colorWrapper.className = "color-wrapper";

  // Массив для хранения выбранного цвета
  let selectedColor = null;

  // Генерация блоков для выбора цвета
  for (const colorKey in product.content["Цвет"]) {
    const div = document.createElement("div");
    const input = document.createElement("input");
    input.type = "radio";
    input.id = `color-${colorKey}-${product.id}`; // Добавляем уникальный идентификатор с ID товара
    input.name = `color-${product.id}`; // Уникальное имя для группы радиокнопок
    input.value = colorKey;
    input.className = "input-color";

    const label = document.createElement("label");
    label.htmlFor = `color-${colorKey}-${product.id}`;
    label.textContent = product.content["Цвет"][colorKey];
    label.className = "custom-color";

    const iconColor = document.createElement("label");
    iconColor.className = "icon-label";

    const iconCheck = document.createElement("span");
    iconCheck.className = "icon-check";
    iconCheck.innerHTML = `<svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5615 0.406713C12.7169 0.310766 12.9025 0.280335 13.0793 0.321808C13.2561 0.36328 13.4104 0.473432 13.5098 0.629143L14.2041 1.7161C14.2947 1.85809 14.3334 2.02834 14.3135 2.1968C14.2936 2.36525 14.2164 2.52107 14.0954 2.63677L14.0933 2.63965L14.0435 2.68716L13.8857 2.84192C13.0125 3.71124 12.1658 4.60811 11.3467 5.53123C9.80577 7.27036 7.97586 9.54649 6.74423 11.7549C6.40056 12.3711 5.561 12.5036 5.06302 11.9716L0.514544 7.12136C0.449361 7.05182 0.398464 6.96955 0.36488 6.87942C0.331295 6.7893 0.315709 6.69316 0.319045 6.59673C0.322382 6.5003 0.344575 6.40555 0.384305 6.3181C0.424034 6.23064 0.480489 6.15228 0.550314 6.08767L1.92503 4.815C2.04583 4.70321 2.20074 4.638 2.36323 4.63051C2.52573 4.62303 2.6857 4.67374 2.81578 4.77397L5.13666 6.55988C8.76212 2.89087 10.8179 1.48287 12.5615 0.406713Z" fill="#692F6C"/>
      </svg>
      `;

    div.appendChild(input);
    div.appendChild(label);
    colorWrapper.appendChild(div);
    label.appendChild(iconColor);
    iconColor.appendChild(iconCheck);
  }

  colorWrapper.addEventListener("change", function (event) {
    if (event.target.name.includes("color")) {
      const selectedColorKey = event.target.value;
      selectedColor = product.content["Цвет"][selectedColorKey];

      const colorImages = product.content["color-image"][selectedColorKey];
      if (colorImages) {
        const colorImageElement = card.querySelector(".card-image img");
        if (colorImageElement) {
          colorImageElement.src = colorImages.image1; // Обновляем источник основного изображения на основе выбранного цвета
        }

        const smallImages = card.querySelectorAll(".card-image_wrapper img");
        smallImages.forEach((img, index) => {
          img.src = colorImages[`image${index + 2}`]; // Обновляем источник каждого маленького изображения на основе выбранного цвета
        });
      }

      const colorLi = card.querySelector(".card-item.color");
      if (colorLi) {
        const itemMean = colorLi.querySelector(".item-mean");
        itemMean.textContent = selectedColor || "Не указано";
      }

      console.log(`Выбранный цвет для товара ${product.id}:`, selectedColor);
    }
  });
  legendColor.appendChild(colorWrapper);
  cardBox.appendChild(fieldsetColor);

  const cardList = document.createElement("ul");
  cardList.className = "card-list";

  const items = [
    { name: "Плотность", mean: product.content["Плотность"] },
    { name: "Цвет", mean: selectedColor || "Не указано" }, // Сюда добавляем цвет, который будет обновляться
    { name: "Состав", mean: product.content["Состав"] },
    { name: "Ширина", mean: product.content["ширина"] },
    {
      name: "Страна производитель",
      mean: product.content["Страна производитель"],
    },
    { name: "Цена", mean: product.content["Цена"] },
  ];

  items.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.className = "card-item";
    if (item.name === "Цвет") {
      listItem.classList.add("color"); // Добавляем класс для цвета
    }
    const itemName = document.createElement("span");
    itemName.className = "item-name";
    itemName.textContent = item.name;
    const itemMean = document.createElement("span");
    itemMean.className = "item-mean";
    itemMean.textContent = item.mean || "Не указано"; // Проверка значения
    listItem.appendChild(itemName);
    listItem.appendChild(itemMean);
    cardList.appendChild(listItem);
  });

  cardDescription.appendChild(cardList);

  // Добавляем количество товара
  const countCard = document.createElement("div");
  countCard.className = "count-card"; // Изменено на className для независимости
  const decreaseButton = document.createElement("button");
  decreaseButton.className = "decrease"; // Изменено на className
  decreaseButton.textContent = "-";
  const counterText = document.createElement("div");
  counterText.className = "counter-text"; // Исправлено название класса
  const quantitySpan = document.createElement("span");
  quantitySpan.className = "quantity"; // Изменено на className
  quantitySpan.textContent = "1";
  const unitSpan = document.createElement("span");
  unitSpan.textContent = " рул.";
  counterText.appendChild(quantitySpan);
  counterText.appendChild(unitSpan);
  const increaseButton = document.createElement("button");
  increaseButton.className = "increase"; // Изменено на className
  increaseButton.textContent = "+";

  countCard.appendChild(decreaseButton);
  countCard.appendChild(counterText);
  countCard.appendChild(increaseButton);
  cardList.appendChild(countCard);

  // Локальная переменная quantity для каждого счетчика
  let quantity = 1;
  // Обработчики событий для кнопок увеличения и уменьшения
  increaseButton.addEventListener("click", () => {
    quantity++;
    quantitySpan.textContent = quantity;
  });

  decreaseButton.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      quantitySpan.textContent = quantity;
    }
  });

  //реализация блока выбор ширины
  // Создаем элементы для блока
  const fieldsetWidth = document.createElement("fieldset");
  const legendWidth = document.createElement("legend");
  legendWidth.className = "menu-width";
  legendWidth.textContent = "Выберите ширину";
  const iconWidth = document.createElement("span");
  iconWidth.className = "icon-width";
  const svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgIcon.setAttribute("width", "13");
  svgIcon.setAttribute("height", "10");
  svgIcon.setAttribute("viewBox", "0 0 13 10");
  svgIcon.innerHTML =
    '<path class="icon-hover" d="M2.10988 0.844899L10.5299 0.8449C10.8623 0.844418 11.188 0.938085 11.4694 1.11506C11.7508 1.29203 11.9763 1.54508 12.1199 1.8449C12.2879 2.20064 12.3526 2.59643 12.3067 2.98717C12.2607 3.3779 12.1059 3.74787 11.8599 4.0549L7.64988 9.1549C7.48466 9.34553 7.2804 9.49842 7.05092 9.6032C6.82145 9.70798 6.57214 9.76221 6.31988 9.76221C6.06762 9.76221 5.8183 9.70798 5.58883 9.6032C5.35936 9.49841 5.15509 9.34553 4.98988 9.1549L0.779876 4.0549C0.53387 3.74787 0.379062 3.3779 0.333093 2.98717C0.287124 2.59643 0.351845 2.20064 0.519878 1.8449C0.663419 1.54507 0.888937 1.29203 1.17032 1.11506C1.45171 0.938085 1.77747 0.844418 2.10988 0.844899Z" fill="#692F6C"/>';
  iconWidth.appendChild(svgIcon);
  legendWidth.appendChild(iconWidth);

  const widthWrapper = document.createElement("div");
  widthWrapper.className = "width-wrapper";

  // Создаем радио-инпуты и их метки
  const widths = ["150", "180", "220"];
  widths.forEach((width, index) => {
    const inputWidth = document.createElement("input");
    inputWidth.type = "radio";
    inputWidth.id = `width-${index + 1}`;
    inputWidth.name = "width";
    inputWidth.className = "input-width";

    const labelWidth = document.createElement("label");
    labelWidth.htmlFor = `width-${index + 1}`;
    labelWidth.className = "custom-width";

    const iconLabel = document.createElement("span");
    iconLabel.className = "icon-label";

    const iconCheck = document.createElement("span");
    iconCheck.className = "icon-check";
    const svgCheck = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    svgCheck.setAttribute("width", "15");
    svgCheck.setAttribute("height", "13");
    svgCheck.setAttribute("viewBox", "0 0 15 13");
    svgCheck.innerHTML =
      '<path fill="#692F6C" fill-rule="evenodd" clip-rule="evenodd" d="M12.5615 0.406713C12.7169 0.310766 12.9025 0.280335 13.0793 0.321808C13.2561 0.36328 13.4104 0.473432 13.5098 0.629143L14.2041 1.7161C14.2947 1.85809 14.3334 2.02834 14.3135 2.1968C14.2936 2.36525 14.2164 2.52107 14.0954 2.63677L14.0933 2.63965L14.0435 2.68716L13.8857 2.84192C13.0125 3.71124 12.1658 4.60811 11.3467 5.53123C9.80577 7.27036 7.97586 9.54649 6.74423 11.7549C6.40056 12.3711 5.561 12.5036 5.06302 11.9716L0.514544 7.12136C0.449361 7.05182 0.398464 6.96955 0.36488 6.87942C0.331295 6.7893 0.315709 6.69316 0.319045 6.59673C0.322382 6.5003 0.344575 6.40555 0.384305 6.3181C0.424034 6.23064 0.480489 6.15228 0.550314 6.08767L1.92503 4.815C2.04583 4.70321 2.20074 4.638 2.36323 4.63051C2.52573 4.62303 2.6857 4.67374 2.81578 4.77397L5.13666 6.55988C8.76212 2.89087 10.8179 1.48287 12.5615 0.406713Z"/>';
    iconCheck.appendChild(svgCheck);
    iconLabel.appendChild(iconCheck);

    labelWidth.appendChild(iconLabel);
    labelWidth.innerHTML += width;

    widthWrapper.appendChild(inputWidth);
    widthWrapper.appendChild(labelWidth);
  });

  // Добавляем элементы в DOM
  legendWidth.appendChild(widthWrapper);
  fieldsetWidth.appendChild(legendWidth);

  cardList.appendChild(fieldsetWidth);

  // Кнопки "Заказать образец" и "Купить"
  const cardButtons = document.createElement("div");
  cardButtons.className = "card-buttons";
  const sampleButton = document.createElement("button");
  sampleButton.className = "card-btn1";
  sampleButton.textContent = "Заказать образец";
  const buyButton = document.createElement("button");
  buyButton.className = "card-btn2";
  buyButton.id = "order-button";
  buyButton.textContent = "Купить";

  cardButtons.appendChild(sampleButton);
  cardButtons.appendChild(buyButton);

  const cardContentWrapper = document.createElement("div");
  cardContentWrapper.className = "card-content__wrapper";

  // Иконки с дополнительной информацией
  const features = [
    {
      icon: "./public/img/card/icon-1.svg",
      text: "Возможности",
      id: "btn-possibilities",
    },
    {
      icon: "./public/img/card/icon-2.svg",
      text: "Доставка",
      id: "btn-delivery",
    },
    { icon: "./public/img/card/icon-3.svg", text: "Оплата", id: "btn-payment" },
  ];

  features.forEach((feature) => {
    const cardContent = document.createElement("div");
    cardContent.className = "card-content";
    // Присваиваем свойство 'id' элементу cardContent
    cardContent.id = feature.id;
    const contentIcon = document.createElement("span");
    contentIcon.className = "content-icon";
    const img = document.createElement("img");
    img.src = feature.icon;
    img.alt = "icon";
    contentIcon.appendChild(img);
    const cardText = document.createElement("span");
    cardText.className = "card-text";

    cardText.textContent = feature.text;
    cardContent.appendChild(contentIcon);
    cardContent.appendChild(cardText);
    cardContentWrapper.appendChild(cardContent);
  });
  const cardBlock = document.createElement("div");
  cardBlock.className = "card-depiction";

  const cardSubtitle = document.createElement("p");
  cardSubtitle.className = "card-subtitle";
  cardSubtitle.innerHTML = `Описание:`;
  cardBlock.appendChild(cardSubtitle);

  const cardData = document.createElement("p");
  cardData.className = "card-data";
  cardData.textContent = product.data;
  cardBlock.appendChild(cardData);

  const viewTitle = document.createElement("p");
  viewTitle.innerHTML = `Вы смотрели ткани:`;
  viewTitle.className = "view-title";
  cardBlock.appendChild(viewTitle);

  card.appendChild(btnBackWrapper);
  card.appendChild(cardRow);
  cardRow.appendChild(cardDescription);
  cardDescription.appendChild(cardBox);
  cardDescription.appendChild(cardList);
  cardDescription.appendChild(cardButtons);
  cardDescription.appendChild(cardContentWrapper);
  card.appendChild(cardBlock);
  productCardsContainer.appendChild(card);

  // Добавляем карточку на страницу
  productCardsContainer.innerHTML = ""; // Очистить контейнер
  productCardsContainer.appendChild(card); // Добавить карточку в контейнер

  btnBackWrapper.appendChild(btnBackIcon);
  btnBackWrapper.appendChild(btnBack);
  // Добавляем карточку на страницу
  productCardsContainer.appendChild(card); // Добавить карточку в контейнер

  //мододальные окна и кнопки
  const btnDelivery = document.getElementById("btn-delivery");
  const btnPayment = document.getElementById("btn-payment");
  const btnPossibilitiest = document.getElementById("btn-possibilities");

  const windowDelivery = document.getElementById("window-delivery");
  const windowPayment = document.getElementById("window-payment");
  const windowPossibilitiest = document.getElementById("window-possibilities");
  const overlay = document.querySelector(".overlay");
  card.appendChild(windowDelivery);

  btnDelivery.addEventListener("click", () => {
    windowDelivery.style.display = "flex";
    overlay.style.display = "block";
    document.body.style.overflow = "hidden";

    windowPayment.style.display = "none";
    windowPossibilitiest.style.display = "none";
  });

  btnPayment.addEventListener("click", () => {
    windowPayment.style.display = "block";
    overlay.style.display = "block";
    document.body.style.overflow = "hidden";

    windowDelivery.style.display = "none";
    windowPossibilitiest.style.display = "none";
  });

  btnPossibilitiest.addEventListener("click", () => {
    windowPossibilitiest.style.display = "block";
    overlay.style.display = "block";
    document.body.style.overflow = "hidden";

    windowPayment.style.display = "none";
    windowDelivery.style.display = "none";
  });

  const btnClose = document.querySelectorAll(".btn-close");

  btnClose.forEach((btn) => {
    btn.addEventListener("click", () => {
      const windows = document.querySelectorAll(
        ".window-delivery, .window-possibilities, .window-payment"
      );
      const overlay = document.querySelector(".overlay");

      windows.forEach((window) => {
        window.style.display = "none";
      });

      overlay.style.display = "none";
      document.body.style.overflow = "scroll";
    });
    // Показать кнопку назад
    document.getElementById("back-button").style.display = "block";
  });
}

function viewSelectedCards(product) {
  // Получение текущих выбранных продуктов из localStorage
  let selectedProducts =
    JSON.parse(localStorage.getItem("selectedProducts")) || [];
  // Проверка на дублирование
  const productExists = selectedProducts.some((item) => item.id === product.id); // предполагая, что у продукта есть уникальный id
  if (!productExists) {
    // Добавление нового продукта
    selectedProducts.push(product);
    // Сохранение обновленного списка в localStorage
    localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
  }
  const productCardsContainer = document.querySelector(".products-cards");
  //const viewCards = document.createElement('div');
  //viewCards.className = 'view-cards';
  const productCard = document.createElement("div");
  productCard.classList.add("product-card");

  const productImage = document.createElement("div");
  productImage.classList.add("product-image");
  const image = document.createElement("img");
  image.src = product.image1;
  image.alt = product.description;
  productImage.appendChild(image);
  productCard.appendChild(productImage);

  const productContent = document.createElement("div");
  productContent.classList.add("product-content");
  const productName = document.createElement("h3");
  productName.classList.add("product-name");
  productName.textContent = product.description;
  productContent.appendChild(productName);

  const productDenst = document.createElement("p");
  productDenst.classList.add("product-density");
  productDenst.innerHTML = product.content["Плотность"]; // Используем card для плотности
  productContent.appendChild(productDenst);

  // Список свойств
  const productList = document.createElement("ul");
  productList.classList.add("product-list");
  const content = product.content || {}; // Используем card.content
  const keysToDisplay = ["Состав", "Цвет", "ширина"];
  productContent.appendChild(productList);

  // Размер продукта
  const productSize = document.createElement("div");
  productSize.classList.add("product-size");
  const sizeText = document.createElement("p");
  sizeText.classList.add("size-text");
  sizeText.innerHTML = 'От <span class="color-purple">500₽</span>/кг (5 п/м)';
  productSize.appendChild(sizeText);
  productContent.appendChild(productSize);

  // Кнопка "Заказать образец ткани"
  const btnWrapper = document.createElement("div");
  btnWrapper.classList.add("product-card__button-wrapper");
  const productBtn = document.createElement("button");
  productBtn.classList.add("product-card__btn");
  productBtn.innerHTML = "Заказать образец ткани";
  btnWrapper.appendChild(productBtn);
  productContent.appendChild(btnWrapper);

  // Статус наличия
  const productStock = document.createElement("div");
  productStock.innerHTML = "В наличии";
  productStock.classList.add("product-stock");

  const productOrder = document.createElement("div");
  productOrder.innerHTML = "Под заказ";
  productOrder.classList.add("product-order");
  if (product.sale === "В наличии") {
    productStock.style.display = "block";
    productOrder.style.display = "none";
  } else if (product.sale === "Под заказ") {
    productStock.style.display = "none";
    productOrder.style.display = "block";
  }

  productCard.appendChild(productStock);
  productCard.appendChild(productOrder);

  // Отзывы
  const productReview = document.createElement("button");
  productReview.classList.add("product-review");
  productReview.innerHTML = `<svg width="48" height="47" viewBox="0 0 48 47" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="23.1533" cy="23.0557" r="23.0557" fill="#F5E0C7"/>
    <path d="M12.1533 23.0557C12.1533 23.0557 16.1533 15.0557 23.1533 15.0557C30.1533 15.0557 34.1533 23.0557 34.1533 23.0557C34.1533 23.0557 30.1533 31.0557 23.1533 31.0557C16.1533 31.0557 12.1533 23.0557 12.1533 23.0557Z" stroke="#692F6C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M23.1533 26.0557C24.8102 26.0557 26.1533 24.7125 26.1533 23.0557C26.1533 21.3988 24.8102 20.0557 23.1533 20.0557C21.4965 20.0557 20.1533 21.3988 20.1533 23.0557C20.1533 24.7125 21.4965 26.0557 23.1533 26.0557Z" stroke="#692F6C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`; // Ваш SVG код
  const buttons = document.querySelectorAll(".product-review");
  buttons.forEach((button) => {
    button.addEventListener("click", handleClick);
  });
  function handleClick() {
    const orderName = document.querySelector(".order-name");
    orderName.innerHTML = "";

    const productName = this.dataset.productName;

    createOrderWindow(productName);
    overlay.style.display = "block";
    windowOrder.style.display = "block";
    console.log("ghbdtn");
  }

  productCard.appendChild(productReview);

  const iconInfo = document.createElement("span");
  iconInfo.classList.add("icon-info");
  iconInfo.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9.59753" cy="9.5155" r="9.5155" fill="#F5E0C7"/>
    <path d="M9.22195 12.0099C9.22195 11.6901 9.24099 11.4121 9.27907 11.176C9.32476 10.9323 9.39711 10.7076 9.49612 10.502C9.59512 10.2964 9.72839 10.0984 9.89594 9.908C10.0711 9.71761 10.2881 9.51199 10.5471 9.29114C10.7908 9.08552 10.9621 8.89132 11.0611 8.70854C11.1601 8.52577 11.2096 8.32776 11.2096 8.11452C11.2096 7.74136 11.0878 7.43673 10.8441 7.20065C10.6004 6.95695 10.2881 6.8351 9.90736 6.8351C9.13818 6.8351 8.69648 7.31488 8.58224 8.27445H7.30282C7.32566 7.85559 7.40563 7.48243 7.54271 7.15495C7.67979 6.81987 7.85876 6.53809 8.07961 6.30962C8.30808 6.07354 8.57843 5.89457 8.89067 5.77272C9.20291 5.64325 9.54943 5.57852 9.93021 5.57852C10.3034 5.57852 10.6461 5.64325 10.9583 5.77272C11.2782 5.90218 11.5523 6.08115 11.7808 6.30962C12.0093 6.53809 12.1882 6.81225 12.3177 7.13211C12.4472 7.44435 12.5119 7.78324 12.5119 8.14879C12.5119 8.33918 12.4929 8.51815 12.4548 8.68569C12.4167 8.84562 12.352 9.00555 12.2606 9.16548C12.1768 9.31779 12.0626 9.47391 11.9179 9.63384C11.7732 9.79377 11.598 9.96893 11.3924 10.1593C11.2096 10.3192 11.0611 10.4639 10.9469 10.5934C10.8327 10.7229 10.7413 10.8561 10.6727 10.9932C10.6118 11.1303 10.5661 11.2788 10.5356 11.4387C10.5128 11.5987 10.5014 11.7891 10.5014 12.0099H9.22195ZM9.22195 12.7182H10.5128V14.1689H9.22195V12.7182Z" fill="#423A2F"/>
    </svg>`; // Ваш SVG код
  productCard.appendChild(productReview);
  productSize.appendChild(iconInfo); // Переместили сюда

  const productInfo = document.createElement("div");
  productInfo.classList.add("product-info");
  productInfo.innerHTML =
    "Предоставленная на сайте информация носит ознакомительный характер и не является публичной офертой.Наличие и актуальную цену уточняйте у менеджеров отдела продаж.";
  iconInfo.appendChild(productInfo);

  // Отображаем свойства продукта
  keysToDisplay.forEach((key) => {
    if (content[key] !== undefined) {
      const listItem = document.createElement("li");
      listItem.classList.add("product-item");
      const spanSpecies = document.createElement("span");
      spanSpecies.classList.add("species");
      spanSpecies.textContent = key;
      listItem.appendChild(spanSpecies);

      // Если ключ "Цвет", нужно отобразить только фиалковый
      if (key === "Цвет") {
        const purpleColor = content[key]["фиалковый"];
        if (purpleColor) {
          const spanLook = document.createElement("span");
          spanLook.classList.add("look");
          spanLook.textContent = purpleColor;
          listItem.appendChild(spanLook);
          productList.appendChild(listItem);
        }
      } else {
        const spanLook = document.createElement("span");
        spanLook.classList.add("look");
        spanLook.textContent = content[key];
        listItem.appendChild(spanLook);
        productList.appendChild(listItem);
      }
    }
  });
  productCard.appendChild(productContent);
  //viewCards.appendChild(productCard);
  productCardsContainer.appendChild(productCard);
  console.log(product);
}

function addToSelectedProducts(product) {
  let selectedProducts =
    JSON.parse(localStorage.getItem("selectedProducts")) || [];
  // Проверяем, есть ли уже этот продукт в массиве по уникальному идентификатору (например, id)
  const productExists = selectedProducts.some(
    (existingProduct) => existingProduct.id === product.id
  );

  if (!productExists) {
    selectedProducts.push(product);
    localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts)); // Сохраняем обратно в localStorage
  } else {
    console.log("Этот продукт уже был добавлен.");
  }
}

// Функция для отображения всех выбранных карточек
function renderSelectedProducts() {
  const selectedProducts =
    JSON.parse(localStorage.getItem("selectedProducts")) || [];
  selectedProducts.forEach((product) => {
    viewSelectedCards(product); // Создаем карточку для каждого продукта
  });
}

// Обработчик события загрузки страницы
document.addEventListener("DOMContentLoaded", () => {
  renderSelectedProducts(); // Отображаем все выбранные карточки при загрузке
});
