
import { Provider } from 'react-redux'
import './App.css'
import Store from './Redux/Store'

function App() {

  return (
    <Provider store ={Store}>
    <>
      <div className='container'>Hello sir how are you</div>
    </>
    </Provider>
  )
}

export default App
