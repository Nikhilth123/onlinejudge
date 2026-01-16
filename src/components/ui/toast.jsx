import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const ToastProvider = ToastPrimitive.Provider;

export const ToastViewport = React.forwardRef(
  ({ className, ...props }, ref) => (
    <ToastPrimitive.Viewport
      ref={ref}
      className={cn(
        "fixed top-4 right-4 z-50 flex w-full max-w-sm flex-col gap-2",
        className
      )}
      {...props}
    />
  )
);

const toastVariants = cva(
  "relative flex items-center gap-3 rounded-md border p-4 shadow-lg bg-background text-foreground",
  {
    variants: {
      variant: {
        default: "",
        success: "border-green-500",
        error: "border-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const Toast = React.forwardRef(
  ({ className, variant, ...props }, ref) => (
    <ToastPrimitive.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
);

export const ToastTitle = ({ children }) => (
  <ToastPrimitive.Title className="font-semibold">
    {children}
  </ToastPrimitive.Title>
);

export const ToastDescription = ({ children }) => (
  <ToastPrimitive.Description className="text-sm opacity-90">
    {children}
  </ToastPrimitive.Description>
);
