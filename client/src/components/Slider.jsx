import { useState } from 'react'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'


const slidersImages =[
   {url:"https://images.pexels.com/photos/35550/ipad-tablet-technology-touch.jpg?auto=compress&cs=tinysrgb&w=600"},
   {url:"https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg?auto=compress&cs=tinysrgb&w=600"},
   {url:"https://images.pexels.com/photos/3756345/pexels-photo-3756345.jpeg?auto=compress&cs=tinysrgb&w=600"},
   {url:"https://images.pexels.com/photos/4050388/pexels-photo-4050388.jpeg?auto=compress&cs=tinysrgb&w=600"},
   {url:"https://images.pexels.com/photos/6214472/pexels-photo-6214472.jpeg?auto=compress&cs=tinysrgb&w=600"},
   {url:"https://images.pexels.com/photos/4050334/pexels-photo-4050334.jpeg?auto=compress&cs=tinysrgb&w=600"},
]




const Slider = () => {
    const [currentIndex,setCurrentIndex] = useState(0);
    const prevSlide = ()=>{
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slidersImages.length - 1 :currentIndex -1;
        setCurrentIndex(newIndex);
    }
    const nextSlide = ()=>{
        const isLastSlide = currentIndex === slidersImages.length-1;
        const newIndex = isLastSlide ? 0 :currentIndex +1;
        setCurrentIndex(newIndex);
    }
  return (
    <div className='max-w-[1400px] h-[780px]   m-auto py-16 px-4 relative group '>
   
    <div style={{backgroundImage:`url(${slidersImages[currentIndex].url})`}} className=' max-w-3xl h-96 mx-auto mt-16 rounded-2xl bg-center bg-cover duration-500'></div>
   
     <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer '>
     <BsChevronCompactLeft size={30} onClick={prevSlide}/>
     </div>
     <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer '>
     <BsChevronCompactRight size={30} onClick={nextSlide}/>
     </div>
     <span className='my-4 text-4xl  translate-x-0 transition-all duration-150  hover:bg-gray-500'>
        Come and Explore your Product
     </span>
     </div>
     
    
  )
}

export default Slider
