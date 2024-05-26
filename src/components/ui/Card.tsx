import { twMerge } from "tailwind-merge";
import { HTMLAttributes, ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

const Card = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={twMerge(
        "border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 items-center text-gray-800 bg-gray-100 p-4 overflow-hidden",
        props.className
      )}
    />
  );
};

export default Card;
