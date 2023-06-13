import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/auth'
const AdminMenu = () => {
  const [auth,setAuth] = useAuth()
  return (
    <>
   
   
  
    <div className=' bg-slate-200 text-center md:flex mb-8 md:flex-col h-56 '>
      
  
       <div className='text-lg hover:text-teal-700 m-2 p-2'> Admin</div>
     <div className='m-4 flex flex-col space-y-4' >
     <Link to="/dashboard/admin/create-category" className=' hover:bg-slate-500  bg-slate-300'>Create Category</Link>
      <Link to="/dashboard/admin/create-product" className=' hover:bg-slate-500   bg-slate-300'>Create Product</Link>
      <Link to="/dashboard/admin/users" className=' hover:bg-slate-500   bg-slate-300'>Users</Link>
      <Link to="/dashboard/admin/orders" className=' hover:bg-slate-500   bg-slate-300'>Admin Orders</Link>
      </div>
      </div>
   
   </>
  )
}

export default AdminMenu
