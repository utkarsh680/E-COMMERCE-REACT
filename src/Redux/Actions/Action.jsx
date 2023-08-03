export const ADD_PRODUCTS = 'ADD_PRODUCTS'

export const addProducts = (data) =>{
    return {
        type:ADD_PRODUCTS,
        payload:data
    }
}

