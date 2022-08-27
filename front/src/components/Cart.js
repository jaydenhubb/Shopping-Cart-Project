import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart, decrement, increment, remoove, getTotal } from "../features/cartSlice";
import { useEffect } from "react";
const Cart = () => {
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();


  useEffect(()=>{
    dispatch(getTotal())
  },

   [dispatch, cart])
  // click functions
  const handleRemove = (item) => {
    dispatch(remoove(item));
  };

  const handleAdd = (item) => {
    dispatch(increment(item));
  };
  const handleDecrease = (item) => {
    dispatch(decrement(item));
  };
  const handleClear = (item)=>{
    dispatch(clearCart(item))
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className="empty">
          <p>Your Cart is currently empty</p>
          <div className="start-shopping">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
              </svg>
              <span>Start shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="p-title">Product</h3>
            <h3 className="p-price">Price</h3>
            <h3 className="p-quantity">Quantity</h3>
            <h3 className="p-total">Total Price</h3>
          </div>
          <div className="cart-items">
            {cart.cartItems?.map((cartItem) => (
              <div className="cart-item" key={cartItem.id}>
                <div className="cart-product">
                  <img src={cartItem.image} alt={cartItem.name} />
                  <div>
                    <h5>{cartItem.name}</h5>
                    <p>{cartItem.desc}</p>
                    <button
                      onClick={() => {
                        handleRemove(cartItem);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="product-price">${cartItem.price}</div>
                <div className="product-quantity">
                  <svg
                    onClick={() => {
                      handleDecrease(cartItem);
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-dash-lg"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"
                    />
                  </svg>
                  <span>{cartItem.quantity}</span>
                  <svg
                    onClick={() => {
                      handleAdd(cartItem);
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-plus-lg"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                    />
                  </svg>
                </div>
                <div className="total-price">
                  ${cartItem.price * cartItem.quantity}
                </div>
              </div>
            ))}
          </div>
          <div className="summary">
            <button className="clear-cart" onClick={()=> handleClear(cart)}>Clear-cart</button>
            <div className="checkout">
              <div className="subtotal">
                <span>Total</span>
                <span className="sub-amount">{cart.cartTotalAmount}</span>
              </div>
              <p>Free shipping within Africa</p>
              <button>Checkout</button>
              <div className="continue-shopping">
                <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-left-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                  </svg>
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Cart;
