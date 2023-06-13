import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/auth'
import { Link } from 'react-router-dom'
const DashBoard = () => {
  const [auth] = useAuth()
  return (
    <div>
      <Layout title={"user dashboard"}>
      <div className=' bg-slate-200 text-center leading-10 flex mt-36 p-4'>
      
      <div className=" w-1/3 flex flex-col uppercase ">
      <div className='text-lg hover:text-teal-700'> Admin</div>
    
      <Link to="/dashboard/user/profile" className=' hover:bg-slate-500 p-2 m-4 bg-slate-300'>Profile</Link>
     <Link to="/dashboard/user/orders" className=' hover:bg-slate-500  p-2 m-4 bg-slate-300'>Orders</Link>
     </div>
     <div className='w-2/3  bg-slate-300'>
       <div className="p-3 text-2xl overflow-hidden sm:mr-4 ">
       <h1  className=' mt-8 '>User Name:{auth?.user?.name}</h1>
          <h1 className=' mt-8 '>User Email:{auth?.user?.email}</h1>
          <h1  className=' mt-8 '>User Phone No.:{auth?.user?.address}</h1>
          
       </div>
     </div>
    </div>
      </Layout>
    </div>
  )
}

export default DashBoard
