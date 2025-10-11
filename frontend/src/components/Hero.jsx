import { Link } from "react-router-dom";
import AllBlog from "../pages/AllBlog";

function Hero() {
  return (
    <>
      {/* <main className='w-full min-h-[200px] md:min-h-[400px] bg-bg-primary dark:bg-bg-primary-dark duration-300 border-b-2 border-accent-1'>
        <div className='flex flex-col justify-center items-center gap-7 md:gap-15 max-w-7xl mx-auto py-15 md:py-30'>
            <div>
                <h1 className='font-bold text-2xl md:text-7xl text-text dark:text-text-dark'>Welcome To MyBlog</h1>
            </div>
            <div className='flex gap-5 md:gap-10'>
                <Link to='write-blog' className='font-semibold text-sm md:text-lg text-text dark:text-text-dark dark:bg-accent-2-dark px-2 md:px-3 py-1 rounded-md '>Write A Blog</Link>
                <Link to='blog' className='font-semibold text-sm md:text-lg text-text dark:text-text-dark dark:bg-accent-2-dark bg-primary px-2 md:px-3 py-1 rounded-md '>Read A Blog</Link>
            </div>
        </div>
    </main> */}
      <main className="w-full min-h-[200px] md:min-h-[400px] bg-bg-primary dark:bg-bg-primary-dark duration-300 border-b-2 border-accent-1 dark:border-accent-1-dark">
        <div className="flex flex-col justify-center items-center gap-10 lg:gap-15 max-w-7xl mx-auto py-8 sm:py-12 md:py-20 lg:py-30 px-4">
          <div>
            <h1 className="font-bold text-2xl sm:text-3xl md:text-5xl lg:text-7xl text-text dark:text-text-dark text-center">
              Welcome To MyBlog
            </h1>
          </div>
          <div className="flex gap-5 md:gap-10 ">
            <Link
              to="write-blog"
              className="font-semibold text-sm md:text-base lg:text-lg text-white bg-accent-1 dark:bg-accent-1-dark hover:bg-hover dark:hover:bg-hover-dark px-4 sm:px-5 md:px-6 lg:px-8 py-2 md:py-2.5 rounded-md transition-all text-center"
            >
              Write A Blog
            </Link>
            <Link
              to="blog"
              className="font-semibold text-sm md:text-base lg:text-lg text-white bg-accent-2 dark:bg-accent-2-dark hover:bg-hover dark:hover:bg-hover-dark px-4 sm:px-5 md:px-6 lg:px-8 py-2 md:py-2.5 rounded-md transition-all text-center"
            >
              Read A Blog
            </Link>
          </div>
        </div>
      </main>
      <AllBlog />
    </>
  );
}

export default Hero;
