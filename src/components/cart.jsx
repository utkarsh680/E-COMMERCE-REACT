import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import styles from "../styles/cart.module.css";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist,removeFromCart } from "../Redux/Actions/Action";
import categoryIcon from "../assets/icons/category.svg";
import starIcon from "../assets/icons/star.svg";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
function Cart() {
  const myData = useSelector((state) => state.cartReducer.cartList);

  const [cartItems, setCartItems] = useState(myData);

  const dispatch = useDispatch();

  // Add item from localStorage
  useEffect(() => {
    // Get items from localstorage
    if (localStorage.getItem("cart")) {
      const items = JSON.parse(localStorage.getItem("cart"));
      setCartItems([...items]);
    }
  }, [localStorage.getItem("cart")]);

  //remove item from localStorage
  const removeProductHandle = (id) => {
    dispatch(removeFromCart(id));
  };

  const addProductToWishlist = (product) => {
    let flag = true;
    if(localStorage.getItem('wishlist')){
      const tempArray = [...JSON.parse(localStorage.getItem('wishlist'))];
   
    tempArray.map((item) => {
      if(item.id === product.id){
        flag = false;
        toast.error('already wishlisted!')
        return;
      }
    })
  }
  if(!flag){
    return;
  }
    dispatch(addToWishlist(product))
    toast.success('product added')
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
              {cartItems.map((product) => {
                const { name, id, image } = product;
                return (
                  <div key={id}>
                    {/* {name}
                  <button
                    className={styles.addCart}
                    onClick={() => removeProductFromCart(id)}
                  >
                    remove cart
                  </button> */}

                    <div
                      style={{
                        background: `url("${image}"),  linear-gradient(to right, ${product.colorPalette.primary} 0%, ${product.colorPalette.secondary} 30%, black 90%`,
                      }}
                      className={styles.imgBox}
                    >
                      
                      <div className={styles.overlay}>
                      <div className={styles.addWishlist}>
                        <FontAwesomeIcon
                          icon={faHeart}
                          className={styles.favIcon}
                          onClick={() =>addProductToWishlist(product)}
                         
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

export default Cart;
