import axios from 'axios'
import React, { useEffect, useState } from 'react'


import { AiOutlineSearch } from 'react-icons/ai'

const SearchInput = () => {
   const [items,setItems] = useState([])
   const [query,setQuery] = useState("")
    


   const handleChange =async(e)=>{
  const {query} = (e.target);
  try {
 
 
    let {data} = await axios.get(`api/v1/product/get-search?query=${query}`)
    setItems(data?.products)
    console.log(data);
    

  } catch (error) {
    console.log(error);
  }

}
   
    useEffect(() => {
     
    handleChange()
    }, [query])
    
  return (
    <div>
      <button className='bg-blue-600 rounded-full p-2 float-right'><AiOutlineSearch/></button>
      <input type="text" id="search-navbar" class="block w-96 float-right p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-2" placeholder="Search..." onChange={handleChange} value={query}></input>
    
  

    </div>
  )
}

export default SearchInput
