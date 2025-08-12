import * as React from "react"
import { Input as FluentInput } from "@fluentui/react-components"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type = "text", size, children, ...props }, ref) => {
    // Map HTML input types to Fluent UI supported types
    const fluentType: "number" | "search" | "time" | "text" | "date" | "datetime-local" | "email" | "month" | "password" | "tel" | "url" | "week" = 
      (type === "email" || type === "password" || type === "text" || 
       type === "search" || type === "tel" || type === "url" ||
       type === "number" || type === "time" || type === "date" ||
       type === "datetime-local" || type === "month" || type === "week") ? 
       type as any : "text";
    
    // Extract compatible props for FluentInput
    const { 
      value, 
      defaultValue, 
      onChange, 
      onFocus, 
      onBlur, 
      disabled, 
      required, 
      placeholder, 
      readOnly, 
      autoFocus,
      id,
      name,
      maxLength,
      minLength,
      min,
      max,
      step,
      pattern,
      title
    } = props;

    const fluentProps = {
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      disabled,
      required,
      placeholder,
      readOnly,
      autoFocus,
      id,
      name,
      maxLength,
      minLength,
      min,
      max,
      step,
      pattern,
      title
    };
    
    return (
      <FluentInput
        type={fluentType}
        className={cn(
          "flex h-10 w-full bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        size="medium"
        appearance="filled-lighter"
        {...fluentProps}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
