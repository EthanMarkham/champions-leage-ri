import { Button as HeadlessButton } from "@headlessui/react";
import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactElement<SvgIconProps>;
  iconClassName?: string;
  iconPosition?: "left" | "right";
  children?: React.ReactNode;
}

const filterButtonProps = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { type, disabled, onClick, onFocus, onBlur, onMouseEnter, onMouseLeave, ...rest } = props;
  return { type, disabled, onClick, onFocus, onBlur, onMouseEnter, onMouseLeave };
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ icon, iconClassName, iconPosition = "left", children, className, ...buttonProps }, ref) => {
    const filteredButtonProps = filterButtonProps(buttonProps);

    return (
      <HeadlessButton
        {...filteredButtonProps}
        ref={ref}
        className={twMerge("inline-flex items-center", className)}
        as="button"
      >
        {icon &&
          iconPosition === "left" &&
          React.cloneElement(icon, { className: twMerge(icon.props.className, iconClassName, children && "mr-2") })}
        <span>{children}</span>
        {icon &&
          iconPosition === "right" &&
          React.cloneElement(icon, { className: twMerge(icon.props.className, iconClassName, children && "ml-2") })}
      </HeadlessButton>
    );
  }
);

Button.displayName = "Button";

export default Button;
