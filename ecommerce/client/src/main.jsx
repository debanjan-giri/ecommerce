
import React from "react"; 
import ReactDOM from "react-dom/client"; 
import { BrowserRouter } from "react-router-dom"; 



import App from "./App"; 
import { AuthProvider } from "./context/auth";
import { CartProvider } from "./context/cart";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);

