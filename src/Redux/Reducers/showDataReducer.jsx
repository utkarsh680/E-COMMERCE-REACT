import {
  ADD_PRODUCT,
  FETCH_PRODUCTS,
  REMOVE_PRODUCT,
  SHOW_DETAILS,
  SORT_BY_CATEGORY_ALL,
  SORT_BY_ELECTRONICS,
  SORT_BY_HOME_AND_KITCHEN,
  SORT_PRODUCTS_HIGH_TO_LOW,
  SORT_PRODUCTS_LOW_TO_HIGH,
} from "../Actions/Action";

const initialState = {
  loading: true,
  allProducts: [],
  products: [],
};
export const showDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:

      return {
        ...state,
        loading: false,
        products: action.payload,
        allProducts: action.payload,
      };

    case REMOVE_PRODUCT: {
      const localStorageProducts = JSON.parse(localStorage.getItem("product"));
      if (localStorageProducts) {
        const updatedLocalStorageProduct = localStorageProducts.filter(
          (product) => product.id !== action.payload
        );
        localStorage.setItem(
          "product",
          JSON.stringify(updatedLocalStorageProduct)
        );
      }
      const updatedProducts = state.products.filter(
        (product) => product.id !== action.payload
      );
      return {
        ...state,
        products: updatedProducts,
      };
    }
    case ADD_PRODUCT:
      const addDataToStorage = JSON.parse(localStorage.getItem("product"));
      if (addDataToStorage) {
        const newItem = [...addDataToStorage, action.payload];
        // add to localStorage
        localStorage.setItem("product", JSON.stringify(newItem));
      } else {
        localStorage.setItem("product", JSON.stringify([action.payload]));
      }
      return {
        ...state,
        products: [...state.products],
      };

    case SHOW_DETAILS:
      const updatedProducts = state.products.map((item) =>
        item.id === action.payload ? { ...item, showDetails: true } : item
      );
      return {
        ...state,
        products: updatedProducts,
      };

    case SORT_PRODUCTS_HIGH_TO_LOW:
      const sortedProductHighToLow = [...state.products].sort((a, b) => {
        return b.price - a.price; // sort by price high to low
      });
      return {
        ...state,
        products: sortedProductHighToLow,
      };

    case SORT_PRODUCTS_LOW_TO_HIGH:
      const sortedProductLowTohigh = [...state.products].sort((a, b) => {
        return a.price - b.price;
      });
      return {
        ...state,
        products: sortedProductLowTohigh,
      };

    case SORT_BY_CATEGORY_ALL:
      const allProductsLocalStorage = JSON.parse(
        localStorage.getItem("product")
      );
      const allItem = [...state.allProducts, ...allProductsLocalStorage];
      return {
        ...state,
        products: allItem,
      };

    case SORT_BY_ELECTRONICS:
      const allProductsLocalStorage1 = JSON.parse(
        localStorage.getItem("product")
      );
      const items = [...state.allProducts, ...allProductsLocalStorage1];

      const electronics = items.filter(
        (product) => product.category === "Electronics"
      );
      console.l;
      return {
        ...state,
        products: electronics,
      };
    case SORT_BY_HOME_AND_KITCHEN:
      const kitchenstorage = JSON.parse(localStorage.getItem("product"));
      const kitchenItem = [...state.allProducts, ...kitchenstorage];

      const kitchen = kitchenItem.filter(
        (product) => product.category === "Home & Kitchen"
      );
      console.log(kitchen);
      return {
        ...state,
        products: kitchen,
      };
    default:
      return state;
  }
};
