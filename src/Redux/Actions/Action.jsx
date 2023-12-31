export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const EDIT_PRODUCT = 'EDIT_PRODUCT'
export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST'
export const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const SORT_PRODUCTS_LOW_TO_HIGH ='SORT_PRODUCTS_LOW_TO_HIGH'
export const SORT_PRODUCTS_HIGH_TO_LOW = 'SORT_PRODUCTS_HIGH_TO_LOW'
// export const SORT_BY_LATEST = 'SORT_BY_LATEST'
export const SORT_BY_ELECTRONICS = 'SORT_BY_ELECTRONICS'
export const SORT_BY_HOME_AND_KITCHEN = 'SORT_BY_HOME_AND_KITCHEN'
export const SORT_BY_CATEGORY_ALL = 'SORT_BY_CATEGORY_ALL'


// move to wishlist

export const MOVE_TO_WISHLIST_FROM_CART ='MOVE_TO_WISHLIST_FROM_CART'

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

// for remove Product
export const removeProduct = (item_id) =>{
    return {
        type: REMOVE_PRODUCT,
        payload:item_id
    }
}

// for edit Product
export const  editProduct = (product) => {
    return {
        type: EDIT_PRODUCT,
        payload: product
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
export const removeFromCart = (item_id, price) => {
    return {
        type: REMOVE_FROM_CART,
        payload: {
            item_id, 
            price
        } 
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


// move to wishlist form cart

export const moveToWishlistFromCart = (product) => {
    return {
        type:MOVE_TO_WISHLIST_FROM_CART,
        payload: product
    }
}


// action creator for sorting product from low to high
export const sortProductsLowToHigh = (products) => {
    return {
        type: SORT_PRODUCTS_LOW_TO_HIGH,
        products,
    };
}

// action creator for sorting product from high to low
export const sortProductsHighToLow = (products) => {
    return {
        type: SORT_PRODUCTS_HIGH_TO_LOW,
        products,
    };
}

// // action creator for sorting product by latest
// export const sortByLatest = (products) => {
//     return {
//         type: SORT_BY_LATEST,
//         products,
//     };
// }

// action creator for sorting product by Electronics category
export const sortByElectronics = () => {
    return {
        type: SORT_BY_ELECTRONICS,
    };
}

// action creator for sorting product by Home and kitchen category
export const sortByHomeAndKitchen = () => {
    return {
        type: SORT_BY_HOME_AND_KITCHEN,
    };
}

// action creator for sorting product by All category
export const sortByAll = (products) => {
    return {
        type: SORT_BY_CATEGORY_ALL,
        products,
    };
}