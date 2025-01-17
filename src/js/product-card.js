// Глобальные переменные для хранения данных
let data = [];
let originalCards = [];
const overlay = document.querySelector('.overlay');
const windowOrder = document.querySelector('.window-order');
const btnClose = document.querySelector('.btn-close');

// Перемешивание массива данных
function shuffleData() {
    data = originalCards.slice(); // Создаем копию исходного массива
    for (let i = data.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [data[i], data[j]] = [data[j], data[i]]; // Обмен элементов местами
    }
}

// Функция загрузки данных из JSON
function loadDataFromJson() {
    fetch('products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка загрузки данных');
            }
            return response.json();
        })
        .then(loadedData => {
            data = loadedData;
            originalCards = [...data];
            shuffleData(); // Перемешиваем данные
            displayCards(data);
        })
        .catch(error => console.error('Ошибка:', error));
}

// Функция для отображения карточек
function displayCards(productsData) {
  const productCardsContainer = document.querySelector('.products-cards');
  productCardsContainer.innerHTML = ''; // Очистить контейнер
  productsData.forEach((card, index) =>  {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');

      const productImage = document.createElement('div');
      productImage.classList.add('product-image');
      const image = document.createElement('img');
      image.src = card.image1;
      image.alt = card.description;
      productImage.onclick = function() {
        showNewFormat(index);
      };

      productImage.appendChild(image);
      productCard.appendChild(productImage);

      const productContent = document.createElement('div');
      productContent.classList.add('product-content');
      const productName = document.createElement('h3');
      productName.classList.add('product-name');
      productName.textContent = card.description;
      productContent.appendChild(productName);

      const productDenst = document.createElement('p');
      productDenst.classList.add('product-density');
      productDenst.innerHTML = card.content['Плотность']; // Используем card для плотности
      productContent.appendChild(productDenst);

      // Список свойств
      const productList = document.createElement('ul');
      productList.classList.add('product-list');
      const content = card.content || {}; // Используем card.content
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
      if (card.sale === 'В наличии') {
          productStock.style.display = "block";
          productOrder.style.display = "none";
      } else if (card.sale === 'Под заказ') {
          productStock.style.display = "none";
          productOrder.style.display = "block";
      }

      productCard.appendChild(productStock);
      productCard.appendChild(productOrder);

      // Example index value
      const productReview = document.createElement('button');
      productReview.classList.add('product-review');
      productReview.innerHTML = `<svg width="48" height="47" viewBox="0 0 48 47" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="23.1533" cy="23.0557" r="23.0557" fill="#F5E0C7"/>
      <path d="M12.1533 23.0557C12.1533 23.0557 16.1533 15.0557 23.1533 15.0557C30.1533 15.0557 34.1533 23.0557 34.1533 23.0557C34.1533 23.0557 30.1533 31.0557 23.1533 31.0557C16.1533 31.0557 12.1533 23.0557 12.1533 23.0557Z" stroke="#692F6C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M23.1533 26.0557C24.8102 26.0557 26.1533 24.7125 26.1533 23.0557C26.1533 21.3988 24.8102 20.0557 23.1533 20.0557C21.4965 20.0557 20.1533 21.3988 20.1533 23.0557C20.1533 24.7125 21.4965 26.0557 23.1533 26.0557Z" stroke="#692F6C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`; // Ваш SVG код

    const buttons = document.querySelectorAll('.product-review');

    buttons.forEach((button) => {
        button.addEventListener('click', handleClick);
    });

    function handleClick() {
        createOrderWindow();
        overlay.style.display = 'block';
        windowOrder.style.display = 'block';
        console.log("ghbdtn");
    }

    productCard.appendChild(productReview);
      const iconInfo = document.createElement('span');
      iconInfo.classList.add('icon-info');
      iconInfo.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9.59753" cy="9.5155" r="9.5155" fill="#F5E0C7"/>
      <path d="M9.22195 12.0099C9.22195 11.6901 9.24099 11.4121 9.27907 11.176C9.32476 10.9323 9.39711 10.7076 9.49612 10.502C9.59512 10.2964 9.72839 10.0984 9.89594 9.908C10.0711 9.71761 10.2881 9.51199 10.5471 9.29114C10.7908 9.08552 10.9621 8.89132 11.0611 8.70854C11.1601 8.52577 11.2096 8.32776 11.2096 8.11452C11.2096 7.74136 11.0878 7.43673 10.8441 7.20065C10.6004 6.95695 10.2881 6.8351 9.90736 6.8351C9.13818 6.8351 8.69648 7.31488 8.58224 8.27445H7.30282C7.32566 7.85559 7.40563 7.48243 7.54271 7.15495C7.67979 6.81987 7.85876 6.53809 8.07961 6.30962C8.30808 6.07354 8.57843 5.89457 8.89067 5.77272C9.20291 5.64325 9.54943 5.57852 9.93021 5.57852C10.3034 5.57852 10.6461 5.64325 10.9583 5.77272C11.2782 5.90218 11.5523 6.08115 11.7808 6.30962C12.0093 6.53809 12.1882 6.81225 12.3177 7.13211C12.4472 7.44435 12.5119 7.78324 12.5119 8.14879C12.5119 8.33918 12.4929 8.51815 12.4548 8.68569C12.4167 8.84562 12.352 9.00555 12.2606 9.16548C12.1768 9.31779 12.0626 9.47391 11.9179 9.63384C11.7732 9.79377 11.598 9.96893 11.3924 10.1593C11.2096 10.3192 11.0611 10.4639 10.9469 10.5934C10.8327 10.7229 10.7413 10.8561 10.6727 10.9932C10.6118 11.1303 10.5661 11.2788 10.5356 11.4387C10.5128 11.5987 10.5014 11.7891 10.5014 12.0099H9.22195ZM9.22195 12.7182H10.5128V14.1689H9.22195V12.7182Z" fill="#423A2F"/>
      </svg>`; // Ваш SVG код
      productCard.appendChild(productReview);
      productSize.appendChild(iconInfo); // Переместили сюда

      const productInfo = document.createElement('div');
      productInfo.classList.add('product-info');
      productInfo.innerHTML = 'Предоставленная на сайте информация носит ознакомительный характер и не является публичной офертой.Наличие и актуальную цену уточняйте у менеджеров отдела продаж.';
      iconInfo.appendChild(productInfo);

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
                      spanLook.textContent = purpleColor;
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
      productCardsContainer.appendChild(productCard);
  });
}

// Клики по кнопкам
const productCardsContainer = document.querySelector('.products-cards');
const allButton = document.getElementById('all');
const custom1Button = document.getElementById('custom1');
const custom2Button = document.getElementById('custom2');
const custom3Button = document.getElementById('custom3');
const custom4Button = document.getElementById('custom4');
const iconImg = document.querySelector('.icon-img');


const content1 = document.getElementById('content1');
const content2 = document.getElementById('content2');
const content3 = document.getElementById('content3');

// Функция для скрытия или показа иконки на каждой кнопке
function showIconForButton(button) {
    // Убираем иконку у всех кнопок
    const buttons = [allButton, custom1Button, custom2Button, custom3Button, custom4Button];
    buttons.forEach(btn => {
        const icon = btn.querySelector('.icon-img');
        if (icon) {
            icon.style.opacity = 0; // Скрыть иконку
        }
    });

    // Добавляем иконку только к нажатой кнопке
    const icon = button.querySelector('.icon-img');
    if (icon) {
        icon.style.opacity = 1; // Показать иконку
    }
}

// Обработчик события для кнопки "Все"
allButton.addEventListener('click', () => {
    showIconForButton(allButton); // Показать иконку только на кнопке "Все"
    shuffleData(); // Перемешиваем данные
    displayCards(data);
    content3.style.display = "block";
    productCardsContainer.style.display = "flex";
    content1.style.display = "none";
    content2.style.display = "none";
});

const product1Selection = document.querySelector('.product1-selection');
const product2Selection = document.querySelector('.product2-selection');

// Обработчик события для кнопки "Флис"
custom1Button.addEventListener('click', () => {
    product2Selection.style.display = "none";
    product1Selection.style.display = "flex";
    showIconForButton(custom1Button); // Показать иконку только на кнопке "Флис"
    const filteredData = originalCards.filter(card => card.name === 'Футер');
    displayCards(filteredData);
    content2.style.display = "block";
    productCardsContainer.style.display = "flex";
    content1.style.display = "none";
    content3.style.display = "none";
});

// Обработчик события для кнопки "Футер"
custom2Button.addEventListener('click', () => {
    product2Selection.style.display = "flex";
    product1Selection.style.display = "none";
    showIconForButton(custom2Button); // Показать иконку только на кнопке "Футер"
    const filteredData = originalCards.filter(card => card.name === 'Флис');
    displayCards(filteredData);
    content1.style.display = "block";
    productCardsContainer.style.display = "flex";
    content3.style.display = "none";
    content2.style.display = "none";
});

const btnSelection1 = document.getElementById('selection-1');
btnSelection1.addEventListener('click', () => {
    const filteredData = originalCards.filter(card => card.description === 'Футер 2-х нитка');
    btnSelection1.classList.add('selection-active');
    btnSelection2.classList.remove('selection-active');
    btnSelection6.classList.remove('selection-active');
    displayCards(filteredData);
})

const btnSelection2 = document.getElementById('selection-2');
btnSelection2.addEventListener('click', () => {
    const filteredData = originalCards.filter(card => card.description === 'Футер 3-х нитка');
    btnSelection2.classList.add('selection-active');
    btnSelection1.classList.remove('selection-active');
    btnSelection6.classList.remove('selection-active');
    displayCards(filteredData);
})

const btnSelection6 = document.getElementById('selection-6');
btnSelection6.addEventListener('click', () => {
    const filteredData = originalCards.filter(card => card.description === 'Ткань для термобелья');
    btnSelection6.classList.add('selection-active');
    btnSelection1.classList.remove('selection-active');
    btnSelection2.classList.remove('selection-active');
    displayCards(filteredData);
})

const btnSelection3 = document.getElementById('selection-3');
btnSelection3.addEventListener('click', () => {
    const filteredData = originalCards.filter(card => card.description === 'Флис односторонний');
    btnSelection3.classList.add('selection-active');
    btnSelection4.classList.remove('selection-active');
    displayCards(filteredData);
})

const btnSelection4 = document.getElementById('selection-4');
btnSelection4.addEventListener('click', () => {
    const filteredData = originalCards.filter(card => card.description === 'Флис двуxcторонний');
    btnSelection4.classList.add('selection-active');
    btnSelection3.classList.remove('selection-active');
    btnSelection5.classList.remove('selection-active');
    displayCards(filteredData);
})

const btnSelection5 = document.getElementById('selection-5');
btnSelection5.addEventListener('click', () => {
    const filteredData = originalCards.filter(card => card.description === 'Трикотаж на флисе');
    btnSelection5.classList.add('selection-active');
    btnSelection3.classList.remove('selection-active');
    btnSelection4.classList.remove('selection-active');
    displayCards(filteredData);
})

// Обработчик события для кнопки "В наличии"
custom3Button.addEventListener('click', () => {
    product2Selection.style.display = "none";
    product1Selection.style.display = "none";
    showIconForButton(custom3Button); // Показать иконку только на кнопке "В наличии"
    const filteredData = originalCards.filter(card => card.sale === 'В наличии');
    displayCards(filteredData);
    content3.style.display = "block";
    productCardsContainer.style.display = "flex";
    content1.style.display = "none";
    content2.style.display = "none";

});

// Обработчик события для кнопки "Под заказ"
custom4Button.addEventListener('click', () => {
    showIconForButton(custom4Button); // Показать иконку только на кнопке "Под заказ"
    const filteredData = originalCards.filter(card => card.sale === 'Под заказ');
    displayCards(filteredData);
    content3.style.display = "block";
    content1.style.display = "none";
    content2.style.display = "none";
});

// Убедитесь, что кнопка "Все" активна по умолчанию
document.addEventListener('DOMContentLoaded', () => {
    showIconForButton(allButton); // Показываем иконку на кнопке "Все" по умолчанию
    shuffleData(); // Если нужно, можно выполнить начальную загрузку данных
    displayCards(data); // Показываем начальные карточки
});

function showNewFormat(index) {
    const product = data[index]; // Получаем выбранный продукт
    localStorage.setItem('selectedProduct', JSON.stringify(product)); // Сохраняем продукт в localStorage
    window.location.href = 'newcard.html'; // Перенаправляем на новую страницу
    }

function createOrderWindow() {
    const productsCardsContainer = document.getElementById('products-cards');
    const windowOrder = document.createElement('div');
    windowOrder.className = 'window-order';   

    const windowTitle = document.createElement('div');
    windowTitle.className = 'window-title';
    windowTitle.innerHTML = '<h4 class="title-4">Заказать образец ткани</h4>';

    const orderBox = document.createElement('div');
    orderBox.className = 'order-box';
    orderBox.innerHTML = `
        <div class="order-name"></div>
        <div class="order-desc"></div>
        <div class="order-color"></div>
    `;

    const orderFormWrapper = document.createElement('div');
    orderFormWrapper.className = 'order-form__wrapper';

    const form = document.createElement('form');
    form.className = 'order-form';

    const inputBoxes = document.createElement('div');
    inputBoxes.className = 'input-boxes';
    inputBoxes.innerHTML = `
        <input class="input" type="text" id="questions-name" name="name" placeholder="Имя">
        <input class="input" type="email" id="questions-email" name="email" placeholder="Эл.почта">
    `;

    const textarea = document.createElement('textarea');
    textarea.name = 'textarea';
    textarea.rows = 5;
    textarea.cols = 15;
    textarea.placeholder = 'Комментарий';

    const inputBox = document.createElement('div');
    inputBox.className = 'input-box';
    inputBox.innerHTML = `
        <input class="input-custom" type="checkbox" id="custom" name="custom">
        <span class="checkbox-text">Даю согласие на обработку персональных данных</span>
    `;

    const btnWrapper = document.createElement('div');
    btnWrapper.className = 'btn-wrapper';
    btnWrapper.innerHTML = `
        <button class="btn-submit" type="submit">Заказать <span class="btn-arrow">
            <svg width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.659 6.70614C9.58531 6.77481 9.52621 6.85761 9.48522 6.94961C9.44423 7.04161 9.42218 7.14092 9.42041 7.24162C9.41863 7.34232 9.43716 7.44235 9.47488 7.53574C9.5126 7.62913 9.56874 7.71396 9.63996 7.78518C9.71118 7.8564 9.79601 7.91255 9.8894 7.95027C9.98279 7.98799 10.0828 8.00651 10.1835 8.00474C10.2842 8.00296 10.3835 7.98092 10.4755 7.93993C10.5675 7.89893 10.6503 7.83983 10.719 7.76614L14.5 3.98614L10.72 0.206144C10.5786 0.0694572 10.3892 -0.0062288 10.1925 -0.00461333C9.9959 -0.00299786 9.80775 0.0757902 9.66863 0.214781C9.52951 0.353772 9.45054 0.541845 9.44874 0.738493C9.44694 0.935141 9.52245 1.12463 9.659 1.26614L11.629 3.23614L1.25 3.23614C1.05109 3.23614 0.860323 3.31516 0.71967 3.45581C0.579018 3.59647 0.5 3.78723 0.5 3.98614C0.5 4.18506 0.579018 4.37582 0.71967 4.51647C0.860323 4.65713 1.05109 4.73614 1.25 4.73614L11.629 4.73614L9.659 6.70614Z" fill="white"/>
            </svg>
        </span></button>
    `;

    const btnClose = document.createElement('div');
    btnClose.className = 'btn-close';

    
    // Append all elements
    form.appendChild(inputBoxes);
    form.appendChild(textarea);
    form.appendChild(inputBox);
    form.appendChild(btnWrapper);
    orderFormWrapper.appendChild(form);

    windowOrder.appendChild(windowTitle);
    windowOrder.appendChild(orderBox);
    windowOrder.appendChild(orderFormWrapper);
    windowOrder.appendChild(btnClose);
    windowOrder.appendChild(btnWind);
    productsCardsContainer.appendChild(windowOrder);
}

// Инициализация отображения карточек после загрузки данных из JSON файла
loadDataFromJson();













