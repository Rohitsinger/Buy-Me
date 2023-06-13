import { useEffect, useState } from "react"
import Layout from "../components/Layout/Layout"
import Slider from "../components/Slider"
import axios from "axios"
import { FaTimes, FaBars } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { Checkbox,Radio } from "antd"
import { Prices } from "../components/Prices"
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/cart"
import SearchInput from "../components/Form/SearchInput"
import { AiOutlineSearch } from 'react-icons/ai'
const Home = () => {
const navigate = useNavigate()
const [cart,setCart] = useCart()
const [items,setItems] = useState([])
   const [searching,setSearching] = useState("")
const [show, setShow] = useState(false);
  const [products,setProducts] = useState([])
  const [categories,setCategories] = useState([])
  const [checked,setChecked] = useState([])
  const [radio,setRadio] = useState([])
  const [total,setTotal] = useState(0)
  const [page,setPage] = useState(1)
 const [loading,setLoading] = useState(false)
 const [search,setSearch] = useState("")
  //get all categories

const getAllCategories = async() =>{
  try {
    const {data} = await axios.get(`/api/v1/category/get-category`)
    if(data.success){
      setCategories(data.categories)
    }
  } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting category")
  }
}




  const getAllProducts = async() => {
     
    try {
      setLoading(true)
     const {data} = await axios.get(`/api/v1/product/product-list/${page}`)
    
      setLoading(false)
        setProducts(data.products)
       
     
    } catch (error) {
   setLoading(false)
      console.log(error);
      toast.error("Something went wrong")
    }
 }

 //filter Checkbox
 const handleFilter =(value,id)=>{
    let all = [...checked]
    if(value){
      all.push(id)
    }else{
      all = all.filter(c=>c!==id)
    }
    setChecked(all)
 }

 //get filtered products

 const filteredProduct = async() => {
     
  try {
   const {data} = await axios.post('/api/v1/product/product-filters',{checked,radio})
   if(data){
      setProducts(data?.products)
     
   }
  } catch (error) {
 
    console.log(error);
    toast.error("Something went wrong")
  }
}

//pagination
const getTotalCount = async() => {
     
  try {
   const {data} = await axios.get('/api/v1/product/product-count')

      setTotal(data?.total)
     
   
  } catch (error) {
 
    console.log(error);
    toast.error("Something went wrong")
  }
}

useEffect(()=>{
if(page===1) return
LoadMore();
  },[page])

//loadmore

const LoadMore=async()=>{
  try {
    setLoading(true)
    const {data} = await axios.get(`/api/v1/product/product-list/${page}`)
    setLoading(false)
    setProducts([...products,...data?.products])
  } catch (error) {
    console.log(error);
  }
}



useEffect(()=>{
  getAllCategories()
 
  getTotalCount()
},[])

  useEffect(()=>{
   if(!checked.length || !radio.length) getAllProducts()
  },[checked.length,radio.length])

  useEffect(()=>{
   if(checked.length|| radio.length ) filteredProduct()
   },[checked,radio])

 return (
    <Layout title={'Best Offers'} >
    
     <div className=' bg-slate-200 text-center leading-10    mt-[30px] mb-8'>
    
      <Slider/>

    <div  onClick={() => setShow(!show)} className="sticky ml-4 ">
            {show ?
              <FaTimes size={35} />
              :
              <FaBars size={35} />
            }
            
          </div>
          {show?(<> 
            <div className=" md:fixed inset-y-0 md:mt-36 uppercase bg-slate-900 md:h-full  md:w-1/6 ">
      
      <div className='text-lg hover:text-teal-700 text-white mt-20'>  Filter by Category</div>
          {categories?.map((c)=>(
        <Checkbox key={c._id} onChange={(e)=>handleFilter(e.target.checked,c._id)} className="text-white ">{c.name}</Checkbox>
      ))}
      <button className=" bg-red-400 rounded-xl" onClick={()=>window.location.reload()}>RESET FILTERS</button>
      </div>
      </>
      
      ):(null)}

      <div className="">
      <button className='bg-blue-600 rounded-full p-2 float-right mb-4'><AiOutlineSearch/></button>
      <input type="text" id="search-navbar" class="block w-72 float-right p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-2" placeholder="Search..." onChange={(e)=>{setSearch(e.target.value)}} value={search}></input>
    
  

    </div>
         
      {/* <div className="    uppercase bg-slate-900  text-white">
      Filter by Price
     <Radio.Group onChange={(e)=>setRadio(e.target.value)}>
       {Prices?.map((p)=>(
        <div key={p._id}>
        <Radio value={p.array} className=" text-white" onChange={(e)=>setRadio(e.target.value)}>{p.name}</Radio>
        </div>
       ))}
     </Radio.Group>
     </div> */}

     


   
     
 
    <div className='md:grid md:grid-flow-row md:grid-cols-2 md:ml-36 md:mt-24'>
    
   
       {products.filter((val)=>{
        if(search===""){return val}
        else if(val.name.toLowerCase().includes(search.toLowerCase())){
          return val;
        }
       }).map((prod,i)=>(
        <>
        <div className=" w-full  h-full flex items-center justify-center mb-4 " >
    <a  class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={prod.imagePath} alt=""/>
    <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{prod.name}</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 items-center">{prod.description.substring(0,10)}...</p>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 items-center">Rs.{prod.price}...</p>
      <div className="flex justify-between space-x-8 mt-4">
      <button className="bg-blue-400 text-white m-1 p-1  rounded" onClick={()=>navigate(`/product/${prod.slug}`)}> Details</button>
      <button className="bg-emerald-400 text-white p-3 m-1 rounded-full"
       onClick={()=>{setCart([...cart,prod]);
         localStorage.setItem('cart',JSON.stringify([...cart,prod]))
         toast.success('item added to cart');
       }}>+</button>
      </div>
    </div>
  
</a>
</div>
     
  
     
   
   


           
  </>
        )
       )}
        
       </div>
       <div>
        {products && products.length < total && <button className="bg-red-500 rounded-lg m-2 p-2 transition-all hover:bg-teal-600" 
         onClick={(e)=>{e.preventDefault();
         setPage(page+1)
         }}>{loading?"loading...":"LoadMore"}</button>}
      </div> 
     </div>

  </Layout>
  )
}

export default Home
