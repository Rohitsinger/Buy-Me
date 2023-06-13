import { useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import { Link } from 'react-router-dom'
const Login = () => {
  const location = useLocation()
  const [auth,setAuth] = useAuth()
  const navigate = useNavigate()
    const [posts,setPosts] = useState({
     
        email:"",
        password:"",
        
    })


    const handleValidation=()=>{
      if(!posts.email,!posts.password){
        toast.error("Please fill all the fields")
      }else if(!posts.email.includes("@")){
        toast.error("Please give correct email")
      }else if(!posts.password>5){
        toast.error("Password Should be greater than 5 letters")
    
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
   
    
      const {data } =  await axios.post(`/api/v1/auth/login`,posts);
      console.log(data);
      if(data.success===true){
        toast.success("Login");
        setAuth({...auth,user:data.user,token:data.token})
        localStorage.setItem("auth",JSON.stringify(data))
        navigate(location.state|| '/')
      
    
      
    }
   } catch (error) {
     console.log(error);
     toast.error('Something went wrong')
   }
}

  return (
    <div className='bg-gradient-to-r  from-teal-300 to-pink-300 my-auto'>
    <div className="w-full max-w-xs min-h-screen flex items-center justify-center mt-12 m-auto ">
    
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
  
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Email
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="text" placeholder="Email" onChange={handleChange} name="email" value={posts.email} required autoComplete='off'/>
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Password
      </label>
      <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"  type="password" placeholder="******************" onChange={handleChange} name="password" value={posts.password} required autoComplete='off'/>
      <p className="text-red-500 text-xs italic">Please choose a password.</p>
    </div>
    <div className="flex items-center justify-between">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleSubmit}>
        Sign In
      </button>
      <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to="/forget-password">
        Forgot Password?
      </Link>
    </div>
  </form>
    </div>
        {/* <form className=" w-full min-h-screen flex items-center justify-center mt-12">
    <a  className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-800">
    <img className="object-cover w-full rounded-t-lg lg:w-1/2  md:h-full md:w-48 md:rounded-none md:rounded-l-lg max-w-lg " src="https://images.pexels.com/photos/3302537/pexels-photo-3302537.jpeg?auto=compress&cs=tinysrgb&w=600" alt=""/>
    <div className="flex flex-col justify-between p-4 leading-normal lg:w-1/2">
      <h1 className=' flex items-center justify-center text-white text-3xl mt-4'>Login</h1>

     
        <input className=" font-normal text-gray-700 dark:text-gray-400 items-center mt-4 mr-4 p-4 rounded-lg outline-none" placeholder='Enter email' onChange={handleChange} name="email" value={posts.email} required autoComplete='off'/>
        <input className=" font-normal text-gray-700 dark:text-gray-400 items-center mt-4 mr-4 p-4 rounded-lg outline-none" placeholder='Enter password' onChange={handleChange} name="password" value={posts.password} required autoComplete='off'/>
       
        <button className='p-4 m-2 bg-slate-500 mt-4 mr-8 rounded-xl' onClick={handleSubmit}>Login</button>
    </div>
</a>
</form> */}
    </div>
  )
}

export default Login
