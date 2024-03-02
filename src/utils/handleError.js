import { toast } from "react-toastify";
export const ToastError = (err) => {
  const error = err.response.data;
  toast.error(error);
};
