/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import React from "react";

const Toaster = (props: React.ComponentProps<typeof Sonner>) => {
  const { theme = "system" } = useTheme();

  // Ensure theme is one of the allowed values
  const allowedThemes = ["system", "light", "dark"] as const;
  const sonnerTheme = allowedThemes.includes(theme as any)
    ? (theme as "system" | "light" | "dark")
    : "system";

  return (
    <Sonner
      theme={sonnerTheme}
      position="top-center"
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
