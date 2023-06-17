import Layout from "../components/Layout/Layout"


const Contact = () => {
  return (
    <Layout title={'contact-us'}>
     
    
    <form className=" w-full max-w-lg mx-auto mt-48 bg-black mb-8">
      <div className="flex flex-wrap mx-3 mb-6">
      <img src="https://media.istockphoto.com/id/1168945108/photo/close-up-image-of-male-hands-using-smartphone-with-icon-telephone-email-mobile-phone-and.jpg?s=612x612&w=0&k=20&c=aVojLzP1n3XNxuRdy7Pqdzo6OyRAVanOWDUWjbu3R8Q=" className="w-64 flex justify-center mx-auto"/>
      </div>
      <div className="w-2/3 md:w-1/2 px-3 mb-6 md:mb-0 mx-auto ">
      <h2 className="font-bold text-3xl text-white flex justify-center">Contact Us</h2>
      <h2 className='text-3xl font-bold  flex justify-center text-white mt-4'>Buy Me</h2>
       <div className="mt-12">
       <p className='font-sans flex justify-center appearance-none  w-full  border border-green-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white  text-white'>@copy; right 2023 by Buy.com</p>
       <p className='font-sans flex justify-center  text-white'>email:rohitsinghchauhan420@gmail.com</p>
       </div>
      </div>
    </form>
    </Layout>
  )
}

export default Contact
