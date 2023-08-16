import React from "react";
import styles from "../styles/wishlist.module.css";
import { useDispatch } from "react-redux";
import { removeFromWishlist, clearWishlist,addToCart } from "../Redux/Actions/Action";
import { faCartShopping,  faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import categoryIcon from "../assets/icons/category.svg";
import starIcon from "../assets/icons/star.svg";

import { toast } from "react-toastify";
function WishlistCard(props) {

  const {product} = props;
  const { name, id, image } = product;

  const dispatch = useDispatch();

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
    <div key={id}>
      <div
        style={{
          background: product.colorPalette ? `url("${image}"),  linear-gradient(to right, ${product.colorPalette.primary} 0%, ${product.colorPalette.secondary} 30%, black 90%` : " ",
        }}
        className={styles.imgBox}
      >
        <div className={styles.overlay}>
          <div className={styles.addCart}>
            <FontAwesomeIcon
              icon={faCartShopping}
              className={styles.favIcon}
              onClick={() => addProductToCart(product)}
            />
          </div>
          <div className={styles.image}>
            <img src={product.image} alt="" />
          </div>
          <div className={styles.details}>
            <div className={styles.heading}>
              <p className={styles.category}>
                {" "}
                <img src={categoryIcon} alt="" /> {product.category}
              </p>
              <p className={styles.rating}>
                {" "}
                {product.rating} / 5 <img src={starIcon} alt="" />{" "}
              </p>
            </div>
            <div className={styles.price}>
              <p className={styles.name}> {product.name.substring(0, 20)} </p>
              <p className={styles.priceValue}> ${product.price} </p>
            </div>
            <div className={styles.actions}>
              <button
                className={styles.addToCart}
                onClick={() => {
                  removeProductHandle(id);
                }}
              >
                <FontAwesomeIcon icon={faTrash} className={styles.deleteIcon} />{" "}
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WishlistCard;
