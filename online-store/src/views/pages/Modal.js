let Modal = {
  render: async () => {
    let view = `
    <div class="modal">
        <div class="modal-content">
            <div class="personal_details">
                <h2>Personal details</h2>
                <div>
                    <input class="input input_name" type="text" placeholder="Name">
                    <span class="error error-name"></span>
                </div>
                <div>
                    <input class="input input_telephone" type="tel" placeholder="Phone number">
                    <span class="error error-telephone"></span>
                </div>
                <div>
                    <input class="input input_address" type="text" placeholder="Delivery address">
                    <span class="error error-address"></span>
                </div>
                <div>
                    <input class="input input_email" type="email" placeholder="E-mail">
                    <span class="error error-email"></span>
                </div>
            </div>
            <div class="credit_card_details">
                <h2>Credit card details</h2>
                <div>
                    <div class="logo-card-container"><img class="card-logo" src="" width="60" height="30">
                    <input class="input input_card" type="text" name="card-num" placeholder="0000 0000 0000 0000" size="18" id="card-number" minlength="19" maxlength="19"><span class="error error-card"></span>
                    </div>
                </div>
                <div>
                    <input name="exp_date" class="input exp_date" type="text" maxlength="5" placeholder="MM/YYYY" >
                    <span class="error error-date" ></span>
                </div>
                <div>
                    <input class="input input_cvv" type="text" name="card-cvv" placeholder="CVV" maxlength="3"><span class="error error-cvv"></span>
                </div>
                <div>
                    <button class="btn_confirm">Check validation</button>&nbsp;<button class="btn_order" disabled="true">Make an order</button>
                </div>
            </div>
        </div>
    </div>
    `;
    return view;
  },
  after_render: async () => {
    const button = document.querySelector('.btn_confirm');
    //для правильного форматирования кредитной карты

    const cardNum = document.getElementById('card-number');
    const errorCard = document.querySelector('.error-card');

    cardNum.onkeyup = function () {
      if (this.value == this.lastValue) return;
      let caretPosition = this.selectionStart;
      let sanitizedValue = this.value.replace(/[^0-9]/gi, '');
      let parts = [];

      for (let i = 0, len = sanitizedValue.length; i < len; i += 4) {
        parts.push(sanitizedValue.substring(i, i + 4));
      }

      for (let i = caretPosition - 1; i >= 0; i--) {
        let c = this.value[i];
        if (c < '0' || c > '9') {
          caretPosition--;
        }
      }
      caretPosition += Math.floor(caretPosition / 4);

      this.value = this.lastValue = parts.join(' ');
      this.selectionStart = this.selectionEnd = caretPosition;

      function checkCard() {
        if (cardNum.value.length === 19) {
          cardNum.style.background = 'mediumaquamarine';
          errorCard.style.display = 'none';
        } else {
          cardNum.style.background = 'salmon';
          errorCard.innerHTML = 'Wrong card number !';
          errorCard.style.display = 'block';
        }
      }
      cardNum.addEventListener('input', checkCard);
      button.addEventListener('click', checkCard);
    };

    // блок ввода срока действия карты
    const expInput = document.querySelector('.exp_date');
    const errorDate = document.querySelector('.error-date');

    function validateExp() {
      if (expInput.value.length === 2) {
        expInput.value += '/';
      }
      if (!validate(expInput.value)) {
        expInput.style.background = 'salmon';
        errorDate.innerHTML = 'Wrong card expiration date !';
        errorDate.style.display = 'block';
      } else {
        expInput.style.background = 'mediumaquamarine';
        errorDate.style.display = 'none';
      }
    }

    function validate(value) {
      const currentYear = new Date().getFullYear().toString().slice(-2);
      let [part1, part2] = value.split('/');
      return value[2] === '/' && value.length === 5 && part1 <= 12 && part2 >= currentYear;
    }

    expInput.addEventListener('input', validateExp);
    button.addEventListener('click', validateExp);

    const inputCVV = document.querySelector('.input_cvv');
    const errorCVV = document.querySelector('.error-cvv');

    const CVV_REGEXP = /\d{3,3}/;

    function validateCVV() {
      if (!valid(inputCVV.value)) {
        inputCVV.style.background = 'salmon';
        errorCVV.innerHTML = 'Wrong CVV !';
        errorCVV.style.display = 'block';
      } else {
        inputCVV.style.background = 'mediumaquamarine';
        errorCVV.style.display = 'none';
      }
    }

    function valid(value) {
      return CVV_REGEXP.test(value);
    }
    inputCVV.addEventListener('input', validateCVV);
    button.addEventListener('click', validateCVV);

    //валидация email инпута
    //из ТЗ - "E-mail". Валидация: проверяется, является ли введенный текст электронной почтой
    const inputEmail = document.querySelector('.input_email');
    const errorName = document.querySelector('.error-name');
    const errorTel = document.querySelector('.error-telephone');
    const errorAddress = document.querySelector('.error-address');
    const errorEmail = document.querySelector('.error-email');

    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    function onInput() {
      if (isEmailValid(inputEmail.value)) {
        inputEmail.style.background = 'mediumaquamarine';
        errorEmail.style.display = 'none';
      } else {
        inputEmail.style.background = 'salmon';
        errorEmail.innerHTML = 'Wrong Email !';
        errorEmail.style.display = 'block';
      }
    }

    inputEmail.addEventListener('input', onInput);
    button.addEventListener('click', onInput);

    function isEmailValid(value) {
      return EMAIL_REGEXP.test(value);
    }

    //валидация name инпута
    //"Имя и Фамилия". Валидация: содержит не менее двух слов, длина каждого не менее 3 символов
    const inputName = document.querySelector('.input_name');

    const handleInput = () => {
      inputName.style.background = '';
    };

    const handleName = () => {
      handleInput();

      const value = inputName.value.trim();
      if (!checkName(value)) {
        inputName.style.background = 'salmon';
        errorName.innerHTML = 'Wrong Name !';
        errorName.style.display = 'block';
      } else {
        if (!/\b\w+\b(?:.*?\b\w+\b){1}/.test(value)) {
          inputName.style.background = 'salmon';
        } else {
          inputName.style.background = 'mediumaquamarine';
          errorName.style.display = 'none';
        }
      }
    };

    function checkName(name) {
      return name.split(' ').every((el) => el.length >= 3);
    }

    inputName.addEventListener('input', handleName);
    button.addEventListener('click', handleName);

    //валидация phone инпута
    //"Номер телефона". Валидация: должно начинаться с '+', содержать только цифры и быть не короче 9 символов

    const phoneInput = document.querySelector('.input_telephone');
    const regexPhone = /(\+)\d{9}/;
    phoneInput.addEventListener('input', onInputTel);

    function onInputTel() {
      if (isTelValid(phoneInput.value)) {
        phoneInput.style.background = 'mediumaquamarine';
        errorTel.style.display = 'none';
      } else {
        phoneInput.style.background = 'salmon';

        errorTel.innerHTML = 'Wrong phone number !';

        errorTel.style.display = 'block';
      }
    }

    button.addEventListener('click', onInputTel);

    function isTelValid(value) {
      return regexPhone.test(value);
    }

    //валидация adress инпута
    //"Адрес доставки". Валидация: содержит не менее трех слов, длина каждого не менее 5 символов
    const inputAddress = document.querySelector('.input_address');

    const handleAddress = () => {
      inputAddress.style.background = '';
    };

    const handleForAddress = () => {
      handleAddress();
      const value = inputAddress.value.trim();
      if (!checkAddress(value)) {
        inputAddress.style.background = 'salmon';
        errorAddress.innerHTML = 'Wrong address !';
        errorAddress.style.display = 'block';
      } else {
        if (!/\b\w+\b(?:.*?\b\w+\b){2}/.test(value)) {
          inputAddress.style.background = 'salmon';
        } else {
          inputAddress.style.background = 'mediumaquamarine';
          errorAddress.style.display = 'none';
        }
      }
    };

    function checkAddress(name) {
      return name.split(' ').every((el) => el.length >= 5);
    }

    inputAddress.addEventListener('input', handleForAddress);
    button.addEventListener('click', handleForAddress);

    //логика перехода на главную страницу. После оформления заказа
    //Из ТЗ - > при успешном прохождении валидации всех полей и нажатии на кнопку, выводится сообщение, что заказ оформлен. Затем, спустя 3-5 секунд происходит редирект на главную страницу магазина. Корзина при этом очищается

    const buttonOrder = document.querySelector('.btn_order');

    function checkValid() {
      if (
        expInput.style.background === 'mediumaquamarine' &&
        inputCVV.style.background === 'mediumaquamarine' &&
        cardNum.style.background === 'mediumaquamarine' &&
        inputEmail.style.background === 'mediumaquamarine' &&
        inputName.style.background === 'mediumaquamarine' &&
        phoneInput.style.background === 'mediumaquamarine' &&
        inputAddress.style.background === 'mediumaquamarine'
      ) {
        buttonOrder.removeAttribute('disabled');
      }
    }

    button.addEventListener('click', checkValid);

    function messageOrderIsProcessed() {
      alert('Заказ оформлен!');
      localStorage.clear();
      setTimeout(() => (window.location.href = 'index.html'), 3000);
    }

    buttonOrder.addEventListener('click', messageOrderIsProcessed);
  },
};

export default Modal;
