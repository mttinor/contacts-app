import { toast } from "react-toastify";

class handleError {
  static ToastError = (err) => {
    let error;
    if (typeof err === "object") {
      error = err?.response?.data;
    } else {
      error = err;
    }

    toast.error(error);
  };
}

export default handleError;
