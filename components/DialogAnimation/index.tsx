import React from "react";
import { useVeridicalTheme } from "@veridical/utils";

interface DialogProps {
    children: React.ReactNode;
}
export default function DialogAnimation({ children }: DialogProps) {
    const theme = useVeridicalTheme();
    return <div className={theme?.dialog?.animation}>{children}</div>;
}
