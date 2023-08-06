import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { addProducts } from "../Redux/Actions/Action";
import styles from "../styles/product.module.css";
import Navbar from "./navbar";
import { addToCart } from "../Redux/Actions/Action";

function Product(props) {
  const data = props.usersListReducer.products;
  const url = "https://my-json-server.typicode.com/singh233/JSON-Server";
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);

  // fetch products from url
  const getProducts = async () => {
    const res = await fetch(`${url}/products`);
    const result = await res.json();
    // console.log(result)
    dispatch(addProducts(result));
    // console.log("hello",store.getState().usersListReducer.products)
  };

  useEffect(() => {
    getProducts();
    setProducts(data);
  }, [props.usersListReducer.products]);

  const addProductToCart = (product) =>{
    dispatch(addToCart(product))
  }
  
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
            {products.map((product) => {
              const { name, id, image } = product;
              return (
                <div key={id}>
                 <div className={styles.imgBox}>
                  <button className={styles.addCart} onClick={() => addProductToCart(product)}>add cart</button>
                  <img src={product.image} alt="img" />
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

const mapStateToProps = (state) => {
  return {
    usersListReducer: state.usersListReducer,
  };
};
export default connect(mapStateToProps)(Product);
