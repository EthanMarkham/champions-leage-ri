// utils/users.ts
export const getUsers = async (query: string) => {
  try {
    const res = await fetch(`/api/users?query=${query}`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const users = await res.json();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
