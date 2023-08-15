import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPenToSquare,
  faTrash,
  faBagShopping,
  faAngleRight,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";

import {
  addToWishlist,
  fetchProducts,
  removeProduct,
  showDetails,
  sortByAll,
  sortByElectronics,
  sortByHomeAndKitchen,
  sortProductsHighToLow,
  sortProductsLowToHigh,
} from "../Redux/Actions/Action";
import styles from "../styles/product.module.css";
import Navbar from "./Navbar";
import { addToCart } from "../Redux/Actions/Action";
import { toast } from "react-toastify";
import categoryIcon from "../assets/icons/category.svg";
import starIcon from "../assets/icons/star.svg";

function Product() {
  const products = useSelector((state) => state.showDataReducer.products);
  const [item, setItem] = useState([]);
  const [hide, setHide] = useState(false);

  const handleClick = (id) => {
    dispatch(showDetails(id));
    setHide(!hide);
  };

  const url = "https://my-json-server.typicode.com/singh233/JSON-Server";
  const dispatch = useDispatch();

  // fetch products from url
  const getProducts = async () => {
    const res = await fetch(`${url}/products`);
    const result = await res.json();
    dispatch(fetchProducts(result));
  };

  useEffect(() => {
    let items = [];
    if (localStorage.getItem("product")) {
      items = JSON.parse(localStorage.getItem("product"));
    }
    items = [...items, ...products];
    setItem(items);
  }, [products]);

  useEffect(() => {
    getProducts();
  }, []);

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

  // short high to low
  const sortHighToLow = (products) => {
    dispatch(sortProductsHighToLow(products));
  };

  // sort low to high

  const sortLowToHigh = (products) => {
    dispatch(sortProductsLowToHigh(products));
  };

  // sort all

  const sortAll = (products) => {
    dispatch(sortByAll(products));
  };

  // sort Electronis
  const sortElectronics = (products) => {
    dispatch(sortByElectronics(products));
  };

  // sort Kitchen
  const sortKitchen = (products) => {
    dispatch(sortByHomeAndKitchen())
    console.log()
  }

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

  return (
    <div className={styles.homeContainer}>
      <div className={styles.style}>
        <div className={styles.inStyle}></div>
      </div>
      <div className={styles.itemContainer}>
        <div className={styles.box}>
          <div className={styles.inBox}>
            <Navbar />

            <div className={styles.shortByPrice}>
              <div className={styles.shortHigh}>
                <FontAwesomeIcon
                  icon={faArrowUp}
                  onClick={() => sortHighToLow(products)}
                />
              </div>
              <div className={styles.shortLow}>
                <FontAwesomeIcon
                  icon={faArrowDown}
                  onClick={() => sortLowToHigh(products)}
                />
              </div>
            </div>
            <div className={styles.sortCategory}>
              <div className={styles.all} onClick={() => sortAll(products)}>
                All{" "}
              </div>
              <div
                className={styles.kitchen}
                onClick={() => sortKitchen(products)}
              >
                {" "}
                Kitchen
              </div>
              <div
                className={styles.electronics}
                onClick={() => sortElectronics(products)}
              >
                {" "}
                Electronics
              </div>
            </div>

            <div className={styles.cardBox}>
              {item.map((product) => {
                const { name, id, image } = product;
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
                            <FontAwesomeIcon
                              icon={faHeart}
                              className={styles.icon1}
                            />{" "}
                            Like
                          </p>
                          <div className={styles.border}></div>
                          <p className={styles.editButton}>
                            <FontAwesomeIcon
                              icon={faPenToSquare}
                              className={styles.icon2}
                            />{" "}
                            Edit
                          </p>
                          <div className={styles.border}></div>
                          <p
                            onClick={() => removeProductClick(id)}
                            className={styles.deleteButton}
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              className={styles.icon3}
                            />{" "}
                            Delete
                          </p>
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

                        <div className={styles.detailsCard}>
                          <p>
                            <FontAwesomeIcon
                              icon={faAngleRight}
                              className={styles.arrow}
                              onClick={() => handleClick(id)}
                            />
                          </p>
                          <div className={hide ? styles.cardBody : ""}></div>
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

export default Product;
