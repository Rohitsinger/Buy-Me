import Layout from "../components/Layout/Layout"
import React,{useState,useEffect} from 'react'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from "../context/cart"
const ProductDetails = () => {
    const params = useParams();
    const [products,setProducts] = useState([]);
    const [cart,setCart] = useCart()
    
    const getSingleProducts = async() => {
     
        try {
         const {data} = await axios.get(`/api/v1/product/single-product/${params.slug}`)
         if(data){
            setProducts(data?.product)
           
         }
        } catch (error) {
       
          console.log(error);
          
        }
     }
     useEffect(()=>{
       if(params?.slug) getSingleProducts()
      
      },[params?.slug])
  return (
    <Layout>
    <div className='row-auto mx-auto container mt-[75px] py-24'>
    
    <div className="md:flex md:justify-between ">
    <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={products.imagePath} alt="cart"/>
    <div class="flex flex-col justify-between p-4 leading-normal text-lg">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Name:{products.name}</h5>
        <p class="mb-3  text-gray-900 items-center">Description:{products.description}...</p>
        <p class="mb-3  text-gray-900 items-center">Price:Rs.{products.price}...</p>
        <p class="mb-3  text-gray-900 items-center">Category:{products.category?.name}</p>
       
    
      <button className='m-1 p-1 bg-green-200 rounded-lg hover:bg-teal-500 transition-all' onClick={()=>{setCart([...cart,products]);
         localStorage.setItem('cart',JSON.stringify([...cart,products]))
         toast.success('item added to cart');
       }}>Add to Cart</button>
 
  
      </div>
  

</div>
      </div>
    </Layout>
  )
}

export default ProductDetails
