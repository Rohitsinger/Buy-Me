import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import moment from 'moment'

const Orders = () => {

  const [orders, setOrders] = useState([])
  const [auth, setAuth] = useAuth()
  const getOrders = async () => {
    try {
      const { data } = await axios.get('api/v1/auth/orders')
      setOrders(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (auth?.token) getOrders()
  }, [auth?.token])
  return (
    <Layout title={"user Dashboard-orders"}>
      <div className=' bg-slate-200 text-center leading-10  mt-36  flex flex-col md:flex-row '>

        <div className=" md:w-1/3  ">
          <div className='text-lg hover:text-teal-700 flex flex-col'> Admin</div>
          <Link to="/dashboard/user/profile" className=' hover:bg-slate-500 p-2 m-4 bg-slate-300'>Profile</Link>
          <Link to="/dashboard/user/orders" className=' hover:bg-slate-500  p-2 m-4 bg-slate-300'>Orders</Link>
        </div>
        <div className='md:w-2/3   uppercase  bg-gray-300 '>
          <div className="p-3 text-2xl ">
            <h1 className=''>Products</h1>
            {orders.map((o, i) => (
              <>
                <table class="table-auto  flex justify-between ">
                  <thead className=' border-slate-500 '>

                    <tr className=' w-1/2 border-slate-500 space-y-2 md:space-x-20 font-bold md:flex md:flex-row '>
                      <th className='flex flex-col'>#</th>

                      <th className='flex flex-col'>Status</th>
                      <th className='flex flex-col'>Buyer</th>
                      <th className='flex flex-col'>Orders</th>
                      <th className='flex flex-col ml-4'>payment</th>
                      <th className='flex flex-col'>Quantity</th>

                      <hr />
                    </tr>
                  </thead>
                  <tbody>
                    <tr className=' md:space-x-20 w-1/2  md:flex md:flex-row flex flex-col '>
                      <th className='font-thin text-lg flex flex-col'>{i + 1}</th>

                      <td className='font-thin text-lg '>{o?.status}</td>
                      <td className='font-thin text-lg '>{o?.buyer?.name}</td>
                      <td className='font-thin text-lg '>{moment(o?.createAt).fromNow()}</td>
                      <td className='font-thin text-lg  '>{o?.payment?.success ? "Success" : "Failed"}</td>
                      <td className='font-thin text-lg '>{o?.products.length}</td>
                      <hr />
                    </tr>





                  </tbody>
                </table>

                <div className=' m-4 p-3  space-y-4'>
                  {o?.products?.map(c => (
                    <div className='flex border bottom-1 '>
                      <div >
                        <img src={c.imagePath} className='h-36 w-36' />
                      </div>
                      <div className='flex flex-col float-right mt-4 justify-center items-center mx-auto'>
                        <p className='text-xl font-semibold '>{c.name}</p>
                        <p className='text-sm '>{c.description}</p>
                        <p className='text-lg  '>Price:{c.price}</p>

                      </div>
                    </div>
                  ))}
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Orders
