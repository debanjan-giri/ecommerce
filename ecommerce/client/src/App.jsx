
import { Routes, Route } from "react-router-dom"; 



import "./index.css"; 
import "antd/dist/reset.css";



import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import Forgot from "./pages/Auth/Forgot";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashbord from "./pages/Admin/AdminDashbord";
import CreateProduct from "./pages/Admin/CreateProduct";
import CreateCategory from "./pages/Admin/CreateCategory";
import Users from "./pages/Admin/Users";
import Profile from "./pages/user/Profile";
import Orders from "./pages/user/Orders";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import ProductsDetails from "./pages/ProductsDetails";
import Categories from "./pages/categories";
import CategoryProduct from "./pages/CategoryProducts";
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/Admin/AdminOrders";



const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slug" element={<ProductsDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashbord />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />

        </Route>

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;























