import React, { useEffect } from "react";

export default function useMouse(mouseEventListener: (ev: MouseEvent) => void) {
    useEffect(() => {
        document.addEventListener("mousemove", mouseEventListener);
        return () =>
            document.removeEventListener("mousemove", mouseEventListener);
    });
}
