import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import ProfilePage from "./pages/ProfilePage";
import AdminDashboard from "./pages/AdminDashboard";
import MenuManagementPage from "./pages/MenuManagementPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* --- User Protected Routes --- */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/success" element={<OrderSuccessPage />} />
          </Route>

          {/* --- Admin Only Protected Routes --- */}
          <Route element={<ProtectedRoute adminOnly={true} />}>
            <Route path="/admin/orders" element={<AdminDashboard />} />
            <Route path="/admin/menu" element={<MenuManagementPage />} />
          </Route>
        </Routes>
      </main>
      {/* Footer can be added later once the file is created */}
    </BrowserRouter>
  );
}

export default App;
