import {
  ADD_TO_WISHLIST,
  CLEAR_WISHLIST,
  REMOVE_FROM_WISHLIST,
} from "../Actions/Action";

const initialState = {
  loading: true,
  wishList: [],
};

export const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      const wishlistFromLocalStorage = JSON.parse(
        localStorage.getItem("wishlist")
      );

      if (wishlistFromLocalStorage) {
        const newList = [...wishlistFromLocalStorage, action.payload];
        // add to localStorage
        localStorage.setItem("wishlist", JSON.stringify(newList));
      } else {
        localStorage.setItem(
          "wishlist",
          JSON.stringify([...state.wishList, action.payload])
        );
      }
      return {
        ...state,
        wishList: [...state.wishList, action.payload],
      };

    case REMOVE_FROM_WISHLIST:
      let items = [];
      if (localStorage.getItem("wishlist")) {
        items = [
          ...JSON.parse(localStorage.getItem("wishlist")),
        ];
      }
      const updatedItem = items.filter((item) => item.id !== action.payload);
      localStorage.setItem("wishlist", JSON.stringify(updatedItem));
      return {
        ...state,
        wishList: updatedItem,
      };

    case CLEAR_WISHLIST:
      localStorage.removeItem("wishlist");
      return {
        ...state,
        wishList: [],
      };

    default:
      return state;
  }
};
