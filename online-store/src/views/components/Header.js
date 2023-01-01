let Header = {
  render: async () => {
    let view = /*html*/ `
              <header class="header">
                <div class="container">
                  <div class="logo_and_store">
                    <img class="logo_img" src="./icon.svg" width="80" alt="logo footer">
                    <a href="/#/"class="main-title">Online Store</a>
                  </div>
                  <div class="cart-total-container">
                    <h2 class="cart-total">Cart total: €<span class="cart-total-inner">0</span></h2>
                  </div>
                  <div class="basket-container">
                    <p><a href="/#/basket"><img class="header-basket" src="./cart.svg" width="80" height="80" alt="logo footer"></a></p>
                  </div>
                </div>
              </header>
        `;
    return view;
  },
  after_render: async () => {
    const total = document.querySelector('.cart-total-inner');
    let totalStorage = JSON.parse(localStorage.getItem('total') || '0');
    total.innerHTML = totalStorage;
  },
  
};

export default Header;
