
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'

import { useAuth } from '../../context/auth'
import axios from 'axios'
import moment from 'moment'

import AdminMenu from '../../components/Layout/AdminMenu'
import { Select } from 'antd'
const { Option } = Select

const AdminOrders = () => {
  const [status, setStatus] = useState(["Not Process", "Processing", "Shipped", "delivered", "cancel"])
  const [changeStatus, setChangeStatus] = useState("")
  const [orders, setOrders] = useState([])
  const [auth, setAuth] = useAuth()
  const getOrders = async () => {
    try {
      const { data } = await axios.get('api/v1/auth/all-orders')
      setOrders(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (auth?.token) getOrders()
  }, [auth?.token])

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`api/v1/auth/order-status/${orderId}`, { status: value })
      getOrders()
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Layout>
      <div className='mt-36 flex flex-col md:flex-row mb-8  '>
        <div className='md:w-1/4 mt-4 p-2 '>
          <AdminMenu />
        </div>

        <div className='md:w-2/3   uppercase  '>
          <div className="p-3 text-2xl ">
            <h1 className='ml-24 mb-8 md:ml-0'>Products</h1>
            {orders.map((o, i) => (
              <>
                <table class="flex md:block space-x-12  border-2 border-sky-500">
                  <thead className=' border-slate-500 '>

                    <tr className=' w-1/2 border-slate-500  md:space-x-20 font-bold md:flex md:flex-row flex flex-col'>
                      <th className='flex flex-col'>#</th>

                      <th className='flex flex-col'>Status</th>
                      <th className='flex flex-col'>Buyer</th>
                      <th className='flex flex-col'>Orders</th>
                      <th className='flex flex-col ml-4'>payment</th>
                      <th className='flex flex-col'>Item</th>

                      <hr />
                    </tr>
                  </thead>
                  <tbody>
                    <tr className=' md:space-x-20 w-1/2  md:flex md:flex-row flex flex-col  ml-8 md:ml-0'>
                      <th className='font-thin text-lg '>{i + 1}</th>

                      <td className='font-thin text-sm md:text-lg'>
                        <Select bordered={false} onChange={(value) => handleChange(o._id, value)} defaultValue={o?.status}>
                          {status?.map((s, i) => (
                            <Option key={i} value={s._id}>{s}</Option>
                          ))}
                        </Select>
                      </td>
                      <td className='font-thin text-sm md:text-lg'>{o?.buyer?.name}</td>
                      <td className='font-thin text-sm md:text-lg'>{moment(o?.createAt).fromNow()}</td>
                      <td className='font-thin text-sm md:text-lg '>{o?.payment?.success ? "Success" : "Failed"}</td>
                      <td className='font-thin text-sm md:text-lg px-16'>{o?.products.length}</td>
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

export default AdminOrders


