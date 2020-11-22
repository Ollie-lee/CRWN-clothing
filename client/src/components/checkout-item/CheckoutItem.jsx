import React from 'react';
import { connect } from 'react-redux';

import { addItem, clearItem, removeItem } from '../../redux/cart/cart.action';

import './checkout-item.scss';

function CheckoutItem({ item, clearItem, removeItem, addItem }) {
  const { name, imageUrl, price, quantity } = item;

  const handleRemove = (quantity, item) => {
    if (quantity === 1) {
      clearItem(item);
    } else {
      removeItem(item);
    }
  };

  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt="item" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => handleRemove(quantity, item)}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => addItem(item)}>
          &#10095;
        </div>
      </span>
      <span className="price">{price * quantity}</span>
      <div className="remove-button" onClick={() => clearItem(item)}>
        &#10005;
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  clearItem: (item) => dispatch(clearItem(item)),
  removeItem: (item) => dispatch(removeItem(item)),
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
