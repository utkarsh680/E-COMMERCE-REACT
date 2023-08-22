
import styles from '../styles/editProduct.module.css'

function EditProduct(props) {
    const {product} = props;

  return (
    <>
    <div className={styles.click} > 
    <div className={styles.image}>
    <img src={product.image} alt="" />
    </div>
    <div>
        {product.name}
    </div>
    </div>
    </>

  )
}

export default EditProduct