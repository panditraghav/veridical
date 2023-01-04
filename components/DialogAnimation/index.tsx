import React from "react";
import { useVeridicalTheme } from "../../utils";

interface DialogProps {
    children: React.ReactNode;
}
export default function DialogAnimation({ children }: DialogProps) {
    const theme = useVeridicalTheme();
    return <div className={theme?.dialog?.animation}>{children}</div>;
}
