import { Sparkles, PenTool, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <main className="relative w-full min-h-[200px] md:min-h-[400px] bg-bg-primary dark:bg-bg-primary-dark duration-300 border-b-2 border-accent-1 dark:border-accent-1-dark overflow-hidden">

      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-10 left-10 w-72 h-72 bg-accent-1 dark:bg-accent-1-dark rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-[blob_7s_infinite]" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent-2 dark:bg-accent-2-dark rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-[blob_7s_infinite] [animation-delay:2s]" />
        <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-accent-1 dark:bg-accent-1-dark rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-[blob_7s_infinite] [animation-delay:4s]" />
      </div>

      <div className="relative flex flex-col justify-center items-center gap-8 lg:gap-12 max-w-7xl mx-auto py-8 sm:py-12 md:py-20 lg:py-30 px-4">
       
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-1/10 dark:bg-accent-1-dark/10 border border-accent-1/20 dark:border-accent-1-dark/20 backdrop-blur-sm animate-[fade-in-down_0.6s_ease-out]">
          <Sparkles className="w-4 h-4 text-accent-1 dark:text-accent-1-dark" />
          <span className="text-sm font-medium text-text dark:text-text-dark">
            Share Your Stories
          </span>
        </div>

        <div className="space-y-4">
          <h1 className="font-bold text-2xl sm:text-3xl md:text-5xl lg:text-7xl text-text dark:text-text-dark text-center leading-tight animate-[fade-in-up_0.6s_ease-out]">
            Welcome To{" "}
            <span className="relative inline-block">
              MyBlog
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-accent-1 dark:text-accent-1-dark"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,7 Q50,0 100,7 T200,7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </svg>
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-text/70 dark:text-text-dark/70 text-center max-w-2xl mx-auto animate-[fade-in_0.8s_ease-out] [animation-delay:0.2s] [animation-fill-mode:both]">
            Create, share, and discover amazing stories from writers around the world
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full sm:w-auto animate-[fade-in-up_0.6s_ease-out] [animation-delay:0.4s] [animation-fill-mode:both]">
          <Link
            to="write-blog"
            className="group relative font-semibold text-sm md:text-base lg:text-lg text-white bg-accent-1 dark:bg-accent-1-dark hover:bg-hover dark:hover:bg-hover-dark px-6 sm:px-7 md:px-8 lg:px-10 py-3 md:py-3.5 rounded-xl transition-all duration-300 text-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></span>
            <span className="relative flex items-center justify-center gap-2">
              <PenTool className="w-5 h-5" />
              Write A Blog
            </span>
          </Link>

          <Link
            to="blogs"
            className="group relative font-semibold text-sm md:text-base lg:text-lg text-white bg-accent-2 dark:bg-accent-2-dark hover:bg-hover dark:hover:bg-hover-dark px-6 sm:px-7 md:px-8 lg:px-10 py-3 md:py-3.5 rounded-xl transition-all duration-300 text-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></span>
            <span className="relative flex items-center justify-center gap-2">
              <BookOpen className="w-5 h-5" />
              Read A Blog
            </span>
          </Link>
        </div>
      </div>

      {/* Custom keyframes using Tailwind's arbitrary syntax */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </main>
  );
}

export default Hero;
