// src/components/BlogSkeleton.jsx

const BlogSkeleton = () => (
  <>
    {/* Skeleton for Hero */}
    <div className="w-full h-[400px] bg-card dark:bg-card-dark animate-pulse"></div>

    {/* Skeleton for Article */}
    <div className="max-w-4xl mx-auto px-6 -mt-32 relative z-20">
      <div className="bg-card dark:bg-card-dark rounded-3xl border border-border dark:border-border-dark shadow-2xl p-10 animate-pulse">
        {/* Header */}
        <div className="flex gap-4 mb-6">
          <div className="h-8 w-32 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          <div className="h-8 w-32 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        </div>
        {/* Title */}
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-full mb-4"></div>
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-8"></div>
        {/* Author */}
        <div className="flex items-center gap-4 pb-8 border-b border-border dark:border-border-dark">
          <div className="w-16 h-16 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
        {/* Content */}
        <div className="mt-10 space-y-4">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mt-6"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  </>
);

export default BlogSkeleton;