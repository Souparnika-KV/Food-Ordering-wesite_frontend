import { Link } from "react-router-dom";
import { MdCheckCircle } from "react-icons/md";

const OrderSuccessPage = () => {
  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center px-4 py-12">
      <div className="text-center max-w-2xl">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 bg-green-200 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <MdCheckCircle className="h-24 w-24 text-green-500" />
            </div>
          </div>
        </div>

        {/* Main Message */}
        <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">
          Order Received! ✅
        </h1>

        <p className="text-xl text-gray-600 mb-6 max-w-md mx-auto leading-relaxed font-medium">
          Your delicious food is being prepared with care right now. We'll have
          it ready for you shortly!
        </p>

        {/* Order Details Card - "Track Your Order" Removed */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-10 border border-green-100">
          <div className="space-y-6 text-left">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <span className="text-gray-400 font-bold uppercase text-xs tracking-widest">
                Status
              </span>
              <span className="bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-tight">
                Processing
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-400 font-bold uppercase text-xs tracking-widest">
                Estimated Time
              </span>
              <span className="text-gray-900 font-black text-lg">
                20-30 minutes
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link
            to="/"
            className="text-slate-900 font-black hover:text-orange-600 transition-colors flex items-center gap-2"
          >
            Order More Food 🍔
          </Link>
          <Link
            to="/profile"
            className="text-slate-900 font-black hover:text-orange-600 transition-colors"
          >
            View My Orders
          </Link>
        </div>

        {/* Thank You Message */}
        <div className="mt-12 pt-8 border-t border-green-200">
          <p className="text-gray-500 font-medium leading-relaxed">
            <span className="text-2xl mb-2 block">💚</span>
            Thank you for your order! Our team is working hard to make your meal
            perfect.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
