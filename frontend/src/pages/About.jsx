// import { Mail, Phone, MapPin, Send } from "lucide-react";
// import { useState } from "react";

// function About() {
//   return (
//     <div className="w-full min-h-screen bg-bg-primary dark:bg-bg-primary-dark">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-12 sm:py-16 md:py-20">
//         {/* Hero Section */}
//         <div className="text-center mb-12 sm:mb-16 md:mb-20">
//           <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text dark:text-text-dark mb-4 sm:mb-6">
//             About MyBlog
//           </h1>
//           <p className="text-base sm:text-lg md:text-xl text-text-secondary dark:text-text-secondary-dark max-w-3xl mx-auto">
//             Empowering writers and readers to share stories that matter
//           </p>
//         </div>

//         {/* Mission Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 mb-12 sm:mb-16 md:mb-20">
//           <div className="bg-card dark:bg-card-dark rounded-2xl p-6 sm:p-8 md:p-10 border border-border dark:border-border-dark">
//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text dark:text-text-dark mb-4 sm:mb-6">
//               Our Mission
//             </h2>
//             <p className="text-sm sm:text-base md:text-lg text-text-secondary dark:text-text-secondary-dark leading-relaxed mb-4">
//               At MyBlog, we believe everyone has a story worth sharing. Our
//               platform provides writers with the tools and community they need
//               to express themselves, while giving readers access to diverse
//               perspectives and compelling content.
//             </p>
//             <p className="text-sm sm:text-base md:text-lg text-text-secondary dark:text-text-secondary-dark leading-relaxed">
//               We're committed to fostering a supportive environment where
//               creativity thrives and meaningful connections are made through the
//               power of the written word.
//             </p>
//           </div>

//           <div className="bg-card dark:bg-card-dark rounded-2xl p-6 sm:p-8 md:p-10 border border-border dark:border-border-dark">
//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text dark:text-text-dark mb-4 sm:mb-6">
//               Our Vision
//             </h2>
//             <p className="text-sm sm:text-base md:text-lg text-text-secondary dark:text-text-secondary-dark leading-relaxed mb-4">
//               We envision a world where quality content is accessible to all,
//               and where writers of every background can find their voice and
//               audience. Our goal is to become the go-to platform for authentic
//               storytelling and meaningful dialogue.
//             </p>
//             <p className="text-sm sm:text-base md:text-lg text-text-secondary dark:text-text-secondary-dark leading-relaxed">
//               Through innovation and community-focused features, we're building
//               the future of online publishing.
//             </p>
//           </div>
//         </div>

//         {/* Values Section */}
//         <div className="mb-12 sm:mb-16 md:mb-20">
//           <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text dark:text-text-dark text-center mb-8 sm:mb-10 md:mb-12">
//             Our Core Values
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
//             <div className="bg-card dark:bg-card-dark rounded-xl p-6 sm:p-8 border border-border dark:border-border-dark hover:border-accent-1 dark:hover:border-accent-1-dark transition-all">
//               <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent-1 dark:bg-accent-1-dark rounded-lg flex items-center justify-center mb-4">
//                 <span className="text-white text-xl sm:text-2xl font-bold">
//                   1
//                 </span>
//               </div>
//               <h3 className="text-lg sm:text-xl font-semibold text-text dark:text-text-dark mb-3">
//                 Authenticity
//               </h3>
//               <p className="text-sm sm:text-base text-text-secondary dark:text-text-secondary-dark">
//                 We celebrate genuine voices and original perspectives that make
//                 each story unique.
//               </p>
//             </div>

