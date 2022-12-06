import React, { useEffect } from "react";

export default function useEscape(handler: () => void) {
    useEffect(() => {
        function handleKeyDown(ev: KeyboardEvent) {
            if (ev.key === "Escape") {
                handler();
            }
        }
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [handler]);
}
