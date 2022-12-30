let Basket = {
  render: async () => {
    let view = `
    <div class="cart-container">
        <div class="cart-item cart-container-products">
            <h2 class="text-cart">Products In Cart</h2>
            <div class="cart-item-content"></div>
        </div>
        <div class="cart-item cart-container-summary">
            <h2 class="text-cart">Summary</h2>
            <div class="cart-item-content-summary">
                <div class="summary-item cart-products">
                    <div class="products-number">Products: <span>1</span></div>
                </div>
                <div>
                    <div class="summary-item cart-total">Total: <span class="total-money">&#8364;499.00</span></div>
                </div>
                <div class="summary-item cart-input">
                    <input class="input-summary" type="text" placeholder="Enter promo code">
                </div>
                <div class="summary-btn">
                    <a href="./modal.html" class="btn-buy-now">BUY NOW</a>
                </div>
            </div>
        </div>
    </div>
    `;
    return view;
  },
  after_render: async () => {
    const cartStore = document.querySelector('.cart-item-content');
    let cartStorage = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cartStorage.length) {
      cartStorage.forEach((el, idx) => {
        const { id, title, price, image, description, discount, brand, rating, stock } = el;
        const newCard = document.createElement('div');
        cartStore.append(newCard);
        newCard.innerHTML = `
        <div class='cart-store-container'>
          <span class='cart-item-number'>${idx + 1}</span><img class='image-store-cart' src='${image}' alt='product'>
          <div class='cart-item-title'>${title}<div>
          <div class='cart-item-price'>${price}</div>
          <div class='cart-item-description'>${description}</div>
          <div class='cart-item-discount'>${discount}</div>
          <div class='cart-item-brand'>${brand}</div>
          <div class='cart-item-rating'>${rating}</div>
          <div class='cart-item-stock'>${stock}</div>
          <div class='buttons-container'>
          </div>
          <span class='text-items'>1</span><button class='btn-add button-item'>+</button><button class='btn-delete button-item'>-</button>
        </div>`;
      });
    }
  },
};

export default Basket;
