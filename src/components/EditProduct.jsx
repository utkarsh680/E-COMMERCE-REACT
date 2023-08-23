import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/editProduct.module.css";
import { faBan, faCheck, faCross } from "@fortawesome/free-solid-svg-icons";
import categoryIcon from "../assets/icons/category.svg";
import starIcon from "../assets/icons/star.svg";
function EditProduct(props) {
  const { product, handleEditClick } = props;
  console.log(product);
  return (
    <>
      <div
        className={styles.imgBox}
        style={{
          background: product.colorPalette
            ? `url("${product.image}"),  linear-gradient(to right, ${product.colorPalette.primary} 0%, ${product.colorPalette.secondary} 30%, black 90%`
            : " ",
        }}
      >
        <div className={styles.overlay}>
          <div className={styles.image}>
            <img src={product.image} alt="" />
          </div>
          <div className={styles.productName}>
            <input type="text" value={product.name} />
          </div>
          <div className={styles.price}>
            <input type="number" value={product.price} />
          </div>
          <div className={styles.detailsCard}>
            <textarea
              value={product.description}
              placeholder="Add Description here...."  
            >
              Enter text here...
            </textarea>
          </div>
          
                  <div className={styles.heading}>
                    <p className={styles.category}>
                      {" "}
                      <img src={categoryIcon} alt="" />
                      <select
                        value={product.category}
                       
                      >
                        <option value="">Category</option>
                        <option value="Home & Kitchen">Home & Kitchen</option>
                        <option value="Electronics">Electronics</option>
                      </select>
                    </p>
                    <div className={styles.rating}>
                      {" "}
                      <div>
                        <input type="number"
                          value={product.rating}
                          
                        >
                          
                        </input>
                      </div>
                      <div className={styles.outOff}>
                        {" "}
                        / 5 <img src={starIcon} alt="" />
                      </div>
                    </div>
                  </div>
          <div className={styles.button}>
            <div className={styles.saveButton}>
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
    </>
  );
}

export default EditProduct;
