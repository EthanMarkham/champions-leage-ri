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
