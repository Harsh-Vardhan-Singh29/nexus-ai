import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "@fontsource/inter/index.css";
import "./styles/globals.css";
import "./index.css";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>

            <App />

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