import React from "react";
import { twMerge } from "tailwind-merge";

interface CardProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title?: string;
}

const Card: React.FC<CardProps> = ({ title, className, children, ...props }) => {
  return (
    <div className={twMerge("card card-bordered bg-base-200", className)} {...props}>
      <div className="card-body">
        {title && <h2 className="card-title">{title}</h2>}
        {children}
      </div>
    </div>
  );
};

export default Card;
