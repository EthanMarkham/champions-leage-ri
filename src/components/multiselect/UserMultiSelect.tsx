// components/MultiSelect/UserMultiSelect.tsx
import { getUsers } from "@/lib/users";
import React from "react";
import { Multiselect, MultiSelectExtensionProp } from "./MultiSelect";

interface User {
  id: number;
  name: string;
}

const searchFunction = async (name?: string): Promise<User[]> => {
  return await getUsers({ name, limit: 10, orderByField: "name" });
};

const UserMultiSelect: React.FC<MultiSelectExtensionProp<User>> = ({ onSelectionChange, containerProps }) => {
  return (
    <Multiselect
      searchFunction={searchFunction}
      getItemLabel={(user: User) => user.name}
      getItemId={(user: User) => user.id}
      onSelectionChange={onSelectionChange}
      containerProps={containerProps}
    />
  );
};

export default UserMultiSelect;
