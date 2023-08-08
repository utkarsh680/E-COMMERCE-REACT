import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import styles from "../styles/wishlist.module.css";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist, clearWishlist } from "../Redux/Actions/Action";

function Wishlist() {
  const myData = useSelector((state) => state.usersListReducer.wishList);
  const dispatch = useDispatch();
  const [wishlistItems, setWishlistItems] = useState(myData);

  const removeProductFromWishList = (id) => {
    dispatch(removeFromWishlist(id));
  };

  useEffect(() => {
    // Get items from localstorage
    if (localStorage.getItem("wishlist")) {
      const items = JSON.parse(localStorage.getItem("wishlist"));
      setWishlistItems([...items]);
    }
  }, [localStorage.getItem("wishlist")]);

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
                  {image}
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
