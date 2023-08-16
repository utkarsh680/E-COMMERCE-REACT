import { Provider } from "react-redux";
import { Home,AddData} from "./components";
import { Product, Cart, Wishlist} from "./pages";
import "./App.css";
import store from "./Redux/Store";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="container">
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path ='/addData' element = {<AddData />} />
        </Routes>
      </Provider>
      <ToastContainer />
    </div>
  );
}

export default App;
