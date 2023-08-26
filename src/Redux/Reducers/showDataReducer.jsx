import Product from "../../pages/Product";
import {
  ADD_PRODUCT,
  EDIT_PRODUCT,
  FETCH_PRODUCTS,
  REMOVE_PRODUCT,
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

// Fetching api Data
export const showDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      let newItems = [];
      if (localStorage.getItem("product")) {
        newItems = JSON.parse(localStorage.getItem("product"));
      }
      newItems = [...newItems, ...action.payload];

      return {
        ...state,
        loading: false,
        products: newItems,
        allProducts: action.payload,
      };
    
    // Remove Product  
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
   
    // Add Product
    case ADD_PRODUCT:
      const addDataToStorage = JSON.parse(localStorage.getItem("product"));
      if (addDataToStorage) {
        const newItem = [action.payload, ...addDataToStorage];
        // add to localStorage
        localStorage.setItem("product", JSON.stringify(newItem));
      } else {
        localStorage.setItem("product", JSON.stringify([action.payload]));
      }
      return {
        ...state,
        products: [action.payload],
      };
    
    // Edit Product
    case EDIT_PRODUCT:
      const productStorageForEdit = JSON.parse(localStorage.getItem("product"));
      if (productStorageForEdit.length > 0) {
        const newProductFromLocalStorage = productStorageForEdit.map(
          (product) => {
            if (product.id === action.payload.id) {
              return action.payload;
            }
            return product;
          }
        );

        localStorage.setItem(
          "product",
          JSON.stringify(newProductFromLocalStorage)
        );
      }

      //update the state
      const updateProducts = state.products.map((product) => {
        if (product.id === action.payload.id) {
          return action.payload;
        }
        return product;
      });

      const updateAllProducts = state.allProducts.map((product) => {
        if (product.id === action.payload.id) {
          return action.payload;
        }
        return product;
      });

      return {
        ...state,
        allProducts: updateAllProducts,
        products: updateProducts,
      };
    
    // Sort Produc high to low
    case SORT_PRODUCTS_HIGH_TO_LOW:
      const sortedProductHighToLow = [
        ...state.allProducts,
        ...JSON.parse(localStorage.getItem("product")),
      ].sort((a, b) => {
        return a.price - b.price;
      });

      return {
        ...state,
        products: sortedProductHighToLow,
      };

    // Sort Productt low to high
    case SORT_PRODUCTS_LOW_TO_HIGH:
      const sortedProductLowTohigh = [
        ...state.allProducts,
        ...JSON.parse(localStorage.getItem("product")),
      ].sort((a, b) => {
        return b.price - a.price;
      });

      return {
        ...state,
        products: sortedProductLowTohigh,
      };
    
    // Sort by all category
    case SORT_BY_CATEGORY_ALL:
      const allProductsLocalStorage = JSON.parse(
        localStorage.getItem("product")
      );
      const allItem = [...state.allProducts, ...allProductsLocalStorage];

      return {
        ...state,
        products: allItem,
      };
    
    // Sort Electronics Produc
    case SORT_BY_ELECTRONICS:
      const allProductsLocalStorage1 = JSON.parse(
        localStorage.getItem("product")
      );
      const items = [...state.allProducts, ...allProductsLocalStorage1];
      const electronics = items.filter(
        (product) => product.category === "Electronics"
      );

      return {
        ...state,
        products: electronics,
      };

    // Sort Home and Kitchen Products
    case SORT_BY_HOME_AND_KITCHEN:
      const kitchenstorage = JSON.parse(localStorage.getItem("product"));
      const kitchenItem = [...state.allProducts, ...kitchenstorage];

      const kitchen = kitchenItem.filter(
        (product) => product.category === "Home & Kitchen"
      );

      return {
        ...state,
        products: kitchen,
      };
    default:
      return state;
  }
};
