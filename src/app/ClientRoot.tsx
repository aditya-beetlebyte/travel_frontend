"use client";

import "../styles/index.css";
import "../../public/assets/scss/main.scss";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import store from "@/redux/store";
import AuthSync from "@/components/AuthSync";

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthSync />
      {children}
      <ToastContainer
        position="top-center"
        hideProgressBar
        closeButton={false}
        newestOnTop
        className="mt-3"
        toastClassName={(context: unknown) => {
          const type = (context as { type?: string } | undefined)?.type;
          const variant =
            type === "success"
              ? "success"
              : type === "error"
                ? "danger"
                : type === "warning"
                  ? "warning"
                  : "info";
          return `alert alert-${variant} mb-0 shadow-sm`;
        }}
      />
    </Provider>
  );
}
