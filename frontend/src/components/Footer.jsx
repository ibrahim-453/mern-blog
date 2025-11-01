import instagram from "../assets/instagram.png";
import facebook from "../assets/facebook.png";

function Footer() {
  return (
    <footer className="bg-card dark:bg-card-dark border-t border-border dark:border-border-dark text-text-secondary dark:text-text-secondary-dark">
      <div className="container mx-auto px-6 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {/* Column 1: Brand */}
        <div>
          <h2 className="text-lg font-semibold text-text dark:text-text-dark mb-3">
            MyBrand
          </h2>
          <p className="text-sm leading-relaxed">
            Building clean, fast, and intelligent web experiences for everyone.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-base font-semibold text-text dark:text-text-dark mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/"
                className="hover:text-accent-1 dark:hover:text-accent-1-dark"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="hover:text-accent-1 dark:hover:text-accent-1-dark"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/blogs"
                className="hover:text-accent-1 dark:hover:text-accent-1-dark"
              >
                Blogs
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-accent-1 dark:hover:text-accent-1-dark"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Resources */}
        <div>
          <h3 className="text-base font-semibold text-text dark:text-text-dark mb-3">
            Resources
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="hover:text-accent-1 dark:hover:text-accent-1-dark"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-accent-1 dark:hover:text-accent-1-dark"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-accent-1 dark:hover:text-accent-1-dark"
              >
                Support
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Socials */}
        <div>
          <h3 className="text-base font-semibold text-text dark:text-text-dark mb-3">
            Follow Us
          </h3>
          <div className="flex gap-5">
            {/* Facebook */}
            <a href="https://facebook.com" title="facebook">
              <img src={facebook} alt="Facebook" width={20} height={20} />
            </a>
            {/* Instagram */}
            <a href="https://insatgram.com" title="instagram">
              <img src={instagram} alt="Instagram" width={20} height={20} />
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
