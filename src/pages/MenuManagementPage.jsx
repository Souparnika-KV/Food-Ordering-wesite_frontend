import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../store/authStore";
import { FiPlus, FiTrash2, FiEdit, FiUpload } from "react-icons/fi";
import { BASE_URL } from "../constants";

const MenuManagementPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  const { deleteMenuItem, createMenuItem, updateMenuItem } = useAuthStore();

  const fetchMenu = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/menu`);
      setMenuItems(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching menu", error);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  // 🖼️ Upload logic with error handling
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const uploadData = new FormData();
    uploadData.append("image", file);
    try {
      const { data } = await axios.post(`${BASE_URL}/api/upload`, uploadData);
      setFormData({ ...formData, image: data });
    } catch (err) {
      alert("Upload failed! Check if backend 'uploads' folder exists.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateMenuItem(editingId, formData);
      } else {
        await createMenuItem(formData); // This adds the NEW product
      }
      setShowModal(false);
      setEditingId(null);
      fetchMenu();
    } catch (err) {
      alert(err);
    }
  };

  if (loading)
    return <div className="text-center mt-20 font-bold">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-black text-slate-900">
          Menu Management 🍱
        </h1>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({
              name: "",
              price: "",
              description: "",
              image: "",
              category: "",
            });
            setShowModal(true);
          }}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 transition-all shadow-lg active:scale-95"
        >
          <FiPlus className="text-xl" /> Add New Item
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-100">
        <table className="w-full text-left">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="px-8 py-5 text-xs uppercase font-black tracking-widest">
                Image
              </th>
              <th className="px-8 py-5 text-xs uppercase font-black tracking-widest">
                Item Name
              </th>
              <th className="px-8 py-5 text-xs uppercase font-black tracking-widest">
                Price
              </th>
              <th className="px-8 py-5 text-center text-xs uppercase font-black tracking-widest">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {menuItems.map((item) => (
              <tr
                key={item._id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-8 py-4">
                  {/* 🎯 FIXED IMAGE SOURCE HERE */}
                  <img
                    src={
                      item.image
                        ? `${BASE_URL}${item.image}`
                        : "https://via.placeholder.com/150?text=No+Image"
                    }
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-xl border-2 border-slate-100 shadow-sm"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/150?text=Error";
                    }}
                  />
                </td>
                <td className="px-8 py-4 font-bold text-slate-900">
                  {item.name}
                </td>
                <td className="px-8 py-4 font-black text-orange-600">
                  ${item.price}
                </td>
                <td className="px-8 py-4 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setEditingId(item._id);
                        setFormData(item);
                        setShowModal(true);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => deleteMenuItem(item._id).then(fetchMenu)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Unified Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200">
            <h2 className="text-2xl font-black mb-6 text-slate-900">
              {editingId ? "Edit Dish Details" : "Add New Dish"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Dish Name"
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-orange-500 transition-colors outline-none font-bold"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Price"
                  className="p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-orange-500 transition-colors outline-none font-bold"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Category"
                  className="p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-orange-500 transition-colors outline-none font-bold"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  required
                />
              </div>
              <div className="p-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl">
                <label className="flex items-center justify-center gap-2 cursor-pointer text-slate-500 hover:text-orange-600 transition-colors">
                  <FiUpload />{" "}
                  <span className="text-sm font-bold">
                    {formData.image ? "Change Image" : "Upload Image"}
                  </span>
                  <input
                    type="file"
                    onChange={uploadFileHandler}
                    className="hidden"
                  />
                </label>
              </div>
              <textarea
                placeholder="Description..."
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-orange-500 transition-colors outline-none h-24 font-medium"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              ></textarea>
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-2xl font-black shadow-lg shadow-orange-200 transition-all active:scale-95"
                >
                  SAVE ITEM
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 py-4 rounded-2xl font-bold transition-all"
                >
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuManagementPage;