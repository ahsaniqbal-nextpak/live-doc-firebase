import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const MySwal = withReactContent(Toast);

const success = (message: any) => {
  MySwal.fire({
    icon: "success",
    text: message,
  });
};
const error = (message: any) => {
  MySwal.fire({
    icon: "error",
    text: message,
  });
};
const warning = (message: any) => {
  MySwal.fire({
    icon: "warning",
    text: message,
  });
};
const info = (message: any) => {
  MySwal.fire({
    icon: "info",
    text: message,
  });
};

export { success, error, warning, info };
