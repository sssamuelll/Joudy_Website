import React from "react";

type OrderItem = {
  id: string;
  type: string;
  title: string;
  price: string;
  imageSrc: string;
  quantity: number;
};

type OrderCartProps = {
  closeOrderCart: () => void;
  orderCartItems: OrderItem[];
  incrementItemQuantity: (itemId: string) => void;
  decrementItemQuantity: (itemId: string) => void;
};

const OrderCart: React.FC<OrderCartProps> = ({
  closeOrderCart,
  orderCartItems,
  incrementItemQuantity,
  decrementItemQuantity,
}) => {
  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2 className="cart-title">Cart</h2>
        <div className="cart-close">
          <span className="close-button" onClick={closeOrderCart}>
            X
          </span>
        </div>
      </div>
      <div className="cart-main">
        {orderCartItems.length === 0 ? ( // <-- The Modified Condition is Here
          <h2 className="cart-text">Your Cart is Empty</h2>
        ) : (
          <div className="cart-items">
            {orderCartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-image">
                  <img src={item.imageSrc} alt={item.title} />
                </div>
                <div className="article-info">
                  <div className="article-description">
                    <span className="cart-type">{item.type}</span>
                    <span className="cart-title">{item.title}</span>
                  </div>
                  <div className="quantity-container">
                    <div
                      className="article-button"
                      onClick={() => decrementItemQuantity(item.id)}
                    >
                      -
                    </div>
                    <span className="article-quantity">{item.quantity}</span>
                    <div
                      className="article-button"
                      onClick={() => incrementItemQuantity(item.id)}
                    >
                      +
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCart;
