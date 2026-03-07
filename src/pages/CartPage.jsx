import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";
import { FiTrash2, FiArrowLeft, FiCreditCard } from "react-icons/fi";
import { MdLocalShipping, MdPayment } from "react-icons/md";
import { BASE_URL } from "../constants";

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCartStore();
  const { userInfo } = useAuthStore();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  // 🎯 NEW: Dynamic Payment Method State
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  // --- PRICE CALCULATIONS ---
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0,
  );

  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));

  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  const checkoutHandler = async () => {
    if (!userInfo) {
      navigate("/login");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const orderData = {
        orderItems: cartItems.map((item) => ({
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
          menuItem: item._id,
        })),
        deliveryAddress: {
          street: "123 Main St",
          city: "Kozhikode",
        },
        paymentMethod: paymentMethod, // 🎯 FIXED: Now uses the selected state
        itemsPrice: itemsPrice,
        taxPrice: taxPrice,
        shippingPrice: shippingPrice,
        totalPrice: Number(totalPrice),
      };

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(`${BASE_URL}/api/orders`, orderData, config);

      clearCart();
      navigate("/success");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center bg-white">
        <div className="text-6xl mb-4 text-gray-300">🛒</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Cart is empty</h2>
        <p className="text-base text-gray-500 mb-8 max-w-md font-light">
          Browse our menu and add items to get started.
        </p>
        <Link
          to="/"
          className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl px-8 py-3 font-black transition-all flex items-center gap-2 shadow-lg"
        >
          <FiArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-5xl font-black text-slate-900 mb-2">
            Finalize Order 🍱
          </h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">
            Review your items and choose a payment method
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-xl mb-8 font-bold flex items-center gap-3">
            <span>⚠️</span> Order Error: {error}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* LEFT: Items & Payment */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cart Items List */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                Order Items
              </h2>
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-6 pb-6 border-b border-slate-50 last:border-0 last:pb-0"
                  >
                    <img
                      src={
                        item.image
                          ? `${BASE_URL}${item.image}`
                          : "https://via.placeholder.com/120"
                      }
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-2xl shadow-sm"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900">
                        {item.name}
                      </h3>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-slate-500 font-bold">
                          ${item.price.toFixed(2)} × {item.qty} =
                          <span className="text-orange-600 ml-2">
                            ${(item.qty * item.price).toFixed(2)}
                          </span>
                        </span>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-red-500 hover:text-red-700 font-black text-xs uppercase tracking-tighter"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 🎯 NEW: Payment Method Selection */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <MdPayment className="text-orange-600" /> Payment Method
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label
                  className={`flex items-center gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === "PayPal" ? "border-orange-600 bg-orange-50" : "border-slate-100 hover:border-orange-200"}`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="PayPal"
                    checked={paymentMethod === "PayPal"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 accent-orange-600"
                  />
                  <div className="flex flex-col">
                    <span className="font-black text-slate-900">PayPal</span>
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-tighter">
                      Safe & Encrypted
                    </span>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === "Stripe" ? "border-orange-600 bg-orange-50" : "border-slate-100 hover:border-orange-200"}`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="Stripe"
                    checked={paymentMethod === "Stripe"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 accent-orange-600"
                  />
                  <div className="flex flex-col">
                    <span className="font-black text-slate-900">
                      Stripe / Card
                    </span>
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-tighter">
                      Instant Checkout
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT: Order Total Sidebar */}
          <div className="lg:col-span-1 sticky top-24">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
              <h2 className="text-2xl font-black text-slate-900 mb-8">
                Order Total
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-slate-500 font-bold">
                  <span>Subtotal</span>
                  <span>${itemsPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500 font-bold">
                  <span>Tax (15%)</span>
                  <span>${taxPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500 font-bold pb-4 border-b border-slate-50">
                  <div className="flex items-center gap-2">
                    <MdLocalShipping className="text-orange-600" /> Shipping
                  </div>
                  <span
                    className={shippingPrice === 0 ? "text-emerald-600" : ""}
                  >
                    {shippingPrice === 0
                      ? "FREE"
                      : `$${shippingPrice.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-2xl font-black text-slate-900 uppercase tracking-tighter">
                    Total
                  </span>
                  <span className="text-4xl font-black text-orange-600">
                    ${totalPrice}
                  </span>
                </div>
              </div>

              <button
                onClick={checkoutHandler}
                disabled={isProcessing}
                className={`w-full py-5 rounded-2xl font-black text-lg shadow-lg transition-all active:scale-95 ${
                  isProcessing
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200"
                }`}
              >
                {isProcessing ? "Validating Order..." : "Place Your Order 🎉"}
              </button>

              <button
                onClick={() => navigate("/")}
                className="w-full mt-4 text-slate-400 hover:text-orange-600 font-bold text-sm transition-colors"
              >
                ← Back to Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
