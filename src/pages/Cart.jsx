import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/cart.module.css";
import { useSelector } from "react-redux";
import { CartCard } from "../components";
import { faArrowRight, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Cart() {
  const product = useSelector((state) => state.cartReducer.cartList);
  const total = useSelector((state) => state.cartReducer.totalPrice);
  console.log("total", total);

  const [cartItems, setCartItems] = useState(product);
  console.log(cartItems);

  // Add item from localStorage
  useEffect(() => {
    // Get items from localstorage
    if (localStorage.getItem("cart")) {
      const items = JSON.parse(localStorage.getItem("cart"));
      setCartItems([...items]);
    }
  }, [localStorage.getItem("cart")]);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setScrollLeft(e.currentTarget.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.clientX - startX;
    e.currentTarget.scrollLeft = scrollLeft - x;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // mouse wheel scroll

  const scrollContainerRef = useRef(null);

  const handleWheel = (e) => {
    const scrollContainer = scrollContainerRef.current;
    const scrollAmount = 100; // Adjust this value as needed

    if (e.deltaY > 0) {
      scrollContainer.scrollLeft += scrollAmount; // Scroll right
    } else {
      scrollContainer.scrollLeft -= scrollAmount; // Scroll left
    }

    e.preventDefault();
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.style}>
        <div className={styles.inStyle}>electro</div>
      </div>

      <div className={styles.itemContainer}>
        <div className={styles.box}>
          <div className={styles.inBox}>
            <Navbar />
            <div className={styles.logo}>
              <div>
                <h3>electro</h3>
              </div>
              <div className={styles.point}></div>
            </div>
            {cartItems.length === 0 ? (
              <div className={styles.emptyCart}>
                <p>No items in the cart.</p>
                <Link to="/product" className={styles.browseProduct}>
                  Browse Products
                </Link>
              </div>
            ) : (
              <>
                <div className={styles.checkOut}>
                  <div
                    className={styles.checkOutData}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onWheel={handleWheel}
                    ref={scrollContainerRef}
                  >
                    {
                      // iterate over the cart items
                      cartItems.map((item, index) => {
                        return (
                          <>
                            <div
                              className={styles.ItemBox}
                              style={{
                                border: item.colorPalette
                                  ? ` 2px solid ${item.colorPalette.primary}`
                                  : `2px solid #908f8d`,
                              }}
                            >
                              <p className={styles.index}> {index + 1}. </p>
                              <p className={styles.productName}>
                                {item.name.substring(0, 17)}
                              </p>
                              <p className={styles.qty}>1</p>
                            </div>
                          </>
                        );
                      })
                    }
                  </div>

                  <div className={styles.nextStepButton}>
                    <p className={styles.totalPrice}> ${total} </p>
                    <button>
                      {" "}
                      Checkout <FontAwesomeIcon icon={faArrowRight} />{" "}
                    </button>
                  </div>
                </div>
                <div className={styles.cardBox}>
                  {cartItems.map((product) => {
                    return <CartCard product={product} key={product.id} />;
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
