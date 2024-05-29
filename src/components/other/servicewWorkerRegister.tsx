"use client";

import { useEffect } from "react";

export const ServiceWorkerRegister: React.FC = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => console.log("scope is: ", registration.scope));
    }
  }, []);
  return <></>;
};
