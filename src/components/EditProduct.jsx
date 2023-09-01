import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/editProduct.module.css";
import { faBan, faCheck, faCross } from "@fortawesome/free-solid-svg-icons";
import categoryIcon from "../assets/icons/category.svg";
import starIcon from "../assets/icons/star.svg";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { editProduct } from "../Redux/Actions/Action";
import { toast } from "react-toastify";
function EditProduct(props) {
  const { product, handleEditClick } = props;
  const dispatch = useDispatch();

  const nameRef = useRef();
  const ratingRef = useRef();
  const categoryRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();

  const handleToast = (msg) => {
    toast.error(msg, {
      position: "top-right",
      autoClose: 2000,
      className: "toast-message",
    });
  };

  const handleSaveClick = () => {
    if (nameRef.current.value === "") {
      handleToast("Field cannot be empty!");
      return;
    } else if (ratingRef.current.value === "" || ratingRef.current.value > 5) {
      handleToast("Rate between 0 to 5!");
      return;
    } else if (categoryRef.current.value === "Category") {
      handleToast("Field cannot be empty!");

      return;
    } else if (descriptionRef.current.value === "") {
      handleToast("Field cannot be empty!");
      return;
    } else if (priceRef.current.value === "") {
      handleToast("Field cannot be empty!");
      return;
    }
    const data = {
      ...product,
      name: nameRef.current.value,
      rating: ratingRef.current.value,
      category: categoryRef.current.value,
      description: descriptionRef.current.value,
      price: priceRef.current.value,
    };
    dispatch(editProduct(data));
    toast.success("Added!", {
      position: "top-right",
      autoClose: 2000,
      className: "toast-message",
    });
  };

  return (
    <>
      <div className={styles.blur}>
        <div
          className={styles.imgBox}
          style={{
            background: product.colorPalette
              ? `url("${product.image}"),  linear-gradient(to right, ${product.colorPalette.primary} 0%, ${product.colorPalette.secondary} 30%, black 90%`
              : "",
          }}
        >
          <div className={styles.overlay}>
            <div className={styles.image}>
              {product.image ? (
                <img
                  src={product.image}
                  className={styles.productImage}
                  alt=""
                />
              ) : (
                " "
              )}
            </div>
            <div className={styles.overlayMargin}>
              <div className={styles.productName}>
                <input ref={nameRef} type="text" defaultValue={product.name} />
              </div>
              <div className={styles.price}>
                <input
                  ref={priceRef}
                  type="number"
                  defaultValue={product.price}
                />
              </div>
              <div className={styles.detailsCard}>
                <textarea
                  ref={descriptionRef}
                  defaultValue={product.description}
                  placeholder="Add Description here...."
                />
              </div>

              <div className={styles.heading}>
                <p className={styles.category}>
                  {" "}
                  <img src={categoryIcon} alt="" />
                  <select defaultValue={product.category} ref={categoryRef}>
                    <option value="">Category</option>
                    <option value="Home & Kitchen">Home & Kitchen</option>
                    <option value="Electronics">Electronics</option>
                  </select>
                </p>
                <div className={styles.rating}>
                  {" "}
                  <div>
                    <input
                      type="number"
                      defaultValue={product.rating}
                      ref={ratingRef}
                    />
                  </div>
                  <div className={styles.outOff}>
                    {" "}
                    / 5 <img src={starIcon} alt="" />
                  </div>
                </div>
              </div>
              <div className={styles.button}>
                <div className={styles.saveButton} onClick={handleSaveClick}>
                  <FontAwesomeIcon icon={faCheck} />
                  <p>save</p>
                </div>
                <div
                  className={styles.cancelButton}
                  onClick={() => handleEditClick()}
                >
                  <FontAwesomeIcon icon={faBan} />
                  <p>cancel</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProduct;
