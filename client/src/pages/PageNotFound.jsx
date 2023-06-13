import { Link } from "react-router-dom"
import Layout from "../components/Layout/Layout"

const PageNotFound = () => {
  return (
    <Layout>
    <div className="w-full flex flex-col items-center justify-center mt-64">
<div className="text-9xl uppercase">404</div>
<div className="text-lg uppercase">Oops! Page not found</div>
<Link className="m-2 p-2 bg-blue-300 rounded-sm" to="/">Go back</Link>
</div>
    </Layout>
  )
}

export default PageNotFound
