import React from "react";
import Navbar from "./Navbar";
import styles from "../styles/cart.module.css";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../Redux/Actions/Action";

function Cart() {
  const myData = useSelector((state) => state.usersListReducer.cartList);

  const dispatch = useDispatch();
  const removeProductFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  console.log("cart", myData);
  return (
    <div className={styles.homeContainer}>
      <div className={styles.style}>
        <div className={styles.inStyle}></div>
      </div>
      <div className={styles.itemContainer}>
        <div className={styles.box}>
          <div className={styles.inBox}>
            <Navbar />
            {myData.map((item) => {
              const { name, id, image } = item;
              return (
                <div key={id}>
                  {item.image}
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
