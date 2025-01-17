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
    productsCardsContainer.appendChild(windowOrder);
}

// Call the function to create the order window
createOrderWindow();