import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import styles from "../styles/wishlist.module.css";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist, clearWishlist, addProduct, addToCart } from "../Redux/Actions/Action";
import { faCartShopping, faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import categoryIcon from "../assets/icons/category.svg";
import starIcon from "../assets/icons/star.svg";
import { toast } from "react-toastify";
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
  const removeProductHandle= (id) => {
    dispatch(removeFromWishlist(id));
  };

  // clear all items from wishlist
  const clearWishlistFromList = () => {
    dispatch(clearWishlist());
  };

  const addProductToCart = (product) =>{
    let flag = true;
    if(localStorage.getItem('cart')){
      const tempArray = [...JSON.parse(localStorage.getItem('cart'))]

      tempArray.map((item) => {
        if(item.id === product.id){
          flag = false;
          toast.error('already carted')
          return;
        }
      })
    }
    if(!flag){
      return;
    }
    dispatch(addToCart(product))
    dispatch(removeFromWishlist(product.id))
    toast.success('cart added')
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
              {wishlistItems.map((product) => {
                const { name, id, image } = product;
                return (
                  <div key={id}>
                  
                    <div
                      style={{
                        background: `url("${image}"),  linear-gradient(to right, ${product.colorPalette.primary} 0%, ${product.colorPalette.secondary} 30%, black 90%`,
                      }}
                      className={styles.imgBox}
                    >
                      
                      <div className={styles.overlay}>
                      <div className={styles.addCart}>
                        <FontAwesomeIcon
                          icon={faCartShopping}
                          className={styles.favIcon}
                          onClick={() =>addProductToCart(product)}
                         
                        />
                      </div>
                        <div className={styles.image}>
                          <img src={product.image} alt="" />
                        </div>
                        <div className={styles.details}>
                          <div className={styles.heading}>
                            <p className={styles.category}>
                              {" "}
                              <img src={categoryIcon} alt="" />{" "}
                              {product.category}
                            </p>
                            <p className={styles.rating}>
                              {" "}
                              {product.rating} / 5 <img src={starIcon} alt="" />{" "}
                            </p>
                          </div>
                          <div className={styles.price}>
                            <p className={styles.name}>
                              {" "}
                              {product.name.substring(0, 20)}{" "}
                            </p>
                            <p className={styles.priceValue}>
                              {" "}
                              ${product.price}{" "}
                            </p>
                          </div>
                          <div className={styles.actions}>
                            <button
                              className={styles.addToCart}
                              onClick={() => {
                                removeProductHandle(id);
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                className={styles.deleteIcon}
                              />{" "}
                              Remove
                            </button>
                          </div>
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
