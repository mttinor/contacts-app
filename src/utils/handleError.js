import { toast } from "react-toastify";
export const ToastError = (err) => {
  let error;
  console.log(typeof err);
  if (typeof err === "object") {
    error = err?.response?.data;
  } else {
    error = err;
  }

  toast.error(error);
};
