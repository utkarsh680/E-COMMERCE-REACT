import { showDataReducer } from "./showDataReducer";
import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import { wishlistReducer } from "./wishlistReducer";

const rootReducer = combineReducers({
    showDataReducer,
    cartReducer,
    wishlistReducer
})

export default rootReducer;