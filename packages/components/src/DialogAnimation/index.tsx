import React from "react";

interface DialogProps {
    className?: string;
    children: React.ReactNode;
}

function getWidthFromSize(size: "md" | "lg" | "xl") {
    switch (size) {
        case "md":
            return 280;
            break;
        case "lg":
            return 430;
            break;
        case "xl":
            return 740;
            break;
    }
}

export default function DialogAnimation({ className, children }: DialogProps) {
    return (
        <div className={className || "DefaultDialogAnimation"}>{children}</div>
    );
}
