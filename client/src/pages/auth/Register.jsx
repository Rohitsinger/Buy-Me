import { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const Register = () => {
  const navigate = useNavigate()
    const [posts,setPosts] = useState({
        name:"",
        email:"",
        password:"",
        address:"",
        phone:"",
        question:""
    })

    const handleValidation=()=>{
      if(!posts.name,!posts.email,!posts.password,!posts.address,!posts.phone){
        toast.error("Please fill all the fields")
      }else if(!posts.email.includes("@")){
        toast.error("Please give correct email")
      }else if(!posts.password>5){
        toast.error("Password Should be greater than 5 letters")
      }else if(!posts.phone>9 && posts.phone<11){
        toast.error("Please Enter a valid email")
      }else{
        return true;
      }
    }

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

   

   try {
    if(handleValidation()){
    
      const {data } =  await axios.post(`/api/v1/auth/register`,posts);
      if(data){
        toast.success("Register");
        navigate('/login')
       console.log("registered");
    
      }
    }
   } catch (error) {
     console.log(error);
     toast.error('Something went wrong')
   }
}

  return (
    <div>
        <form className=" w-full min-h-screen flex items-center justify-center mt-12">
    <a  className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-800">
    <img className="object-cover w-full rounded-t-lg lg:w-1/2  md:h-full md:w-48 md:rounded-none md:rounded-l-lg max-w-lg " src="https://images.pexels.com/photos/3302537/pexels-photo-3302537.jpeg?auto=compress&cs=tinysrgb&w=600" alt=""/>
    <div className="flex flex-col justify-between p-4 leading-normal lg:w-1/2">
      <h1 className=' flex items-center justify-center text-white text-3xl mt-4'>Register</h1>

      <input className=" font-normal text-gray-700 dark:text-gray-400 items-center mt-4 mr-4 p-4 rounded-lg outline-none" placeholder='Enter name' onChange={handleChange} name="name" value={posts.name} required autoComplete='off'/>
        <input className=" font-normal text-gray-700 dark:text-gray-400 items-center mt-4 mr-4 p-4 rounded-lg outline-none" placeholder='Enter email' onChange={handleChange} name="email" value={posts.email} required autoComplete='off'/>
        <input className=" font-normal text-gray-700 dark:text-gray-400 items-center mt-4 mr-4 p-4 rounded-lg outline-none" placeholder='Enter password' onChange={handleChange} name="password" value={posts.password} required autoComplete='off'/>
        <input className=" font-normal text-gray-700 dark:text-gray-400 items-center mt-4 mr-4 p-4 rounded-lg outline-none" placeholder='Enter address' onChange={handleChange} name="address" value={posts.address} required autoComplete='off'/>
        <input className=" font-normal text-gray-700 dark:text-gray-400 items-center mt-4 mr-4 p-4 rounded-lg outline-none" placeholder='Enter phone number' onChange={handleChange} name="phone" value={posts.phone} required autoComplete='off'/>
        <input className=" font-normal text-gray-700 dark:text-gray-400 items-center mt-4 mr-4 p-4 rounded-lg outline-none" placeholder='What is your favourite sports' onChange={handleChange} name="question" value={posts.question} required autoComplete='off'/>
        <button className='p-4 m-2 bg-slate-500 mt-4 mr-8 rounded-xl' onClick={handleSubmit}>Register</button>
    </div>
</a>
</form>
    </div>
  )
}

export default Register
