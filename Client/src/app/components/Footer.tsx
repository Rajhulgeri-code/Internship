import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Tagline */}
          <div>
            <h3 className="text-xl font-bold mb-2">InnoInfinite Solutions</h3>
            <p className="text-gray-400 text-sm">Engineering Ideas into Impact.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Home
              </Link>
              <Link to="/services" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Services
              </Link>
              <Link to="/careers" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Careers
              </Link>
              <Link to="/contact" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Contact
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p>123 Innovation Drive</p>
              <p>Tech City, TC 12345</p>
              <p>Phone: (555) 123-4567</p>
              <p>Email: info@innoinfinite.com</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
          <p>© 2025 InnoInfinite Solutions. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
