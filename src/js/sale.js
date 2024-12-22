const  saleBtn1 = document.getElementById('sale-btn1');
const  saleBtn2 = document.getElementById('sale-btn2');
const  saleBtn3 = document.getElementById('sale-btn3');
const  saleBtn4 = document.getElementById('sale-btn4');

const  saleContent1 = document.getElementById('sale-content1');
const  saleContent2 = document.getElementById('sale-content2');
const  saleContent3 = document.getElementById('sale-content3');
const  saleContent4 = document.getElementById('sale-content4');



saleBtn1.addEventListener('click', () => {
    saleContent1.style.display = "flex";
    saleContent2.style.display = "none";
    saleContent3.style.display = "none";
    saleContent4.style.display = "none";

    saleBtn1.classList.add('btn-active');
    saleBtn1.classList.add('fadeIn');
    saleBtn2.classList.remove('btn-active');
    saleBtn3.classList.remove('btn-active');
    saleBtn4.classList.remove('btn-active');
})

saleBtn2.addEventListener('click', () => {
    saleContent2.style.display = "flex";
    saleContent2.classList.add ('fadeIn');

    saleContent1.style.display = "none";
    saleContent3.style.display = "none";
    saleContent4.style.display = "none";

    saleBtn2.classList.add('btn-active');
    saleBtn2.classList.add('fadeIn');

    saleBtn1.classList.remove('btn-active');
    saleBtn3.classList.remove('btn-active');
    saleBtn4.classList.remove('btn-active');
})

saleBtn3.addEventListener('click', () => {
    saleContent3.style.display = "flex";
    saleContent3.classList.add ('fadeIn');

    saleContent1.style.display = "none";
    saleContent2.style.display = "none";
    saleContent4.style.display = "none";

    saleBtn3.classList.add('btn-active');
    saleBtn3.classList.add('fadeIn');

    saleBtn1.classList.remove('btn-active');
    saleBtn2.classList.remove('btn-active');
    saleBtn4.classList.remove('btn-active');
})

saleBtn4.addEventListener('click', () => {
    saleContent4.style.display = "block";
    saleContent2.classList.add ('fadeIn');
    
    saleContent1.style.display = "none";
    saleContent2.style.display = "none";
    saleContent3.style.display = "none";

    saleBtn4.classList.add('fadeIn');

    saleBtn2.classList.remove('btn-active');
    saleBtn3.classList.remove('btn-active');
    saleBtn1.classList.remove('btn-active');
})

//for section benefit
const  benefitBtn1 = document.getElementById('benefit-btn1');
const  benefitBtn2 = document.getElementById('benefit-btn2');
const  benefitBtn3 = document.getElementById('benefit-btn3');


const  benefitContent1 = document.getElementById('benefit-content1');
const  benefitContent2 = document.getElementById('benefit-content2');
const  benefitContent3 = document.getElementById('benefit-content3');

benefitBtn1.addEventListener('click', () => {
    benefitContent1.style.display = "block";
    benefitContent1.classList.add ('fadeIn');

    benefitContent2.style.display = "none";
    benefitContent3.style.display = "none";
});

benefitBtn2.addEventListener('click', () => {
    benefitContent2.style.display = "block";
    benefitContent2.classList.add ('fadeIn');

    benefitContent1.style.display = "none";
    benefitContent3.style.display = "none";
});

benefitBtn3.addEventListener('click', () => {
    benefitContent3.style.display = "block";
    benefitContent3.classList.add ('fadeIn');

    benefitContent1.style.display = "none";
    benefitContent2.style.display = "none";
});


