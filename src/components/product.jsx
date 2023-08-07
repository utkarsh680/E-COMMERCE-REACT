import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProducts, addToWishlist} from "../Redux/Actions/Action";
import styles from "../styles/product.module.css";
import Navbar from "./navbar";
import { addToCart } from "../Redux/Actions/Action";
import {toast } from 'react-toastify';


function Product() {

  const myData = useSelector((state)=> state.usersListReducer.products)
  const myCartData = useSelector((state) => state.usersListReducer.cartList)
  const myWishlistData = useSelector((state) => state.usersListReducer.wishList)
  const url = "https://my-json-server.typicode.com/singh233/JSON-Server";
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);

  // fetch products from url
  const getProducts = async () => {
    const res = await fetch(`${url}/products`);
    const result = await res.json();
    dispatch(addProducts(result));
  };

  useEffect(() => {
    getProducts();
    setProducts(myData);
  }, [myData]);

  const addProductToCart = (product) =>{
    if (myCartData.some(cartItem => cartItem.id === product.id)){
    toast.error('hello')
    return;
    }
    dispatch(addToCart(product))
    toast.success('port created')
  }
 
  const addProductToWishlist = (product) =>{
    if (myWishlistData.some(wishListItem => wishListItem.id === product.id)){
      toast.error('hello')
      return;
    }
    dispatch(addToWishlist(product))
    toast.success('port created')
  }
  return (
    <div className={styles.homeContainer}>
      <div className={styles.style}>
      <div className={styles.inStyle}></div>
      </div>
      <div className={styles.itemContainer}>
        <div className={styles.box}>
          <div className={styles.inBox}>
            <Navbar />
            <div className={styles.cardBox}>
            {products.map((product) => {
              const { name, id, image } = product;
              return (
                <div key={id}>
                 <div className={styles.imgBox}>
                  <button className={styles.addCart} onClick={() => addProductToCart(product)}>add cart</button>
                  <button className={styles.addCart} onClick={() => addProductToWishlist(product)}>add to wishlist</button>
                  
                  <img src={product.image} alt="img" />
                 </div>
                </div>
              );
            })}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
