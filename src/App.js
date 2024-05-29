// app.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ShopContextProvider } from './shop-context';
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';
import Navbar from './navBar';
import { Cart } from './Cart'; // Импортируем компонент корзины
import Checkout from './checkout';


function App() {
  return (
    <ShopContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<><Navbar /><Home /></>} />
          <Route path="/cart" element={<Cart />} /> {/* Добавляем маршрут для страницы корзины */}
          <Route path="/checkout" element={<Checkout />}/>
        </Routes>
      </BrowserRouter>
    </ShopContextProvider>
  );
}

export default App;
