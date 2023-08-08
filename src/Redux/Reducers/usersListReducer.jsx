import { ADD_PRODUCTS, ADD_TO_CART, ADD_TO_WISHLIST, CLEAR_WISHLIST, REMOVE_FROM_CART, REMOVE_FROM_WISHLIST, REMOVE_PRODUCT } from "../Actions/Action"

const initialState = {
    loading: true,
    userList:[],
    products:[],
    cartList: [],
    wishList: [],   
}
export const usersListReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_PRODUCTS: 
            return {
                ...state,
                loading:false,
                products: action.payload
            }
        
        case REMOVE_PRODUCT:{
           
            return{
                ...state,
                products: state.products.filter(item => item.id !== action.payload),
            }
        }    
        case ADD_TO_CART:
        return {
            ...state,
            cartList: [...state.cartList, action.payload],
        }

        case REMOVE_FROM_CART:
            return{
                ...state,
                cartList: state.cartList.filter(item => item.id !== action.payload),
            }  
        
        case ADD_TO_WISHLIST:
            // get cart from local storage
            const wishlistFromLocalStorage = JSON.parse(localStorage.getItem('wishlist'))
    
            if(wishlistFromLocalStorage) {
                const newList = [...wishlistFromLocalStorage, action.payload];
                // add to localStorage
                localStorage.setItem('wishlist', JSON.stringify(newList))
            }else{
                localStorage.setItem('wishlist', JSON.stringify([...state.wishList, action.payload]));
            }
            return{
                ...state,
                wishList: [...state.wishList, action.payload]
            }  
        case REMOVE_FROM_WISHLIST:
            const updatedItem = state.wishList.filter(item => item.id !== action .payload)
            localStorage.setItem('wishlist', JSON.stringify(updatedItem))
            return{
                ...state,
                wishList: updatedItem
            }

            // to clear the wishlisti
        case CLEAR_WISHLIST:
            localStorage.removeItem('wishlist')
            return{
                ...state,
                wishList:[]
            }    
        
        default :
        return state

    }
}