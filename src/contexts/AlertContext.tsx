// src/contexts/AlertContext.tsx

"use client";

import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from "react";

type AlertState = { message: string; type: string; duration: number; closeOnNewAlert: boolean } | null;

interface AlertContextProps {
  alert: AlertState;
  setAlert: (message: string, type?: string, duration?: number, closeOnNewAlert?: boolean) => void;
  clearAlert: () => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const useAlert = (): AlertContextProps => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alert, setAlertState] = useState<AlertState>(null);

  const setAlert = useCallback(
    (message: string, type: string = "warning", duration: number = 5000, closeOnNewAlert: boolean = false) => {
      if (closeOnNewAlert) {
        setAlertState(null);
      }
      setAlertState({ message, type, duration, closeOnNewAlert });
    },
    []
  );

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlertState(null);
      }, alert.duration);

      return () => clearTimeout(timer);
    }
  }, [alert]);

  const clearAlert = () => {
    setAlertState(null);
  };

  return <AlertContext.Provider value={{ alert, setAlert, clearAlert }}>{children}</AlertContext.Provider>;
};
