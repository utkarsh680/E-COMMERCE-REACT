import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faArrowUp,
  faArrowDown,
  faDotCircle,
  faSort,
  faChessKing,
} from "@fortawesome/free-solid-svg-icons";

import {
  fetchProducts,
  sortByAll,
  sortByElectronics,
  sortByHomeAndKitchen,
  sortProductsHighToLow,
  sortProductsLowToHigh,
} from "../Redux/Actions/Action";
import styles from "../styles/product.module.css";
import Navbar from "../components/Navbar";
import { EditProduct, ProductsCard } from "../components";
import 'animate.css';

function Product() {
  const products = useSelector((state) => state.showDataReducer.products);
  const loading = useSelector((state) => state.showDataReducer.loading);
  const [showMenu, setShowMenu] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [categoryHide, setCategoryHide] = useState(true);
  const [cancel, setCancel] = useState(false);
  const [hide, setHide] = useState(true);
  const [editProduct, setEditProduct] = useState(null);
  const url = "https://my-json-server.typicode.com/singh233/JSON-Server";

  const handleClick = () => {
    if (showMenu) {
      setHide(false)
      setTimeout (() => {
        setShowMenu(!showMenu);
      }, 500)
    
    } else {
      setShowMenu(!showMenu);
      setHide(true)
    }
  };

  // edit click
  const [showEditBox, setShowEditBox] = useState(false);
  const handleOpenEdit = (product) => {
    
    setShowEditBox(!showEditBox);
    setEditProduct(product);
    setCancel(!cancel);
  };

  const dispatch = useDispatch();
  // fetch products from url
  const getProducts = async () => {
    const res = await fetch(`${url}/products`);
    const result = await res.json();
    dispatch(fetchProducts(result));
  };

  useEffect(() => {
    getProducts();
  }, []);

  //sort latest

  const sortLatest = () => {
    getProducts();
  };

  // short high to low
  const sortHighToLow = (products) => {
    dispatch(sortProductsHighToLow(products));
  };

  // sort low to high

  const sortLowToHigh = (products) => {
    dispatch(sortProductsLowToHigh(products)); // update state
  };

  // sort all

  const sortAll = () => {
    dispatch(sortByAll());
  };

  // sort Electronis
  const sortElectronics = () => {
    dispatch(sortByElectronics());
  };

  // sort Kitchen
  const sortKitchen = () => {
    dispatch(sortByHomeAndKitchen());
  };

  const handleCategoryClick = () => {
    if (showCategory) {
      setCategoryHide(false)
      setTimeout(() => {
        setShowCategory(!showCategory);
      }, 500)
      
    } else {
      setShowCategory(!showCategory);
      setCategoryHide(true)
    }
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
            {loading ? <div className={styles.loader}></div> : ""}
            <div className={styles.logo}>
              <div>
                <h3>electro</h3>
              </div>
              <div className={styles.point}></div>
            </div>
            {products.length === 0 && !loading ? (
              <div className={styles.emptyProduct}>
                <p>No items in the Product.</p>
                <Link to="/addProduct" className={styles.browseProduct}>
                  Add Products
                </Link>
              </div>
            ) : (
              <>
                <div className={styles.menuBox}>
                  <div className={styles.menuButton}>
                    <FontAwesomeIcon
                      icon={faSort}
                      className={styles.barIcon}
                      onClick={() => handleClick()}
                    />

                    {showMenu ? (
                      <div className={`animate__animated ${styles.shortByPrice} ${
                        hide ? "animate__flipInX" : "animate__flipOutX"
                      }`}>
                        <div
                          className={styles.shortLatest}
                          onClick={() => sortLatest()}
                        >
                          <FontAwesomeIcon
                            icon={faDotCircle}
                            className={styles.dotIcon}
                          />
                          <p>Latest</p>
                          <span>Default</span>
                        </div>
                        <div className={styles.borderBottom}></div>
                        <div
                          className={styles.shortHigh}
                          onClick={() => sortLowToHigh(products)}
                        >
                          <FontAwesomeIcon icon={faArrowUp} />
                          <p>Low to High</p>
                        </div>
                        <div className={styles.borderBottom}></div>
                        <div
                          className={styles.shortLow}
                          onClick={() => sortHighToLow(products)}
                        >
                          <FontAwesomeIcon icon={faArrowDown} />
                          <p>High To Low</p>
                        </div>
                      </div>
                    ) : (
                      " "
                    )}
                  </div>
                </div>
                <div className={styles.itemCategory}>
                  <div
                    className={styles.categoryButton}
                    onClick={() => handleCategoryClick()}
                  >
                    <p>Category</p>
                    <FontAwesomeIcon icon={faArrowDown} />
                  </div>
                  {showCategory && (
                    <div className={`animate__animated ${styles.categoryBox} ${
                      categoryHide ? "animate__flipInX" : "animate__flipOutX"
                    }`}>
                      <div className={styles.all} onClick={() => sortAll()}>
                        All{" "}
                      </div>

                      <div
                        className={styles.kitchen}
                        onClick={() => sortKitchen()}
                      >
                        {" "}
                        Kitchen
                      </div>

                      <div
                        className={styles.electronics}
                        onClick={() => sortElectronics()}
                      >
                        {" "}
                        Electronics
                      </div>
                    </div>
                  )}
                </div>
                <div className={styles.cardBox}>
                  {products.map((product) => {
                    return (
                      <ProductsCard
                        product={product}
                        key={product.id}
                        handleEditClick={(product) => handleOpenEdit(product)}
                      />
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {showEditBox && (
        <EditProduct
          product={editProduct}
          cancel={cancel}
          handleEditClick={(product) => handleOpenEdit(product)}
        />
      )}
    </div>
  );
}

export default Product;
