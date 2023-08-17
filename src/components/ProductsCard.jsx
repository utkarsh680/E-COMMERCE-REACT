import React, { useState } from "react";
import styles from "../styles/product.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import {
  faHeart,
  faPenToSquare,
  faTrash,
  faBagShopping,
  faAngleRight,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
import categoryIcon from "../assets/icons/category.svg";
import starIcon from "../assets/icons/star.svg";
import {
  addToCart,
  addToWishlist,
  removeProduct,
} from "../Redux/Actions/Action";
import { toast } from "react-toastify";

export default function ProductsCard(props) {
  const { product } = props;
  const { name, id, image } = product;
  const [showDescription, setShowDescription] = useState(false);
  const [hide, setHide] = useState(false);

  const dispatch = useDispatch();

  //  for showing details
  const handleClick = () => {
    if (showDescription) {
      setShowDescription(!showDescription);
      setTimeout(() => {
        setHide(false);
      }, 500);
    } else {
      setShowDescription(!showDescription);
      setHide(true);
    }
  };

  //   For adding product to wishlist
  const addProductToWishlist = (product) => {
    let flag = true;
    if (localStorage.getItem("wishlist")) {
      const tempArray = [...JSON.parse(localStorage.getItem("wishlist"))];
      tempArray.map((item) => {
        if (item.id === product.id) {
          flag = false;
          toast.error("Already wishlisted!");
          return;
        }
      });
    }
    if (!flag) {
      return;
    }
    dispatch(addToWishlist(product));
    toast.success("created");
  };

  //   for removing the product
  const removeProductClick = (id) => {
    dispatch(removeProduct(id));
    console.log(id);
    toast.success("remove product successfully");
  };

  const handleAddToCart = (product) => {
    let flag = true;
    if (localStorage.getItem("cart")) {
      const tempArray = [...JSON.parse(localStorage.getItem("cart"))];
      tempArray.map((item) => {
        if (item.id === product.id) {
          flag = false;
          toast.error("Already wishlisted!");
          return;
        }
      });
    }
    if (!flag) {
      return;
    }
    dispatch(addToCart(product));
    toast.success("created");
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
        <div className={styles.overlay}>
          <div className={styles.image}>
            <img src={product.image} alt="" />
          </div>
          <div className={styles.menu}>
            <p
              onClick={() => addProductToWishlist(product)}
              className={styles.likeButton}
            >
              <FontAwesomeIcon icon={faHeart} className={styles.icon1} /> Like
            </p>
            <div className={styles.border}></div>
            <p className={styles.editButton}>
              <FontAwesomeIcon icon={faPenToSquare} className={styles.icon2} />{" "}
              Edit
            </p>
            <div className={styles.border}></div>
            <p
              onClick={() => removeProductClick(id)}
              className={styles.deleteButton}
            >
              <FontAwesomeIcon icon={faTrash} className={styles.icon3} /> Delete
            </p>
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
              <p className={styles.price}> ${product.price} </p>
            </div>
          </div>
          <div className={styles.actions}>
            <button
              className={styles.addToCart}
              onClick={() => handleAddToCart(product)}
            >
              <FontAwesomeIcon
                icon={faBagShopping}
                className={styles.cartIcon}
              />{" "}
              Add to Bag
            </button>
          </div>
          <FontAwesomeIcon
            icon={!showDescription ? faAngleRight : faAngleLeft}
            className={styles.arrow}
            onClick={() => handleClick()}
          />
          {showDescription && <div className={styles.detailsCard}></div>}
        </div>
      </div>
    </div>
  );
}
