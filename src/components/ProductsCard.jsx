import React, { useState } from "react";
import styles from "../styles/product.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
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
import "animate.css";

export default function ProductsCard(props) {
  const { product, handleEditClick} = props;
  const { name, id, image } = product;
  const [showDescription, setShowDescription] = useState(false);
  const [hide, setHide] = useState(false);

  const dispatch = useDispatch();

  //  for showing details
  const handleClick = () => {
    if (showDescription) {
      setHide(true);
      setTimeout(() => {
        setShowDescription(!showDescription);
      }, 500);
    } else {
      setShowDescription(!showDescription);
      setHide(false);
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
          toast.error("Already wishlisted!", {
            position: "top-right",
            autoClose: 2000,
            className: "toast-message",
          });
          return;
        }
      });
    }
    if (!flag) {
      return;
    }
    dispatch(addToWishlist(product));
    toast.success("Added To Wishlist!", {
      position: "top-right",
      autoClose: 2000,
      className: "toast-message",
    });
  };

  //   for removing the product
  const [hideProduct, setHideProduct] = useState(false);
  const removeProductClick = (id) => {
    dispatch(removeProduct(id));
    setHideProduct(!hideProduct)
    toast.success("Product Deleted!", {
      position: "top-right",
      autoClose: 2000,
      className: "toast-message",
    });
  };

  // Add to cart
  const handleAddToCart = (product) => {
    let flag = true;
    if (localStorage.getItem("cart")) {
      const tempArray = [...JSON.parse(localStorage.getItem("cart"))];
      tempArray.map((item) => {
        if (item.id === product.id) {
          flag = false;

          toast.error("Already Added!", {
            position: "top-right",
            autoClose: 2000,
            className: "toast-message",
          });
          return;
        }
      });
    }
    if (!flag) {
      return;
    }
    dispatch(addToCart(product));
    toast.success("Added To Cart!", {
      position: "top-right",
      autoClose: 2000,
      className: "toast-message",
    });
  };

  return (
    <div key={id}>
      <div
        style={{
          background: product.colorPalette
            ? `url("${image}"),  linear-gradient(to right, ${product.colorPalette.primary} 0%, ${product.colorPalette.secondary} 30%, black 90%`
            : `url("https://images.pexels.com/photos/821718/pexels-photo-821718.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
        }}
        className={styles.imgBox}
      >
        <div
          className={styles.overlay}
          style={{
            border: product.colorPalette
              ? ` 3px solid ${product.colorPalette.primary}`
              : `3px solid #908f8d`,
          }}
        >
          <div className={styles.image}>
            {product.image ? (
              <img src={product.image} className={styles.productImage} alt="" />
            ) : (
              <img
                src="https://img.freepik.com/free-photo/beautiful-glowing-gray-full-moon_181624-59870.jpg?w=740&t=st=1692939690~exp=1692940290~hmac=0cde2ae2e0aeee1764df0fdafec9cb5fbed559f5c8b5fb80febc93ce08479c7b"
                className={styles.moon}
              />
            )}
          </div>
          <div className={styles.menu}>
            <p
              onClick={() => addProductToWishlist(product)}
              className={styles.likeButton}
            >
              <FontAwesomeIcon icon={faHeart} className={styles.icon1} /> Like
            </p>
            <div className={styles.border}></div>
            <p
              className={styles.editButton}
              onClick={() => handleEditClick(product)}
            >
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
          {showDescription && (
            <div
              className={`animate__animated ${styles.detailsCard} ${
                hide ? "animate__flipOutY" : "animate__flipInY"
              }`}
            >
              {" "}
              {product.description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
