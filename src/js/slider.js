let offset = 0 ;
const sliderLine = document.getElementById('slider-1');


const dots = document.querySelectorAll('.dot');
const prevButton = document.getElementById('arrow-prev');
const nextButton = document.getElementById('arrow-next');



nextButton.addEventListener('click', function() {
    offset = offset + 577;
    sliderLine.style.left = -offset + 'px';
    if ( offset > 577) {
        offset = -577;
    }
})

prevButton.addEventListener('click', function() {
    offset = offset - 577;
    sliderLine.style.left = offset + 'px';
    if ( offset < -577) {
        offset = 577;
    }
})

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        offset = index * 577;
        sliderLine.style.left = -offset + 'px';
    });
});