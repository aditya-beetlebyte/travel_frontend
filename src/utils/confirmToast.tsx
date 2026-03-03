import { toast, ToastOptions } from "react-toastify";
import type { ReactNode } from "react";

type ConfirmHandler = () => void | Promise<void>;

interface ConfirmToastOptions extends ToastOptions {
  yesLabel?: ReactNode;
  noLabel?: ReactNode;
}

export function showConfirmToast(
  message: ReactNode,
  onConfirm: ConfirmHandler,
  { yesLabel = "Yes", noLabel = "No", ...options }: ConfirmToastOptions = {}
) {
  return toast(
    ({ closeToast }) => {
      const handle = async (confirmed: boolean) => {
        if (confirmed) {
          await onConfirm();
        }
        closeToast?.();
      };

      return (
        <div className="d-flex flex-column flex-sm-row align-items-stretch align-items-sm-center justify-content-between gap-2">
          <div>{message}</div>
          <div className="d-flex gap-2 ms-sm-3">
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={() => handle(true)}
            >
              {yesLabel}
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() => handle(false)}
            >
              {noLabel}
            </button>
          </div>
        </div>
      );
    },
    {
      type: "info",
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      ...options,
    }
  );
}

