import React, { forwardRef } from "react";

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    const cn = `inline-block w-full px-6 py-2.5 bg-red-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ${className}`;
    return <button ref={ref as any} className={cn} {...props} />;
  }
);

Button.displayName = "Button";
