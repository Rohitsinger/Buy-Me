import React,{useEffect, useState} from 'react'
import Layout from '../../components/Layout/Layout'


import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import {Select} from 'antd'
const {Option} = Select


const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams()
  const [categories,setCategories] = useState([])
  const [category,setCategory] = useState("")
  const [name,setName] = useState("")
  const [description,setDescription] = useState("")
  const [price,setPrice] = useState("")
  const [quantity,setQuantity] = useState("")
  const [shipping,setShipping] = useState("")
  const [photo,setPhoto] = useState("")
  const [id,setId] = useState("")


  const getSingleCategories = async() =>{
    try {
      const {data} = await axios.get( `/api/v1/product/single-product/${params.slug}`)
      if(data){
        setName(data.product.name)
        // setCategory(data.product.category)
        setDescription(data.product.description)
        setQuantity(data.product.quantity)
        setPrice(data.product.price)
        setPhoto(data.product.imagePath)
        setShipping(data.product.shipping)
        setId(data.product._id)
        console.log(data.product.imagePath);
      }
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong while getting category")
    }
  }

  useEffect(()=>{
    getSingleCategories()
  },[])

  //get all category

  const getAllCategories = async() =>{
    try {
      const {data} = await axios.get('/api/v1/category/get-category')
      if(data){
        setCategories(data?.categories)
      }
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong while getting category")
    }
  }

  //handleCreate for submitting the form

  const handleUpdate = async(e) => {
     e.preventDefault();
     try {
      const ProductData = new FormData();
      ProductData.append("name",name)
      ProductData.append("description",description)
      ProductData.append("price",price)
      ProductData.append("quantity",quantity)
      ProductData.append("category",category)
     photo && ProductData.append("photo",photo)
      const {data} = await axios.put(`/api/v1/product/update-product/${id}`,ProductData,
      `https://api.cloudinary.com/v1_1/your_cloud_name/image/upload/${photo}`)
      if(data?.success===true){
        toast.error("Cant Submit")
      }else{
        
        toast.success("product updated Successfully")
        navigate('/dashboard/admin/products')
      }
     } catch (error) {
    
       console.log(error);
       toast.error("Something went wrong")
     }
  }
  
  useEffect(()=>{
    getAllCategories()
  },[])
console.log(categories)
  const handleDelete  =async()=>{
    try {
       let answer = window.prompt('Are you sure want to delete this product ? ')
       if(!answer) return 
        const {data} = await axios.delete(`/api/v1/product/delete-product/${id}`)
      if(data?.success===true){
       
      
        toast.success("product deleted Successfully")
        navigate('/dashboard/admin/products')
      } 
    } catch (error) {
        console.log(error);
    }
  }
 
  return (
    <Layout title={"Dashboard - Create Products"}>
   <div className=' text-center leading-10 flex mt-36 mb-8'>
      
      <div className=" w-1/3 flex flex-col uppercase ">
      <div className='text-lg hover:text-teal-700'> Admin</div>
    
    <Link to="/dashboard/admin/create-category" className=' hover:bg-slate-500 p-2 m-4 bg-slate-300'>Create Category</Link>
     <Link to="/dashboard/admin/create-product" className=' hover:bg-slate-500  p-2 m-4 bg-slate-300'>Create Product</Link>
     <Link to="/dashboard/admin/users" className=' hover:bg-slate-500  p-2 m-4 bg-slate-300'>Users</Link>
     </div>
     <div className='w-2/3 '>
     <h1  className=' mt-8 '>Update Product</h1>
       <div className=" text-2xl m-1  ">
         
          <Select bordered={false}  placeholder="Select a category" size='small' showSearch className='mb-3' onChange={(value)=>{setCategory(value)}} value={category.name}>
             {categories.map((c,_id)=>(
              <Option key={c._id} value={c._id}>{c.name}</Option>
             ))}
          </Select>
          <div>
            <label className=' mb-2 inline-block text-neutral-700 dark:text-neutral-200'   >
            {photo ? photo.name : "Upload Photo"}
            {console.log(photo)}
              <input type='file' name='photo' accept='image/*'  onChange={(e)=>setPhoto(e.target.files[0])}  className='relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary' size={25}/>
            </label>
          </div>
          <div className='mb-3'>
            {photo ?  (
              <div className='text-center'>
                <img src={photo} alt="picture"  className=''/>
              </div>
            ):(<div className='text-center'>
                <img src={"Image path"} alt="picture"  className=''/>
              </div>)}
          </div>
          <div className='mb-3'>
          <input type='text' value={name}  placeholder='write a name' onChange={(e)=>setName(e.target.value)}  className='relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary' size={25}/>
          </div>
          <div className='mb-3'>
          <textarea type='text' value={description}  placeholder='write a Description' onChange={(e)=>setDescription(e.target.value)}  className='relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary' size={25}/>
          </div>
          <div className='mb-3'>
          <input type='number' value={price}  placeholder='write a price' onChange={(e)=>setPrice(e.target.value)}  className='relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary' size={25}/>
          </div>
          <div className='mb-3'>
          <input type='number' value={quantity}  placeholder='write a Quantity' onChange={(e)=>setQuantity(e.target.value)}  className='relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary' size={25}/>
          </div>
          <div className='mb-3'>
          <Select type='text'  value={shipping ? "yes" : "No"}  placeholder='write a Shipping' onChange={(value)=>{setShipping(value)}}  className='relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary' size={25}>
            <Option value="0">No</Option>
            <Option value="1">Yes</Option>
          </Select>
          </div>
      
        
          <div className='m-2 p-2 bg-emerald-600'>
            <button onClick={handleUpdate}>Update Product</button>
          </div>
          <div className='m-2 p-2 bg-red-600'>
            <button onClick={handleDelete}>Delete Product</button>
          </div>
       </div>
     </div>
    </div>
    </Layout>
  )
}

export default UpdateProduct

