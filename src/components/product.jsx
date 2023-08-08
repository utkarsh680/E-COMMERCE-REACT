import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addData, addToWishlist, removeProduct } from "../Redux/Actions/Action";
import styles from "../styles/product.module.css";
import Navbar from "./Navbar";
import { addToCart } from "../Redux/Actions/Action";
import { toast } from "react-toastify";

function Product() {
  const products = useSelector((state) => state.usersListReducer.products);
  const myCartData = useSelector((state) => state.usersListReducer.cartList);
  const myWishlistData = useSelector(
    (state) => state.usersListReducer.wishList
  );
  const url = "https://my-json-server.typicode.com/singh233/JSON-Server";
  const dispatch = useDispatch();

  // fetch products from url
  const getProducts = async () => {
    const res = await fetch(`${url}/products`);
    const result = await res.json();
    dispatch(addData(result));
  };

  useEffect(() => {
    getProducts();
  }, []);

  const removeProductClick = (id) => {
    console.log(id);
    dispatch(removeProduct(id));
  };

  const addProductToCart = (product) => {
    if (myCartData.some((cartItem) => cartItem.id === product.id)) {
      toast.error("hello");
      return;
    }
    dispatch(addToCart(product));
    toast.success("port created");
  };

  const addProductToWishlist = (product) => {
    if (myWishlistData.some((wishListItem) => wishListItem.id === product.id)) {
      toast.error("hello");
      return;
    }
    dispatch(addToWishlist(product));
    toast.success("port created");
  };
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
                      <button
                        className={styles.addCart}
                        onClick={() => addProductToCart(product)}
                      >
                        add cart
                      </button>
                      <button
                        className={styles.addCart}
                        onClick={() => addProductToWishlist(product)}
                      >
                        add to wishlist
                      </button>
                      <button
                        className={styles.addCart}
                        onClick={() => removeProductClick(id)}
                      >
                        remove
                      </button>
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
