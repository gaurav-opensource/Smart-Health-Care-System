import { Link } from 'react-router-dom'; // Import Link from react-router-dom for routing

export default function Footer() {
  // Get the current year dynamically
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Company Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/about" className="hover:text-blue-400 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/careers" className="hover:text-blue-400 transition-colors">
                Careers
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-blue-400 transition-colors">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/guides" className="hover:text-blue-400 transition-colors">
                Startup Guides
              </Link>
            </li>
            <li>
              <Link to="/tools" className="hover:text-blue-400 transition-colors">
                Tools & Templates
              </Link>
            </li>
            <li>
              <Link to="/events" className="hover:text-blue-400 transition-colors">
                Events
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/help" className="hover:text-blue-400 transition-colors">
                Help Center
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-blue-400 transition-colors">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-400 transition-colors">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Community Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Community</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/forum" className="hover:text-blue-400 transition-colors">
                Forum
              </Link>
            </li>
            <li>
              <Link to="/mentors" className="hover:text-blue-400 transition-colors">
                Mentorship Program
              </Link>
            </li>
            <li>
              <Link to="/network" className="hover:text-blue-400 transition-colors">
                Networking
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/terms" className="hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/cookies" className="hover:text-blue-400 transition-colors">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-700 text-center">
        <p className="text-sm">
          © {currentYear} Entrepreneur Platform. All rights reserved.
        </p>
        <p className="mt-2 text-sm">
          Empowering startups to innovate, grow, and succeed.
        </p>
        <div className="mt-4 flex justify-center space-x-6">
          <a href="https://twitter.com" className="hover:text-blue-400 transition-colors">
            Twitter
          </a>
          <a href="https://linkedin.com" className="hover:text-blue-400 transition-colors">
            LinkedIn
          </a>
          <a href="https://github.com" className="hover:text-blue-400 transition-colors">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
