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
      let items = [];
      if(localStorage.getItem('product')){
        items = [...JSON.parse(localStorage.getItem('product'))]
      }
      return {
        ...state,
        products: state.products.filter((item) => item.id !== action.payload),
      };
    }
    case ADD_TASK_SUCCESS:
      const addDataToStorage = JSON.parse(
        localStorage.getItem('product')
      )
      if(addDataToStorage) {
        const newItem = [...addDataToStorage, action.payload]
        // add to localStorage
       localStorage.setItem("product", JSON.stringify(newItem));
      }
       else{
        localStorage.setItem("product", JSON.stringify([ action.payload]))
       }
    return{
      ...state,
      products: [...state.products]
      
    }
   

    default:
      return state;
  }

  
};
