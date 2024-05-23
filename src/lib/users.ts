// utils/users.ts
type GetUsersParams = {
  name?: string;
  id?: string;
  limit?: number;
  sort?: "asc" | "desc";
  orderByField?: "name" | "id";
};

export const getUsers = async (params?: GetUsersParams) => {
  try {
    let url = "/api/users";
    const queryParams = new URLSearchParams();

    if (params) {
      if (params.name) queryParams.append("name", params.name);
      if (params.id) queryParams.append("id", params.id);
      if (params.limit) queryParams.append("limit", params.limit.toString());
      if (params.sort) queryParams.append("sort", params.sort);
      if (params.orderByField) queryParams.append("orderBy", params.orderByField);
    }

    if (queryParams.toString()) {
      url += `?${queryParams.toString()}`;
    }

    const res = await fetch(url, {
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

export function findMatchingUser(nameInput: string, users: { name: string; id: number }[]) {
  // Function to normalize user names
  const normalizeName = (name: string) => name.trim().toLowerCase();

  // Normalize the input for comparison
  const normalizedInput = normalizeName(nameInput);

  // Function to compare names
  const isMatch = (userName: string, input: string) => {
    // Split names into parts for comparison
    const userParts = userName.split(" ");
    const inputParts = input.split(" ");

    // Check for exact match or partial match (first name, last name, or initial with last name)
    if (userName === input || userParts.some((part) => inputParts.includes(part))) {
      return true;
    }

    // Check for first initial with last name
    if (inputParts.length === 2 && userParts.length === 2) {
      const [inputFirstInitial, inputLastName] = inputParts;
      const [userFirstName, userLastName] = userParts;
      if (inputFirstInitial.charAt(0) === userFirstName.charAt(0) && inputLastName === userLastName) {
        return true;
      }
    }

    return false;
  };

  // Find the best match
  for (const user of users) {
    if (isMatch(normalizeName(user.name), normalizedInput)) {
      return user;
    }
  }

  // Return null if no match is found
  return null;
}
