import React from 'react'
import categoryIcon from "../assets/icons/category.svg";
import starIcon from "../assets/icons/star.svg";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import styles from "../styles/cart.module.css";
import { addToWishlist, removeFromCart } from '../Redux/Actions/Action';
import {useDispatch} from "react-redux";


function CartCard(props) {
  const { product } = props;
  const { name, id, image, price } = product;

  const dispatch = useDispatch()
   //remove item from localStorage
  const removeProductHandle = (id) => {
    dispatch(removeFromCart(id));
    toast.success('Product Deleted!', {
      position: "top-right",
      autoClose: 2000,
      className: 'toast-message'
    });
  };
  
  // Add product to wishlist
  const addProductToWishlist = (product) => {
    
    console.log("hello");
    let flag = true;
    if (localStorage.getItem("wishlist")) {
      const tempArray = [...JSON.parse(localStorage.getItem("wishlist"))];

      tempArray.map((item) => {
        if (item.id === product.id) {
          flag = false;
          toast.error("Already wishlisted!", {
            position: "top-right",
            autoClose: 2000,
            className: 'toast-message'
          });
          return;
        }
      });
    }
    if (!flag) {
      return;
    }
    dispatch(addToWishlist(product));
    dispatch(removeFromCart(product.id));
    toast.success('Added To Wishlist!', {
      position: "top-right",
      autoClose: 2000,
      className: 'toast-message'
    });
  };

  return (
      <div key={id}>
        <div
          style={{
            background: product.colorPalette
              ? `url("${image}"),  linear-gradient(to right, ${product.colorPalette.primary} 0%, ${product.colorPalette.secondary} 30%, black 90%`
              : " ",
          }}
          className={styles.imgBox}
        >
          <div className={styles.overlay}
          style={{
            border : product.colorPalette ? ` 3px solid ${product.colorPalette.primary}`: `3px solid #cc7218bf`
          }}
          >
            <div className={styles.addWishlist}>
              <FontAwesomeIcon
                icon={faHeart}
                className={styles.favIcon}
                onClick={() => addProductToWishlist(product)}
              />
            </div>
            <div className={styles.image}>
              <img src={image} alt="" />
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
                  {name.substring(0, 20)}{" "}
                </p>
                <p className={styles.priceValue}>
                  {" "}
                  ${price}{" "}
                </p>
              </div>
              <div className={styles.actions}>
                <button
                  className={styles.addToCart}
                  style={{ border : product.colorPalette ? ` 3px solid ${product.colorPalette.primary}`: `3px solid #cc7218bf`}}
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
  
}

export default CartCard;