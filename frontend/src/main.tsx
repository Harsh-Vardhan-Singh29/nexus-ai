import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "@fontsource/inter/index.css";
import "./styles/globals.css";
import "./index.css";
import { SearchProvider } from "./context/SearchContext";
import App from "./App";
import { NotificationProvider } from "./context/NotificationContext";
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>

            <GoogleOAuthProvider
                clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
            >
                <SearchProvider>

                    <NotificationProvider>

                        <App />

                    </NotificationProvider>

                </SearchProvider>
            </GoogleOAuthProvider>

            <Toaster
                position="top-right"
                reverseOrder={false}
                gutter={12}
                toastOptions={{
                    duration: 3000,

                    style: {
                        background: "#0f172a",
                        color: "#ffffff",
                        border: "1px solid #334155",
                        borderRadius: "12px",
                        padding: "16px",
                        fontSize: "14px",
                    },

                    success: {
                        iconTheme: {
                            primary: "#22c55e",
                            secondary: "#ffffff",
                        },
                    },

                    error: {
                        iconTheme: {
                            primary: "#ef4444",
                            secondary: "#ffffff",
                        },
                    },
                }}
            />

        </BrowserRouter>
    </React.StrictMode>
);