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
    return json.products;
  } catch (err) {
    console.log('Error getting documents', err);
  }
};
let getProduct = getProductList();
let toggle = await false;
let Home = {
  // cards wrapper

  // cards menu
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

  // render Cards
  renderCard: async (getProduct) => {
    let product = await getProduct;

    if (product.length === 0) {
      return `<div class="not-found">
                No products found
              </div>`;
    }

    if (toggle === true) {
      return product
        .map(
          (product) => /*html*/ `<div class="card-container height">
                                    <div class="img-container">
                                        <img class="card-image" src="${product.images[0]}" alt="card-image">
                                        <div class="card-price">Price: &#8364;${product.price}</div>
                                        <div class="card-disc-percentage">Discount: ${product.discountPercentage}</div>
                                        <div class="card-brand">${product.brand}</div>
                                        <div class="card-rating">Rating: ${product.rating}</div>
                                        <div class="card-stock">Stock: ${product.stock}</div>
                                        <div class="btn-container">
                                        <button class="btn btn-add">Add to cart</button>
                                        <button class="btn"><a href="#/p/${product.id}" class="btn btn-details">Details</a></button>
                                        </div>
                                    </div>
                                </div>`
        )
        .join('');
    }
    return product
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
                                            <button class="btn"><a href="#/p/${product.id}" class="btn btn-details">Details</a></button>
                                        </div>
                                    </div>
                                </div>`
      )
      .join('');
  },
  renderCards: async () => {
    let view = /*html*/ `
                <div class="cards-table">
                    ${await Home.renderCard(getProduct)}
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
  // filter wrapper

  // button filter
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
  // filter cards
  renderUnique: async (arr, property) => {
    return Array.from(new Set(await arr.map((item) => item[property])));
  },
  renderedFilterItemBody: async (arg, name) => {
    return await arg
      .map((products) => {
        return `<div class = "filter-item">
                    <input type="checkbox" id="${products}" name="${name}">
                    <label for="${products}">${products}</label>
                </div>`;
      })
      .join('');
  },
  getRenderedFilterCategoryBody: async (products) => {
    const filterUnique = await Home.renderUnique(products, 'category');
    return await Home.renderedFilterItemBody(filterUnique, 'category');
  },
  getRenderedFilterBrandBody: async (products) => {
    const filterUnique = await Home.renderUnique(products, 'brand');
    return await Home.renderedFilterItemBody(filterUnique, 'brand');
  },
  // filter category
  renderFilterCategory: async () => {
    let categories = await getProductList();
    let view = `
    <div class="filter-block category-block">
      <div class="filter-title category-title">Category</div>
        <div class="filter-body category-body">
          ${await Home.getRenderedFilterCategoryBody(categories)}
        </div>
    </div>`;
    return view;
  },

  // filter brand
  renderFilterBrand: async () => {
    let brands = await getProductList();
    let view = `
    <div class="filter-block brand-block">
      <div class="filter-title brand-title">Brand</div>
        <div class="filter-body brand-body">
          ${await Home.getRenderedFilterBrandBody(brands)}
        </div>
    </div>`;
    return view;
  },
  renderWrapperFilter: async () => {
    let view = `
    <div class="wrapper filter">
      ${await Home.renderFilterButtons()}
      ${await Home.renderFilterCategory()}
      ${await Home.renderFilterBrand()}
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
  after_render: async () => {
    // copy button
    let copy = document.querySelector('.copy');
    copy.addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location).then(
          function () {
            alert('Text copied to the clipboard');
          },
          function (e) {
            alert('Error when copying: ' + e);
          }
        );
      } else alert('Your browser does not support Clipboard');
    });

    // foundLength
    const foundLength = document.querySelector('.cards-found');

    async function render(getProduct) {
      let result = await getProduct;
      return `Found ${await result.length}`;
    }

    foundLength.innerHTML = await render(getProduct);

    const addQueryParam = (key, value) => {
      const url = new URL(window.location.href);
      if (value.length) {
        url.searchParams.set(key, value);
      } else {
        url.searchParams.delete(key);
      }
      window.history.pushState({}, '', url.toString());
    };

    // sort by
    async function sortBy(products, propertyForSort, direction) {
      return await products.sort((productA, productB) => {
        if (productA[propertyForSort] > productB[propertyForSort]) {
          return direction === 'asc' ? 1 : -1;
        } else if (productA[propertyForSort] < productB[propertyForSort]) {
          return direction === 'desc' ? 1 : -1;
        } else {
          return 0;
        }
      });
    }
    // search
    function searchTo(products, searchString) {
      return products.filter((searchProduct) => {
        return (
          searchProduct.title.toLowerCase().includes(searchString) ||
          searchProduct.description.toLowerCase().includes(searchString) ||
          searchProduct.category.toLowerCase().includes(searchString) ||
          searchProduct.rating.toString().includes(searchString) ||
          searchProduct.price.toString().includes(searchString) ||
          searchProduct.discountPercentage.toString().includes(searchString) ||
          searchProduct.stock.toString().includes(searchString) ||
          searchProduct.brand.toLowerCase().includes(searchString)
        );
      });
    }
    // sortTo
    function sortTo(products, selectedCategories, selectedBrands) {
      return products.filter((product) => {
        return (
          (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
          (selectedBrands.length === 0 || selectedBrands.includes(product.brand))
        );
      });
    }

    async function sort() {
      let result = await getProduct;

      const url = new URL(window.location.href);

      for (const key of url.searchParams.keys()) {
        if (key === 'sort') {
          let keySort = url.searchParams.get(key).split(' ');
          result = await sortBy(result, keySort[0], keySort[1]);
        }

        if (key.length === 0 || key === 'search') {
          let keySort = url.searchParams.get(key);
          result = await searchTo(result, keySort);
        }

        if (key.length === 0 || key === 'category' || key === 'brand') {
          let keySortCategory = [];
          let keySortBrand = [];
          if (key === 'category') {
            keySortCategory = url.searchParams.get(key).split(',');
          }
          if (key === 'brand') {
            keySortBrand = url.searchParams.get(key).split(',');
          }
          result = await sortTo(result, keySortCategory, keySortBrand);
        }
      }

      toggle = toggle === false ? true : false;

      const cardRender = document.querySelector('.cards-table');
      cardRender.innerHTML = await Home.renderCard(result);

      foundLength.innerHTML = await render(result);
    }

    document.querySelector('.select-sort').addEventListener('input', async (event) => {
      let valueEvent = event.target.value;
      addQueryParam('sort', valueEvent);
      sort();
    });

    document.querySelector('.cards-search').addEventListener('input', async (e) => {
      let searchString = e.target.value.toLowerCase();
      addQueryParam('search', searchString);
      sort();
    });

    // sort by category and brand

    let checkboxesCategory = document.querySelectorAll('input[type=checkbox][name=category]');
    let checkboxesBrand = document.querySelectorAll('input[type=checkbox][name=brand]');
    const selectedCategories = [];
    const selectedBrands = [];
    let filteredProductsList = [];

    const checked = (checkbox) => {
      checkbox.addEventListener('change', async function () {
        const inputID = checkbox.getAttribute('id');
        const inputName = checkbox.getAttribute('name');

        filteredProductsList = inputName === 'category' ? selectedCategories : selectedBrands;

        if (filteredProductsList.includes(inputID)) {
          const element = filteredProductsList.indexOf(inputID);
          filteredProductsList.splice(element, 1);
        } else {
          filteredProductsList.push(inputID);
        }
        addQueryParam('category', selectedCategories);
        addQueryParam('brand', selectedBrands);
        sort();
      });
    };
    checkboxesCategory.forEach((checkbox) => checked(checkbox));
    checkboxesBrand.forEach((checkbox) => checked(checkbox));
  
    document.querySelector('.cards-switch').addEventListener('change', async () => {
      sort();
    });

  const totalMoney = document.querySelector('.cart-total-inner');
  let total = JSON.parse(localStorage.getItem('total') || '0');
  totalMoney.innerHTML = total;



  const btns = document.querySelectorAll('.btn-add');
  btns.forEach((el, i) => el.addEventListener('click', async (e) => {
    e.target.innerHTML = e.target.innerHTML === 'Add to cart' ? 'Drop from cart' : 'Add to cart';
    let products = await getProduct;
    let id = products[i].id;
    let title = products[i].title;
    let description = products[i].description;
    let price = products[i].price;
    let image = products[i].images[0];
    let discount = products[i].discountPercentage;
    let rating = products[i].rating;
    let brand = products[i].brand;
    let stock = products[i].stock;
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let card = { id, title, price, image, description, discount, brand, rating, stock };
    let total = document.querySelector('.cart-total-inner');
    total.innerHTML = +total.innerHTML + +products[i].price;
    let result = total.innerHTML;
    localStorage.setItem('total', JSON.stringify(result));
    localStorage.setItem('cart', JSON.stringify([...cart, card]));
  })

)}

};

export default Home;
