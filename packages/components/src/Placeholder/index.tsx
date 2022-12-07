import React from "react";
import { useMarkorTheme } from "markor";

export function Placeholder({ text }: { text: string }) {
    const theme = useMarkorTheme();
    return <div className={theme?.placeholder}>{text}</div>;
}
