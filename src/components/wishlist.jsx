import React from 'react'
import Navbar from './navbar'
import styles from '../styles/wishlist.module.css'
import { useSelector,useDispatch } from 'react-redux'
import { removeFromWishlist } from '../Redux/Actions/Action'

function Wishlist() {
  const myData = useSelector(state => state.usersListReducer.wishList)
  const dispatch = useDispatch()

  const removeProductFromWishList = (id) =>{
    dispatch(removeFromWishlist(id))
  }


  return (
    <div className={styles.homeContainer}>
    <div className={styles.style}>
      <div className={styles.inStyle}></div>
    </div>
    <div className={styles.itemContainer}>
      <div className={styles.box}>
        <div className={styles.inBox}>
          <Navbar/>

          {myData.map((item) =>{
            const {id, name, image} = item
            return(
            <div key={id}>
            <button className={styles.addCart} onClick={() => removeProductFromWishList(id)}>remove product</button>
            <h1>{name}</h1>
            {image}
            </div>
            )
            
          })}
        </div>
      </div>
    </div>
  </div>
  )
}

export default Wishlist