export const ADD_PRODUCTS = 'ADD_PRODUCTS'
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST'
export const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

export const CLEAR_WISHLIST  =' CLEAR_WISHLIST'

// for add product from api
export const addData= (data) =>{
    return {
        type:ADD_PRODUCTS,
        payload:data
    }
}

export const removeProduct = (item_id) =>{
    return {
        type: REMOVE_PRODUCT,
        payload:item_id
    }
}

// for add product into the cart
export const addToCart = (data) => {
    return{
        type: ADD_TO_CART,
        payload:data

    }
}

// for remove product from the cart
export const removeFromCart = (item_id) => {
    return {
        type: REMOVE_FROM_CART,
        payload: item_id
    }
}

// for add product to wishlist

export const addToWishlist = (data) =>{
    return{
        type: ADD_TO_WISHLIST,
        payload: data
    }
}

// remove from wishlist 

export const removeFromWishlist =(item_id) => {
    return {
        type : REMOVE_FROM_WISHLIST,
        payload: item_id
    }
}

// for clear wishlist

export const clearWishlist = () =>
{
    return{
        type:CLEAR_WISHLIST,
    }
}


