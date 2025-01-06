<<<<<<< HEAD
/*document.addEventListener('DOMContentLoaded', () => {
    const quantityElement = document.getElementById('quantity');
=======
document.addEventListener('DOMContentLoaded', () => {
    const quantitySpan = document.getElementById('quantity');                                     
>>>>>>> b36775f5f7e8732c773a913845d39a494fd7f632
    const increaseButton = document.getElementById('increase');
    const decreaseButton = document.getElementById('decrease');
    const buyButton = document.getElementById('order-button');






    // Получаем сохранённое количество из LocalStorage
    let quantity = localStorage.getItem('productQuantity') || 1;
    quantityElement.textContent = quantity;

    increaseButton.addEventListener('click', () => {
        quantity++;
        quantityElement.textContent = quantity;
    });

    decreaseButton.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            quantitySpan.textContent = quantity;
        }
    });

    buyButton.addEventListener('click', () => {
        // Сохраняем количество в LocalStorage
        localStorage.setItem('productQuantity', quantity);
        alert(`Заказано ${quantity} товара(ов)`);
    });
});*/


document.addEventListener('DOMContentLoaded', () => {
    const cardList = document.getElementById('card-list');

    // Создаем элементы счетчика количества
    const countCard = document.createElement('div');
    countCard.id = 'count-card';
    
    const decreaseButton = document.createElement('button');
    decreaseButton.id = 'decrease';
    decreaseButton.textContent = '-';
    
    const counterText = document.createElement('div');
    counterText.className = 'counter-text';
    
    const quantitySpan = document.createElement('span');
    quantitySpan.id = 'quantity';
    quantitySpan.textContent = '1';
    
    const unitSpan = document.createElement('span');
    unitSpan.textContent = 'рул.';
    
    const increaseButton = document.createElement('button');
    increaseButton.id = 'increase';
    increaseButton.textContent = '+';

    countCard.appendChild(decreaseButton);
    countCard.appendChild(counterText);
    countCard.appendChild(increaseButton);
    cardList.appendChild(countCard);

    // Обработчики событий для кнопок увеличения и уменьшения
    const quantityElement = document.getElementById('quantity');
    let quantity = 1;

    increaseButton.addEventListener('click', () => {
        quantity++;
        quantityElement.textContent = quantity;
    });

    decreaseButton.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            quantityElement.textContent = quantity;
        }
    });
});