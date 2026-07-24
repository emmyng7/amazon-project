import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { 
  UserIcon, 
  EnvelopeIcon, 
  LockClosedIcon, 
  EyeIcon, 
  EyeSlashIcon,
  CheckCircleIcon,
  XCircleIcon
} from "@heroicons/react/24/outline";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });

  const { register, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  // Password strength checker
  useEffect(() => {
    setPasswordStrength({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    });
  }, [password]);

  const getPasswordStrengthScore = () => {
    const checks = Object.values(passwordStrength);
    const count = checks.filter(Boolean).length;
    if (count <= 2) return { label: "Weak", color: "text-red-500", bg: "bg-red-500" };
    if (count <= 3) return { label: "Fair", color: "text-yellow-500", bg: "bg-yellow-500" };
    if (count <= 4) return { label: "Good", color: "text-blue-500", bg: "bg-blue-500" };
    return { label: "Strong", color: "text-green-500", bg: "bg-green-500" };
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    // Validation
    if (name.trim().length < 2) {
      setError("Full name must be at least 2 characters long.");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    const strength = getPasswordStrengthScore();
    if (strength.label === "Weak") {
      setError("Please choose a stronger password.");
      setIsLoading(false);
      return;
    }

    try {
      const result = await register(name, email, password);

      if (!result.success) {
        setError(result.message || "Registration failed. Please try again.");
        setIsLoading(false);
        return;
      }

      setSuccess("Account created successfully! Redirecting...");
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  }

  const passwordStrengthInfo = getPasswordStrengthScore();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <div className="w-full max-w-md">
        {/* Brand/Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl shadow-lg mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Create an account</h2>
          <p className="text-slate-500 mt-2">Join us and get started with your journey</p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                <p className="text-sm text-green-700">{success}</p>
              </div>
            )}

            {/* Full Name Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-slate-50/50"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-slate-50/50"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-slate-50/50"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${passwordStrengthInfo.bg} transition-all duration-300`}
                        style={{ 
                          width: `${(Object.values(passwordStrength).filter(Boolean).length / 5) * 100}%` 
                        }}
                      />
                    </div>
                    <span className={`text-xs font-medium ml-3 ${passwordStrengthInfo.color}`}>
                      {passwordStrengthInfo.label}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    {[
                      { key: 'length', label: 'Min 8 characters' },
                      { key: 'uppercase', label: 'Uppercase letter' },
                      { key: 'lowercase', label: 'Lowercase letter' },
                      { key: 'number', label: 'Number' },
                      { key: 'special', label: 'Special character' },
                    ].map(({ key, label }) => (
                      <div key={key} className="flex items-center gap-1">
                        {passwordStrength[key] ? (
                          <CheckCircleIcon className="h-3.5 w-3.5 text-green-500" />
                        ) : (
                          <XCircleIcon className="h-3.5 w-3.5 text-slate-300" />
                        )}
                        <span className={passwordStrength[key] ? 'text-slate-700' : 'text-slate-400'}>
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-slate-50/50 ${
                    confirmPassword && password !== confirmPassword
                      ? "border-red-300"
                      : confirmPassword && password === confirmPassword
                      ? "border-green-300"
                      : "border-slate-200"
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
                {confirmPassword && (
                  <div className="absolute inset-y-0 right-12 flex items-center">
                    {password === confirmPassword ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircleIcon className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                )}
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                />
              </div>
              <label htmlFor="terms" className="ml-2 block text-sm text-slate-600">
                I agree to the{" "}
                <Link to="/terms" className="text-indigo-600 hover:text-indigo-700 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-indigo-600 hover:text-indigo-700 hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/30"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Creating account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500">or continue with</span>
            </div>
          </div>

          {/* Social Registration Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors duration-200">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span className="text-sm font-medium text-slate-700">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors duration-200">
              <svg className="h-5 w-5" fill="#1877f2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="text-sm font-medium text-slate-700">Facebook</span>
            </button>
          </div>

          {/* Login Link */}
          <p className="text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400 mt-6">
          By creating an account, you agree to our{" "}
          <Link to="/terms" className="hover:text-slate-600 hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="hover:text-slate-600 hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;