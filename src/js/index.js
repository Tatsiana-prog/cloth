document.addEventListener('DOMContentLoaded', function() {
  // Массив кнопок и элементов с текстом
  let buttons = [];
  let textElements = [];
  // Получаем все кнопки и элементы текста
  for (let i = 1; i <= 8; i++) {
    buttons.push(document.getElementById('btn' + i));  // Получаем кнопки
    textElements.push(document.getElementById('text' + i));  // Получаем элементы с текстом
  }
  // Переменная для отслеживания текущего индекса карусели
  let currentRotationIndex = 0;
  let aEle = [...document.querySelectorAll('.carousel-element')]; // Элементы карусели

  // Функция для обработки кликов по кнопке
  function handleClick(index) {
    // Убираем класс 'slide-in' и добавляем 'slide-left' для всех других текстовых блоков
    textElements.forEach((textElement, i) => {
      if (i !== index) {
        if (textElement.classList.contains('slide-in')) {
          textElement.classList.remove('slide-in');
          textElement.classList.add('slide-left');
          textElement.style.opacity = "0.5";
        }
      }
    });
    // Для текущего элемента с индексом index переключаем классы
    let currentTextElement = textElements[index];
    currentTextElement.classList.remove('slide-left');
    currentTextElement.classList.add('slide-in');
    currentTextElement.style.display = "block";
    // Вращаем карусель на нужный индекс
    rotateCarousel(index);
  }
  // Обработчик для кнопок
  buttons.forEach((button, index) => {
    button.addEventListener('click', function () {
      // Убираем класс active у всех кнопок
      buttons.forEach(btn => btn.classList.remove('active'));
      // Добавляем класс active к текущей кнопке
      this.classList.add('active');
      // Показываем/скрываем текст при клике на кнопку
      handleClick(index);

      // Перемещаем кликнутую кнопку на 3-й индекс (что соответствует 4-й позиции)
      moveButtonToThirdPosition(this);
    });
  });
  // Инициализация для кнопки с индексом 3 (по умолчанию)
handleClick(3);
});
const block = document.getElementById('direction-box');
    
    // Запрещаем прокрутку при наведении на блок
    block.addEventListener('mouseenter', function() {
      document.body.style.overflow = 'hidden';
    });
    
    // Разрешаем прокрутку, когда курсор покидает блок
    block.addEventListener('mouseleave', function() {
      document.body.style.overflow = '';
    });
