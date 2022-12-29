import Utils from '../../services/Utils.js';

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
                <div class="secondary-images-box"></div>
                <div class="container-image-descr">
                <img class="main-image-description" src="${post.images[0]}" alt="product-image">
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
              <button class="descr-btn">Add to cart</button>
              <a href="./modal.html" class="descr-btn">BUY NOW</a>
            </div>
          </div>
        </div>
      </section>`;
            return view;
  },
  // after_render: async () => {},
};

export default Detail;
