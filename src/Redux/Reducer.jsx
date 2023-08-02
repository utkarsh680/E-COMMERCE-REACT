import { FAIL_REQUEST, GET_USER_LIST, MAKE_REQUEST } from "./ActionType"

const initialState = {
    loading: true,
    userList:[],
    userObj:{},
    errMessage:''
}
export const Reducer = (state, action) => {
    switch(action.type){
        case MAKE_REQUEST:{
            return {
                ...state,
                loading:true
            }
        }
        case FAIL_REQUEST:{
            return {
                ...state,
                loading:false,
                errMessage: action.payload
            }
        }
        case GET_USER_LIST:
            return {
                ...state,
                loading:false,
                errMessage: '',
                userList: action.payload,
                userObj:{}
            }
        default: return state
    }
}