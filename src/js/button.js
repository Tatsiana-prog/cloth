// Обработка кнопок для фильтрации
const btnCustom1 = document.getElementById('custom1');
btnCustom1.addEventListener('click', function() {
  productContainer.innerHTML = ''; // Очистите контейнер перед добавлением
    product1.style.display ="block";
});

const btnCustom2 = document.getElementById('custom2');
btnCustom2.addEventListener('click', function() {
  productContainer.innerHTML = ''; // Очистите контейнер перед добавлением
  product2.style.display ="block";
  
});



