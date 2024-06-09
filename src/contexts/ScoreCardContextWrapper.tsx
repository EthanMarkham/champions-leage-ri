// src/components/features/ScoreCardPage.tsx

"use client";

import React, { ReactNode } from "react";

import { ConfirmationProvider } from "@/contexts/ConfirmationContext";
import ClientProvider from "@/contexts/ClientProvider";
import { AlertProvider } from "@/contexts/AlertContext";

interface ScoreCardContextWrapperProps {
  children: ReactNode;
}

export default function ScoreCardContextWrapper({ children }: ScoreCardContextWrapperProps) {
  return (
    <ClientProvider>
      <ConfirmationProvider>
        <AlertProvider>
          {children}
        </AlertProvider>
      </ConfirmationProvider>
    </ClientProvider>
  );
}
