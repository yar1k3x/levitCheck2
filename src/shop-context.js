import { createContext, useEffect, useState } from "react";
import { PRODUCTS } from "./products";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i < PRODUCTS.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const ShopContextProvider = (props) => {

  const [cartItems, setCartItems] = useState(getDefaultCart());

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = PRODUCTS.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  const getUserInfo = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(`http://localhost:8081/getUserInfo/${userId}`);
      return response;
    } catch (error) {
      console.error("Ошибка при получении информации о пользователе:", error);
      return null;
    }
  };
  

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const checkout = async (userId) => { // Добавлен параметр userId
    try {
      // Если userId не передан или не задан, выходим из функции
      if (!userId) {
        console.error("Не удалось получить userId.");
        return;
      }
      // Создаем объект с данными заказа
      const orderData = {
        userId: userId,
        totalAmount: getTotalCartAmount(),
      };
      // Отправляем запрос на создание заказа
      const orderResponse = await axios.post("http://localhost:8081/makeOrder", orderData);
      // Если заказ успешно создан
      if (orderResponse && orderResponse.data) {
        console.log("Заказ успешно создан:", orderResponse.data);
        // Очищаем корзину
        setCartItems(getDefaultCart());
      } else {
        console.log("Ошибка при создании заказа.");
      }
    } catch (error) {
      console.error("Ошибка при создании заказа:", error);
    }
  };
  

  const contextValue = {
    cartItems,
    getUserInfo,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    getTotalCartAmount,
    checkout,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
