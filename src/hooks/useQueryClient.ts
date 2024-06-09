// src/hooks/useQueryClient.ts

import { QueryClient, useQueryClient as useReactQueryClient } from 'react-query';
import { useMemo } from 'react';

export const useQueryClient = () => {
  return useReactQueryClient();
};

export const createQueryClient = () => {
  return useMemo(() => new QueryClient(), []);
};
