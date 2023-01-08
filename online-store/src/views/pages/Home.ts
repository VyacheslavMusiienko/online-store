import Sort from '../../services/Sort';
import Service from '../../services/Services';
import { IProduct } from '../../interface/Product';
import { PromiseStringType } from '../../types';

const getProductList = async () => {
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
  const storageProducts = localStorage.getItem('getProduct');
  if (storageProducts !== null) {
    const products = await JSON.parse(storageProducts);
    return products;
  }
};

const isGetProduct = async () => {
  const getProduct = isProductLocalStorage() ? getProductsFromStorage() : getProductList();
  return await getProduct;
};
const isToggleLocalStorage = () => {
  return localStorage.getItem('toggle') ? true : false;
};
const getToggleFromStorage = () => {
  const storageToggle = localStorage.getItem('toggle');
  if (storageToggle !== null) {
    const toggleStorage = JSON.parse(storageToggle);
    const toggle = toggleStorage === false ? false : true;
    return toggle;
  }
};
let toggle = isToggleLocalStorage() ? getToggleFromStorage() : false;

const Home = {
  // cards wrapper

  // cards menu
  renderCardsSort: async (): PromiseStringType => {
    const view = `
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
  renderCardsFound: async (product: IProduct[]): PromiseStringType => {
    const view = `
    <div class="cards-found">
      Found: ${product.length}
    </div>`;
    return view;
  },
  renderCardsSearch: async () => {
    const view = `
    <input type="search" class="cards-search" placeholder="Search" />`;
    return view;
  },
  renderCardsSwitch: async (): PromiseStringType => {
    if (toggle === true) {
      const view = `
        <div class="cards-switch">
          <label class="switch">
              <input type="checkbox" name="switch" checked>
              <span class="slider round"></span>
          </label>
        </div>`;
      return view;
    }
    const view = `
    <div class="cards-switch">
      <label class="switch">
          <input type="checkbox" name="switch">
          <span class="slider round"></span>
      </label>
    </div>`;
    return view;
  },
  renderCardsMenu: async (): PromiseStringType => {
    const view = `
      <div class="cards-menu">
        ${await Home.renderCardsSort()}
        ${await Home.renderCardsFound(await isGetProduct())}
        ${await Home.renderCardsSearch()}
        ${await Home.renderCardsSwitch()}
      </div>
    `;
    return view;
  },

  // render Cards
  renderCard: async (product: IProduct[]): PromiseStringType => {
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
                                            <button class="btn btn-add" data-id='${product.id}'>Add to cart</button>
                                            <a href="#/p/${product.id}" class="btn btn-details">Details</a>
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
                                            <button class="btn btn-add" data-id='${product.id}'>Add to cart</button>
                                            <a href="#/p/${product.id}" class="btn btn-details">Details</a>
                                        </div>
                                    </div>
                                </div>`
      )
      .join('');
  },
  renderCards: async (): PromiseStringType => {
    const product = await isGetProduct();
    const view = /*html*/ `
                <div class="cards-table">
                    ${await Home.renderCard(product)}
                </div>
        `;
    return view;
  },
  renderWrapperCards: async () => {
    const view = `
    <div class="wrapper cards">
      ${await Home.renderCardsMenu()}
      ${await Home.renderCards()}
    </div>
    `;
    return view;
  },
  // filter wrapper

  // button filter
  renderFilterButton: async (param: string, input: string) => {
    const view = `
      <button class="btn ${param}">${input}</button>
    `;
    return view;
  },
  renderFilterButtons: async () => {
    const view = `
      <div class="button-filter">
        ${await Home.renderFilterButton('reset', 'Reset')}
        ${await Home.renderFilterButton('copy', 'Copy')}
      </div>`;
    return view;
  },
  renderedFilterItemBody: async (arg: IProduct[], name: string) => {
    return await arg
      .map((products) => {
        return `<div class = "filter-item">
                    <input type="checkbox" id="${products}" name="${name}">
                    <label for="${products}">${products}</label>
                </div>`;
      })
      .join('');
  },
  getRenderedFilterCategoryBody: async (products: IProduct[]) => {
    const filterUnique = await Sort.unique(products, 'category');
    return await Home.renderedFilterItemBody(filterUnique, 'category');
  },
  getRenderedFilterBrandBody: async (products: IProduct[]) => {
    const filterUnique = await Sort.unique(products, 'brand');
    return await Home.renderedFilterItemBody(filterUnique, 'brand');
  },
  // filter category
  renderFilterCategory: async () => {
    const categories = await getProductList();
    const view = `
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
    const brands = await getProductList();
    const view = `
    <div class="filter-block brand-block">
      <div class="filter-title brand-title">Brand</div>
        <div class="filter-body brand-body">
          ${await Home.getRenderedFilterBrandBody(brands)}
        </div>
    </div>`;
    return view;
  },
  renderWrapperFilter: async () => {
    const view = `
    <div class="wrapper filter">
      ${await Home.renderFilterButtons()}
      ${await Home.renderFilterCategory()}
      ${await Home.renderFilterBrand()}
    </div>
    `;
    return view;
  },
  render: async () => {
    const view = /*html*/ `
            <main class="main d-flex">
              ${await Home.renderWrapperFilter()}
              ${await Home.renderWrapperCards()}
            </main>
        `;
    return view;
  },
  after_render: async () => {
    async function sort() {
      const result = await getProductList();

      const renderResult = await Sort.locationSort(result);

      const cardsTable = document.querySelector('.cards-table') as HTMLElement;
      const cardsFound = document.querySelector('.cards-found') as HTMLElement;

      cardsTable.innerHTML = `${await Home.renderCards()}`;
      cardsFound.innerHTML = `${await Home.renderCardsFound(renderResult)}`;
    }
    // window.addEventListener('hashchange', sort());
    // reset
    const reset = document.querySelector('.reset') as HTMLButtonElement;
    reset.addEventListener('click', () => {
      localStorage.clear();
    });
    // copy button
    const copy = document.querySelector('.copy') as HTMLButtonElement;
    copy.addEventListener('click', () => {
      Service.clipboard();
    });

    // sort for queryParams

    const select = document.querySelector('.select-sort') as HTMLSelectElement;
    select.addEventListener('input', (event) => {
      const valueEvent = (<HTMLInputElement>event.target).value;
      Service.isLocalStorage('sort', valueEvent);
      sort();
    });

    const selects = document.querySelectorAll<HTMLElement>('.select-item');
    const selectedLocalStorage = (checkbox: HTMLElement) => {
      const valueCheckbox = (<HTMLSelectElement>checkbox).value;
      const storageSort = localStorage.getItem('sort');
      if (storageSort !== null) {
        const selectLocalStorage = JSON.parse(storageSort);
        if (valueCheckbox === selectLocalStorage) {
          (<HTMLOptionElement>checkbox).selected = true;
        }
      }
    };
    selects.forEach((checkbox) => selectedLocalStorage(checkbox));

    const search = document.querySelector('.cards-search') as HTMLInputElement;
    search.addEventListener('input', (e) => {
      const searchString = (<HTMLInputElement>e.target).value.toLowerCase();
      Service.isLocalStorage('search', searchString);
      sort();
    });
    const storageSearch = localStorage.getItem('search');
    if (storageSearch !== null) {
      const searchLocalStorage = JSON.parse(storageSearch);
      if (searchLocalStorage) {
        search.value = searchLocalStorage;
      }
    }

    // sort by category and brand
    let selectedCategories: Array<string> = [];
    let selectedBrands: Array<string> = [];
    const storageCategory = localStorage.getItem('category');
    if (storageCategory !== null) {
      const categoryLocalStorage = JSON.parse(storageCategory);
      if (categoryLocalStorage) {
        selectedCategories = categoryLocalStorage;
      }
    }
    const storageBrand = localStorage.getItem('brand');
    if (storageBrand) {
      const brandLocalStorage = JSON.parse(storageBrand);
      if (brandLocalStorage) {
        selectedBrands = brandLocalStorage;
      }
    }

    let filteredProductsList: Array<string> = [];

    const checkboxesCategory = document.querySelectorAll<HTMLElement>('input[type=checkbox][name=category]');
    const checkboxesBrand = document.querySelectorAll<HTMLElement>('input[type=checkbox][name=brand]');
    const checked = (checkbox: HTMLElement) => {
      checkbox.addEventListener('change', function () {
        const inputName = checkbox.getAttribute('name');
        const inputID = checkbox.getAttribute('id');
        filteredProductsList = inputName === 'category' ? selectedCategories : selectedBrands;
        if (inputID !== null) {
          if (filteredProductsList.includes(inputID)) {
            const element = filteredProductsList.indexOf(inputID);
            filteredProductsList.splice(element, 1);
          } else {
            filteredProductsList.push(inputID);
          }
          Service.isLocalStorage('category', `${selectedCategories}`);
          Service.isLocalStorage('brand', `${selectedBrands}`);
          sort();
        }
      });
    };
    checkboxesCategory.forEach((checkbox) => checked(checkbox));
    checkboxesBrand.forEach((checkbox) => checked(checkbox));

    const checkedCategory = (checkbox: HTMLElement) => {
      const storageCategory = localStorage.getItem('category');
      if (storageCategory !== null) {
        const categoryLocalStorage = JSON.parse(storageCategory);
        const checkedId = checkbox.id;
        if (categoryLocalStorage) {
          const element = categoryLocalStorage.includes(checkedId);
          if (element) {
            (<HTMLInputElement>checkbox).checked = true;
          }
        }
      }
    };
    const checkedBrand = (checkbox: HTMLElement) => {
      const storageBrand = localStorage.getItem('brand');
      if (storageBrand !== null) {
        const brandLocalStorage = JSON.parse(storageBrand);
        const checkedId = checkbox.id;
        if (brandLocalStorage) {
          const element = brandLocalStorage.includes(checkedId);
          if (element) {
            (<HTMLInputElement>checkbox).checked = true;
          }
        }
      }
    };
    checkboxesCategory.forEach((checkbox) => checkedCategory(checkbox));
    checkboxesBrand.forEach((checkbox) => checkedBrand(checkbox));

    (document.querySelector('.cards-switch') as HTMLElement).addEventListener('change', async () => {
      toggle = toggle === false ? true : false;
      Service.isLocalStorage('toggle', `${toggle}`);
      sort();
    });

    const totalMoney = document.querySelector('.cart-total-inner') as HTMLElement;
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const basketProductsCounter = document.querySelector('.header-basket-number') as HTMLElement;
    basketProductsCounter.innerHTML = cart.length;
    const total = JSON.parse(localStorage.getItem('total') || '0');
    let selected = JSON.parse(localStorage.getItem('selectedItems') || '[]');
    selected = [...new Set(selected)];
    // console.log([...new Set(selected)])
    const cardsContainer = document.querySelectorAll('.card-container');
    cardsContainer.forEach((el, i) => {
      (<HTMLElement>el).style.backgroundColor = selected[i] ? 'mediumseagreen' : '';
    });
    totalMoney.innerHTML = `${total}`;

    const buttonAdd = document.querySelector('.cards-table') as HTMLElement;
    buttonAdd.addEventListener('click', async (e) => {
      const classNameTarget = (<HTMLElement>e.target).className;
      const dataAttrTarget = (<HTMLElement>e.target).getAttribute('data-id');
      const products = await isGetProduct();

      if (dataAttrTarget !== null) {
        if (classNameTarget === 'btn btn-add') {
          (<HTMLElement>e.target).innerHTML =
            (<HTMLElement>e.target).innerHTML === 'Add to cart' ? 'Drop from cart' : 'Add to cart';
          const cart = JSON.parse(localStorage.getItem('cart') || '[]');
          const card = products.find((item: HTMLElement) => {
            // console.log(item.id);
            // console.log(dataAttrTarget);
            return +item.id === +dataAttrTarget;
          });
          const total = document.querySelector('.cart-total-inner') as HTMLElement;
          if ((<HTMLElement>e.target).innerHTML === 'Drop from cart') {
            total.innerHTML = `${+total.innerHTML + card.price}`;
            const result = total.innerHTML;
            selected.push(card.id);
            localStorage.setItem('selectedItems', JSON.stringify([...new Set(selected)]));
            localStorage.setItem('total', JSON.stringify(result));
            localStorage.setItem('cart', JSON.stringify([...cart, card]));
            basketProductsCounter.innerHTML = `${+basketProductsCounter.innerHTML + 1}`;
          }
          if ((<HTMLElement>e.target).innerHTML === 'Add to cart') {
            total.innerHTML = `${+total.innerHTML - +card.price}`;
            const result = total.innerHTML;
            localStorage.setItem('total', JSON.stringify(result));
            const z = cart.filter((el: HTMLElement) => el.id !== card.id);
            localStorage.setItem('cart', JSON.stringify(z));
            selected = selected.filter((el: string) => +el === card.id - 1);
            localStorage.setItem('selectedItems', JSON.stringify([...new Set(selected)]));
            basketProductsCounter.innerHTML = `${+basketProductsCounter.innerHTML - 1}`;
          }
        }
      }
    });
  },
};

export default Home;
