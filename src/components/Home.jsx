import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, connect } from 'react-redux'
import { addProducts } from '../Redux/Actions/Action'



function Home(props) {
  const data = props.usersListReducer.products
 
    const url = 'https://my-json-server.typicode.com/singh233/JSON-Server'

    const dispatch = useDispatch()

    const [products , setProducts] = useState([])

    // fetch products from url
     const getProducts = async () => {
        const res = await fetch(`${url}/products`)
        const result =  await res.json()  
        // console.log(result)
        dispatch(addProducts(result))
        // console.log("hello",store.getState().usersListReducer.products)
     }
    
    useEffect(() => {
        getProducts()
        setProducts(data) 
    }, [props.usersListReducer.products]);
  return (
    <div className='hello'>
    {products.map((product) => {
      const {name, id, image} = product;
      return(
      <div key={id}>
        <div className="box">
          {<img src={image}/>}
        </div>
    
      </div>
      )
    })}
    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    usersListReducer : state.usersListReducer
  }
}
export default connect(mapStateToProps)(Home);