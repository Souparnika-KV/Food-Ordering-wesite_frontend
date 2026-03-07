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
import ProductPage from "./pages/ProductPage"; 

function App() {
  return (
    <BrowserRouter>
      {/* Navigation remains consistent across all pages */}
      <Header />

      <main className="min-h-screen bg-gray-50">
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* 🎯 Dynamic Product Route: Allows viewing individual dish details */}
          <Route path="/product/:id" element={<ProductPage />} />

          {/* --- User Protected Routes --- */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            {/* Celebration page after successful order placement */}
            <Route path="/success" element={<OrderSuccessPage />} />
          </Route>

          {/* --- Admin Only Protected Routes --- */}
          <Route element={<ProtectedRoute adminOnly={true} />}>
            {/* Dashboard for real-time order management */}
            <Route path="/admin/orders" element={<AdminDashboard />} />
            {/* Page for adding/editing menu items like Mandi or Burgers */}
            <Route path="/admin/menu" element={<MenuManagementPage />} />
          </Route>
        </Routes>
      </main>

      {/* ⚠️ Reminder: Do not uncomment <Footer /> until the file 
          components/Footer.jsx is actually created to avoid 
          Vite build errors.
      */}
    </BrowserRouter>
  );
}

export default App;