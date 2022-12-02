import React, { useEffect } from "react";

export default function useBackdropClose(
    onClose: () => void,
    element?: HTMLElement
) {
    useEffect(() => {
        function closeDialogClickListener(ev: MouseEvent) {
            if (!element) return;
            if (ev.target === element) {
                onClose();
            }
        }

        document.addEventListener("click", closeDialogClickListener);
        return () =>
            document.removeEventListener("click", closeDialogClickListener);
    });
}
