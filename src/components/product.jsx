import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addData, addToWishlist, removeProduct } from "../Redux/Actions/Action";
import styles from "../styles/product.module.css";
import Navbar from "./Navbar";
import { addToCart } from "../Redux/Actions/Action";
import { toast } from "react-toastify";

function Product() {
  const products = useSelector((state) => state.showDataReducer.products);

  const [item, setItem] = useState([]);

  const url = "https://my-json-server.typicode.com/singh233/JSON-Server";
  const dispatch = useDispatch();

  // fetch products from url
  const getProducts = async () => {
    const res = await fetch(`${url}/products`);
    const result = await res.json();
    dispatch(addData(result));
  };

  useEffect(() => {
    let items = [];
    if (localStorage.getItem("product")) {
      items = JSON.parse(localStorage.getItem("product"));
    }
    items = [...items, ...products];
    setItem(items);
    console.log(item);
  }, [products]);

  useEffect(() => {
    getProducts();
  }, []);

  const removeProductClick = (id) => {
    dispatch(removeProduct(id));
    console.log(id)
  };

  const addProductToCart = (product) => {
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
            <div className={styles.cardBox}>
              {item.map((product) => {
                const { name, id, image } = product;
                return (
                  <div key={id}>
                    <div className={styles.imgBox}>
                      <button
                        className={styles.addCart}
                        onClick={() => addProductToCart(product)}
                      >
                        add cart
                      </button>
                      <button
                        className={styles.addCart}
                        onClick={() => addProductToWishlist(product)}
                      >
                        add to wishlist
                      </button>
                      <button
                        className={styles.addCart}
                        onClick={() => removeProductClick(id)}
                      >
                        remove
                      </button>
                      <h1>{name}</h1>
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
