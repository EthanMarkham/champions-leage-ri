// src/contexts/ConfirmationContext.tsx

"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

interface ConfirmationContextProps {
  confirm: (message: ReactNode) => Promise<boolean>;
}

const ConfirmationContext = createContext<ConfirmationContextProps | undefined>(undefined);

export const useConfirmation = (): ConfirmationContextProps => {
  const context = useContext(ConfirmationContext);
  if (!context) {
    throw new Error("useConfirmation must be used within a ConfirmationProvider");
  }
  return context;
};

export const ConfirmationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [confirmState, setConfirmState] = useState<{
    isOpen: boolean;
    message: ReactNode;
    resolve: (value: boolean | PromiseLike<boolean>) => void;
  } | null>(null);

  const confirm = (message: ReactNode) => {
    return new Promise<boolean>((resolve) => {
      setConfirmState({ isOpen: true, message, resolve });
    });
  };

  const handleConfirm = () => {
    if (confirmState) {
      confirmState.resolve(true);
      setConfirmState(null);
    }
  };

  const handleCancel = () => {
    if (confirmState) {
      confirmState.resolve(false);
      setConfirmState(null);
    }
  };

  return (
    <ConfirmationContext.Provider value={{ confirm }}>
      {children}
      {confirmState && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <div className="py-">{confirmState.message}</div>
            <div className="mt-4 flex justify-end space-x-2">
              <button className="btn btn-warning" onClick={handleCancel}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleConfirm}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmationContext.Provider>
  );
};
