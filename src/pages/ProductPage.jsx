import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useCartStore } from "../store/cartStore";
import { BASE_URL } from "../constants";
import { FiPlus, FiArrowLeft, FiClock, FiAlertCircle } from "react-icons/fi";

const ProductPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Ensure this route exists on your backend!
        const { data } = await axios.get(`${BASE_URL}/api/menu/${id}`);
        setItem(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("We couldn't find that dish. It might have been removed.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="loading loading-spinner loading-lg text-orange-600"></div>
          <p className="font-bold text-slate-400 animate-pulse">
            Fetching Tasty-Bites details...
          </p>
        </div>
      </div>
    );

  if (error || !item)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
        <FiAlertCircle className="text-red-500 h-20 w-20 mb-4" />
        <h2 className="text-3xl font-black text-slate-900 mb-2">
          Dish not found!
        </h2>
        <p className="text-slate-500 max-w-sm mb-8 font-medium">
          {error ||
            "The link you followed might be broken or the item is no longer available."}
        </p>
        <Link
          to="/"
          className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black shadow-lg hover:bg-orange-600 transition-all active:scale-95"
        >
          Back to Menu 🍱
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-600 font-bold mb-8 transition-colors group"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />{" "}
          Back to Menu
        </Link>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Large Product Photo */}
          <div className="rounded-[40px] overflow-hidden shadow-2xl border border-slate-100 sticky top-24">
            <img
              src={
                item.image
                  ? `${BASE_URL}${item.image}`
                  : "https://via.placeholder.com/600x600?text=Tasty-Bites"
              }
              alt={item.name}
              className="w-full h-[550px] object-cover hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/600x600?text=Image+Coming+Soon";
              }}
            />
          </div>

          {/* Product Details */}
          <div className="space-y-8 pt-4">
            <div>
              <span className="bg-orange-100 text-orange-600 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                {item.category || "Main Course"}
              </span>
              <h1 className="text-6xl font-black text-slate-900 leading-tight mt-4">
                {item.name}
              </h1>
            </div>

            <div className="flex items-center gap-6 text-slate-500 font-bold bg-slate-50 p-4 rounded-3xl w-fit">
              <div className="flex items-center gap-2">
                <FiClock className="text-orange-600 h-5 w-5" /> 20-30 mins
              </div>
              <div className="h-4 w-[2px] bg-slate-200"></div>
              <div className="text-emerald-600 flex items-center gap-2">
                <span className="h-2 w-2 bg-emerald-500 rounded-full animate-ping"></span>
                Freshly Prepared
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-slate-400 font-black uppercase tracking-widest text-xs">
                Description
              </p>
              <p className="text-slate-600 text-xl leading-relaxed font-medium">
                {item.description ||
                  "Indulge in our carefully prepared dish, featuring authentic spices and the freshest ingredients available."}
              </p>
            </div>

            <div className="pt-8 border-t-2 border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">
                  Total Price
                </p>
                <p className="text-5xl font-black text-slate-900">
                  ${item.price.toFixed(2)}
                </p>
              </div>

              <button
                onClick={() => addToCart(item)}
                className="w-full sm:w-auto bg-slate-900 hover:bg-orange-600 text-white px-12 py-6 rounded-[24px] font-black text-lg transition-all flex items-center justify-center gap-3 shadow-2xl shadow-slate-200 active:scale-95"
              >
                <FiPlus className="text-2xl" /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;