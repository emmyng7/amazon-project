import {
  FaGlobe,
  FaFlagUsa,
  FaChevronUp,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaChevronDown,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useState } from "react";

function Footer() {
  const { t, i18n } = useTranslation();
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <footer className="mt-8 sm:mt-12 md:mt-16">

      {/* Back To Top - Responsive */}
      <div
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        className="bg-[#37475A] dark:bg-gray-800 hover:bg-[#485769] dark:hover:bg-gray-700 text-white text-center py-2.5 sm:py-3 md:py-4 cursor-pointer font-semibold transition-all duration-300 text-sm sm:text-base"
      >
        {t("footer.backToTop")}
      </div>

      {/* Main Footer */}
      <div className="bg-[#232F3E] dark:bg-black text-white transition-colors duration-300">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-14">

          {/* Newsletter - Responsive */}
          <div className="bg-[#37475A] dark:bg-gray-900 rounded-2xl p-4 sm:p-6 md:p-8 mb-8 sm:mb-10 md:mb-14 flex flex-col lg:flex-row justify-between items-center gap-4 sm:gap-6 shadow-xl">
            <div className="text-center lg:text-left">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                Stay Updated
              </h2>
              <p className="text-gray-300 mt-1 sm:mt-2 text-sm sm:text-base">
                Get notified about exclusive deals, discounts and new arrivals.
              </p>
            </div>

            <div className="flex w-full lg:w-auto flex-col sm:flex-row gap-2 sm:gap-0">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 lg:w-72 xl:w-80 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-l-xl text-black outline-none text-sm sm:text-base"
              />
              <button className="bg-yellow-400 hover:bg-yellow-500 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-r-xl text-black font-bold flex items-center justify-center gap-2 transition text-sm sm:text-base">
                <FaEnvelope className="text-sm sm:text-base" />
                Subscribe
              </button>
            </div>
          </div>

          {/* Links - Mobile Accordion */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
            
            {/* Get to Know Us */}
            <div className="border-b sm:border-b-0 border-gray-700 pb-4 sm:pb-0">
              <h3 
                className="font-bold text-lg sm:text-xl mb-3 sm:mb-5 flex justify-between items-center cursor-pointer sm:cursor-default"
                onClick={() => toggleSection('getToKnow')}
              >
                {t("footer.getToKnowUs")}
                <span className="sm:hidden">
                  {openSections.getToKnow ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </h3>
              <ul className={`space-y-2 sm:space-y-3 text-gray-300 text-sm sm:text-base ${
                openSections.getToKnow ? 'block' : 'hidden sm:block'
              }`}>
                <li className="hover:text-yellow-400 cursor-pointer transition py-1 sm:py-0">
                  {t("footer.careers")}
                </li>
                <li className="hover:text-yellow-400 cursor-pointer transition py-1 sm:py-0">
                  {t("footer.blog")}
                </li>
                <li className="hover:text-yellow-400 cursor-pointer transition py-1 sm:py-0">
                  {t("footer.aboutAmazon")}
                </li>
                <li className="hover:text-yellow-400 cursor-pointer transition py-1 sm:py-0">
                  {t("footer.investorRelations")}
                </li>
                <li className="hover:text-yellow-400 cursor-pointer transition py-1 sm:py-0">
                  {t("footer.amazonDevices")}
                </li>
                <li className="hover:text-yellow-400 cursor-pointer transition py-1 sm:py-0">
                  {t("footer.amazonScience")}
                </li>
              </ul>
            </div>

            {/* Make Money */}
            <div className="border-b sm:border-b-0 border-gray-700 pb-4 sm:pb-0">
              <h3 
                className="font-bold text-lg sm:text-xl mb-3 sm:mb-5 flex justify-between items-center cursor-pointer sm:cursor-default"
                onClick={() => toggleSection('makeMoney')}
              >
                {t("footer.makeMoney")}
                <span className="sm:hidden">
                  {openSections.makeMoney ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </h3>
              <ul className={`space-y-2 sm:space-y-3 text-gray-300 text-sm sm:text-base ${
                openSections.makeMoney ? 'block' : 'hidden sm:block'
              }`}>
                <li className="hover:text-yellow-400 transition py-1 sm:py-0">{t("footer.sellProducts")}</li>
                <li className="hover:text-yellow-400 transition py-1 sm:py-0">{t("footer.sellBusiness")}</li>
                <li className="hover:text-yellow-400 transition py-1 sm:py-0">{t("footer.sellApps")}</li>
                <li className="hover:text-yellow-400 transition py-1 sm:py-0">{t("footer.affiliate")}</li>
                <li className="hover:text-yellow-400 transition py-1 sm:py-0">{t("footer.advertise")}</li>
                <li className="hover:text-yellow-400 transition py-1 sm:py-0">{t("footer.selfPublish")}</li>
                <li className="hover:text-yellow-400 transition py-1 sm:py-0">{t("footer.hostHub")}</li>
                <li className="hover:text-yellow-400 transition py-1 sm:py-0">{t("footer.seeMore")}</li>
              </ul>
            </div>

            {/* Payment Products */}
            <div className="border-b sm:border-b-0 border-gray-700 pb-4 sm:pb-0">
              <h3 
                className="font-bold text-lg sm:text-xl mb-3 sm:mb-5 flex justify-between items-center cursor-pointer sm:cursor-default"
                onClick={() => toggleSection('payment')}
              >
                {t("footer.paymentProducts")}
                <span className="sm:hidden">
                  {openSections.payment ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </h3>
              <ul className={`space-y-2 sm:space-y-3 text-gray-300 text-sm sm:text-base ${
                openSections.payment ? 'block' : 'hidden sm:block'
              }`}>
                <li className="hover:text-yellow-400 transition py-1 sm:py-0">{t("footer.businessCard")}</li>
                <li className="hover:text-yellow-400 transition py-1 sm:py-0">{t("footer.shopPoints")}</li>
                <li className="hover:text-yellow-400 transition py-1 sm:py-0">{t("footer.reloadBalance")}</li>
                <li className="hover:text-yellow-400 transition py-1 sm:py-0">{t("footer.currencyConverter")}</li>
              </ul>
            </div>

            {/* Help */}
            <div className="border-b sm:border-b-0 border-gray-700 pb-4 sm:pb-0">
              <h3 
                className="font-bold text-lg sm:text-xl mb-3 sm:mb-5 flex justify-between items-center cursor-pointer sm:cursor-default"
                onClick={() => toggleSection('help')}
              >
                {t("footer.help")}
                <span className="sm:hidden">
                  {openSections.help ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </h3>
              <ul className={`space-y-2 sm:space-y-3 text-gray-300 text-sm sm:text-base ${
                openSections.help ? 'block' : 'hidden sm:block'
              }`}>
                <li className="hover:text-yellow-400 transition py-1 sm:py-0">{t("footer.covid")}</li>
                <li className="hover:text-yellow-400 transition py-1 sm:py-0">{t("footer.account")}</li>
                <li className="hover:text-yellow-400 transition py-1 sm:py-0">{t("footer.orders")}</li>
                <li className="hover:text-yellow-400 transition py-1 sm:py-0">{t("footer.shipping")}</li>
                <li className="hover:text-yellow-400 transition py-1 sm:py-0">{t("footer.returns")}</li>
                <li className="hover:text-yellow-400 transition py-1 sm:py-0">{t("footer.manageDevices")}</li>
                <li className="hover:text-yellow-400 transition py-1 sm:py-0">{t("footer.helpCenter")}</li>
              </ul>
            </div>
          </div>

          <hr className="border-gray-700 my-8 sm:my-10 md:my-12" />

          {/* Bottom Section - Responsive */}
          <div className="flex flex-col items-center gap-6 sm:gap-8">
            
            {/* Language & Region Buttons */}
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-5">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                amazon
              </h1>

              <button className="border border-gray-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg flex items-center gap-1 sm:gap-2 hover:border-yellow-400 transition text-xs sm:text-sm">
                <FaGlobe className="text-xs sm:text-sm" />
                {i18n.language.toUpperCase()}
                <FaChevronUp className="rotate-180 text-[10px] sm:text-xs" />
              </button>

              <button className="border border-gray-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:border-yellow-400 transition text-xs sm:text-sm">
                NGN • Naira
              </button>

              <button className="border border-gray-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg flex items-center gap-1 sm:gap-2 hover:border-yellow-400 transition text-xs sm:text-sm">
                <FaFlagUsa className="text-xs sm:text-sm" />
                Nigeria
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 sm:gap-4 md:gap-5 text-xl sm:text-2xl">
              <FaFacebook className="hover:text-blue-500 cursor-pointer transition hover:scale-110" />
              <FaTwitter className="hover:text-sky-400 cursor-pointer transition hover:scale-110" />
              <FaInstagram className="hover:text-pink-500 cursor-pointer transition hover:scale-110" />
              <FaYoutube className="hover:text-red-500 cursor-pointer transition hover:scale-110" />
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-400 mt-6 sm:mt-8 md:mt-10 border-t border-gray-700 pt-6 sm:pt-8 text-xs sm:text-sm px-2">
            © {new Date().getFullYear()} Amazon Clone. Built with React, Firebase & Tailwind CSS.
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;