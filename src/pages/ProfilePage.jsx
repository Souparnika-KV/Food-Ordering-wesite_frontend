import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "../store/authStore";
import { FiUser, FiMail, FiShoppingBag } from "react-icons/fi";
import { BASE_URL } from "../constants";

const ProfilePage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userInfo } = useAuthStore();

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.get(
          `${BASE_URL}/api/orders/myorders`,
          config,
        );
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Could not load orders. Check if your backend is running!",
        );
        setLoading(false);
      }
    };

    if (userInfo) {
      fetchMyOrders();
    }
  }, [userInfo]);

  const totalSpent = orders.reduce((sum, order) => sum + order.totalPrice, 0);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="loading loading-spinner loading-lg text-orange-500"></div>
      </div>
    );

  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-50 min-h-[90vh] py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Profile Header Card */}
        <div className="card bg-white shadow-2xl mb-8 overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-orange-400 to-red-400 h-24"></div>
          <div className="card-body p-8 -mt-16 relative">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              {/* Profile Info */}
              <div className="flex items-center gap-4 flex-1">
                <div className="bg-gradient-to-br from-orange-400 to-red-400 p-4 rounded-full shadow-lg">
                  <FiUser className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-black text-gray-900">
                    {userInfo.name}
                  </h1>
                  <p className="text-gray-600 font-medium flex items-center gap-2 mt-1">
                    <FiMail className="h-5 w-5" />
                    {userInfo.email}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-4 md:flex-col lg:flex-row">
                <div className="stat bg-blue-50 rounded-lg p-4 text-center">
                  <div className="stat-value text-2xl text-blue-600 font-black">
                    {orders.length}
                  </div>
                  <div className="stat-title text-sm font-semibold text-gray-600">
                    Total Orders
                  </div>
                </div>
                <div className="stat bg-green-50 rounded-lg p-4 text-center">
                  <div className="stat-value text-2xl text-green-600 font-black">
                    ${totalSpent.toFixed(2)}
                  </div>
                  <div className="stat-title text-sm font-semibold text-gray-600">
                    Total Spent
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="badge badge-warning text-gray-900 font-black text-lg p-4">
                <FiShoppingBag className="h-5 w-5 mr-1" />
                {orders.length}
              </div>
              <h2 className="text-3xl font-black text-gray-900">Your Orders</h2>
            </div>
          </div>

          {error && (
            <div className="alert alert-error mb-6 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2m2-2h8a2 2 0 110 4h-3l-5-5"
                />
              </svg>
              <span className="font-bold">{error}</span>
            </div>
          )}

          {orders.length === 0 ? (
            <div className="card bg-white shadow-lg text-center py-16">
              <div className="text-6xl mb-4">🛍️</div>
              <p className="text-xl text-gray-500 mb-4 font-semibold">
                You haven't placed any orders yet!
              </p>
              <p className="text-gray-600 mb-6">
                Explore our delicious menu and place your first order
              </p>
              <a href="/" className="btn btn-warning font-bold">
                Browse Menu 🍔
              </a>
            </div>
          ) : (
            <div className="grid gap-4">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="card bg-white shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                >
                  <div className="card-body p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="font-black text-gray-900 text-lg">
                            Order #{order._id.substring(18, 24).toUpperCase()}
                          </h3>
                          <span
                            className={`badge font-black text-xs \${
                            order.status === "Delivered"
                              ? "badge-success text-white"
                              : "badge-warning text-gray-900"
                          }`}
                          >
                            {order.status || "Pending"}
                          </span>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p className="font-medium">
                            📅{" "}
                            {new Date(order.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            )}
                          </p>
                          <p className="text-gray-500">
                            {order.orderItems?.length || 0} item(s)
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-black text-orange-600">
                          ${order.totalPrice.toFixed(2)}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {order.paymentMethod || "Cash"}
                        </p>
                      </div>
                    </div>

                    {/* Order Items Preview */}
                    {order.orderItems && order.orderItems.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-sm font-semibold text-gray-600 mb-2">
                          Items:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {order.orderItems.map((item, idx) => (
                            <span key={idx} className="badge badge-outline">
                              {item.name} ×{item.qty}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
