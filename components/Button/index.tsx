import React from "react";
import { useVeridicalTheme } from "../../utils";

export interface ButtonProps {
    type: "primary" | "secondary";
    onClick: (() => void) | (() => Promise<void>);
    children: React.ReactNode;
    isDisabled?: boolean;
}

export default function Button({
    type,
    onClick,
    children,
    isDisabled,
}: ButtonProps) {
    const theme = useVeridicalTheme();
    return (
        <button
            className={`${theme?.button?.base} ${
                type == "primary"
                    ? theme?.button?.primary
                    : theme?.button?.secondary
            } ${isDisabled ? theme?.button?.disabled : ""}`}
            onClick={isDisabled ? undefined : onClick}
        >
            {children}
        </button>
    );
}
