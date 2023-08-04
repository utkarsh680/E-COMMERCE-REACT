
import { Provider } from 'react-redux'
import Home from './components/home'
import './App.css'
import store from './Redux/Store'

function App() {

  return (
    <Provider store ={store}>
    <>
      <div className='container'>
        <Home/>
      </div>
    </>
    </Provider>
  )
}

export default App
