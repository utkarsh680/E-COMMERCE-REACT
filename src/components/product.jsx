import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { addProducts } from "../Redux/Actions/Action";
import styles from "../styles/product.module.css";
import Navbar from "./navbar";

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
  return (
    <div className={styles.homeContainer}>
      <div className={styles.style}></div>
      <div className={styles.itemContainer}>
        <div className={styles.box}>
          <div className={styles.inBox}>
            <Navbar />
            {products.map((product) => {
              const { name, id, image } = product;
              return (
                <div key={id}>
                  <div className={styles.imageBox}>
                    <div className={styles.Box}>
                      {product.name}
                    </div>
                  </div>
                </div>
              );
            })}
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
