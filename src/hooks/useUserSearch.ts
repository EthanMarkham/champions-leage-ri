import { useState, useEffect, useRef } from "react";
import { useQuery } from "react-query";

export interface UserSearchRecord {
  id: number;
  name: string;
}

const fetchUsers = async (query: string) => {
  if (query.length >= 1) {
    const response = await fetch(`/api/users?name=${query}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
  return [];
};

const useUserSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: users = [], isLoading } = useQuery(['users', debouncedQuery], () => fetchUsers(debouncedQuery), {
    enabled: debouncedQuery.length >= 1,
    keepPreviousData: true,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(inputValue);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (inputRef.current) {
      const matchedUser = users.find((u: UserSearchRecord) => u.name.toLowerCase() === debouncedQuery.toLowerCase());
      if (matchedUser) {
        inputRef.current.setAttribute("data-id", matchedUser.id.toString());
        setInputValue(matchedUser.name); // Correct the capitalization
      } else {
        inputRef.current.removeAttribute("data-id");
      }
    }
  }, [users, debouncedQuery]);

  return { users: users as UserSearchRecord[], query: inputValue, handleQueryChange, isLoading, inputRef };
};

export default useUserSearch;
