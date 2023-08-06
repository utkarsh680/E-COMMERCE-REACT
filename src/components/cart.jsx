import React from 'react'
import Navbar from './navbar'
import styles from '../styles/cart.module.css'
import { connect } from 'react-redux'


function Cart(props) {
  const data = props.usersListReducer.cartList;
  console.log("cart", data)
  return (
    <div className={styles.homeContainer}>
      <div className={styles.style}>
        <div className={styles.inStyle}></div>
      </div>
      <div className={styles.itemContainer}>
        <div className={styles.box}>
          <div className={styles.inBox}>
            <Navbar/>
            {data.map((item) =>{

              return(
                <div>
                  {item.image}
                </div>
              )

            })}
          </div>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    usersListReducer: state.usersListReducer,
  };
};
export default connect(mapStateToProps)(Cart);

