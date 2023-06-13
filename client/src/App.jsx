
import './App.css'
import Home from './pages/Home'
import {Route,Routes,} from 'react-router-dom'

import Footer from './components/Layout/Footer'

import Products from './pages/Admin/Products'
import About from './pages/About'
import Contact from './pages/Contact'
import Policy from './pages/Policy'
import PageNotFound from './pages/PageNotFound'
import Layout from "./components/Layout/Layout";
import Register from './pages/auth/Register'

import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import Login from './pages/auth/Login'
import DashBoard from './pages/user/DashBoard'
import PrivatRoute from './components/Routes/PrivatRoute'
import ForgotPassword from './pages/auth/ForgotPassword'
import AdminRoute from './components/Routes/AdminRoute'
import AdminDashboard from './pages/Admin/AdminDashboard'
import CreateCategory from './pages/Admin/CreateCategory'
import CreateProduct from './pages/Admin/CreateProduct'

import Orders from './pages/user/Orders'
import Profile from './pages/user/Profile'
import UpdateProduct from './pages/Admin/UpdateProduct'
import ProductDetails from './pages/ProductDetails'
import CartPage from './pages/CartPage'
import CheckoutSuccess from './pages/CheckoutSuccess'
import AdminOrders from './pages/Admin/AdminOrders'




function App() {
  axios.defaults.baseURL = 'http://localhost:8000'

  return (
  <>

 
<Layout>
{/* <Header/> */}
  <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/product/:slug' element={<ProductDetails/>}></Route>
    <Route path='/dashboard' element={<PrivatRoute/>}>
    <Route path='user' element={<DashBoard/>}/>
    <Route path='user/orders' element={<Orders/>}/>
    <Route path='user/profile' element={<Profile/>}/>
    </Route>
    <Route path='/dashboard' element={<AdminRoute/>}>
    <Route path='admin' element={<AdminDashboard/>}/>
    <Route path='admin/create-category' element={<CreateCategory/>}/>
    <Route path='admin/create-product' element={<CreateProduct/>}/>
    <Route path='admin/product/:slug' element={<UpdateProduct/>}/>
    <Route path='admin/products' element={<Products/>}/>
  
    <Route path='admin/orders' element={<AdminOrders/>}/>
    </Route>
    <Route path='/forget-password' element={<ForgotPassword/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/about' element={<About/>}/> 
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/policy' element={<Policy/>}/>
    <Route path='/cart' element={<CartPage/>}/>
    <Route path='/checkout-success' element={<CheckoutSuccess/>}/>
  

    <Route path='*' element={<PageNotFound/>}></Route>
  </Routes>
  <Footer/>
</Layout>
  </>
  )
}

export default App
