export const ADD_PRODUCTS = 'ADD_PRODUCTS'
export const ADD_TO_CART = 'ADD_TO_CART'
export const addProducts = (data) =>{
    return {
        type:ADD_PRODUCTS,
        payload:data
    }
}

export const addToCart = (data) => {
    return{
        type: ADD_TO_CART,
        payload:data

    }
}
