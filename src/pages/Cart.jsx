import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/cart.module.css";
import { useSelector} from "react-redux";
import { CartCard } from "../components";
function Cart() {
  const myData = useSelector((state) => state.cartReducer.cartList);
  const total = useSelector ((state) => state.cartReducer.totalPrice)
  console.log(total)

  const [cartItems, setCartItems] = useState(myData);


  // Add item from localStorage
  useEffect(() => {
    // Get items from localstorage
    if (localStorage.getItem("cart")) {
      const items = JSON.parse(localStorage.getItem("cart"));
      setCartItems([...items]);
    }
  }, [localStorage.getItem("cart")]);



  return (
    <div className={styles.homeContainer}>
      <div className={styles.style}>
        <div className={styles.inStyle}></div>
      </div>
      <div className={styles.itemContainer}>
        <div className={styles.box}>
          <div className={styles.inBox}>
            <Navbar product = {myData}/>
            <div className={styles.checkOut}>
              {
                // iterate over the cart items
                cartItems.map((item, index) => {
                  return (
                    <>
                    <div key={index} className={styles.product}>
                      <div className={styles.ItemBox}>
                      <p className={styles.index}> {index + 1}. </p>
                      <p className={styles.productName}>
                        {item.name.substring(0, 17)}
                      </p>
                      <p className={styles.qty}>1</p>
                      
                      </div>
            
                    </div>
                  
                    </>
                  );
                })
              }
              <div className={styles.nextStepButton}>
                        <p className={styles.totalPrice}> ${total} </p>
                        <button>
                            {/* Checkout <FontAwesomeIcon icon={faArrowRight} />{' '} */}
                        </button>
              </div>
              
            </div>
            <div className={styles.cardBox}>
              {cartItems.map((product) => {
                
                return (
                  <CartCard product = {product} key = {product.id}/>
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