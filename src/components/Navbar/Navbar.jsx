import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaShoppingCart,
  FaMapMarkerAlt,
  FaHeart,
  FaUserCircle,
  FaChevronDown,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { FaMoon, FaSun } from "react-icons/fa";
import { DarkModeContext } from "../../context/DarkModeContext";
import { WishlistContext } from "../../context/WishlistContext";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import { SearchContext } from "../../context/SearchContext";
import { CategoryContext } from "../../context/CategoryContext";
import { ProductContext } from "../../context/ProductContext";
import logo from "../../assets/logo.png";
import Categories from "../Categories/Categories";
import SearchSuggestions from "../SearchSuggestions/SearchSuggestions";
import LanguageDropdown from "../LanguageDropdown/LanguageDropdown";
import { useTranslation } from "react-i18next";

function Navbar() {
  const { t } = useTranslation();
  const { wishlistItems } = useContext(WishlistContext);
  const { cartItems } = useContext(CartContext);
  const { search, setSearch } = useContext(SearchContext);
  const { setCategory } = useContext(CategoryContext);
  const { user, logout } = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { products } = useContext(ProductContext);

  const [country, setCountry] = useState("Nigeria");
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const accountRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        accountRef.current &&
        !accountRef.current.contains(event.target)
      ) {
        setShowAccountMenu(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest('.mobile-menu-toggle')
      ) {
        setShowMobileMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowMobileMenu(false);
        setShowMobileSearch(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showMobileMenu]);

  return (
    <div className="sticky top-0 z-50">
      {/* Top Navbar */}
      <header className="bg-[#131921] dark:bg-gray-950 text-white shadow-lg transition-all duration-300 w-full border-b border-transparent dark:border-gray-800">
        <div className="max-w-screen-2xl mx-auto flex items-center gap-1 sm:gap-3 px-2 sm:px-4 py-1.5 sm:py-2">

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="mobile-menu-toggle md:hidden p-1.5 hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
            aria-label="Toggle menu"
          >
            {showMobileMenu ? (
              <FaTimes className="text-xl sm:text-2xl" />
            ) : (
              <FaBars className="text-xl sm:text-2xl" />
            )}
          </button>

          {/* Logo - DESKTOP ONLY */}
          <Link to="/" className="hidden md:flex items-center gap-2 flex-shrink-0">
            <img
              src={logo}
              alt="HI Store"
              className="w-10 h-10 object-contain"
            />
            <span className="text-lg font-bold text-white hover:text-[#febd69] transition-colors">
              HI<span className="text-[#febd69]">Store</span>
            </span>
          </Link>

          {/* Location - Hidden on tablet and mobile */}
          <div className="hidden xl:flex items-center hover:border border-white p-1.5 rounded flex-shrink-0">
            <FaMapMarkerAlt size={16} />
            <div className="ml-1.5">
              <p className="text-[10px] text-gray-300">Deliver to</p>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="bg-transparent text-white font-bold outline-none cursor-pointer text-xs"
              >
                <option className="text-black">Nigeria</option>
                <option className="text-black">United States</option>
                <option className="text-black">United Kingdom</option>
                <option className="text-black">Canada</option>
                <option className="text-black">Germany</option>
                <option className="text-black">France</option>
                <option className="text-black">India</option>
              </select>
            </div>
          </div>

          {/* SEARCH BAR - Always white */}
          <div className="relative flex-1 max-w-3xl mx-1 sm:mx-2">
            <div className="flex w-full h-8 sm:h-9 md:h-10">
              {/* Mobile Search Toggle */}
              <button
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                className="md:hidden bg-[#febd69] dark:bg-yellow-500 px-2 sm:px-3 rounded-l-md hover:bg-yellow-500 text-black flex items-center justify-center transition"
                aria-label="Search"
              >
                <FaSearch className="text-xs sm:text-sm" />
              </button>

              {/* Category Select - Always white */}
              <select className="hidden sm:block bg-gray-200 px-2 sm:px-3 rounded-l-md outline-none transition text-xs sm:text-sm border-none text-black">
                <option>All</option>
              </select>

              {/* Search Input - ALWAYS WHITE (Desktop & Mobile) */}
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`flex-1 bg-white text-black placeholder-gray-500 px-3 sm:px-4 text-sm sm:text-base outline-none transition ${
                  showMobileSearch ? 'block' : 'hidden md:block'
                }`}
              />

              {/* Search Button */}
              <button className="hidden md:flex bg-[#febd69] dark:bg-yellow-500 dark:hover:bg-yellow-400 px-3 sm:px-5 rounded-r-md hover:bg-yellow-500 text-black items-center justify-center transition">
                <FaSearch className="text-sm" />
              </button>
            </div>

            <SearchSuggestions
              products={products}
              search={search}
              setSearch={setSearch}
            />
          </div>

          {/* Right Section - Clean icons */}
          <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
            
            {/* Language Dropdown */}
            <div className="hidden sm:block">
              <LanguageDropdown />
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="hidden sm:flex items-center justify-center p-2 hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <FaSun className="text-yellow-400 text-base sm:text-lg" />
              ) : (
                <FaMoon className="text-base sm:text-lg" />
              )}
            </button>

            {/* Account */}
            <div
              ref={accountRef}
              className="relative hidden sm:block"
            >
              {user ? (
                <>
                  <button
                    onClick={() => setShowAccountMenu(!showAccountMenu)}
                    className="flex items-center gap-1 p-1.5 hover:bg-gray-700 rounded-lg transition"
                  >
                    <FaUserCircle className="text-xl sm:text-2xl" />
                    <span className="hidden lg:block text-xs font-medium truncate max-w-[80px]">
                      {user.name.split(' ')[0]}
                    </span>
                    <FaChevronDown
                      className={`hidden lg:block transition-transform text-xs ${
                        showAccountMenu ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showAccountMenu && (
                    <div className="absolute right-0 mt-2 w-56 sm:w-64 bg-white dark:bg-gray-900 text-black dark:text-white rounded-xl shadow-2xl overflow-hidden z-50 border dark:border-gray-700">
                      <div className="px-4 sm:px-5 py-3 sm:py-4 border-b dark:border-gray-700">
                        <p className="font-bold text-sm sm:text-base">{user.name}</p>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                          {user.email}
                        </p>
                      </div>
                      <Link
                        to="/orders"
                        className="block px-4 sm:px-5 py-2.5 sm:py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition text-sm"
                        onClick={() => setShowAccountMenu(false)}
                      >
                        📦 Orders
                      </Link>
                      <Link
                        to="/wishlist"
                        className="block px-4 sm:px-5 py-2.5 sm:py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition text-sm"
                        onClick={() => setShowAccountMenu(false)}
                      >
                        ❤️ Wishlist
                      </Link>
                      <Link
                        to="/profile"
                        className="block px-4 sm:px-5 py-2.5 sm:py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition text-sm"
                        onClick={() => setShowAccountMenu(false)}
                      >
                        👤 Profile
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setShowAccountMenu(false);
                        }}
                        className="w-full text-left px-4 sm:px-5 py-2.5 sm:py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition text-sm"
                      >
                        🚪 Sign Out
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-1 p-1.5 hover:bg-gray-700 rounded-lg transition"
                >
                  <FaUserCircle className="text-xl sm:text-2xl" />
                  <span className="hidden lg:block text-xs font-medium">Sign In</span>
                </Link>
              )}
            </div>

            {/* Orders */}
            <Link
              to="/orders"
              className="hidden sm:flex items-center p-1.5 hover:bg-gray-700 rounded-lg transition"
            >
              <span className="text-xl sm:text-2xl">📦</span>
              <span className="hidden lg:block text-xs font-medium ml-1">Orders</span>
            </Link>

            {/* Wishlist - Red Heart */}
            <Link
              to="/wishlist"
              className="flex items-center p-1.5 hover:bg-gray-700 rounded-lg transition relative"
            >
              <FaHeart className="text-xl sm:text-2xl text-red-500" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
              <span className="hidden lg:block text-xs font-medium ml-1">Wishlist</span>
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="flex items-center p-1.5 hover:bg-gray-700 rounded-lg transition relative"
            >
              <FaShoppingCart className="text-xl sm:text-2xl" />
              {cartItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#febd69] text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
              <span className="hidden lg:block text-xs font-medium ml-1">Cart</span>
            </Link>

          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setShowMobileMenu(false)}
        />
      )}

      {/* Mobile Menu Drawer - WITH LOGO */}
      <div 
        ref={mobileMenuRef}
        className={`fixed top-0 left-0 h-full w-[280px] sm:w-[320px] bg-[#131921] dark:bg-gray-950 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          showMobileMenu ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile Menu Header - WITH LOGO */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <Link to="/" className="flex items-center gap-2" onClick={() => setShowMobileMenu(false)}>
            <img
              src={logo}
              alt="HI Store"
              className="w-10 h-10 object-contain"
            />
            <span className="text-white font-bold text-lg">
              HI<span className="text-[#febd69]">Store</span>
            </span>
          </Link>
          <button 
            onClick={() => setShowMobileMenu(false)}
            className="text-white hover:bg-gray-700 p-2 rounded-lg"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Mobile Menu Content */}
        <div className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-80px)]">
          {/* User Section */}
          {user ? (
            <div className="mb-4 p-3 bg-gray-800/50 rounded-lg">
              <p className="text-white font-bold">{user.name}</p>
              <p className="text-gray-400 text-sm truncate">{user.email}</p>
            </div>
          ) : (
            <Link
              to="/login"
              className="block mb-4 p-3 bg-[#febd69] text-black rounded-lg font-bold text-center"
              onClick={() => setShowMobileMenu(false)}
            >
              Sign In
            </Link>
          )}

          {/* Navigation Links */}
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-3 text-white hover:bg-gray-800 rounded-lg transition"
            onClick={() => setShowMobileMenu(false)}
          >
            <span>🏠</span> Home
          </Link>
          <Link
            to="/orders"
            className="flex items-center gap-3 px-3 py-3 text-white hover:bg-gray-800 rounded-lg transition"
            onClick={() => setShowMobileMenu(false)}
          >
            <span>📦</span> Orders
          </Link>
          <Link
            to="/wishlist"
            className="flex items-center gap-3 px-3 py-3 text-white hover:bg-gray-800 rounded-lg transition"
            onClick={() => setShowMobileMenu(false)}
          >
            <span>❤️</span> Wishlist ({wishlistItems.length})
          </Link>
          <Link
            to="/profile"
            className="flex items-center gap-3 px-3 py-3 text-white hover:bg-gray-800 rounded-lg transition"
            onClick={() => setShowMobileMenu(false)}
          >
            <span>👤</span> Profile
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-3 px-3 py-3 text-white hover:bg-gray-800 rounded-lg transition"
            onClick={() => setShowMobileMenu(false)}
          >
            <span>🛒</span> Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)})
          </Link>

          <div className="border-t border-gray-700 my-4"></div>

          {/* Theme Toggle */}
          <button
            onClick={() => {
              toggleDarkMode();
              setShowMobileMenu(false);
            }}
            className="flex items-center gap-3 w-full px-3 py-3 text-white hover:bg-gray-800 rounded-lg transition"
          >
            {darkMode ? (
              <>
                <FaSun className="text-yellow-400" /> Light Mode
              </>
            ) : (
              <>
                <FaMoon /> Dark Mode
              </>
            )}
          </button>

          {/* Language */}
          <div className="px-3 py-3">
            <LanguageDropdown />
          </div>

          {/* Country Selector */}
          <div className="px-3 py-3">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full bg-gray-800 text-white p-2 rounded-lg outline-none"
            >
              <option>Nigeria</option>
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Canada</option>
              <option>Germany</option>
              <option>France</option>
              <option>India</option>
            </select>
          </div>

          {user && (
            <button
              onClick={() => {
                logout();
                setShowMobileMenu(false);
              }}
              className="flex items-center gap-3 w-full px-3 py-3 text-red-400 hover:bg-red-900/30 rounded-lg transition"
            >
              <span>🚪</span> Sign Out
            </button>
          )}
        </div>
      </div>

      {/* Categories */}
      <Categories />
    </div>
  );
}

export default Navbar;