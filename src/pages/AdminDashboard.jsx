import { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { FiRefreshCw, FiCheck, FiClock, FiBox } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { getAllOrders, updateOrderToDelivered } = useAuthStore();

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await getAllOrders();
      setOrders(data || []);
      setError(null);
    } catch (err) {
      setError(err || "Failed to fetch orders. Ensure you are an Admin.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const deliverHandler = async (id) => {
    if (window.confirm("Are you sure this order has been delivered?")) {
      try {
        await updateOrderToDelivered(id);
        loadOrders();
      } catch (err) {
        alert("Error updating order: " + err);
      }
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="loading loading-spinner loading-lg text-orange-500"></div>
      </div>
    );

  const pendingCount = orders.filter((o) => o.status !== "Delivered").length;
  const deliveredCount = orders.length - pendingCount;

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section: Correctly aligned Flexbox layout */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 flex items-center gap-3">
              <MdDashboard className="text-orange-600 h-10 w-10" />
              Manage Orders
            </h1>
            <p className="text-gray-500 font-medium mt-1">
              Real-time order management
            </p>
          </div>

          <button
            onClick={loadOrders}
            className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-100 rounded-2xl font-bold text-slate-700 hover:bg-gray-50 hover:border-orange-200 transition-all shadow-sm active:scale-95"
          >
            <FiRefreshCw
              className={`h-5 w-5 text-orange-600 ${loading ? "animate-spin" : ""}`}
            />
            <span>Refresh</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center">
            <div className="text-5xl font-black text-blue-600 mb-1">
              {orders.length}
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-wider text-xs">
              Total Orders
            </p>
          </div>

          <div className="bg-amber-50 p-6 rounded-3xl shadow-sm border border-amber-100 flex flex-col items-center justify-center">
            <FiClock className="h-8 w-8 text-amber-600 mb-2" />
            <div className="text-4xl font-black text-amber-600 mb-1">
              {pendingCount}
            </div>
            <p className="text-amber-700/70 font-bold uppercase tracking-wider text-xs">
              Pending
            </p>
          </div>

          <div className="bg-emerald-50 p-6 rounded-3xl shadow-sm border border-emerald-100 flex flex-col items-center justify-center">
            <FiCheck className="h-8 w-8 text-emerald-600 mb-2" />
            <div className="text-4xl font-black text-emerald-600 mb-1">
              {deliveredCount}
            </div>
            <p className="text-emerald-700/70 font-bold uppercase tracking-wider text-xs">
              Delivered
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-xl mb-8 font-bold flex items-center gap-3">
            <span>⚠️</span> {error}
          </div>
        )}

        {/* Orders Table Container */}
        <div className="bg-white shadow-xl rounded-3xl overflow-hidden border border-slate-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="px-8 py-5 text-left text-xs uppercase font-black tracking-widest">
                    Customer
                  </th>
                  <th className="px-8 py-5 text-left text-xs uppercase font-black tracking-widest">
                    Date
                  </th>
                  <th className="px-8 py-5 text-left text-xs uppercase font-black tracking-widest">
                    Items
                  </th>
                  <th className="px-8 py-5 text-left text-xs uppercase font-black tracking-widest">
                    Total
                  </th>
                  <th className="px-8 py-5 text-left text-xs uppercase font-black tracking-widest">
                    Status
                  </th>
                  <th className="px-8 py-5 text-center text-xs uppercase font-black tracking-widest">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-8 py-20 text-center">
                      <div className="text-6xl mb-4 text-slate-200">📭</div>
                      <p className="text-slate-400 font-bold text-lg">
                        No orders found yet
                      </p>
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr
                      key={order._id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="px-8 py-5">
                        <div className="font-bold text-slate-900">
                          {order.user?.name || "Guest"}
                        </div>
                        <div className="text-xs text-slate-400">
                          {order.user?.email || "N/A"}
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm text-slate-600 font-bold">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric", // FIXED: Changed "2026" to "numeric" to resolve the RangeError
                        })}
                      </td>
                      <td className="px-8 py-5 text-sm font-bold text-slate-700">
                        {order.orderItems?.length || 0} item(s)
                      </td>
                      <td className="px-8 py-5 font-black text-orange-600 text-xl">
                        ${order.totalPrice.toFixed(2)}
                      </td>
                      <td className="px-8 py-5">
                        <span
                          className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                            order.status === "Delivered"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {order.status === "Delivered" ? "✓ Done" : "⏳ Pending"}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-center">
                        {order.status !== "Delivered" ? (
                          <button
                            onClick={() => deliverHandler(order._id)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-4 py-2 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1 mx-auto"
                          >
                            <FiCheck className="h-3 w-3" />
                            Mark Delivered
                          </button>
                        ) : (
                          <div className="text-emerald-500 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-1">
                            <FiCheck className="h-4 w-4" /> Delivered
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;