import React from "react";
import { useMarkorTheme } from "markor";

interface DialogProps {
    children: React.ReactNode;
}
export default function DialogAnimation({ children }: DialogProps) {
    const theme = useMarkorTheme();
    return <div className={theme?.dialog?.animation}>{children}</div>;
}
