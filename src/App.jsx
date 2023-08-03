
import { Provider } from 'react-redux'
import './App.css'
import store from './Redux/Store'

function App() {

  return (
    <Provider store ={store}>
    <>
      <div className='container'>Hello sir how are you</div>
    </>
    </Provider>
  )
}

export default App
