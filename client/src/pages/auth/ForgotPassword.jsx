import Layout from "../../components/Layout/Layout"
import { Link } from "react-router-dom"
import { useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {  useNavigate } from 'react-router-dom'
const ForgotPassword = () => {
 
  const navigate = useNavigate()
    const [posts,setPosts] = useState({
     
        email:"",
        newPassword:"",
        question:""
        
    })



    const handleChange = (e) => {
        const {name,value} = e.target

        setPosts((prev)=>{
          return({
            ...prev,[name]:value
          }
            
          )
        })
    }
   

const handleSubmit = async(e) =>{
   e.preventDefault()
   console.log(posts.email,posts.newPassword);
   
   

   try {
   
    
      const {data } =  await axios.post(`/api/v1/auth/forgot-password`,posts);
      console.log(data);
      if(data.success===true){
        toast.success("Login");
       
        navigate( '/login')
       console.log("registered");
    
      
    }
   } catch (error) {
     console.log(error);
     toast.error('Something went wrong')
   }
}
  return (
    <Layout title={"Forgot Password - Buy Me"}>
     <div className='bg-gradient-to-r  from-teal-300 to-pink-300'>
    <div className="w-full max-w-xs min-h-screen flex items-center justify-center mt-12 m-auto ">
    
       <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
  
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" >
      Email
    </label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Email" onChange={handleChange} name="email" value={posts.email} required autoComplete='off'/>
  </div>
  <div className="mb-6">
    <label className="block text-gray-700 text-sm font-bold mb-2" >
      Password
    </label>
    <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"  type="password" placeholder="******************" onChange={handleChange} name="newPassword" value={posts.newPassword} required autoComplete='off'/>
    <p className="text-red-500 text-xs italic">Please choose a password.</p>
  </div>
  <div className="mb-6">
    <label className="block text-gray-700 text-sm font-bold mb-2" >
      Answer
    </label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"  type="text"  onChange={handleChange} name="question" value={posts.question} required autoComplete='off'/>
    <p className=" text-xs italic">Please Tell Me you favourite sports </p>
  </div>
  <div className="flex items-center justify-between">
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleSubmit}>
     Update
    </button>
  
  </div>
</form>
</div>
</div>
    </Layout>
  )
}

export default ForgotPassword
