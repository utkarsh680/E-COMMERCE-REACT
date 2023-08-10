import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import styles from "../styles/cart.module.css";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../Redux/Actions/Action";

function Cart() {
  const myData = useSelector((state) => state.cartReducer.cartList);

  const [cartItems, setCartItems] = useState(myData)

  const dispatch = useDispatch();

  // Add item from localStorage
  useEffect(() =>{
  // Get items from localstorage
  if(localStorage.getItem('cart')){
    const items = JSON.parse(localStorage.getItem('cart'));
    setCartItems([...items])
  }
  }, [localStorage.getItem('cart')])

  //remove item from localStorage
  const removeProductFromCart = (id) => {
    console.log(id)
    dispatch(removeFromCart(id));
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
            {cartItems.map((item) => {
              const { name, id, image } = item;
              return (
                <div key={id}>
                  {name}
                  <button
                    className={styles.addCart}
                    onClick={() => removeProductFromCart(id)}
                  >
                    remove cart
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
