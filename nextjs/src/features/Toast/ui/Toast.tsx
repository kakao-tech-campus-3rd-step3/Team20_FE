import { ToastContainer, Slide } from 'react-toastify';
import { CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react';

export function Toast() {
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={1200}
      hideProgressBar
      closeOnClick
      pauseOnHover
      newestOnTop
      limit={3}
      draggable
      theme="colored"
      transition={Slide}
      className="z-[var(--z-toast)]"
      toastClassName="rounded-16 shadow-custom-heavy border border-white/10 backdrop-blur-md"
      icon={({ type }) => {
        switch (type) {
          case 'success':
            return <CheckCircle size={18} />;
          case 'error':
            return <XCircle size={18} />;
          case 'warning':
            return <AlertTriangle size={18} />;
          default:
            return <Info size={18} />;
        }
      }}
    />
  );
}
