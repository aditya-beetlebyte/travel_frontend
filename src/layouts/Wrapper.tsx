/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "@/components/common/ScrollToTop";
import ErrorBoundary from "@/ui/ErrorBoundary";

const Wrapper = ({ children }: any) => {

    return (
        <ErrorBoundary>
            {children}
            <ScrollToTop />
            <ToastContainer position="top-center" />
        </ErrorBoundary>
    )
}

export default Wrapper
