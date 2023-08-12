import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import styles from "../styles/wishlist.module.css";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist, clearWishlist } from "../Redux/Actions/Action";

function Wishlist() {
  const myData = useSelector((state) => state.wishlistReducer.wishList); //Data from state
  const dispatch = useDispatch();
  const [wishlistItems, setWishlistItems] = useState(myData); //set data as wishlistItems

  // Add item from localStorage
  useEffect(() => {
    // Get items from localstorage
    if (localStorage.getItem("wishlist")) {
      const items = JSON.parse(localStorage.getItem("wishlist"));
      setWishlistItems([...items]);
    }
  }, [localStorage.getItem("wishlist")]);

  useEffect(() => {
    if (!localStorage.getItem("wishlist")) setWishlistItems(myData);
  }, [myData]);

  // remove item from localStorage
  const removeProductFromWishList = (id) => {
    dispatch(removeFromWishlist(id));
  };

  // clear all items from wishlist
  const clearWishlistFromList = () => {
    dispatch(clearWishlist());
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
            {wishlistItems.map((product) => {
             
              const { id, name, image } = product;
              return (
                <div key={id}>
                  <div
                      style={{
                        background: `url("${image}"),  linear-gradient(to right, ${product.colorPalette.primary} 0%, ${product.colorPalette.secondary} 30%, black 90%`,
                      }}
                      className={styles.imgBox}
                    >
                    <div className={styles.overlay}>
                      <div className={styles.image}>
                        <img src={product.image} alt="" />
                      </div>
                    </div>
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

export default Wishlist;
