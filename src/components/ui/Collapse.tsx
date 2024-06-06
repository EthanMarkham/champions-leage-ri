import React from "react";
import { twMerge } from "tailwind-merge";

interface CardProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  collapseTitle: React.ReactNode;
  toggleOpen?: boolean;
  titleProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  contentProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
}

const Collapse: React.FC<CardProps> = ({
  title,
  className,
  children,
  collapseTitle,
  titleProps,
  contentProps,
  toggleOpen,
  ...props
}) => {
  return (
    <div tabIndex={0} className={twMerge("collapse bg-base-200", className)} {...props}>
      {toggleOpen && <input type="checkbox" />}
      <div {...titleProps} className={twMerge("collapse-title text-xl font-medium", titleProps?.className)}>
        {collapseTitle}
      </div>
      <div {...contentProps} className={twMerge("collapse-content max-w-full overflow-auto", contentProps?.className)}>
        {children}
      </div>
    </div>
  );
};

export default Collapse;
