import { ADD_PRODUCTS } from "../Actions/Action"

const initialState = {
    loading: true,
    userList:[],
    products:[]
   
}
export const usersListReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_PRODUCTS:
            return {
                ...state,
                loading:false,
                products: action.payload
            }
        
        default :
        return state

    }
}