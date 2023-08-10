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
            {wishlistItems.map((item) => {
              console.log(item);
              const { id, name, image } = item;
              return (
                <div key={id}>
                  <button
                    className={styles.addCart}
                    onClick={() => removeProductFromWishList(id)}
                  >
                    remove product
                  </button>
                  <button
                    className={styles.addCart}
                    onClick={clearWishlistFromList}
                  >
                    clear wishlist
                  </button>
                  <h1>{name}</h1>
                 
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
