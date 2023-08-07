import { ADD_PRODUCTS, ADD_TO_CART, ADD_TO_WISHLIST, REMOVE_FROM_CART, REMOVE_FROM_WISHLIST } from "../Actions/Action"

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
            return{
                ...state,
                wishList: [...state.wishList, action.payload]
            }  
        case REMOVE_FROM_WISHLIST:
            return{
                ...state,
                wishList: state.wishList.filter(item => item.id !== action .payload)
            }
        
        default :
        return state

    }
}