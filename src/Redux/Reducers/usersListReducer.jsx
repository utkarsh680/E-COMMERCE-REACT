import { ADD_PRODUCTS, ADD_TO_CART } from "../Actions/Action"

const initialState = {
    loading: true,
    userList:[],
    products:[],
    cartList: [],

   
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
            return{
                ...state,
                cartList: [...state.cartList, action.payload]

            }    
        
        default :
        return state

    }
}