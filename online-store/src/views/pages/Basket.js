let Basket = {
  render: async () => {
    let view = `
    <section class="cart-container">
        <div class="cart-item cart-container-products">
            <h2 class="text-cart">Products In Cart</h2>
            <div class="cart-item-content"></div>
        </div>
        <div class="cart-item cart-container-summary">
            <h2 class="text-cart">Summary</h2>
            <div class="cart-item-content-summary">
                <div class="summary-item cart-products">
                    <div class="products-number">Products: <span class="products-number-sp">1</span></div>
                </div>
                <div>
                    <div class="summary-item cart-total">Total: &#8364;&nbsp;<span class="total-money">499</span></div>
                </div>
                <div class="summary-item cart-input">
                    <input class="input-summary" type="text" placeholder="Enter promo code">
                </div>
                <div class="summary-btn">
                    <a href="/#/modal" class="btn-buy-now">BUY NOW</a>
                </div>
            </div>
        </div>
    </section>
    `;
    return view;
  },
  after_render: async () => {
    const productNumber = document.querySelector('.products-number-sp');
    const cartStore = document.querySelector('.cart-item-content');
    let cartStorage = JSON.parse(localStorage.getItem('cart') || '[]');
    let getTotal = cartStorage.reduce((a, c) => a + +c.price, 0);
    document.querySelector('.cart-total-inner').innerHTML = getTotal;
    productNumber.innerHTML = cartStorage.length;
    if (cartStorage.length) {
      cartStorage.forEach((el, idx) => {
        const { id, title, price, image, description, discount, brand, rating, stock } = el;
        const newCard = document.createElement('div');
        cartStore.append(newCard);
        newCard.innerHTML = `
        <div class='cart-store-container'>
        <span class='cart-item-number'>${idx + 1}</span><img class='image-store-cart' src='${image}' alt='product'>
          <div class='cart-id'>${id}</div>
          <div class='cart-item-title'>${title}<div>
          <div class='cart-item-price'>${price}</div>
          <div class='cart-item-description'>${description}</div>
          <div class='cart-item-discount'>${discount}</div>
          <div class='cart-item-brand'>${brand}</div>
          <div class='cart-item-rating'>${rating}</div>
          <div class='cart-item-stock'>${stock}</div>
          <div class='buttons-container'>
            <span class='text-items'>1</span><button class='btn-add button-item'>+</button><button class='btn-delete button-item'>-</button>
          </div>
          </div>`;
      });
    }
    const btnAdd = document.querySelectorAll('.btn-add');
    const btnDelete = document.querySelectorAll('.btn-delete');
    const carts = document.querySelectorAll('.cart-store-container');
    let totalMoney = document.querySelector('.total-money');

    const total = document.querySelector('.cart-total-inner');

    let totalStorage = JSON.parse(localStorage.getItem('total') || '0');
    totalMoney.innerHTML = totalStorage;
    carts.forEach((el, i) =>
      el.addEventListener('click', async function res(e) {
        if (e.target.previousSibling.previousSibling.innerHTML === '1' && e.target.innerHTML === '-') {
          let y = await document.querySelectorAll('.cart-id')[i].innerHTML;
          console.log(y);
          let cartStorage = JSON.parse(localStorage.getItem('cart'));
          let x = await cartStorage.filter((el) => el.id.toString() !== y);
          localStorage.setItem('cart', JSON.stringify(x));
          this.remove();
        } else {
          if (e.target.innerHTML === '-') {
            e.target.previousSibling.previousSibling.innerHTML -= 1;
          }
        }
      })
    );
    btnDelete.forEach((el, i) =>
      el.addEventListener('click', async function () {
        this.previousSibling.innerHTML = +this.previousSibling.innerHTML - 1;
        if (document.querySelectorAll('.cart-item-price')) {
          let addTotal = document.querySelectorAll('.cart-item-price')[i].innerHTML;
          totalMoney.innerHTML = +totalMoney.innerHTML - +addTotal;
          console.log(totalMoney.innerHTML);
          let currTotal = totalMoney.innerHTML;
          localStorage.setItem('total', JSON.stringify(currTotal));
          total.innerHTML = currTotal;
        }
      })
    );

    btnAdd.forEach((el, i) =>
      el.addEventListener('click', function () {
        this.previousSibling.innerHTML = +this.previousSibling.innerHTML + 1;
        let addTotal = document.querySelectorAll('.cart-item-price')[i].innerHTML;
        console.log(addTotal);
        totalMoney.innerHTML = +totalMoney.innerHTML + +addTotal;
        let currentTotal = +totalMoney.innerHTML;
        localStorage.setItem('total', JSON.stringify(currentTotal));
        total.innerHTML = currentTotal;
      })
    );
    total.innerHTML = totalStorage;
  },
};

export default Basket;
