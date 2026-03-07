import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { register } = useAuthStore();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setIsLoading(true);
    try {
      await register(name, email, password);
      navigate("/");
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Create Account
              </h2>
              <p className="text-gray-500 text-sm font-light">
                Join us and start ordering
              </p>
            </div>

            {error && (
              <div className="alert alert-error mb-6 shadow-md">
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
                <span className="font-semibold">{error}</span>
              </div>
            )}

            <form onSubmit={submitHandler} className="space-y-4">
              {/* Name Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                    <FiUser className="h-5 w-5" />
                    Full Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              {/* Email Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-700 text-sm flex items-center gap-2">
                    <FiMail className="h-4 w-4" />
                    Email Address
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              {/* Password Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-700 text-sm flex items-center gap-2">
                    <FiLock className="h-4 w-4" />
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="Create a strong password"
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              {/* Confirm Password Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-700 text-sm flex items-center gap-2">
                    <FiLock className="h-4 w-4" />
                    Confirm Password
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5 font-medium text-sm transition-all mt-6"
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner loading-xs inline-block mr-2"></span>
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Sign In Link */}
            <div className="text-center mt-6 pt-6 border-t border-gray-200">
              <p className="text-gray-600 text-sm">
                Have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-blue-600 hover:text-blue-700 transition"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
