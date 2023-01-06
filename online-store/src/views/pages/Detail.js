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

let Detail = {
  render: async () => {
    let request = Utils.parseRequestURL();
    let post = await getSingleProduct(request.id);

    let view = /*html*/ `
      <section class="section details-section">
        <div class="description-container">
              <div class="flex-container">
              <h2 class="description-title">${post.title}</h2>
              <div class="block-images">
                <div class="container-image-descr">
                <img class="main-image-description" src="${post.images[0]}" alt="product-image">
                </div>
                <div class="secondary-images-box">
                </div>
              </div>
            <div class="block-description">
              <div class="block-container">
                <h3 class="description-item">Price:</h3>
                <div class="description-price info">${post.price}</viv>
              </div>
              <div class="block-container">
                <h3 class="description-item">Description:</h3>
                <div class="description-info info">${post.description}</div>
              </div>
              <div class="block-container">
                <h3 class="description-item">Discount:</h3>
                <div class="discount-info info">${post.discountPercentage}</div>
              </div>
              <div class="block-container">
                <h3 class="description-item">Rating:</h3>
                <div class="raiting-info info">${post.rating}</div>
              </div>
              <div class="block-container">
                <h3 class="description-item">Stock:</h3>
                <div class="stock-info info">${post.stock}</div>
              </div>
              <div class="block-container">
                <h3 class="description-item">Brand:</h3>
                <div class="brand-info info">${post.brand}</div>
              </div>
            </div>
            <div class="block-summary">

              <button class="descr-btn" id="add_to_cart">Add to cart</button>

              <a href="/#/modal" class="descr-btn">BUY NOW</a>
            </div>
          </div>
        </div>
      </section>`;
    return view;
  },
  renderImages: async () => {
    let request = Utils.parseRequestURL();
    let post = await getSingleProduct(request.id);
    let arr = post.images;
    arr.forEach((el) => {
      const img = document.createElement('img');
      img.classList.add('secondary-image-description');
      img.src = el;
      document.querySelector('.secondary-images-box').append(img);
    });
  },

  after_render: async () => {
    await Detail.renderImages();
    let request = Utils.parseRequestURL();
    let post = await getSingleProduct(request.id);
    const addToCartBtn = document.querySelector('#add_to_cart');
    addToCartBtn.addEventListener('click', () => {
      const id = post.id;
      const title = post.title;
      const image = post.images[0];
      const price = post.price;
      const description = post.description;
      const discount = post.discountPercentage;
      const rating = post.rating;
      const stock = post.stock;
      const brand = post.brand;
      let cart = JSON.parse(localStorage.getItem('cart') || '[]');
      let card = { id, title, price, image, description, discount, brand, rating, stock };
      localStorage.setItem('cart', JSON.stringify([...cart, card]));
    });

    const secondaryImages = document.querySelectorAll('.secondary-image-description');
    const mainImage = document.querySelector('.main-image-description');

    secondaryImages.forEach((el) =>
      el.addEventListener('click', (e) => {
        mainImage.src = e.target.src;
      })
    );
  },
};

export default Detail;
