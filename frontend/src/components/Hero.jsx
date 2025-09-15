import { Link } from 'react-router-dom'

function Hero() {
  return (
    <main className='w-full min-h-[400px] text-white bg-primary-dark'>
        <div className='flex flex-col justify-center items-center gap-15 max-w-7xl mx-auto py-30'>
            <div>
                <h1 className='font-bold text-7xl'>Welcome To MyBlog</h1>
            </div>
            <div className='flex gap-10'>
                <Link to='write-blog' className='font-semibold text-lg text-black bg-primary px-3 py-1 rounded-md '>Write A Blog</Link>
                <Link to='blog' className='font-semibold text-lg text-black bg-primary px-3 py-1 rounded-md '>Read A Blog</Link>
            </div>
        </div>
    </main>
  )
}

export default Hero