import { useState, useEffect } from "react";
import axios from "axios";
import { useCartStore } from "../store/cartStore";
import { FiPlus } from "react-icons/fi";
import { BASE_URL } from "../constants";

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/menu`);
        setMenuItems(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  if (loading)
    return (
      <div className="min-h-[60vh] flex items-center justify-center flex-col gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-600"></div>
        <p className="text-lg font-medium text-gray-600">
          Loading Tasty-Bites Menu...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="max-w-2xl mx-auto mt-12 p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 font-bold text-center">
        ⚠️ Error loading menu: {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header & Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Our Menu <span className="text-orange-600">🍱</span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto font-medium">
            Explore our premium selection of authentic dishes, freshly prepared
            for you.
          </p>
        </div>

        {/* Food Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {menuItems.map((item) => (
            <div
              key={item._id}
              // flex-col and h-full keeps cards equal height
              className="group flex flex-col h-full bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
            >
              {/* Image Section (Tag removed from here) */}
              <div className="relative h-56 overflow-hidden bg-gray-100">
                <img
                  src={
                    item.image
                      ? `${BASE_URL}${item.image}`
                      : "https://via.placeholder.com/400x300"
                  }
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Content Section */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-xl font-black text-gray-900">
                    ${item.price.toFixed(2)}
                  </span>
                </div>

                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                  {item.description}
                </p>

                {/* mt-auto forces this button to the very bottom */}
                <button
                  onClick={() => addToCart(item)}
                  className="mt-auto w-full bg-slate-900 hover:bg-orange-600 text-white font-black py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md active:scale-95"
                >
                  <FiPlus className="text-xl" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {menuItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl font-bold text-gray-400">
              The kitchen is empty! Check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
