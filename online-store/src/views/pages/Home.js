let getProductList = async () => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await fetch(`https://dummyjson.com/products?limit=100`, options);
    const json = await response.json();
    // console.log(json)
    return json;
  } catch (err) {
    console.log('Error getting documents', err);
  }
};

let Home = {
  renderCardsSort: async () => {
    let view = `
    <div class="cards-sort">
      <select class="select-sort">
          <option class="select-item" value="">Sort option:</option>
          <option class="select-item" value="price asc">Sort by price asc</option>
          <option class="select-item" value="price desc">Sort by price desc</option>
          <option class="select-item" value="rating asc">Sort by rating asc</option>
          <option class="select-item" value="rating desc">Sort by rating desc</option>
          <option class="select-item" value="stock asc">Sort by stock asc</option>
          <option class="select-item" value="stock desc">Sort by stock desc</option>
      </select>
    </div>`;
    return view;
  },
  renderCardsFound: async () => {
    let view = `
    <div class="cards-found">
      Found: 0
    </div>`;
    return view;
  },
  renderCardsSearch: async () => {
    let view = `
    <input type="search" class="cards-search" placeholder="Search" />`;
    return view;
  },
  renderCardsSwitch: async () => {
    let view = `
    <div class="cards-switch">
      <label class="switch">
          <input type="checkbox" name="switch">
          <span class="slider round"></span>
      </label>
    </div>`;
    return view;
  },
  renderCardsMenu: async () => {
    let view = `
      <div class="cards-menu">
        ${await Home.renderCardsSort()}
        ${await Home.renderCardsFound()}
        ${await Home.renderCardsSearch()}
        ${await Home.renderCardsSwitch()}
      </div>
    `;
    return view;
  },
  renderCard: async () => {
    let product = await getProductList();
    return product.products
      .map(
        (product) => /*html*/ `<div class="card-container">
                                    <div class="img-container">
                                        <img class="card-image" src="${product.images[0]}" alt="card-image">
                                        <div class="card-price">Price: &#8364;${product.price}</div>
                                        <div class="card-name">${product.title}</div>
                                        <div class="card-description">${product.description}</div>
                                        <div class="card-disc-percentage">Discount: ${product.discountPercentage}</div>
                                        <div class="card-brand">${product.brand}</div>
                                        <div class="card-rating">Rating: ${product.rating}</div>
                                        <div class="card-stock">Stock: ${product.stock}</div>
                                        <div class="btn-container">
                                            <button class="btn btn-add">Add to cart</button>
                                            <a href="#/p/${product.id}" class="btn btn-details">Details</a>
                                        </div>
                                    </div>
                                </div>`
      )
      .join('');
  },
  renderCards: async () => {
    let view = /*html*/ `
                <div class="cards-table">
                    ${await Home.renderCard()}
                </div>
        `;
    return view;
  },
  renderWrapperCards: async () => {
    let view = `
    <div class="wrapper cards">
      ${await Home.renderCardsMenu()}
      ${await Home.renderCards()}
    </div>
    `;
    return view;
  },
  renderFilterButton: async (param, input) => {
    let view = `
      <button class="btn ${param}">${input}</button>
    `;
    return view;
  },
  renderFilterButtons: async () => {
    let view = `
      <div class="button-filter">
        ${await Home.renderFilterButton('reset', 'Reset')}
        ${await Home.renderFilterButton('copy', 'Copy')}
      </div>`;
    return view;
  },
  renderWrapperFilter: async () => {
    let view = `
    <div class="wrapper filter">
      ${await Home.renderFilterButtons()}
    </div>
    `;
    return view;
  },
  render: async () => {
    let view = /*html*/ `
            <main class="main d-flex">
              ${await Home.renderWrapperFilter()}
              ${await Home.renderWrapperCards()}
            </main>
        `;
    return view;
  },
  // after_render: async () => {},
};

export default Home;
