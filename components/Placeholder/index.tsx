import React from "react";
import { useVeridicalTheme } from "../../utils";

export function Placeholder({ text }: { text: string }) {
    const theme = useVeridicalTheme();
    return <div className={theme?.placeholder}>{text}</div>;
}
