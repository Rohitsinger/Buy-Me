import axios from "axios";
import { useEffect, useState } from "react";


const useCategory=()=>{
    const [category,setCategory] = useState([])

    //get Category
    const getAllCategories = async() =>{
        try {
          const {data} = await axios.get('/api/v1/category/get-category')
          if(data.success){
            setCategory(data.categories)
          }
        } catch (error) {
           
            toast.error("Something went wrong while getting category")
        }
      }
      
      useEffect(()=>{
        getAllCategories()
      },[])

return category;
}

export default useCategory