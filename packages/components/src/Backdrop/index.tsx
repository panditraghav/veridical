import React, { useRef } from "react";
import { useBackdropClose, useVeridicalTheme } from "@veridical/utils";

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
    const theme = useVeridicalTheme();
    useBackdropClose(onClose, backdropRef.current);
    return (
        //@ts-ignore
        <div className={theme?.backdrop} ref={backdropRef}>
            {children}
        </div>
    );
}
