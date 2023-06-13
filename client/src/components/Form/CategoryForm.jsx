import React from 'react'

const CategoryForm = ({handleSubmit,value,setValue}) => {
    
  return (
    
   
    
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
  
   
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Categories
      </label>
      <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"  type="text" placeholder="Enter New Category" onChange={(e)=>setValue(e.target.value)} name="password" value={value} required autoComplete='off'/>
    
    </div>
    <div className="flex items-center justify-between">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleSubmit}>
        Submit
      </button>
      {/* <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to="/forget-password">
        Forgot Password?
      </Link> */}
    </div>
  </form>
  
  )
}

export default CategoryForm
