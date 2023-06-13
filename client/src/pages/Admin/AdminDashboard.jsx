import React from 'react'
import Layout from '../../components/Layout/Layout'

 import { Link } from 'react-router-dom'
import { useAuth } from '../../context/auth'
const AdminDashboard = () => {
  const [auth,setAuth] = useAuth()
  return (
    <Layout>

     <div className=' bg-slate-200 text-center leading-10 flex mt-48 '>
      
      <div className=" w-1/3 flex flex-col uppercase ">
      <div className='text-lg hover:text-teal-700'> Admin</div>
    
    <Link to="/dashboard/admin/create-category" className=' hover:bg-slate-500 p-2 m-4 bg-slate-300'>Create Category</Link>
     <Link to="/dashboard/admin/create-product" className=' hover:bg-slate-500  p-2 m-4 bg-slate-300'>Create Product</Link>
   
     <Link to="/dashboard/admin/products" className=' hover:bg-slate-500  p-2 m-4 bg-slate-300'>Products</Link>
     <Link to="/dashboard/admin/orders" className=' hover:bg-slate-500  p-2 m-4 bg-slate-300'>Orders</Link>
     </div>
     <div className='w-2/3  bg-gray-500'>
       <div className="p-3 text-xl ">
          <h1  className=' mt-8 '>Admin Name:{auth?.user?.name}</h1>
          <h1 className=' mt-8 '>Admin Email:{auth?.user?.email}</h1>
          <h1  className=' mt-8 '>Admin Phone No.:{auth?.user?.phone}</h1>
       </div>
     </div>
     </div>
    </Layout>
  )
}

export default AdminDashboard
