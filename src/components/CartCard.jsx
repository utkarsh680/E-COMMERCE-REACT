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
  const removeProductHandle = (id, price) => {
    dispatch(removeFromCart(id, price));
    toast.success('Product Deleted!', {
      position: "top-right",
      autoClose: 2000,
      className: 'toast-message'
    });
  };
  
  // Add product to wishlist
  const addProductToWishlist = (product) => {
    
  
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
              :  `url("https://images.pexels.com/photos/821718/pexels-photo-821718.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
          }}
          className={styles.imgBox}
        >
          <div className={styles.overlay}
          style={{
            border : product.colorPalette ? ` 3px solid ${product.colorPalette.primary}`: `3px solid #908f8d`
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
            {product.image ? <img src={product.image} className = {styles.productImage} alt="" />: <img src="https://img.freepik.com/free-photo/beautiful-glowing-gray-full-moon_181624-59870.jpg?w=740&t=st=1692939690~exp=1692940290~hmac=0cde2ae2e0aeee1764df0fdafec9cb5fbed559f5c8b5fb80febc93ce08479c7b" className={styles.moon} />}  
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
                  style={{ border : product.colorPalette ? ` 3px solid ${product.colorPalette.primary}`: `3px solid #908f8d`}}
                  onClick={() => {
                    removeProductHandle(id, product.price);
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