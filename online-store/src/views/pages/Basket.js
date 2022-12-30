import Utils from '../../services/Utils';

let getSingleProduct = async (id) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await fetch(`https://dummyjson.com/products/` + id, options);
    const json = await response.json();
    return json;
  } catch (err) {
    console.log('Error getting documents', err);
  }
};

let Basket = {
  renderCartProduct: async () => {
    let request = Utils.parseRequestURL();
    let post = await getSingleProduct(request.id);
    let view = /*html*/ `
            <section class="section details-section">
              <div class='cart-store-container'>
                <span class='cart-item-number'>${post.idx + 1}</span><img class='image-store-cart' src='${
      post.image
    }' alt='product'>
                <div class='cart-item-title'>${post.title}<div>
                <div class='cart-item-price'>${post.price}</div>
                <div class='cart-item-description'>${post.description}</div>
                <div class='cart-item-discount'>${post.discount}</div>
                <div class='cart-item-brand'>${post.brand}</div>
                <div class='cart-item-rating'>${post.rating}</div>
                <div class='cart-item-stock'>${post.stock}</div>
                <div class='buttons-container'>
                </div>
                <span class='text-items'>1</span><button class='btn-add button-item'>+</button><button class='btn-delete button-item'>-</button>
              </div>
            </section>
        `;
    return view;
  },
  render: async () => {
    let view = `
    <div class="cart-container">
        <div class="cart-item cart-container-products">
            <h2 class="text-cart">Products In Cart</h2>
            <div class="cart-item-content"> ${await Basket.renderCartProduct()}</div>
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
  // after_render: async () => {},
};

export default Basket;
