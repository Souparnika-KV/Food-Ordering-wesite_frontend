import { Link } from "react-router-dom";
import { FiFacebook, FiInstagram, FiTwitter, FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <Link to="/" className="text-3xl font-black text-white tracking-tight flex items-center gap-2 mb-4 hover:text-orange-500 transition-colors">
              Tasty-Bites 🍔
            </Link>
            <p className="text-slate-400 font-medium leading-relaxed mb-6">
              Experience authentic flavors and premium dishes, freshly prepared and delivered straight to your door. Your cravings, satisfied.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all shadow-lg hover:-translate-y-1">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all shadow-lg hover:-translate-y-1">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all shadow-lg hover:-translate-y-1">
                <FiTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-white text-lg font-black uppercase tracking-widest mb-6">Quick Links</h3>
            <ul className="space-y-4 font-medium">
              <li>
                <Link to="/" className="hover:text-orange-500 hover:translate-x-1 inline-block transition-transform duration-300">Our Menu</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-orange-500 hover:translate-x-1 inline-block transition-transform duration-300">Your Cart</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-orange-500 hover:translate-x-1 inline-block transition-transform duration-300">Sign In</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-orange-500 hover:translate-x-1 inline-block transition-transform duration-300">Create Account</Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-white text-lg font-black uppercase tracking-widest mb-6">Contact Us</h3>
            <ul className="space-y-4 font-medium text-slate-400">
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-orange-600 transition-colors">
                  <FiMapPin className="text-white text-lg" />
                </div>
                123 Flavor Street, Food City
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-orange-600 transition-colors">
                  <FiPhone className="text-white text-lg" />
                </div>
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-orange-600 transition-colors">
                  <FiMail className="text-white text-lg" />
                </div>
                hello@tasty-bites.com
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between text-sm font-medium text-slate-500">
          <p>© {new Date().getFullYear()} Tasty-Bites. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;