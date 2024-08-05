import { forwardRef } from "react";
import { Input } from "./input";
import { cn } from "@/lib/utils";

type FieldProps = {
  error?: string | undefined;
} & React.ComponentPropsWithRef<"input">;

const Field = forwardRef<HTMLInputElement, FieldProps>(
  ({ error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        <Input
          ref={ref}
          {...props}
          className={cn(className, `${error ? "border-red-500" : ""}`)}
        />
        {error && (
          <p className="text-xs text-semibold text-red-600 mt-1 ml-2">
            {error}
          </p>
        )}
      </div>
    );
  }
);

export default Field;
