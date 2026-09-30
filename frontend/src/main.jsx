import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import  "./style/index.css";
import App from "./App";
import AuthContextProvider from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </BrowserRouter>
);