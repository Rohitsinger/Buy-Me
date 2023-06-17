import {useState,useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import {toast} from 'react-toastify'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/auth'
const Profile = () => {
  const [auth,setAuth] = useAuth()
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassowrd] = useState("")
  const [address,setAddress] = useState("")
  const [phone,setPhone] = useState("")

      
   useEffect(()=>{
  const {name,email,phone,address} = auth?.user;
  setEmail(email)
  setName(name)
  setPhone(phone)
  setAddress(address)
 
},[auth?.user])

const handleSubmit = async(e) =>{
   e.preventDefault()
 
   

   try {
 
    
      const {data } =  await axios.put(`/api/v1/auth/profile`,{
        name,
        password,
        email,
        phone,
        address
      });
      if(data?.error){
        toast.error(data?.error);
      }else{
        setAuth({...auth,user:data?.updatedUser})
        let ls = localStorage.getItem('auth')
        ls = JSON.parse(ls)
        ls.user = data.updatedUser;
        localStorage.setItem('auth',JSON.stringify(ls));
        toast.success("updated profile")
      }
   } catch (error) {
     console.log(error);
     toast.error('Something went wrong')
   }
}


  return (
    <Layout title={"user Dashboard-profile"}>
              
      <div className='md:flex block mt-32'>
      <div className=" md:w-1/3 flex flex-col uppercase ">
      <div className=' hover:text-teal-700 text-center text-4xl'> Admin</div>
    
    <Link to="/dashboard/user/profile" className=' hover:bg-slate-500 p-2 m-4 text-center bg-slate-300'>Profile</Link>
     <Link to="/dashboard/user/orders" className=' hover:bg-slate-500  p-2 m-4 text-center bg-slate-300'>Orders</Link>
     
     </div>
     <div className='bg-gradient-to-r  from-teal-300 to-pink-300 my-auto md:w-2/3'>
    <div className="w-full max-w-xs min-h-screen flex items-center justify-center mt-12 m-auto ">
    
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
  <div className="mb-4">
    
    <label className="block text-gray-700 text-sm font-bold mb-2" >
      Name
    </label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="text" placeholder="Name" onChange={(e)=>setName(e.target.value)} name="name" value={name}  autoComplete='off'/>
  </div>
  
    <div className="mb-4">
    
      <label className="block text-gray-700 text-sm font-bold mb-2"  >
        Email
      </label>
      <input disabled className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="text" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} name="email" value={email}  autoComplete='off'/>
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Password
      </label>
      <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"  type="password" placeholder="******************" onChange={(e)=>setPassowrd(e.target.value)} name="password" value={password}  autoComplete='off'/>
      <p className="text-red-500 text-xs italic">Please choose a password.</p>
    </div>
    <div className="mb-4">
    
    <label className="block text-gray-700 text-sm font-bold mb-2" >
      Address
    </label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="text" placeholder="Address" onChange={(e)=>setAddress(e.target.value)} name="address" value={address}  autoComplete='off'/>
  </div>
  <div className="mb-4">
    
    <label className="block text-gray-700 text-sm font-bold mb-2" >
      Phone
    </label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="text" placeholder="Phone" onChange={(e)=>setPhone(e.target.value)} name="phone" value={phone}  autoComplete='off'/>
  </div>

    <div className="flex items-center justify-between">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleSubmit}>
       Update
      </button>
      <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to="/forget-password">
        Forgot Password?
      </Link>
    </div>
  </form>
    </div>
    </div>
    </div> 
    </Layout>
  )
}

export default Profile

// import { useState } from 'react'
// import axios from 'axios'
// import {toast} from 'react-toastify'
// import { useNavigate } from 'react-router-dom'
// const Register = () => {
//   const navigate = useNavigate()
//     const [posts,setPosts] = useState({
//         name:"",
//         email:"",
//         password:"",
//         address:"",
//         phone:"",
//        
//     })

//     const handleValidation=()=>{
//       if(!posts.name,!posts.email,!posts.password,!posts.address,!posts.phone){
//         toast.error("Please fill all the fields")
//       }else if(!posts.email.includes("@")){
//         toast.error("Please give correct email")
//       }else if(!posts.password>5){
//         toast.error("Password Should be greater than 5 letters")
//       }else if(!posts.phone>9 && posts.phone<11){
//         toast.error("Please Enter a valid email")
//       }else{
//         return true;
//       }
//     }

//     const handleChange = (e) => {
//         const {name,value} = e.target

//         setPosts((prev)=>{
//           return({
//             ...prev,[name]:value
//           }
            
//           )
//         })
//     }
   

// const handleSubmit = async(e) =>{
//    e.preventDefault()
//   //  console.log(name,email,password,location,phone);
   

//    try {
//     if(handleValidation()){
    
//       const {data } =  await axios.post(`/api/v1/auth/register`,posts);
//       if(data){
//         toast.success("Register");
//         navigate('/login')
//        console.log("registered");
    
//       }
//     }
//    } catch (error) {
//      console.log(error);
//      toast.error('Something went wrong')
//    }
// }

//   return (
//     <div>
//         <form className=" w-full min-h-screen flex items-center justify-center mt-12">
//     <a  className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-800">
//     <img className="object-cover w-full rounded-t-lg lg:w-1/2  md:h-full md:w-48 md:rounded-none md:rounded-l-lg max-w-lg " src="https://images.pexels.com/photos/3302537/pexels-photo-3302537.jpeg?auto=compress&cs=tinysrgb&w=600" alt=""/>
//     <div className="flex flex-col justify-between p-4 leading-normal lg:w-1/2">
//       <h1 className=' flex items-center justify-center text-white text-3xl mt-4'>Register</h1>

//       <input className=" font-normal text-gray-700 dark:text-gray-400 items-center mt-4 mr-4 p-4 rounded-lg outline-none" placeholder='Enter name' onChange={handleChange} name="name" value={posts.name}  autoComplete='off'/>
//         <input className=" font-normal text-gray-700 dark:text-gray-400 items-center mt-4 mr-4 p-4 rounded-lg outline-none" placeholder='Enter email' onChange={handleChange} name="email" value={posts.email}  autoComplete='off'/>
//         <input className=" font-normal text-gray-700 dark:text-gray-400 items-center mt-4 mr-4 p-4 rounded-lg outline-none" placeholder='Enter password' onChange={handleChange} name="password" value={posts.password}  autoComplete='off'/>
//         <input className=" font-normal text-gray-700 dark:text-gray-400 items-center mt-4 mr-4 p-4 rounded-lg outline-none" placeholder='Enter address' onChange={handleChange} name="address" value={posts.address}  autoComplete='off'/>
//         <input className=" font-normal text-gray-700 dark:text-gray-400 items-center mt-4 mr-4 p-4 rounded-lg outline-none" placeholder='Enter phone number' onChange={handleChange} name="phone" value={posts.phone}  autoComplete='off'/>
//         <input className=" font-normal text-gray-700 dark:text-gray-400 items-center mt-4 mr-4 p-4 rounded-lg outline-none" placeholder='What is your favourite sports' onChange={handleChange} name="question" value={posts.question}  autoComplete='off'/>
//         <button className='p-4 m-2 bg-slate-500 mt-4 mr-8 rounded-xl' onClick={handleSubmit}>Register</button>
//     </div>
// </a>
// </form>
//     </div>
//   )
// }

// export default Register
