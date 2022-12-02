import React, { useRef } from "react";
import { useBackdropClose } from "@markor/utils";

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
    useBackdropClose(onClose, backdropRef.current);
    return (
        //@ts-ignore
        <div className={className || "backdrop"} ref={backdropRef}>
            {children}
        </div>
    );
}
