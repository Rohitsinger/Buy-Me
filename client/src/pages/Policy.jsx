import Layout from "../components/Layout/Layout"

const Policy = () => {
  return (
    <Layout title={'Privacy Policy'}>
       <div className=" w-full min-h-screen flex items-center justify-center" >
    <a  class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    
    <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Ecommerce Privacy Policies Explained</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 items-center">More and more shoppers are turning to ecommerce, with sales in 2022 expected to reach $5.5 trillion and grow to $7.4 trillion by 2025. With such a high level of ecommerce traffic, businesses also collect an enormous amount of customer data.

As a result, governments require companies to be transparent about this data collection, and privacy policies are a significant component.

A privacy policy is intended to inform users of how their personal data is collected and used. Privacy policies are essential for online stores because the stores almost always collect at least basic personal information.

While privacy policies are far from a new concept, they have become increasingly important as online shopping has grown. Adding a privacy policy to your ecommerce website acts as a contract between your business and the user.

Your policy describes the data you will collect, process, and store, and customers are allowed to review and respond to the use of their data.</p>
    </div>
</a>
</div>
    
   
    </Layout>
  )
}

export default Policy
