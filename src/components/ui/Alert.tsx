// src/components/ui/Alert.tsx

import React from "react";
import { twMerge } from "tailwind-merge";
import { useAlert } from "@/contexts/AlertContext";
import { useSpring, animated } from "@react-spring/web";

const Alert: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  const { alert, clearAlert } = useAlert();
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    if (alert) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [alert]);

  const animationProps = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(-100%)",
    config: {tension: 120, friction: 20},
    onRest: () => {
      if (!isVisible) {
        clearAlert();
      }
    },
  });

  if (!alert) return null;

  const alertTypeClasses = {
    success: "alert-success",
    warning: "alert-warning",
    error: "alert-error",
    info: "alert-info",
  };

  const alertClass = (alertTypeClasses as any)[alert.type] || alertTypeClasses.warning;

  return (
    <animated.div
      role="alert"
      {...props}
      style={animationProps}
      className={twMerge(
        "alert flex justify-between items-center",
        alertClass,
        className
      )}
    >
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span className="ml-2">{alert.message}</span>
      </div>
      <button
        onClick={clearAlert}
        className="btn btn-sm btn-circle btn-outline ml-4"
        aria-label="Close alert"
      >
        ✕
      </button>
    </animated.div>
  );
};

export default Alert;
