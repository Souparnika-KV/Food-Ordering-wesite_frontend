import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";
import { FiShoppingCart, FiLogOut, FiUser } from "react-icons/fi";
import { MdDashboard, MdRestaurantMenu, MdListAlt } from "react-icons/md";

const Header = () => {
  const { cartItems } = useCartStore();
  const { userInfo, logout } = useAuthStore();
  const navigate = useNavigate();

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const logoutHandler = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-slate-900 shadow-2xl sticky top-0 z-50 border-b-2 border-orange-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-white tracking-tight hover:text-orange-500 transition-colors"
            >
              Tasty-Bites 🍔
            </Link>
          </div>

          {/* Navigation & Auth Section */}
          <div className="flex items-center space-x-4 md:space-x-8">
            {/* Admin Specific Links - Visible directly in Navbar */}
            {userInfo?.isAdmin && (
              <div className="flex items-center space-x-2 md:space-x-6 border-r border-gray-700 pr-4 md:pr-8">
                <Link
                  to="/admin/orders"
                  className="flex items-center gap-1 text-gray-300 hover:text-orange-500 font-bold text-xs md:text-sm transition-all"
                >
                  <MdListAlt className="h-5 w-5" />
                  <span className="hidden lg:inline uppercase tracking-wider">
                    Orders
                  </span>
                </Link>
                <Link
                  to="/admin/menu"
                  className="flex items-center gap-1 text-gray-300 hover:text-orange-500 font-bold text-xs md:text-sm transition-all"
                >
                  <MdRestaurantMenu className="h-5 w-5" />
                  <span className="hidden lg:inline uppercase tracking-wider">
                    Manage Menu
                  </span>
                </Link>
              </div>
            )}

            {/* Cart Link with Dynamic Badge */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-full transition-all duration-200"
            >
              <FiShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] font-black h-5 w-5 flex items-center justify-center rounded-full border-2 border-slate-900">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User Logic */}
            {userInfo ? (
              <div className="flex items-center space-x-3 md:space-x-6">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-all font-medium"
                >
                  <FiUser className="h-5 w-5 text-orange-500" />
                  <span className="hidden sm:inline">
                    Hi, {userInfo.name.split(" ")[0]} 👋
                  </span>
                </Link>

                <button
                  onClick={logoutHandler}
                  className="bg-gray-800 text-gray-300 hover:text-white hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2"
                >
                  <FiLogOut className="h-4 w-4" />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-bold transition-all shadow-md"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
