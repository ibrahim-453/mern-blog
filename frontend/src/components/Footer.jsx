// function Footer() {
//   return (
//     <footer className="bg-card dark:bg-card-dark border-t border-border dark:border-border-dark text-text-secondary dark:text-text-secondary-dark">
//       <div className="container mx-auto px-6 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
//         {/* Column 1: Brand */}
//         <div>
//           <h2 className="text-lg font-semibold text-text dark:text-text-dark mb-3">MyBrand</h2>
//           <p className="text-sm leading-relaxed">
//             Building clean, fast, and intelligent web experiences for everyone.
//           </p>
//         </div>

//         {/* Column 2: Quick Links */}
//         <div>
//           <h3 className="text-base font-semibold text-text dark:text-text-dark mb-3">Quick Links</h3>
//           <ul className="space-y-2">
//             <li><a href="/" className="hover:text-accent-1 dark:hover:text-accent-1-dark">Home</a></li>
//             <li><a href="/about" className="hover:text-accent-1 dark:hover:text-accent-1-dark">About</a></li>
//             <li><a href="/blogs" className="hover:text-accent-1 dark:hover:text-accent-1-dark">Blogs</a></li>
//             <li><a href="/contact" className="hover:text-accent-1 dark:hover:text-accent-1-dark">Contact</a></li>
//           </ul>
//         </div>

//         {/* Column 3: Resources */}
//         <div>
//           <h3 className="text-base font-semibold text-text dark:text-text-dark mb-3">Resources</h3>
//           <ul className="space-y-2">
//             <li><a href="/privacy" className="hover:text-accent-1 dark:hover:text-accent-1-dark">Privacy Policy</a></li>
//             <li><a href="/terms" className="hover:text-accent-1 dark:hover:text-accent-1-dark">Terms of Service</a></li>
//             <li><a href="/support" className="hover:text-accent-1 dark:hover:text-accent-1-dark">Support</a></li>
//           </ul>
//         </div>

//         {/* Column 4: Socials */}
//         <div>
//           <h3 className="text-base font-semibold text-text dark:text-text-dark mb-3">Follow Us</h3>
//           <div className="flex gap-4">
//             <a href="https://x.com" aria-label="X" className="hover:text-accent-1 dark:hover:text-accent-1-dark">
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-5">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M8 19c7.5 0 11.6-6.2 11.6-11.6v-.5A8.4 8.4 0 0 0 22 4.9a8.1 8.1 0 0 1-2.3.6 4 4 0 0 0 1.8-2.2 8.2 8.2 0 0 1-2.6 1 4 4 0 0 0-6.8 3.7A11.4 11.4 0 0 1 3.3 3.8a4 4 0 0 0 1.3 5.3 4 4 0 0 1-1.8-.5v.1a4 4 0 0 0 3.2 3.9 4 4 0 0 1-1.8.1 4 4 0 0 0 3.8 2.8A8.1 8.1 0 0 1 2 18.1a11.5 11.5 0 0 0 6 1.8"/>
//               </svg>
//             </a>
//             <a href="https://github.com" aria-label="GitHub" className="hover:text-accent-1 dark:hover:text-accent-1-dark">
//               <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="size-5" viewBox="0 0 24 24">
//                 <path fillRule="evenodd" d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.2.8-.6v-2c-3.3.7-4-1.6-4-1.6a3.2 3.2 0 0 0-1.4-1.7c-1.1-.7.1-.7.1-.7a2.6 2.6 0 0 1 1.9 1.3 2.6 2.6 0 0 0 3.5 1 2.6 2.6 0 0 1 .8-1.6c-2.6-.3-5.3-1.3-5.3-5.9a4.7 4.7 0 0 1 1.3-3.2 4.4 4.4 0 0 1 .1-3.1s1-.3 3.3 1.2a11.2 11.2 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2a4.4 4.4 0 0 1 .1 3.1 4.7 4.7 0 0 1 1.3 3.2c0 4.6-2.7 5.6-5.3 5.9a3 3 0 0 1 .9 2.3v3.4c0 .4.2.7.8.6A12 12 0 0 0 12 .3Z" clipRule="evenodd" />
//               </svg>
//             </a>
//             <a href="https://facebook.com" aria-label="Facebook" className="hover:text-accent-1 dark:hover:text-accent-1-dark">
//               <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="size-5" viewBox="0 0 24 24">
//                 <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3zm7 0h3.7v1.7h.1a4 4 0 0 1 3.6-2c3.9 0 4.6 2.5 4.6 5.6V21h-4v-5.3c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z"/>
//               </svg>
//             </a>
//           </div>
//         </div>
//       </div>

//       <div className="border-t border-border dark:border-border-dark mt-8 py-4 text-center text-sm">
//         <p>© {new Date().getFullYear()} MyBrand. All rights reserved.</p>
//       </div>
//     </footer>
//   );
// }

// export default Footer;

