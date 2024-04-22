import React, { useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { Row, Col } from "react-bootstrap";
function CartScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();
  const qtyf = new URLSearchParams(location.search).get("qty");
  const qty = parseInt(qtyf);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  //
  // const [qty, setQty] = useState(1);
  //
  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    const isLoggedIn = localStorage.getItem("userInfo");
    if (isLoggedIn) {
      history("/shipping");
    } else {
      history(`/login`);
    }
  };
  return (
    <div className="container cart">
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <h2>Your Cart is empty</h2>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div className="cart_list">
              <img
                src={item.image}
                className="cart_list_image"
                alt={item.name}
              ></img>
              <Link to={`/product/${item.product}`}>{item.name}</Link>
              <div>Rs. {item.price}</div>
              <div className="product_screen_delivery_qty">
                <select
                  class="dropdown"
                  value={item.qty}
                  onChange={(e) =>
                    dispatch(addToCart(item.product, Number(e.target.value)))
                  }
                >
                  {[...Array(item.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="button cart_button"
                type="button"
                onClick={() => removeFromCartHandler(item.product)}
              >
                <i className="fas fa-trash trash"></i>
              </button>
            </div>
          ))}

          <div>
            Total:{" "}
            {cartItems.reduce((acc, items) => acc + items.qty * items.price, 0)}
          </div>
          {/* <Link to={"/shipping"}> */}
          <button
            className="button"
            disabled={cartItems.length === 0}
            onClick={checkoutHandler}
          >
            Proceed To Checkout
          </button>
          {/* </Link> */}
        </div>
      )}
    </div>
  );
}

export default CartScreen;
