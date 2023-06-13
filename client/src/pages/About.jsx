import Layout from "../components/Layout/Layout"
import '../css/About.css'

const About = () => {
 
  return (
    <Layout title={'About us- Buy Me'}>
     <div className="flex min-h-screen flex-col justify-center bg-slate-500 items-center">
        <div className="group h-96 w-96 [perspective:1000px]">
          <div className="relative h-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
            <div className="absolute inset-0">
               <img src="https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className="h-full w-full rounded-lg object-cover shadow-xl shadow-black/60"/>
            </div>
            <div className="absolute inset-0 w-full h-full rounded-xl bg-black/70 px-12 text-center text-slate-300 [transform:rotateY(180deg)] [backface-visibility:hidden]">
              <div className="min-h-full flex flex-col items-center justify-center">
                <h1 className="text-3xl">Rohit Singh</h1>
                <p>This is an E-commerce </p>
              </div>
            </div>
          </div>
        </div>
     </div>

    </Layout>
  )
}

export default About
