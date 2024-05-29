// Home.js
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from './shop-context'; // Импортируем контекст
import { SingleProduct } from './singleProduct';
import './home.css';
import assets from './assets/airpods.png';

function Home() {
  const navigate = useNavigate();
  //const { getTotalItemsInCart } = useContext(ShopContext); // Получаем функцию из контекста
  const [products, setProducts] = useState([]);
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  useEffect(() => {
    if (!(isLoggedIn && isLoggedIn === 'true')) {
      navigate('/login');
    } else {
      axios
        .get('http://localhost:8081/products')
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.log('Error fetching products: ', error);
        });
    }
  }, [isLoggedIn, navigate]);

  const userName = localStorage.getItem('userName');
  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>
          Hello, {userName}
        </h1>
      </div>
      <div className="products">
        {products.map((product, index) => (
          <SingleProduct key={index} data={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;
