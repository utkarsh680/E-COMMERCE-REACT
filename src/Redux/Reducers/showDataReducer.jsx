import {
  ADD_PRODUCTS,
  ADD_TASK_SUCCESS,
  REMOVE_PRODUCT,
} from "../Actions/Action";

const initialState = {
  loading: true,
  products: [],
  
};
export const showDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCTS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };

    case REMOVE_PRODUCT: {
      return {
        ...state,
        products: state.products.filter((item) => item.id !== action.payload),
      };
    }
    case ADD_TASK_SUCCESS:
    return{
      ...state,
      products: [...state.products, action.payload]
    }

    default:
      return state;
  }

  
};
