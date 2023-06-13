import { BsFillCartCheckFill } from 'react-icons/bs'
import {AiFillCaretDown} from 'react-icons/ai'
import '../../css/Header.css'
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { FaTimes, FaBars } from 'react-icons/fa'
import { useAuth } from '../../context/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


// import useCategory from '../../hooks/useCategory'
import { useCart } from '../../context/cart'
import { Badge } from 'antd'


const Header = () => {
  // const categories= useCategory()
const [cart] = useCart()
 
  const [auth, setAuth] = useAuth()
  const [toggle, setToggle] = useState(false)

  const [show, setShow] = useState(false);
  const navigate = useNavigate()
  const handleLogout = () => {
    setAuth({
      ...auth, user: null, token: ''
    })
    localStorage.removeItem("auth")
    toast.success("Logout Successfully")
  }

  const handleToggle = () => {
    setToggle(!toggle)
  }




  return (
    <>
      {
        !auth.user ? (<nav className='navbar inset-x-0 md:px-4 fixed top-0 opacity-70 shadow-lg' >
          <h3 className='logo'><BsFillCartCheckFill />Ecommerce</h3>

          <ul className={show ? 'nav_links_mobile' : 'nav_links '} onClick={() => setShow(false)}>

            <Link to="/register" className='createblogs no-underline text-white'><li >Register</li></Link>
            <Link to="/login" className='createblogs no-underline text-white'><li >Login</li></Link>


          </ul>
          <div className='mobile_menu_icon' onClick={() => setShow(!show)}>
            {show ?
              <FaTimes className='mr-8' /> :
              <FaBars className='mr-8' />
            }
          </div>

        </nav>) : (<nav className='navbar inset-x-0  px-2 fixed top-0 opacity-70 shadow-lg' >
          <h3 className='logo flex ml-2'><BsFillCartCheckFill className='mt-1 mr-1'/>Buy Me</h3>

          <ul className={show ? 'nav_links_mobile' : 'nav_links '} onClick={() => setShow(false)}>
        
            <Link to="/" className='blogs no-underline text-white mt-1'> <li>Home</li></Link>
            {/* <span onClick={handleToggles} className='rounded-lg p-2 m-2 flex uppercase'>Category<AiFillCaretDown className='mt-1'/></span> */}
            
        
          
         
              
              <div className='relative'>
              {/* {toggles &&
           
         <ul className='py-2 text-sm text-gray-700  dark:text-gray-200 mt-4 top-0'>
         {categories?.map(c=>(
         <li className=' text-lg'> <Link className='block  px-4 py-2 dark:hover:bg-gray-300 text-black ' to={`/${c.slug}`}>{c.name}</Link> </li>
         ))}

          </ul>
              } */}
      
          
          </div>

       {/* <Link to="/category" className='createblogs no-underline text-white'><li >Category</li></Link> */}
            <Badge  count={cart?.length} showZero>
            <Link className='cart no-underline text-white' to="/cart"> <li>Cart</li></Link>
    </Badge>
           
           
          <span onClick={handleToggle} className='rounded-lg p-2 mb-2 m-2 flex'>{auth?.user?.name }<AiFillCaretDown className='mt-1'/></span>
         {toggle && 
         <div className='z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 mt-44'>
         <ul className='py-2 text-sm text-gray-700 dark:text-gray-200'>
         <li> <Link className=' no-underline block px-4 py-2' to={`/dashboard/${auth?.user?.role===1?'admin':'user'}`}> DashBoard</Link> </li>
          <li> <Link className=' no-underline  block px-4 py-2' to="/login" onClick={handleLogout}>Logout</Link></li>
          </ul>
          </div>
      }
          
           
           
          </ul>
          <div className='mobile_menu_icon' onClick={() => setShow(!show)}>
            {show ?
              <FaTimes className='mr-8' /> :
              <FaBars className='mr-8' />
            }
          </div>

        </nav>)
      }


    </>
  )
}

export default Header
