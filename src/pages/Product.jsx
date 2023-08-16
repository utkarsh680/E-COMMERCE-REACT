import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faBars,
  faDotCircle,
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
import { ProductsCard } from "../components";

function Product() {
  const products = useSelector((state) => state.showDataReducer.products);

  const [showMenu, setShowMenu] = useState(false);
  const [hideMenu, setHideMenu] = useState(false);
  const url = "https://my-json-server.typicode.com/singh233/JSON-Server";

  const handleClick = () => {
    if (showMenu) {
      setShowMenu(!showMenu);
      setTimeout(() => {
        setShowMenu(false);
      }, 500);
    } else {
      setShowMenu(!showMenu);
      setHideMenu(true);
    }
  };

  const dispatch = useDispatch();
  const [item, setItem] = useState([]);
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
    dispatch(sortByHomeAndKitchen());
    console.log();
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
            <div className={styles.menuBox}>
              <div className={styles.menuButton}>
                <FontAwesomeIcon
                  icon={faBars}
                  className={styles.barIcon}
                  onClick={() => handleClick()}
                />

                {showMenu && (
                  <div className={styles.shortByPrice}>
                    <div
                      className={styles.shortLatest}
                      onClick={() => sortHighToLow(products)}
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
                      onClick={() => sortHighToLow(products)}
                    >
                      <FontAwesomeIcon icon={faArrowUp} />
                      <p>Low to High</p>
                    </div>
                    <div className={styles.borderBottom}></div>
                    <div
                      className={styles.shortLow}
                      onClick={() => sortLowToHigh(products)}
                    >
                      <FontAwesomeIcon icon={faArrowDown} />
                      <p>High To Low</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.categoryBox}>
              
                <div className={styles.categoryButton}>
              <FontAwesomeIcon icon={faArrowDown} />
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
              </div>
            </div>

            <div className={styles.cardBox}>
              {item.map((product) => {
                return <ProductsCard product={product} key={product.id} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
