export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST'
export const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

export const CLEAR_WISHLIST  =' CLEAR_WISHLIST'

export const  ADD_PRODUCT = 'ADD_PRODUCT'

// for toggle

export const SHOW_DETAILS = 'SHOW_PRODUCT'

export const addProduct = (task) => {
    return{
        type: ADD_PRODUCT,
        payload:task.items
    }
}

// for add product from api
export const fetchProducts= (data) =>{
    return {
        type:FETCH_PRODUCTS,
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

// for toggle card

export const showDetails = (id) =>{
    return {
        type:SHOW_DETAILS,
        payload:id

    }
}

