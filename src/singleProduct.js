import React, { useContext } from 'react';
import airpods from "./assets/airpods.png";
import appleWatch from "./assets/appleWatch.png";
import homepod from "./assets/homepod.png";
import imac24 from "./assets/imac24.png";
import ipadpro11 from "./assets/ipadpro11.png";
import iphone15 from "./assets/iphone15.png";
import macbook from "./assets/macbook.png";
import visionPro from "./assets/visionPro.png";
import { ShopContext } from './shop-context';



export const SingleProduct = (props) => {
  const { id, name, price, imageName } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);

  const imageSrc = (() => {
    switch (imageName) {
        case 'airpods':
            return airpods;
        case 'appleWatch':
            return appleWatch;
        case 'homepod':
            return homepod;
        case 'imac24':
            return imac24;
        case 'ipadpro11':
            return ipadpro11;
        case 'iphone15':
            return iphone15;
        case 'macbook':
            return macbook;
        case 'visionPro':
            return visionPro;
        default:
            return null;
    }
})();

const cartItemCount = cartItems[id];

  return (
    <div className="product">
      <img src={imageSrc} />
      <div className="description">
        <p>
          <b>{name}</b>
        </p>
        <p> ${price}</p>
      </div>
      <button className="addToCartBttn" onClick={() => addToCart(id)}>
        Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
      </button>
    </div>
  );
};