//             <div className="bg-card dark:bg-card-dark rounded-xl p-6 sm:p-8 border border-border dark:border-border-dark hover:border-accent-1 dark:hover:border-accent-1-dark transition-all">
//               <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent-1 dark:bg-accent-1-dark rounded-lg flex items-center justify-center mb-4">
//                 <span className="text-white text-xl sm:text-2xl font-bold">
//                   2
//                 </span>
//               </div>
//               <h3 className="text-lg sm:text-xl font-semibold text-text dark:text-text-dark mb-3">
//                 Community
//               </h3>
//               <p className="text-sm sm:text-base text-text-secondary dark:text-text-secondary-dark">
//                 Building connections between writers and readers through shared
//                 interests and passions.
//               </p>
//             </div>

//             <div className="bg-card dark:bg-card-dark rounded-xl p-6 sm:p-8 border border-border dark:border-border-dark hover:border-accent-1 dark:hover:border-accent-1-dark transition-all">
//               <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent-1 dark:bg-accent-1-dark rounded-lg flex items-center justify-center mb-4">
//                 <span className="text-white text-xl sm:text-2xl font-bold">
//                   3
//                 </span>
//               </div>
//               <h3 className="text-lg sm:text-xl font-semibold text-text dark:text-text-dark mb-3">
//                 Quality
//               </h3>
//               <p className="text-sm sm:text-base text-text-secondary dark:text-text-secondary-dark">
//                 Providing powerful tools and features that help writers create
//                 their best work.
//               </p>
//             </div>

//             <div className="bg-card dark:bg-card-dark rounded-xl p-6 sm:p-8 border border-border dark:border-border-dark hover:border-accent-1 dark:hover:border-accent-1-dark transition-all">
//               <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent-1 dark:bg-accent-1-dark rounded-lg flex items-center justify-center mb-4">
//                 <span className="text-white text-xl sm:text-2xl font-bold">
//                   4
//                 </span>
//               </div>
//               <h3 className="text-lg sm:text-xl font-semibold text-text dark:text-text-dark mb-3">
//                 Inclusivity
//               </h3>
//               <p className="text-sm sm:text-base text-text-secondary dark:text-text-secondary-dark">
//                 Creating a welcoming space for diverse voices and perspectives
//                 from around the world.
//               </p>
//             </div>

//             <div className="bg-card dark:bg-card-dark rounded-xl p-6 sm:p-8 border border-border dark:border-border-dark hover:border-accent-1 dark:hover:border-accent-1-dark transition-all">
//               <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent-1 dark:bg-accent-1-dark rounded-lg flex items-center justify-center mb-4">
//                 <span className="text-white text-xl sm:text-2xl font-bold">
//                   5
//                 </span>
//               </div>
//               <h3 className="text-lg sm:text-xl font-semibold text-text dark:text-text-dark mb-3">
//                 Innovation
//               </h3>
//               <p className="text-sm sm:text-base text-text-secondary dark:text-text-secondary-dark">
//                 Continuously improving our platform with cutting-edge features
//                 and user feedback.
//               </p>
//             </div>

//             <div className="bg-card dark:bg-card-dark rounded-xl p-6 sm:p-8 border border-border dark:border-border-dark hover:border-accent-1 dark:hover:border-accent-1-dark transition-all">
//               <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent-1 dark:bg-accent-1-dark rounded-lg flex items-center justify-center mb-4">
//                 <span className="text-white text-xl sm:text-2xl font-bold">
//                   6
//                 </span>
//               </div>
//               <h3 className="text-lg sm:text-xl font-semibold text-text dark:text-text-dark mb-3">
//                 Respect
//               </h3>
//               <p className="text-sm sm:text-base text-text-secondary dark:text-text-secondary-dark">
//                 Maintaining a respectful environment where all members feel
//                 valued and heard.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Stats Section */}
//         <div className="bg-accent-1 dark:bg-accent-1-dark rounded-2xl p-8 sm:p-10 md:p-12 text-center">
//           <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 sm:mb-10 md:mb-12">
//             Our Impact
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
//             <div>
//               <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
//                 10K+
//               </p>
//               <p className="text-sm sm:text-base md:text-lg text-white/90">
//                 Active Writers
//               </p>
//             </div>
//             <div>
//               <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
//                 50K+
//               </p>
//               <p className="text-sm sm:text-base md:text-lg text-white/90">
//                 Published Articles
//               </p>
//             </div>
//             <div>
//               <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
//                 100K+
//               </p>
//               <p className="text-sm sm:text-base md:text-lg text-white/90">
//                 Monthly Readers
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default About;

