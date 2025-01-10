//slider-1
let offset1 = 0 ;
let dotIndex1 = 0;
const slider1Line = document.getElementById('slider-1');
const dots1 = document.querySelectorAll('.dot');
const prevButton1 = document.getElementById('arrow1-prev');
const nextButton1 = document.getElementById('arrow1-next');

const nextSlide = () => {
    offset1 = offset1 + 577; // Увеличиваем смещение на 577px
    dotIndex1++; // Увеличиваем индекс текущего слайда

    if (offset1 > 1154) { // Если смещение больше 1731px (3 слайда по 577px)
        offset1 = 0; // Возвращаемся в начальное состояние
        dotIndex1 = 0; // Сбрасываем индекс текущего слайда
    }

    slider1Line.style.left = -offset1 + 'px'; // Применяем новое смещение к карусели
    thisSlide(dotIndex1); // Вызываем функцию для выделения текущего слайда
}

const prevSlide = () => {
    offset1 = offset1 - 577; // Уменьшаем смещение на 577px
    dotIndex1--; // Уменьшаем индекс текущего слайда

    if (offset1 < 0) { // Если смещение меньше 0, возвращаемся к последнему слайду
        offset1 = 1154; // Устанавливаем смещение на последнее положение (3 слайда по 577px)
        dotIndex1 = 2; // Устанавливаем индекс на последний слайд
    }

    slider1Line.style.left = -offset1 + 'px'; // Применяем новое смещение к карусели
    thisSlide(dotIndex1); // Вызываем функцию для выделения текущего слайда
}

const thisSlide = (index) => {
    for (let dot of dots1) {
      dot.classList.remove('active-dot');
    }
    dots1[index].classList.add('active-dot');
  };

dots1.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        offset1 = index * 577;
        slider1Line.style.left = -offset1 + 'px';
        dotIndex1 = index;
        thisSlide(dotIndex1);
    });
});

nextButton1.addEventListener('click', nextSlide);
prevButton1.addEventListener('click', prevSlide);


//slider-2
let offset2 = 0;
let dotIndex2 = 0;
const slider2Line = document.getElementById('slider-2');
const dots2 = document.querySelectorAll('.dot2');
const prevButton2 = document.getElementById('arrow2-prev');
const nextButton2 = document.getElementById('arrow2-next');

const nextSlide2 = () => {
    offset2 = offset2 + 577; // Увеличиваем смещение на 577px
    dotIndex2++; // Увеличиваем индекс текущего слайда

    if (offset2 > 1154) { // Если смещение больше 1154px (2 слайда по 577px)
        offset2 = 0; // Возвращаемся в начальное состояние
        dotIndex2 = 0; // Сбрасываем индекс текущего слайда
    }

    slider2Line.style.left = -offset2 + 'px'; // Применяем новое смещение к карусели
    thisSlide2(dotIndex2); // Вызываем функцию для выделения текущего слайда
}

const prevSlide2 = () => {
    offset2 = offset2 - 577; // Уменьшаем смещение на 577px
    dotIndex2--; // Уменьшаем индекс текущего слайда

    if (offset2 < 0) { // Если смещение меньше 0, возвращаемся к последнему слайду
        offset2 = 1154; // Устанавливаем смещение на последнее положение (3 слайда по 577px)
        dotIndex2 = 2; // Устанавливаем индекс на последний слайд
    }

    slider2Line.style.left = -offset2 + 'px'; // Применяем новое смещение к карусели
    thisSlide2(dotIndex2); // Вызываем функцию для выделения текущего слайда
}

const thisSlide2 = (index) => {
    for (let dot of dots2) {
      dot.classList.remove('active-dot');
    }
    dots2[index].classList.add('active-dot');
  };

dots2.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        offset2 = index * 577;
        slider2Line.style.left = -offset2 + 'px';
        dotIndex2 = index;
        thisSlide2(dotIndex2);
    });
});


nextButton2.addEventListener('click', nextSlide2);
prevButton2.addEventListener('click', prevSlide2);


//slider-3
let offset3 = 0;
let dotIndex3 = 0;
const slider3Line = document.getElementById('slider-3');
const dots3 = document.querySelectorAll('.dot3');
const prevButton3 = document.getElementById('arrow3-prev');
const nextButton3 = document.getElementById('arrow3-next');

const nextSlide3 = () => {
    offset3 = offset3 + 577; // Увеличиваем смещение на 577px
    dotIndex3++; // Увеличиваем индекс текущего слайда

    if (offset3 > 1154) { // Если смещение больше 1154px (2 слайда по 577px)
        offset3 = 0; // Возвращаемся в начальное состояние
        dotIndex3 = 0; // Сбрасываем индекс текущего слайда
    }

    slider3Line.style.left = -offset3 + 'px'; // Применяем новое смещение к карусели
    thisSlide3(dotIndex3); // Вызываем функцию для выделения текущего слайда
}

const prevSlide3 = () => {
    offset3 = offset3 - 577; // Уменьшаем смещение на 577px
    dotIndex3--; // Уменьшаем индекс текущего слайда

    if (offset3 < 0) { // Если смещение меньше 0, возвращаемся к последнему слайду
        offset3 = 1154; // Устанавливаем смещение на последнее положение (3 слайда по 577px)
        dotIndex3 = 2; // Устанавливаем индекс на последний слайд
    }

    slider3Line.style.left = -offset3 + 'px'; // Применяем новое смещение к карусели
    thisSlide3(dotIndex3); // Вызываем функцию для выделения текущего слайда
}

const thisSlide3 = (index) => {
    for (let dot of dots3) {
      dot.classList.remove('active-dot');
    }
    dots3[index].classList.add('active-dot');
  };

dots3.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        offset3 = index * 577;
        slider3Line.style.left = -offset3 + 'px';
        dotIndex3 = index;
        thisSlide3(dotIndex3);
    });
});

nextButton3.addEventListener('click', nextSlide3);
prevButton3.addEventListener('click', prevSlide3);