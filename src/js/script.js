document.addEventListener('DOMContentLoaded', () => {
    const quantityElement = document.getElementById('quantity');
    const increaseButton = document.getElementById('increase');
    const decreaseButton = document.getElementById('decrease');
    const orderButton = document.getElementById('order-button');

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
            quantityElement.textContent = quantity;
        }
    });

    orderButton.addEventListener('click', () => {
        // Сохраняем количество в LocalStorage
        localStorage.setItem('productQuantity', quantity);
        alert(`Заказано ${quantity} товара(ов)`);
    });
});