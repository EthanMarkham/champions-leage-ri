// components/MultiSelect/UserMultiSelect.tsx
import { getUsers } from "@/lib/users";
import React from "react";
import { Multiselect, MultiselectProps } from "./MultiSelect";

interface User {
  id: number;
  name: string;
}

const searchFunction = async (query: string): Promise<User[]> => {
  return await getUsers(query);
};

const UserMultiSelect: React.FC<Pick<MultiselectProps<User>, "onSelectionChange" | "containerProps">> = ({
  onSelectionChange,
  containerProps,
}) => {
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
