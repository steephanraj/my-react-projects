import './App.css';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from './store';
import Home from './components/Home';
import ProductDetail from './components/ProductDetail';
import ProductSearch from './components/ProductSearch';
import Cart from './components/Cart';
import OrderSuccess from './components/OrderSuccess';



function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <div className='container container-fluid'>
            <ToastContainer theme='dark' />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/search/:keyword' element={<ProductSearch />} />
              <Route path='/product/:id' element={<ProductDetail />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/order/success' element={<OrderSuccess />} />
            </Routes>

          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
