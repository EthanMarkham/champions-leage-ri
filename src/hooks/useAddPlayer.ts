import { useMutation, useQueryClient } from "react-query";

interface AddPlayerData {
  name: string;
  email: string;
}

const addPlayer = async (data: AddPlayerData) => {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to add player");
  }

  return response.json();
};

export const useAddPlayer = () => {
  const queryClient = useQueryClient();

  return useMutation(addPlayer, {
    onSuccess: () => {
      queryClient.invalidateQueries("users"); // Assuming you have a query key 'users' for fetching user data
    },
  });
};
