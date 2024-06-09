import { useState, useEffect, useCallback } from "react";

type ErrorState = string | null;

const useError = () => {
  const [error, setError] = useState<ErrorState>(null);

  const setErrorWithTimeout = useCallback((newError: string) => {
    setError(newError);
    const timer = setTimeout(() => {
      setError(null);
    }, 50000); // Clear the error after 50 seconds

    return () => clearTimeout(timer);
  }, []);

  return [error, setErrorWithTimeout] as const;
};

export default useError;
