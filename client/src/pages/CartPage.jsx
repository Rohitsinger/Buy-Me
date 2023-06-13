import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import DropIn from 'braintree-web-drop-in-react'
import axios from 'axios';
import { toast } from 'react-toastify'


const CartPage = () => {
  const navigate = useNavigate()
  const [cart, setCart] = useCart()
  const [auth, setAuth] = useAuth()
  const [instance, setInstance] = useState("")
  const [clientToken, setClientToken] = useState("")
  const [loading, setLoading] = useState(false)
  const [toggle,setToggle] = useState(false)
 

  //toggle
  const handleToggle =()=>{
    setToggle(!toggle)
  }
  //total price

  const totalprice = () => {
    try {

      let total = 0;
      cart?.map(item => { total = total + item.price })
      return total;
    } catch (error) {
      console.log(error);
    }
  }
  const removeCartItem = (cid) => {
    try {
      let myCart = [...cart]
      let index = myCart.findIndex(i => i._id === cid)
      myCart.splice(index, 1)
      setCart(myCart)
      localStorage.setItem('cart', JSON.stringify(myCart))
    } catch (error) {
      console.log(error);
    }
  };

  //getPayment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(`api/v1/product/braintree/token`)
      console.log(data);
      setClientToken(data?.clientToken)
      console.log(clientToken)


    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    getToken()
    console.log(clientToken);
  }, [auth?.token])

  //handlePayment
  const handlePayment = async() => {
    try {
      setLoading(true)
      const {nonce} = await instance.requestPaymentMethod();
      const {data} = await axios.post(`api/v1/product/braintree/payment`,{
        nonce,cart
      })
      setLoading(false)
      localStorage.removeItem('cart')
      setCart([]);
      navigate('/dashboard/user/orders')
      toast.success('Payment Completed Successfully')
    } catch (error) {
      console.log(error);
    }
   }

   
  return (
    <Layout>
      <div className='  mt-20 p-8'>
        <div className=' bg-yellow-200 mb-24'>
          <h1 className='text-center text-2xl font-sans'>{`Hello ${auth?.token && auth?.user?.name}`}</h1>
          <h4 className='text-center'>{cart?.length ? (`You have ${cart.length} items in your cart ${auth?.token ? "" : "please Login to Checkout"}`) : "Your Cart is Empty"}</h4>
        </div>
        <div className=' flex'>
          <div className='w-2/3   flex text-center rounded-xl border bottom-3  p-6 bg-white shadow-lg space-x-8 '>

            <div className=' m-4 p-3  space-y-4'>
              {cart?.map(c => (
                <div className='flex border bottom-1 '>
                  <div >
                    <img src={c.imagePath} className='h-36 w-36' />
                  </div>
                  <div className='flex flex-col float-right mt-4 justify-center items-center mx-auto'>
                    <p className='text-xl font-semibold '>{c.name}</p>
                    <p className='text-sm '>{c.description}</p>
                    <p className='text-lg  '>Price:{c.price}</p>
                    <div className='float-right'>
                      <button className='bg-red-500 p-2 m-2 w-24 ml-8 rounded-md text-center' onClick={() => removeCartItem(c._id)}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='w-1/3 text-center'>
            <h4>cart Summary</h4>
            <p>Total </p>
            <hr />
            <h4>Total:INR:{totalprice()}</h4>
            {auth?.user?.address ? (
              <>
                <div className='mt-6'>
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button className='text-yellow-500 border border-yellow-2 m-2 p-2 rounded-md mt-6 hover:bg-black' onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>
                </div>

              </>
            ) : (
              <div>
                {auth?.token ? (<button className='bg-red-500' onClick={() => navigate('/dashboard/user/profile')}></button>)
                  :
                  (<button className='bg-red-500' onClick={() => navigate('/login', { state: '/cart' })}></button>)}
              </div>
            )}
           
            <div className='mt-4'>
              {
                !clientToken || !cart?.length? (""):(
                  <>
                  <DropIn options={{ authorization : clientToken, paypal:{
                flow:"vault"
               }}}
              
             onInstance={(instance) => setInstance(instance)} />
                 <button
               className='bg-blue-500 rounded-lg p-2 m-2 transition-all hover:bg-teal-600' onClick={handlePayment}  
            disabled={loading || !instance || !auth?.user?.address}
              >
                {loading?"Processing":"Make Payment"}
              </button>
                  </>
                )
              }
    
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CartPage


           