import {
  ADD_PRODUCT,
  FETCH_PRODUCTS,
  REMOVE_PRODUCT,
  SHOW_DETAILS,
} from "../Actions/Action";

const initialState = {
  loading: true,
  products: [],
};
export const showDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        loading: false,
        products: action.payload,
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
      const updatedProducts = state.products.map(item =>
        item.id === action.payload ? { ...item, showDetails: true } : item
      );
      return{
        ...state,
        products:updatedProducts
      } 

    default:
      return state;
  }
};
