import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { DarkModeContext } from "../context/DarkModeContext";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaMapMarkerAlt,
  FaCamera,
  FaSave,
  FaCheckCircle,
  FaCalendarAlt,
  FaShieldAlt,
  FaUserCircle,
} from "react-icons/fa";

function Profile() {
  const { user, updateProfile } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);

  const [form, setForm] = useState({
    ...user,
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handlePhoto(e) {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setForm({
        ...form,
        photo: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateProfile(form);
    alert("Profile updated successfully.");
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-slate-100 via-gray-50 to-yellow-50'
    }`}>
      {/* Cover - FIXED: Added more height and padding */}
      <div className={`h-64 sm:h-72 md:h-80 bg-gradient-to-r ${
        darkMode 
          ? 'from-gray-800 via-gray-900 to-black' 
          : 'from-[#131921] via-[#232F3E] to-[#37475A]'
        } relative`}>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Header Content - FIXED: Better positioning with more padding */}
        <div className="absolute bottom-8 sm:bottom-10 md:bottom-12 left-6 sm:left-8 md:left-10 lg:left-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            My Profile
          </h1>
          <p className="text-gray-200 mt-2 sm:mt-3 text-sm sm:text-base md:text-lg">
            Manage your Amazon account information
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 -mt-12 sm:-mt-16 md:-mt-20 lg:-mt-24 relative z-10">
        <div className={`rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden transition-colors duration-300 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          {/* Profile Header */}
          <div className={`p-4 sm:p-6 md:p-8 lg:p-10 border-b transition-colors duration-300 ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 sm:gap-6 md:gap-8">
              {/* Profile Photo */}
              <div className="relative w-fit mx-auto lg:mx-0">
                <img
                  src={
                    form.photo ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      form.name || "User"
                    )}&background=fbbf24&color=000&size=256`
                  }
                  alt="Profile"
                  className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-full border-4 sm:border-8 border-white shadow-2xl object-cover"
                />
                <label className={`absolute bottom-1 sm:bottom-2 md:bottom-3 right-1 sm:right-2 md:right-3 ${
                  darkMode ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-yellow-400 hover:bg-yellow-500'
                } transition p-2 sm:p-3 md:p-4 rounded-full cursor-pointer shadow-lg`}>
                  <FaCamera className={`text-black text-sm sm:text-base md:text-lg`} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhoto}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="flex-1 text-center lg:text-left">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4">
                  <div>
                    <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold transition-colors duration-300 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {form.name || "Your Name"}
                    </h2>
                    <p className={`mt-1 text-sm sm:text-base transition-colors duration-300 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {form.email}
                    </p>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-2 sm:mt-3 md:mt-4">
                      <span className={`px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full font-semibold flex items-center gap-1 sm:gap-2 text-xs sm:text-sm ${
                        darkMode ? 'bg-green-900/50 text-green-400' : 'bg-green-100 text-green-700'
                      }`}>
                        <FaCheckCircle className="text-xs sm:text-sm" />
                        Verified
                      </span>
                      <span className={`px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full font-semibold text-xs sm:text-sm ${
                        darkMode ? 'bg-yellow-900/50 text-yellow-400' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        Premium Member
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className={`${
                      darkMode ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-yellow-400 hover:bg-yellow-500'
                    } px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-xl font-bold flex items-center justify-center gap-2 sm:gap-3 shadow-lg transition hover:scale-105 text-black text-sm sm:text-base`}
                  >
                    <FaSave className="text-sm sm:text-base" />
                    Save Profile
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 p-4 sm:p-6 md:p-8 lg:p-10">
            {/* LEFT */}
            <div className="lg:col-span-2">
              <form className="space-y-6 sm:space-y-8">
                {/* Personal Information */}
                <div>
                  <h2 className={`text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-6 transition-colors duration-300 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Personal Information
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                    {/* Full Name */}
                    <div>
                      <label className={`font-semibold flex items-center gap-2 mb-1.5 sm:mb-2 text-sm sm:text-base transition-colors duration-300 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        <FaUser className="text-yellow-500 text-sm sm:text-base" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name || ""}
                        onChange={handleChange}
                        className={`w-full border rounded-xl p-2.5 sm:p-3 md:p-4 focus:ring-2 focus:ring-yellow-400 outline-none transition-colors duration-300 text-sm sm:text-base ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className={`font-semibold flex items-center gap-2 mb-1.5 sm:mb-2 text-sm sm:text-base transition-colors duration-300 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        <FaEnvelope className="text-yellow-500 text-sm sm:text-base" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email || ""}
                        onChange={handleChange}
                        className={`w-full border rounded-xl p-2.5 sm:p-3 md:p-4 focus:ring-2 focus:ring-yellow-400 outline-none transition-colors duration-300 text-sm sm:text-base ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className={`font-semibold flex items-center gap-2 mb-1.5 sm:mb-2 text-sm sm:text-base transition-colors duration-300 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        <FaPhone className="text-yellow-500 text-sm sm:text-base" />
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={form.phone || ""}
                        onChange={handleChange}
                        placeholder="+234..."
                        className={`w-full border rounded-xl p-2.5 sm:p-3 md:p-4 focus:ring-2 focus:ring-yellow-400 outline-none transition-colors duration-300 text-sm sm:text-base ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>

                    {/* Country */}
                    <div>
                      <label className={`font-semibold flex items-center gap-2 mb-1.5 sm:mb-2 text-sm sm:text-base transition-colors duration-300 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        <FaGlobe className="text-yellow-500 text-sm sm:text-base" />
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={form.country || ""}
                        onChange={handleChange}
                        className={`w-full border rounded-xl p-2.5 sm:p-3 md:p-4 focus:ring-2 focus:ring-yellow-400 outline-none transition-colors duration-300 text-sm sm:text-base ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <h2 className={`text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-6 transition-colors duration-300 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Shipping Address
                  </h2>
                  <label className={`font-semibold flex items-center gap-2 mb-1.5 sm:mb-2 text-sm sm:text-base transition-colors duration-300 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <FaMapMarkerAlt className="text-yellow-500 text-sm sm:text-base" />
                    Address
                  </label>
                  <textarea
                    rows="4"
                    name="address"
                    value={form.address || ""}
                    onChange={handleChange}
                    placeholder="Enter your full address..."
                    className={`w-full border rounded-xl p-2.5 sm:p-3 md:p-4 resize-none focus:ring-2 focus:ring-yellow-400 outline-none transition-colors duration-300 text-sm sm:text-base ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>

                {/* Account Details */}
                <div>
                  <h2 className={`text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-6 transition-colors duration-300 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Account Information
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                    <div>
                      <label className={`font-semibold flex items-center gap-2 mb-1.5 sm:mb-2 text-sm sm:text-base transition-colors duration-300 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        <FaCalendarAlt className="text-yellow-500 text-sm sm:text-base" />
                        Member Since
                      </label>
                      <input
                        disabled
                        value={form.memberSince || "July 2026"}
                        className={`w-full rounded-xl p-2.5 sm:p-3 md:p-4 transition-colors duration-300 text-sm sm:text-base ${
                          darkMode 
                            ? 'bg-gray-700 text-gray-400' 
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`font-semibold flex items-center gap-2 mb-1.5 sm:mb-2 text-sm sm:text-base transition-colors duration-300 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        <FaCheckCircle className="text-green-600 text-sm sm:text-base" />
                        Account Status
                      </label>
                      <input
                        disabled
                        value="Active"
                        className={`w-full font-bold rounded-xl p-2.5 sm:p-3 md:p-4 transition-colors duration-300 text-sm sm:text-base ${
                          darkMode 
                            ? 'bg-green-900/30 text-green-400' 
                            : 'bg-green-100 text-green-700'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              {/* Account Overview */}
              <div className={`border rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 transition-colors duration-300 ${
                darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
              }`}>
                <h2 className={`text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-6 transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Account Overview
                </h2>
                <div className="space-y-3 sm:space-y-4 md:space-y-5">
                  <div className="flex justify-between items-center">
                    <span className={darkMode ? 'text-gray-400 text-sm sm:text-base' : 'text-gray-600 text-sm sm:text-base'}>
                      Orders
                    </span>
                    <span className="text-xl sm:text-2xl font-bold text-yellow-500">
                      0
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={darkMode ? 'text-gray-400 text-sm sm:text-base' : 'text-gray-600 text-sm sm:text-base'}>
                      Wishlist
                    </span>
                    <span className="text-xl sm:text-2xl font-bold text-pink-500">
                      0
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={darkMode ? 'text-gray-400 text-sm sm:text-base' : 'text-gray-600 text-sm sm:text-base'}>
                      Cart
                    </span>
                    <span className="text-xl sm:text-2xl font-bold text-blue-500">
                      0
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={darkMode ? 'text-gray-400 text-sm sm:text-base' : 'text-gray-600 text-sm sm:text-base'}>
                      Status
                    </span>
                    <span className="text-green-600 font-bold text-sm sm:text-base">
                      Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Security */}
              <div className={`rounded-2xl shadow-xl p-4 sm:p-5 md:p-6 text-white transition-colors duration-300 ${
                darkMode 
                  ? 'bg-gradient-to-br from-gray-700 to-gray-900' 
                  : 'bg-gradient-to-br from-[#131921] to-[#37475A]'
              }`}>
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <FaShieldAlt className="text-yellow-400 text-2xl sm:text-3xl" />
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
                    Security
                  </h2>
                </div>
                <p className={`mb-3 sm:mb-4 md:mb-6 text-xs sm:text-sm md:text-base ${
                  darkMode ? 'text-gray-300' : 'text-gray-300'
                }`}>
                  Keep your account secure by updating your password regularly and using a strong password.
                </p>
                <button
                  type="button"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2.5 sm:py-3 rounded-xl font-bold transition text-sm sm:text-base"
                >
                  Change Password
                </button>
              </div>

              {/* Membership */}
              <div className={`rounded-2xl shadow-xl p-4 sm:p-5 md:p-6 transition-colors duration-300 ${
                darkMode 
                  ? 'bg-gradient-to-r from-yellow-600 to-yellow-700' 
                  : 'bg-gradient-to-r from-yellow-400 to-yellow-500'
              }`}>
                <div className="flex items-center gap-3 sm:gap-4">
                  <FaUserCircle className="text-3xl sm:text-4xl md:text-5xl text-white" />
                  <div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                      Premium Member
                    </h2>
                    <p className="text-white/90 mt-0.5 sm:mt-1 md:mt-2 text-xs sm:text-sm md:text-base">
                      Enjoy exclusive discounts, faster checkout and early access to special deals.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className={`border rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 transition-colors duration-300 ${
                darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
              }`}>
                <h2 className={`text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 md:mb-5 transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Quick Actions
                </h2>
                <div className="space-y-2 sm:space-y-3">
                  <button
                    type="button"
                    className={`w-full border rounded-xl py-2.5 sm:py-3 font-semibold transition text-sm sm:text-base ${
                      darkMode 
                        ? 'border-gray-600 text-white hover:bg-gray-600' 
                        : 'border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    View Orders
                  </button>
                  <button
                    type="button"
                    className={`w-full border rounded-xl py-2.5 sm:py-3 font-semibold transition text-sm sm:text-base ${
                      darkMode 
                        ? 'border-gray-600 text-white hover:bg-gray-600' 
                        : 'border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    View Wishlist
                  </button>
                  <button
                    type="button"
                    className={`w-full border rounded-xl py-2.5 sm:py-3 font-semibold transition text-sm sm:text-base ${
                      darkMode 
                        ? 'border-gray-600 text-white hover:bg-gray-600' 
                        : 'border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Manage Addresses
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;