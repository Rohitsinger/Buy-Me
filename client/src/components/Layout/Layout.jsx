
import Header from "./Header"
import {Helmet} from "react-helmet";
import { ToastContainer } from 'react-toastify';


const Layout = ({children,title,description,keywords,author}) => {
  return (
    <>
    <>
            <Helmet>
                <meta charSet="utf-8" />
               <meta name="description" content={description}/>
            <meta name="keywords" content={keywords}/>
              <meta name="author" content={author}/>
              
              <title>{title}</title>
               
            </Helmet>
            </>
   <Header/>
  <main className=" "> {children}<ToastContainer/></main>
  
    </>
  )
};

Layout.defaultProps = {
  title: 'Ecommerce app-BuyMe',
  description: 'mern stack Project',
  keywords:'mern,react,node,mongodb',
  author: 'Rohit Singh'
}

export default Layout
