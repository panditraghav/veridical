import "./index.css";
import React from "react";

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
    return (
        <button
            className={`DefaultButton ${
                type == "primary"
                    ? "DefaultButton_Primary"
                    : "DefaultButton_Secondary"
            } ${isDisabled ? "DefaultButton_Disabled" : ""}`}
            onClick={isDisabled ? undefined : onClick}
        >
            {children}
        </button>
    );
}
