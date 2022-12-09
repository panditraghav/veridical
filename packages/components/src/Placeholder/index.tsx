import React from "react";
import { useVeridicalTheme } from "@veridical/utils";

export function Placeholder({ text }: { text: string }) {
    const theme = useVeridicalTheme();
    return <div className={theme?.placeholder}>{text}</div>;
}
