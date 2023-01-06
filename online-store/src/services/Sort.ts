import { IProduct } from '../interface/Product';
const Sort = {
  unique: async (arr: IProduct[], property: string) => {
    return Array.from(new Set(await arr.map((item) => item[property as keyof IProduct])));
  },
  sortBySelector: async (products: IProduct[], propertyForSort: string, direction: string): Promise<IProduct[]> => {
    return await products.sort((productA: IProduct, productB: IProduct) => {
      if (productA[propertyForSort as keyof IProduct] > productB[propertyForSort as keyof IProduct]) {
        return direction === 'asc' ? 1 : -1;
      } else if (productA[propertyForSort as keyof IProduct] < productB[propertyForSort as keyof IProduct]) {
        return direction === 'desc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  },
  searchTo: async (products: IProduct[], searchString: string): Promise<IProduct[]> => {
    return products.filter((searchProduct: IProduct) => {
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
  },
  sortByBlock: async (
    products: IProduct[],
    selectedCategories: Array<string>,
    selectedBrands: Array<string>
  ): Promise<IProduct[]> => {
    return products.filter((product: IProduct) => {
      return (
        (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
        (selectedBrands.length === 0 || selectedBrands.includes(product.brand))
      );
    });
  },
  locationSort: async (result: IProduct[]): Promise<IProduct[]> => {
    const url = new URL(window.location.href);

    for (const key of url.searchParams.keys()) {
      if (key === 'sort') {
        const keySort = url.searchParams.get(key);
        if (keySort !== null) {
          const newKeySort = keySort.split(' ');
          const propertyForSort = newKeySort[0];
          const direction = newKeySort[1];
          result = await Sort.sortBySelector(result, propertyForSort, direction);
          localStorage.setItem(key, JSON.stringify(keySort));
        }
      }

      if (key.length === 0 || key === 'search') {
        const keySort = url.searchParams.get(key);
        if (keySort !== null) {
          result = await Sort.searchTo(result, keySort);
          localStorage.setItem(key, JSON.stringify(keySort));
        }
      }

      if (key.length === 0 || key === 'category' || key === 'brand') {
        let newKeySortCategory: Array<string> = [];
        let newKeySortBrand: Array<string> = [];
        if (key === 'category') {
          const keySortCategory = url.searchParams.get(key);
          if (keySortCategory !== null) {
            newKeySortCategory = keySortCategory.split(',');
            localStorage.setItem(key, JSON.stringify(newKeySortCategory));
          }
        }
        if (key === 'brand') {
          const keySortBrand = url.searchParams.get(key);
          if (keySortBrand !== null) {
            newKeySortBrand = keySortBrand.split(',');
            localStorage.setItem(key, JSON.stringify(newKeySortBrand));
          }
        }
        result = await Sort.sortByBlock(result, newKeySortCategory, newKeySortBrand);
      }
    }
    localStorage.setItem('getProduct', JSON.stringify(result));
    return result;
  },
};
export default Sort;
