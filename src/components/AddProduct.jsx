import Navbar from "./Navbar";
import styles from "../styles/addProducs.module.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { addProduct } from "../Redux/Actions/Action";
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
import { v4 as uuidv4 } from "uuid";

function AddProduct() {
  const [showDescription, setShowDescription] = useState(false);
  const [hide, setHide] = useState(false);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  const id = uuidv4();
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

  const handleToast = (msg) => {
    toast.error(msg , {
      position: "top-right",
      autoClose: 2000,
      className: 'toast-message'
    })
  }
  const handleAddTask = () => {
    
    if (name === '') {
      handleToast('Field cannot be empty!')
      return;
    } else if (rating === '' || rating > 5) {
        handleToast('Rate between 0 to 5!')
        return;
    } else if (category === 'Category') {
      handleToast('Field cannot be empty!')
     
      return;
    } else if (description === '') {
      handleToast('Field cannot be empty!')
      return;
    } else if (price === '') {
      handleToast('Field cannot be empty!')
      return;
    }
    const items = {
      id,
      name,
      rating,
      category,
      price,
      description
    };
    dispatch(addProduct({ items }));
    toast.success('Product Added!', {
      position: "top-right",
      autoClose: 2000,
      className: 'toast-message'
    });
    setName("");
    setRating(0);
    setCategory("");
    setPrice(0);
    setDescription("");
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.style}>
        <div className={styles.inStyle}>electro</div>
      </div>
      <div className={styles.itemContainer}>
        <div className={styles.box}>
          <div className={styles.inBox}>
            <Navbar/>
            <div className={styles.logo}>
              <div>
                <h3>electro</h3>
              </div>
              <div className={styles.point}></div>
            </div>

            <div className={styles.imgBox}>
              <div className={styles.overlay}>
                <div className={styles.image}>
                  <img
                    src="https://img.freepik.com/free-photo/beautiful-glowing-gray-full-moon_181624-59870.jpg?w=740&t=st=1692939690~exp=1692940290~hmac=0cde2ae2e0aeee1764df0fdafec9cb5fbed559f5c8b5fb80febc93ce08479c7b"
                    alt=""
                  />
                </div>
                <div className={styles.details}>
                  <div className={styles.heading}>
                    <p className={styles.category}>
                      {" "}
                      <img src={categoryIcon} alt="" />
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="">Category</option>
                        <option value="Home & Kitchen">Home & Kitchen</option>
                        <option value="Electronics">Electronics</option>
                      </select>
                    </p>
                    <div className={styles.rating}>
                      {" "}
                      <div>
                        <select
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                      <div className={styles.outOff}>
                        {" "}
                        / 5 <img src={starIcon} alt="" />
                      </div>
                    </div>
                  </div>
                  <div className={styles.price}>
                    <p className={styles.name}>
                      {" "}
                      <input
                        type="text"
                        value={name}
                        placeholder="Product Name"
                        onChange={(e) => setName(e.target.value)}
                      />{" "}
                    </p>
                    <p className={styles.dollor}>
                      {" "}
                      <span>$</span>
                      {
                        <input
                          type="number"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          placeholder="00"
                        />
                      }{" "}
                    </p>
                  </div>
                </div>
                <div className={styles.actions}>
                  <button
                    className={styles.addToCart}
                    onClick={() => handleAddTask()}
                  >
                    <FontAwesomeIcon
                      icon={faBagShopping}
                      className={styles.cartIcon}
                    />{" "}
                    Add Product
                  </button>
                </div>
                <FontAwesomeIcon
                  icon={!showDescription ? faAngleRight : faAngleLeft}
                  className={styles.arrow}
                  onClick={() => handleClick()}
                />
                {showDescription && (
                  <div className={styles.detailsCard}>
                    <textarea value={description} placeholder = "Add Description here...." onChange={(e) => setDescription(e.target.value)}>
                      Enter text here...
                    </textarea>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
