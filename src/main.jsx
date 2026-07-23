import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";
import "./i18n";

import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DarkModeProvider from "./context/DarkModeContext";
import CategoryProvider from "./context/CategoryContext";
import OrderProvider from "./context/OrderContext";
import CartProvider from "./context/CartContext";
import SearchProvider from "./context/SearchContext";
import WishlistProvider from "./context/WishlistContext";
import AuthProvider from "./context/AuthContext";
import ReviewProvider from "./context/ReviewContext";
import RecentlyViewedProvider from "./context/RecentlyViewedContext";
import ProductProvider from "./context/ProductContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <DarkModeProvider>
    <BrowserRouter>
      <SearchProvider>
        <CartProvider>
          <WishlistProvider>
            <AuthProvider>
              <OrderProvider>
                <ReviewProvider>
                  <CategoryProvider>
                    <ProductProvider>
                      <RecentlyViewedProvider>
                        <App />

                        <ToastContainer
                          position="top-right"
                          autoClose={2500}
                          theme="colored"
                        />
                      </RecentlyViewedProvider>
                    </ProductProvider>
                  </CategoryProvider>
                </ReviewProvider>
              </OrderProvider>
            </AuthProvider>
          </WishlistProvider>
        </CartProvider>
      </SearchProvider>
    </BrowserRouter>
  </DarkModeProvider>
);