import { Target, Eye, Users, Sparkles, TrendingUp, Heart, Award, Globe, Zap } from "lucide-react";

function About() {
  return (
    <div className="w-full min-h-screen bg-bg-primary dark:bg-bg-primary-dark">
      {/* Hero Section with Animated Background */}
      <div className="relative overflow-hidden border-b border-border dark:border-border-dark">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent-1 dark:bg-accent-1-dark rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-accent-2 dark:bg-accent-2-dark rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-accent-1 dark:bg-accent-1-dark rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-16 sm:py-20 md:py-28 lg:py-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-accent-1/10 dark:bg-accent-1-dark/10 border border-accent-1/20 dark:border-accent-1-dark/20 backdrop-blur-sm animate-fade-in-down">
            <Sparkles className="w-4 h-4 text-accent-1 dark:text-accent-1-dark" />
            <span className="text-sm font-medium text-text dark:text-text-dark">
              Building the Future of Blogging
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text dark:text-text-dark mb-6 animate-fade-in-up leading-tight">
            About{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-accent-1 to-accent-2 dark:from-accent-1-dark dark:to-accent-2-dark bg-clip-text text-transparent">
                MyBlog
              </span>
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
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-text-secondary dark:text-text-secondary-dark max-w-4xl mx-auto animate-fade-in animation-delay-200 leading-relaxed">
            Empowering writers and readers to share stories that matter, 
            creating connections that last a lifetime
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-12 sm:py-16 md:py-20">
        {/* Mission & Vision - Side by Side Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-20 md:mb-24">
          {/* Mission Card */}
          <div className="group relative bg-card dark:bg-card-dark rounded-3xl p-8 sm:p-10 border border-border dark:border-border-dark hover:border-accent-1 dark:hover:border-accent-1-dark transition-all duration-300 hover:shadow-2xl hover:shadow-accent-1/10 dark:hover:shadow-accent-1-dark/10 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-1/5 dark:bg-accent-1-dark/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
            
            <div className="relative">
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-accent-1 dark:bg-accent-1-dark rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text dark:text-text-dark mb-6">
                Our Mission
              </h2>
              
              <p className="text-sm sm:text-base md:text-lg text-text-secondary dark:text-text-secondary-dark leading-relaxed mb-4">
                At MyBlog, we believe everyone has a story worth sharing. Our
                platform provides writers with the tools and community they need
                to express themselves, while giving readers access to diverse
                perspectives and compelling content.
              </p>
              
              <p className="text-sm sm:text-base md:text-lg text-text-secondary dark:text-text-secondary-dark leading-relaxed">
                We're committed to fostering a supportive environment where
                creativity thrives and meaningful connections are made through the
                power of the written word.
              </p>
            </div>
          </div>

          {/* Vision Card */}
          <div className="group relative bg-card dark:bg-card-dark rounded-3xl p-8 sm:p-10 border border-border dark:border-border-dark hover:border-accent-2 dark:hover:border-accent-2-dark transition-all duration-300 hover:shadow-2xl hover:shadow-accent-2/10 dark:hover:shadow-accent-2-dark/10 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-2/5 dark:bg-accent-2-dark/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
            
            <div className="relative">
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-accent-2 dark:bg-accent-2-dark rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <Eye className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text dark:text-text-dark mb-6">
                Our Vision
              </h2>
              
              <p className="text-sm sm:text-base md:text-lg text-text-secondary dark:text-text-secondary-dark leading-relaxed mb-4">
                We envision a world where quality content is accessible to all,
                and where writers of every background can find their voice and
                audience. Our goal is to become the go-to platform for authentic
                storytelling and meaningful dialogue.
              </p>
              
              <p className="text-sm sm:text-base md:text-lg text-text-secondary dark:text-text-secondary-dark leading-relaxed">
                Through innovation and community-focused features, we're building
                the future of online publishing.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="mb-16 sm:mb-20 md:mb-24">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text dark:text-text-dark mb-4">
              Our Core Values
            </h2>
            <p className="text-base sm:text-lg text-text-secondary dark:text-text-secondary-dark max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
            {[
              { num: 1, icon: Heart, title: "Authenticity", desc: "We celebrate genuine voices and original perspectives that make each story unique.", color: "accent-1" },
              { num: 2, icon: Users, title: "Community", desc: "Building connections between writers and readers through shared interests and passions.", color: "accent-2" },
              { num: 3, icon: Award, title: "Quality", desc: "Providing powerful tools and features that help writers create their best work.", color: "accent-1" },
              { num: 4, icon: Globe, title: "Inclusivity", desc: "Creating a welcoming space for diverse voices and perspectives from around the world.", color: "accent-2" },
              { num: 5, icon: Zap, title: "Innovation", desc: "Continuously improving our platform with cutting-edge features and user feedback.", color: "accent-1" },
              { num: 6, icon: Sparkles, title: "Respect", desc: "Maintaining a respectful environment where all members feel valued and heard.", color: "accent-2" }
            ].map((value, idx) => {
              const Icon = value.icon;
              return (
                <div
                  key={idx}
                  className="group relative bg-card dark:bg-card-dark rounded-2xl p-6 sm:p-8 border border-border dark:border-border-dark hover:border-accent-1 dark:hover:border-accent-1-dark transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-${value.color} dark:bg-${value.color}-dark rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <div className="flex-shrink-0 w-10 h-10 bg-bg-primary dark:bg-bg-primary-dark rounded-lg flex items-center justify-center border border-border dark:border-border-dark">
                      <span className="text-lg font-bold text-accent-1 dark:text-accent-1-dark">
                        {value.num}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-semibold text-text dark:text-text-dark mb-3">
                    {value.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-text-secondary dark:text-text-secondary-dark leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Section - Redesigned */}
        <div className="relative overflow-hidden bg-gradient-to-br from-accent-1 to-accent-2 dark:from-accent-1-dark dark:to-accent-2-dark rounded-3xl p-8 sm:p-12 md:p-16">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
          
          <div className="relative">
            <div className="text-center mb-10 sm:mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-white/20 backdrop-blur-sm">
                <TrendingUp className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">
                  Growing Every Day
                </span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
                Our Impact
              </h2>
              
              <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto">
                Numbers that showcase our thriving community
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
              <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="flex flex-col items-center text-center">
                  <Users className="w-10 h-10 sm:w-12 sm:h-12 text-white mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <p className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2 tabular-nums">
                    10K+
                  </p>
                  <p className="text-sm sm:text-base md:text-lg text-white/90 font-medium">
                    Active Writers
                  </p>
                </div>
              </div>
              
              <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="flex flex-col items-center text-center">
                  <Award className="w-10 h-10 sm:w-12 sm:h-12 text-white mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <p className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2 tabular-nums">
                    50K+
                  </p>
                  <p className="text-sm sm:text-base md:text-lg text-white/90 font-medium">
                    Published Articles
                  </p>
                </div>
              </div>
              
              <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="flex flex-col items-center text-center">
                  <Globe className="w-10 h-10 sm:w-12 sm:h-12 text-white mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <p className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2 tabular-nums">
                    100K+
                  </p>
                  <p className="text-sm sm:text-base md:text-lg text-white/90 font-medium">
                    Monthly Readers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
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

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          animation-fill-mode: both;
        }
      `}</style>
    </div>
  );
}

export default About;