import { ADD_TO_CART, REMOVE_FROM_CART } from "../Actions/Action";

const initialState = {
  loading: true,
  cartList: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:

      const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'));

      if(cartFromLocalStorage){
        const newList = [...cartFromLocalStorage, action.payload];
        //add tp localStorage
        localStorage.setItem('cart', JSON.stringify(newList))
      }else{
        localStorage.setItem('cart', JSON.stringify([...state.cartList, action.payload]))
      }
      return {
        ...state,
        cartList: [...state.cartList, action.payload],
      };

    case REMOVE_FROM_CART:
      let items = [];
      if(localStorage.getItem('cart')){
        items = [...JSON.parse(localStorage.getItem('cart'))];
      }
      const updatedItem = items.filter((item) => item.id !== action.payload)
      localStorage.setItem('cart', JSON.stringify(updatedItem))
      return {
        ...state,
        cartList: updatedItem,
      };
    default:
      return state;
  }
};
