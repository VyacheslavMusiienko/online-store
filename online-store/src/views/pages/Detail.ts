import Utils from '../../services/Utils';

const getSingleProduct = async (id: string | null) => {
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

const Detail = {
  render: async () => {
    const request = Utils.parseRequestURL();
    const post = await getSingleProduct(request.id);

    const view = `
      <section class="section details-section">
        <div class="description-container">
              <div class="flex-container">
              <h2 class="description-title">${post.title}</h2>
              <div class="block-images">
                <div class="container-image-description">
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
                <div class="rating-info info">${post.rating}</div>
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

              <button class="description-btn" id="add_to_cart">Add to cart</button>

              <a href="/#/modal" class="description-btn">BUY NOW</a>
            </div>
          </div>
        </div>
      </section>`;
    return view;
  },
  renderImages: async () => {
    const request = Utils.parseRequestURL();
    const post = await getSingleProduct(request.id);
    const arr = post.images;
    arr.forEach((el: string) => {
      const img = document.createElement('img');
      img.classList.add('secondary-image-description');
      img.src = el;
      (document.querySelector('.secondary-images-box') as HTMLElement).append(img);
    });
  },

  after_render: async () => {
    await Detail.renderImages();
    const request = Utils.parseRequestURL();
    const post = await getSingleProduct(request.id);
    const addToCartBtn = document.querySelector('#add_to_cart') as HTMLButtonElement;
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
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const card = { id, title, price, image, description, discount, brand, rating, stock };
      localStorage.setItem('cart', JSON.stringify([...cart, card]));
    });

    const secondaryImages = document.querySelectorAll('.secondary-image-description');
    const mainImage = document.querySelector('.main-image-description') as HTMLImageElement;

    secondaryImages.forEach((el) =>
      el.addEventListener('click', (e) => {
        if (e.target !== null) {
          mainImage.src = (e.target as HTMLImageElement).src;
        }
      })
    );
  },
};

export default Detail;
