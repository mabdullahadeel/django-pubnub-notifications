import React, { forwardRef } from "react";

export interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  textarea?: boolean;
  error?: string;
  transparent?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, textarea, error, transparent, ...props }, ref) => {
    const bg = transparent ? `bg-transparent` : `bg-slate-700`;
    const ring = error ? `ring-1 ring-red-500` : "";
    const cn = `rounded w-full py-2 px-4 rounded-8 placeholder-slate-500 focus:outline-none ${bg} ${ring} ${className} `;

    return (
      <>
        {textarea ? (
          <textarea
            ref={ref as any}
            className={cn}
            data-testid="textarea"
            {...(props as any)}
          />
        ) : (
          <input ref={ref} className={cn} {...props} />
        )}
        {error && <label className="m-0 text-sm text-red-400">{error}</label>}
      </>
    );
  }
);

Input.displayName = "Input";
