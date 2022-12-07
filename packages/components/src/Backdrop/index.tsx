import React, { useRef } from "react";
import { useBackdropClose } from "@markor/utils";
import { useMarkorTheme } from "markor";

export default function Backdrop({
    children,
    className,
    onClose,
}: {
    children?: React.ReactNode;
    className?: string;
    onClose: () => void;
}) {
    const backdropRef = useRef<HTMLDivElement>();
    const theme = useMarkorTheme();
    useBackdropClose(onClose, backdropRef.current);
    return (
        //@ts-ignore
        <div className={theme?.backdrop} ref={backdropRef}>
            {children}
        </div>
    );
}
