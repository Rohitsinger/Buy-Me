import React,{useEffect, useState} from 'react'
import Layout from '../../components/Layout/Layout'

import { Button, Modal } from 'antd';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import CategoryForm from '../../components/Form/CategoryForm'

const CreateCategory = () => {
  const [category,setCategory] = useState([])
  const [name,setName] = useState("")
  const [open, setOpen] = useState(false);
 
  const [selected,setSelected] = useState(null)
  const [updatedName, setUpdatedName] = useState("");

   const showModal = () => {
    setOpen(true);
  };


  const handleUpdate = async(e)=>{
    e.preventDefault();
    try {
       const {data} = await axios.put(`/api/v1/category/update-category/${selected._id}`,{name:updatedName})
   
      if(data?.success){
        toast.success(`category is created`)
        setSelected(null)
        setUpdatedName("")
        setOpen(false)
        getAllCategories()
        
      }
    } catch (error) {
      console.log(error);
    }
  }

  //delete

  const handleDelete = async(id)=>{

    try {
       const {data} = await axios.delete(`/api/v1/category/delete-category/${id}`,{name:updatedName})
      
      if(data?.success){
        toast.success(`${updatedName} is deleted`)
       
      
        getAllCategories()
        
      }
    } catch (error) {
      console.log(error);
    }
  }

  //post data

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try {
      const {data} = await axios.post('/api/v1/category/create-category',{name})
      if(data?.success){
        toast.success(`${name} is created`)
        getAllCategories()
        
      }
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong while updating category")
    }
  }

//get all categories

const getAllCategories = async() =>{
  try {
    const {data} = await axios.get('/api/v1/category/get-category')
    if(data.success){
      setCategory(data.categories)
    }
  } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting category")
  }
}

useEffect(()=>{
  getAllCategories()
},[])

  return (
    <Layout title={"Dashboard - Create Category"}>
    <div className=' text-center leading-10 items-center flex flex-col md:flex-row mt-36 mb-8'>
      
      <div className=" w-1/3 flex flex-col  uppercase ">
      <div className='text-lg hover:text-teal-700'> Admin</div>
    
    <Link to="/dashboard/admin/create-category" className=' hover:bg-slate-500 p-2 m-4 bg-slate-300'>Create Category</Link>
     <Link to="/dashboard/admin/create-product" className=' hover:bg-slate-500  p-2 m-4 bg-slate-300'>Create Product</Link>
     <Link to="/dashboard/admin/users" className=' hover:bg-slate-500  p-2 m-4 bg-slate-300'>Users</Link>
     <Link to="/dashboard/admin/products" className=' hover:bg-slate-500  p-2 m-4 bg-slate-300'>Products</Link>
     </div>
     <div className='w-2/3  '>
       <div className="p-3 text-xl ">
       
      <h1 className='text-2xl uppercase serif underline'>Manage Category</h1> 
      <div className='p-3 '><CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/></div>
              <table class="table-auto leading-10 ">
  <thead className='border-4 border-slate-500'>
 
    <tr className='border-4 border-slate-500'>
      <th>Name</th>
     
      <th className='float-right lg:ml-96 '>Actions</th>
      <hr/>
    </tr>
  </thead>
  <tbody>
  
  
   {category?.map((c,_id) => (
    <>
    <tr className='ml-4'>
  <td key={c._id}>{c.name}</td>
  <td ><button className='lg:ml-96  w-24 p-1 mt-4 rounded-md bg-blue-600' onClick={()=>{setOpen(true);setUpdatedName(c.name);setSelected(c)}}>Edit</button></td>
  <td ><button className='lg:ml-2  w-24 p-1 mt-4 rounded-md bg-red-600' onClick={()=>{handleDelete(c._id)}}>Delete</button></td>
  </tr>
  </>
))}
  
  </tbody>
</table>
                <Button type="primary" onClick={showModal}>
        Open Modal with customized footer
      </Button>
      <Modal
        open={open}
     
        onCancel={()=>setOpen(false)}
        footer={[
         null
     
        ]}
      >
       <CategoryForm  value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>

      </Modal>
         
       </div>
     </div>
     </div>
     
    </Layout>
  )
}

export default CreateCategory
