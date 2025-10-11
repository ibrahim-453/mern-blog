import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

function About() {
  return (
    <div className="w-full min-h-screen bg-bg-primary dark:bg-bg-primary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-12 sm:py-16 md:py-20">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text dark:text-text-dark mb-4 sm:mb-6">
            About MyBlog
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-text-secondary dark:text-text-secondary-dark max-w-3xl mx-auto">
            Empowering writers and readers to share stories that matter
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 mb-12 sm:mb-16 md:mb-20">
          <div className="bg-card dark:bg-card-dark rounded-2xl p-6 sm:p-8 md:p-10 border border-border dark:border-border-dark">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text dark:text-text-dark mb-4 sm:mb-6">
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

          <div className="bg-card dark:bg-card-dark rounded-2xl p-6 sm:p-8 md:p-10 border border-border dark:border-border-dark">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text dark:text-text-dark mb-4 sm:mb-6">
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

        {/* Values Section */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text dark:text-text-dark text-center mb-8 sm:mb-10 md:mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-card dark:bg-card-dark rounded-xl p-6 sm:p-8 border border-border dark:border-border-dark hover:border-accent-1 dark:hover:border-accent-1-dark transition-all">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent-1 dark:bg-accent-1-dark rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-xl sm:text-2xl font-bold">
                  1
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-text dark:text-text-dark mb-3">
                Authenticity
              </h3>
              <p className="text-sm sm:text-base text-text-secondary dark:text-text-secondary-dark">
                We celebrate genuine voices and original perspectives that make
                each story unique.
              </p>
            </div>

            <div className="bg-card dark:bg-card-dark rounded-xl p-6 sm:p-8 border border-border dark:border-border-dark hover:border-accent-1 dark:hover:border-accent-1-dark transition-all">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent-1 dark:bg-accent-1-dark rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-xl sm:text-2xl font-bold">
                  2
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-text dark:text-text-dark mb-3">
                Community
              </h3>
              <p className="text-sm sm:text-base text-text-secondary dark:text-text-secondary-dark">
                Building connections between writers and readers through shared
                interests and passions.
              </p>
            </div>

            <div className="bg-card dark:bg-card-dark rounded-xl p-6 sm:p-8 border border-border dark:border-border-dark hover:border-accent-1 dark:hover:border-accent-1-dark transition-all">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent-1 dark:bg-accent-1-dark rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-xl sm:text-2xl font-bold">
                  3
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-text dark:text-text-dark mb-3">
                Quality
              </h3>
              <p className="text-sm sm:text-base text-text-secondary dark:text-text-secondary-dark">
                Providing powerful tools and features that help writers create
                their best work.
              </p>
            </div>

            <div className="bg-card dark:bg-card-dark rounded-xl p-6 sm:p-8 border border-border dark:border-border-dark hover:border-accent-1 dark:hover:border-accent-1-dark transition-all">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent-1 dark:bg-accent-1-dark rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-xl sm:text-2xl font-bold">
                  4
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-text dark:text-text-dark mb-3">
                Inclusivity
              </h3>
              <p className="text-sm sm:text-base text-text-secondary dark:text-text-secondary-dark">
                Creating a welcoming space for diverse voices and perspectives
                from around the world.
              </p>
            </div>

            <div className="bg-card dark:bg-card-dark rounded-xl p-6 sm:p-8 border border-border dark:border-border-dark hover:border-accent-1 dark:hover:border-accent-1-dark transition-all">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent-1 dark:bg-accent-1-dark rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-xl sm:text-2xl font-bold">
                  5
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-text dark:text-text-dark mb-3">
                Innovation
              </h3>
              <p className="text-sm sm:text-base text-text-secondary dark:text-text-secondary-dark">
                Continuously improving our platform with cutting-edge features
                and user feedback.
              </p>
            </div>

            <div className="bg-card dark:bg-card-dark rounded-xl p-6 sm:p-8 border border-border dark:border-border-dark hover:border-accent-1 dark:hover:border-accent-1-dark transition-all">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent-1 dark:bg-accent-1-dark rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-xl sm:text-2xl font-bold">
                  6
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-text dark:text-text-dark mb-3">
                Respect
              </h3>
              <p className="text-sm sm:text-base text-text-secondary dark:text-text-secondary-dark">
                Maintaining a respectful environment where all members feel
                valued and heard.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-accent-1 dark:bg-accent-1-dark rounded-2xl p-8 sm:p-10 md:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 sm:mb-10 md:mb-12">
            Our Impact
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            <div>
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
                10K+
              </p>
              <p className="text-sm sm:text-base md:text-lg text-white/90">
                Active Writers
              </p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
                50K+
              </p>
              <p className="text-sm sm:text-base md:text-lg text-white/90">
                Published Articles
              </p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
                100K+
              </p>
              <p className="text-sm sm:text-base md:text-lg text-white/90">
                Monthly Readers
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
