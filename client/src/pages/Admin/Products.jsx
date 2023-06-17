import { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'


import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
const Products = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {

    try {
      const { data } = await axios.get('/api/v1/product/get-product')
      if (data) {
        setProducts(data.products)

      } else {

        toast.error("Somthing went wrong")

      }
    } catch (error) {

      console.log(error);
      toast.error("Something went wrong")
    }
  }
  useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <Layout>
      <div className=' bg-slate-200 text-center leading-10 flex mt-[78px] mb-8'>

        <div className=" md:w-1/3 sm:w-full flex flex-col uppercase ">
          <div className='text-lg hover:text-teal-700'> Admin</div>

          <Link to="/dashboard/admin/create-category" className=' hover:bg-slate-500 p-2 m-4 bg-slate-300'>Create Category</Link>
          <Link to="/dashboard/admin/create-product" className=' hover:bg-slate-500  p-2 m-4 bg-slate-300'>Create Product</Link>
        
          <Link to="/dashboard/admin/products" className=' hover:bg-slate-500  p-2 m-4 bg-slate-300'>Products</Link>
        </div>

        <div className='md:w-2/3 sm:w-full inset-x-0  bg-gray-500 '>

          {/* {image.map(c=>(
       <div>
       <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={`api/v1/product/product-photo/${c._id}`} alt=""/>
       </div>
      ))} */}


          {products.map((prod) => (

            <>

              <Link to={`/dashboard/admin/product/${prod.slug}`} >
                <div className=" w-full min-h-screen flex items-center justify-center " >
                  <a class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">

                    <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-80 md:rounded-none md:rounded-l-lg" src={prod.imagePath} alt="" />

                    <div class="flex flex-col justify-between p-4 leading-normal">
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{prod.name}</h5>
                      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 items-center">{prod.description}</p>
                      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 items-center">Rs.{prod.price}...</p>

                    </div>

                  </a>
                </div>







              </Link>

            </>
          )
          )}


        </div>
      </div>
    </Layout>
  )
}

export default Products
