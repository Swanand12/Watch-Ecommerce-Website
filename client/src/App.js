import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import UserDashboard from "./pages/user/UserDashboard";
import RequestOtp from "./pages/Auth/RequestOtp";
import VerifyOtp from "./pages/Auth/VerifyOtp";
import ResetPassword from "./pages/Auth/ResetPassword";
import UserRoute from "./components/Layout/routes/UserRoute";
import AdminRoute from "./components/Layout/routes/AdminRoute";
import AdminDashboard from "./pages/user/AdminDashboard";
import ManageCategory from "./pages/user/ManageCategory";
import CreateProducts from "./pages/user/CreateProducts";
import Products from "./pages/user/Products";
import UpdateProduct from "./pages/user/UpdateProduct";
import Search from "./components/Layout/Form/Search";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import UserProfile from "./pages/user/UserProfile";
import UserOrders from "./pages/user/UserOrders";
import AdminOrders from "./pages/user/AdminOrders";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/single-product/:slug" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/dashboard" element={<UserRoute />}>
          <Route path="user" element={<UserDashboard />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="user/orders" element={<UserOrders />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/manage-category" element={<ManageCategory />} />
          <Route path="admin/create-products" element={<CreateProducts />} />
          <Route path="admin/products/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/request-otp" element={<RequestOtp />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
