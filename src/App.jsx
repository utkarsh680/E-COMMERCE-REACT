
import { Provider } from 'react-redux'
import Home from './components/home'
import './App.css'
import store from './Redux/Store'
import {Route, Routes} from "react-router-dom"
import Product from './components/product'
import Cart from './components/cart'
import Wishlist from './components/wishlist'


function App() {

  return (
    <div className='container'>

   
    <Provider store ={store}>
      <Routes>
      
      <Route path="/" element={ <Home />} />
      <Route path= "/product" element = {<Product/>} />
      <Route path= "/cart" element = {<Cart/>} />
      <Route path= "/wishlist" element = {<Wishlist/>} />
      
      </Routes>

    </Provider>
    
    </div>

  )
}

export default App
