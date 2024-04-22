import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Category from "./components/Category";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import CategoryProductScreen from "./screens/CategoryProductScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceorderScreen from "./screens/PlaceorderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";

function App() {
  return (
    <Router>
      <Navbar />
      {/* <Category /> */}
      {/* <HomeScreen /> */}
      <Routes>
        <Route path="/" element={<HomeScreen />} exact />
        <Route path="/login/" element={<LoginScreen />} />
        <Route path="/register/" element={<RegisterScreen />} />
        <Route path="/profile/" element={<ProfileScreen />} />
        <Route path="/product/:id" element={<ProductScreen />} />
        <Route path="/cart/:id?" element={<CartScreen />} />
        <Route path="/category/:id" element={<CategoryProductScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/payment/" element={<PaymentScreen />} />
        <Route path="/shipping/" element={<ShippingScreen />} />
        <Route path="/placeorder/" element={<PlaceorderScreen />} />
        <Route path="/admin/productlist" element={<ProductListScreen />} />
        <Route path="/admin/userlist" element={<UserListScreen />} />
        <Route path="/admin/orderlist" element={<OrderListScreen />} />
        <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
