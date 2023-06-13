import '../../css/Footer.css'
import {BsInstagram} from 'react-icons/bs'
import {FaFacebook} from 'react-icons/fa'
import {BsGithub} from 'react-icons/bs'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
 <footer className='bg-gray-900  md:inset-x-0 md:w-full   bottom-0 p-2 overflow-y-hidden  '>
   <div className='container mx-auto px-2  text-white'>
    <div className='flex gap-10 justify-between'>
    <div className='flex gap-4 flex-col items-center'>
       <h2 className='text-3xl font-bold  mb-4'>Explore</h2>
         <BsInstagram/>
       <FaFacebook/>
       <BsGithub/>
       </div>
    <div>
       <h2 className='text-3xl font-bold  mb-4'>Learn More</h2>
       <ul>
       <Link to="/" className='blogs no-underline text-white'> <li>Home</li></Link>
              <Link to="/about" className='createblogs no-underline text-white'><li >About</li></Link>
              <Link to="/contact" className='createblogs no-underline text-white'><li >contact</li></Link>
             <Link className='logout no-underline text-white' to="/policy"> <li>Policy</li></Link>
              
       </ul>
    </div>
    <div>
       <h2 className='text-3xl font-bold  mb-4 '>Buy Me</h2>
       <p className='font-sans'>@copy; right 2023 by Buy.com</p>
       </div>
    </div>
   </div>
     
   
  </footer>  
  )
}

export default Footer