function Footer() {
  return (
    <footer className="bg-card dark:bg-card-dark border-t border-border dark:border-border-dark text-text-secondary dark:text-text-secondary-dark">
      <div className="container mx-auto px-6 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {/* Column 1: Brand */}
        <div>
          <h2 className="text-lg font-semibold text-text dark:text-text-dark mb-3">MyBrand</h2>
          <p className="text-sm leading-relaxed">
            Building clean, fast, and intelligent web experiences for everyone.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-base font-semibold text-text dark:text-text-dark mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-accent-1 dark:hover:text-accent-1-dark">Home</a></li>
            <li><a href="/about" className="hover:text-accent-1 dark:hover:text-accent-1-dark">About</a></li>
            <li><a href="/blogs" className="hover:text-accent-1 dark:hover:text-accent-1-dark">Blogs</a></li>
            <li><a href="/contact" className="hover:text-accent-1 dark:hover:text-accent-1-dark">Contact</a></li>
          </ul>
        </div>

        {/* Column 3: Resources */}
        <div>
          <h3 className="text-base font-semibold text-text dark:text-text-dark mb-3">Resources</h3>
          <ul className="space-y-2">
            <li><a href="/privacy" className="hover:text-accent-1 dark:hover:text-accent-1-dark">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-accent-1 dark:hover:text-accent-1-dark">Terms of Service</a></li>
            <li><a href="/support" className="hover:text-accent-1 dark:hover:text-accent-1-dark">Support</a></li>
          </ul>
        </div>

        {/* Column 4: Socials */}
        <div>
          <h3 className="text-base font-semibold text-text dark:text-text-dark mb-3">Follow Us</h3>
          <div className="flex gap-5">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="hover:text-accent-1 dark:hover:text-accent-1-dark transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 4.96 3.62 9.07 8.36 9.87v-6.99H7.9v-2.88h2.32V9.84c0-2.3 1.37-3.58 3.47-3.58.99 0 2.02.18 2.02.18v2.22h-1.14c-1.12 0-1.47.69-1.47 1.4v1.67h2.5l-.4 2.88h-2.1v6.99c4.73-.8 8.35-4.91 8.35-9.87z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="hover:text-accent-1 dark:hover:text-accent-1-dark transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="size-5">
                <path d="M12 2.16c3.2 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.4a4.9 4.9 0 0 1 1.78 1.15 4.9 4.9 0 0 1 1.15 1.78c.16.46.35 1.26.4 2.43.06 1.27.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.4 2.43a4.9 4.9 0 0 1-1.15 1.78 4.9 4.9 0 0 1-1.78 1.15c-.46.16-1.26.35-2.43.4-1.27.06-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.4a4.9 4.9 0 0 1-1.78-1.15 4.9 4.9 0 0 1-1.15-1.78c-.16-.46-.35-1.26-.4-2.43C2.17 15.58 2.16 15.2 2.16 12s.012-3.584.07-4.85c.054-1.17.24-1.97.4-2.43a4.9 4.9 0 0 1 1.15-1.78 4.9 4.9 0 0 1 1.78-1.15c.46-.16 1.26-.35 2.43-.4C8.42 2.17 8.8 2.16 12 2.16Zm0 1.68c-3.15 0-3.51.012-4.74.07-1.02.046-1.58.22-1.95.37-.49.19-.83.42-1.2.8a3.25 3.25 0 0 0-.8 1.2c-.15.37-.33.93-.37 1.95-.06 1.23-.07 1.59-.07 4.74s.012 3.51.07 4.74c.046 1.02.22 1.58.37 1.95.19.49.42.83.8 1.2.37.37.71.61 1.2.8.37.15.93.33 1.95.37 1.23.06 1.59.07 4.74.07s3.51-.012 4.74-.07c1.02-.046 1.58-.22 1.95-.37.49-.19.83-.42 1.2-.8.37-.37.61-.71.8-1.2.15-.37.33-.93.37-1.95.06-1.23.07-1.59.07-4.74s-.012-3.51-.07-4.74c-.046-1.02-.22-1.58-.37-1.95a3.25 3.25 0 0 0-.8-1.2 3.25 3.25 0 0 0-1.2-.8c-.37-.15-.93-.33-1.95-.37-1.23-.06-1.59-.07-4.74-.07ZM12 5.84a6.16 6.16 0 1 1 0 12.32 6.16 6.16 0 0 1 0-12.32Zm0 10.16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm6.4-10.36a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z"/>
              </svg>
            </a>

            {/* X (Twitter) */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X (Twitter)"
              className="hover:text-accent-1 dark:hover:text-accent-1-dark transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1227" fill="currentColor" className="size-5">
                <path d="M714.163 519.284 1160.89 0H1049.1L665.001 442.229 359.668 0H0l468.492 681.821L0 1226.55h111.785l407.2-468.54L840.332 1226.55H1200L714.137 519.284h.026ZM563.55 696.826l-47.17-67.047L152.236 80.168h163.046l303.51 431.044 47.17 67.047 383.04 544.763H885.957L563.55 696.826Z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border dark:border-border-dark mt-8 py-4 text-center text-sm">
        <p>© {new Date().getFullYear()} MyBrand. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
