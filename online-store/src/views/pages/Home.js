import Sort from '../../services/Sort';
import Service from '../../services/Services';

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
const isProductLocalStorage = () => {
  return localStorage.getItem('getProduct') ? true : false;
};
const getProductsFromStorage = async () => {
  let products = await JSON.parse(localStorage.getItem('getProduct'));
  return products;
};

let isGetProduct = async () => {
  let getProduct = isProductLocalStorage() ? getProductsFromStorage() : getProductList();
  return await getProduct;
};
const isToggleLocalStorage = () => {
  return localStorage.getItem('toggle') ? true : false;
};
const getToggleFromStorage = () => {
  let toggleStorage = JSON.parse(localStorage.getItem('toggle'));
  let toggle = toggleStorage === false ? false : true;
  return toggle;
};
let toggle = isToggleLocalStorage() ? getToggleFromStorage() : false;

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
  renderCardsFound: async (product) => {
    let view = `
    <div class="cards-found">
      Found: ${product.length}
    </div>`;
    return view;
  },
  renderCardsSearch: async () => {
    let view = `
    <input type="search" class="cards-search" placeholder="Search" />`;
    return view;
  },
  renderCardsSwitch: async () => {
    if (toggle === true) {
      let view = `
        <div class="cards-switch">
          <label class="switch">
              <input type="checkbox" name="switch" checked>
              <span class="slider round"></span>
          </label>
        </div>`;
      return view;
    }
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
        ${await Home.renderCardsFound(isGetProduct())}
        ${await Home.renderCardsSearch()}
        ${await Home.renderCardsSwitch()}
      </div>
    `;
    return view;
  },

  // render Cards
  renderCard: async (product) => {
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
    let product = await isGetProduct();
    let view = /*html*/ `
                <div class="cards-table">
                    ${await Home.renderCard(product)}
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
    const filterUnique = await Sort.unique(products, 'category');
    return await Home.renderedFilterItemBody(filterUnique, 'category');
  },
  getRenderedFilterBrandBody: async (products) => {
    const filterUnique = await Sort.unique(products, 'brand');
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
    async function sort() {
      let result = await getProductList();

      const renderResult = await Sort.locationSort(result);

      const cardsTable = document.querySelector('.cards-table');
      const cardsFound = document.querySelector('.cards-found');

      cardsTable.innerHTML = await Home.renderCards(renderResult);
      cardsFound.innerHTML = await Home.renderCardsFound(renderResult);
    }
    window.addEventListener('hashchange', sort());
    // reset
    let reset = document.querySelector('.reset');
    reset.addEventListener('click', () => {
      localStorage.clear();
    });
    // copy button
    let copy = document.querySelector('.copy');
    copy.addEventListener('click', () => {
      Service.clipboard();
    });

    // sort for queryParams

    const select = document.querySelector('.select-sort');
    select.addEventListener('input', async (event) => {
      let valueEvent = event.target.value;
      Service.isLocalStorage('sort', valueEvent);
      sort();
    });

    let selects = document.querySelectorAll('.select-item');
    let selected = (checkbox) => {
      const valueCheckbox = checkbox.value;
      const selectLocalStorage = JSON.parse(localStorage.getItem('sort'));
      if (valueCheckbox === selectLocalStorage) {
        checkbox.selected = true;
      }
    };
    selects.forEach((checkbox) => selected(checkbox));

    const search = document.querySelector('.cards-search');
    search.addEventListener('input', async (e) => {
      let searchString = e.target.value.toLowerCase();
      Service.isLocalStorage('search', searchString);
      sort();
    });
    const searchLocalStorage = JSON.parse(localStorage.getItem('search'));
    if (searchLocalStorage) {
      search.value = searchLocalStorage;
    }

    // sort by category and brand
    let selectedCategories = [];
    let selectedBrands = [];
    const categoryLocalStorage = JSON.parse(localStorage.getItem('category'));
    if (categoryLocalStorage) {
      selectedCategories = categoryLocalStorage;
    }
    const brandLocalStorage = JSON.parse(localStorage.getItem('brand'));
    if (brandLocalStorage) {
      selectedBrands = brandLocalStorage;
    }
    let filteredProductsList = [];

    let checkboxesCategory = document.querySelectorAll('input[type=checkbox][name=category]');
    let checkboxesBrand = document.querySelectorAll('input[type=checkbox][name=brand]');
    const checked = (checkbox) => {
      checkbox.addEventListener('change', async function () {
        const inputName = checkbox.getAttribute('name');
        const inputID = checkbox.getAttribute('id');
        console.log(checkbox.checked);
        filteredProductsList = inputName === 'category' ? selectedCategories : selectedBrands;
        if (filteredProductsList.includes(inputID)) {
          const element = filteredProductsList.indexOf(inputID);
          filteredProductsList.splice(element, 1);
        } else {
          filteredProductsList.push(inputID);
        }
        Service.isLocalStorage('category', selectedCategories);
        Service.isLocalStorage('brand', selectedBrands);
        sort();
      });
    };
    checkboxesCategory.forEach((checkbox) => checked(checkbox));
    checkboxesBrand.forEach((checkbox) => checked(checkbox));

    let checkedCategory = (checkbox) => {
      const categoryLocalStorage = JSON.parse(localStorage.getItem('category'));
      let checkedId = checkbox.id;
      if (categoryLocalStorage) {
        let element = categoryLocalStorage.includes(checkedId);
        if (element) {
          checkbox.checked = true;
        }
      }
    };
    let checkedBrand = (checkbox) => {
      const brandLocalStorage = JSON.parse(localStorage.getItem('brand'));
      let checkedId = checkbox.id;
      if (brandLocalStorage) {
        let element = brandLocalStorage.includes(checkedId);
        if (element) {
          checkbox.checked = true;
        }
      }
    };
    checkboxesCategory.forEach((checkbox) => checkedCategory(checkbox));
    checkboxesBrand.forEach((checkbox) => checkedBrand(checkbox));

    document.querySelector('.cards-switch').addEventListener('change', async () => {
      toggle = toggle === false ? true : false;
      Service.isLocalStorage('toggle', toggle);
      sort();
    });

    const totalMoney = document.querySelector('.cart-total-inner');
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const basketProductsCounter = document.querySelector('.header-basket-number');
    basketProductsCounter.innerHTML = cart.length;
    let total = JSON.parse(localStorage.getItem('total') || '0');
    let selected = JSON.parse(localStorage.getItem('selectedItems') || '[]');
    selected = [...new Set(selected)];
    // console.log([...new Set(selected)])
    let cardsContainer = document.querySelectorAll('.card-container');
    cardsContainer.forEach((el, i) => {
      el.style.backgroundColor = selected[i] ? "mediumseagreen" : "";
    })
    totalMoney.innerHTML = total;

    const btns = document.querySelectorAll('.btn-add');
    btns.forEach((el, i) =>
      el.addEventListener('click', async (e) => {
        e.target.innerHTML = e.target.innerHTML === "Add to cart" ? "Drop from cart" : "Add to cart";
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
        let expression = cart.some((el) => el.id === card.id)
        if (expression && e.target.innerHTML === "Drop from cart"){
          total.innerHTML = +total.innerHTML + +products[i].price;
          let result = total.innerHTML;
          localStorage.setItem('total', JSON.stringify(result));
          cardsContainer[id - 1].style.backgroundColor = "";
          return;
        }
        if(e.target.innerHTML === "Add to cart") {
          total.innerHTML = +total.innerHTML - +products[i].price;
          let result = total.innerHTML;
          localStorage.setItem('total', JSON.stringify(result));
          let z = cart.filter(el => el.id !== card.id)
          localStorage.setItem('cart', JSON.stringify(z));
          cardsContainer[id - 1].style.backgroundColor = "";
          selected = selected.filter(el => el === card.id - 1);
          localStorage.setItem('selectedItems', JSON.stringify([...new Set(selected)]));
          basketProductsCounter.innerHTML = +basketProductsCounter.innerHTML - 1;
        }
        if(e.target.innerHTML === "Drop from cart") {
          total.innerHTML = +total.innerHTML + +products[i].price;
          let result = total.innerHTML;
          selected.push(card.id)
          localStorage.setItem('selectedItems', JSON.stringify([...new Set(selected)]))
          localStorage.setItem('total', JSON.stringify(result));
          localStorage.setItem('cart', JSON.stringify([...cart, card]));
          cardsContainer[id - 1].style.backgroundColor = "mediumseagreen";
          basketProductsCounter.innerHTML = +basketProductsCounter.innerHTML + 1;
        }
      })
    );
  },
};

export default Home;
