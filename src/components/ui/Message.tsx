import { twMerge } from "tailwind-merge";

export interface UserMessageProps {
  type: "success" | "error" | "warning";
  message: string;
}

const messageTypeToClassName = (type: UserMessageProps["type"]) => {
  switch (type) {
    case "error":
      return "text-red-500";
    case "success":
      return "text-green-500";
    case "warning":
      return "text-yellow-500";
  }
};

const UserMessage = ({ message, type }: UserMessageProps) => (
  <p className={twMerge(messageTypeToClassName(type))}>{message}</p>
);

export default UserMessage;
